import collectObjects from '../utils/collect_objects'
import EmailLink from '../models/email_link'
import sendMail from '../utils/send_mail'
import Queue from '../objects/queue'
import Email from '../models/email'
import pluralize from 'pluralize'
import numeral from 'numeral'
import cheerio from 'cheerio'
import moment from 'moment'
import path from 'path'
import _ from 'lodash'
import ejs from 'ejs'
import fs from 'fs'

const rootPath = path.resolve(__dirname, '..', '..', '..', 'src', 'emails')

const envelopeTemplate = fs.readFileSync(path.join(rootPath, 'envelope.ejs')).toString()

const enqueue = async (req, trx, options) => {

  const templates = collectObjects('emails/*').reduce((emails, email) => {

    const config = require(email.filepath).default

    const templatePath = path.dirname(email.filepath).replace('dist', 'src')

    return {
      ...emails,
      [config.code]: {
        subject: config.subject,
        envelope: config.envelope,
        html: fs.readFileSync(path.join(templatePath, 'html.ejs')).toString()
      }
    }

  }, {})

  const template = templates[options.template]

  if(req.team) await req.team.load('logo', { transacting: trx })

  const team = req.team ? req.team.toJSON() : null

  options.data = {
    moment,
    numeral,
    pluralize,
    team,
    ...options.data
  }

  const innerContent = ejs.render(template.html, options.data)

  const html = template.envelope !== null ? ejs.render(envelopeTemplate, { ...options.data, content: innerContent}) : innerContent

  const data = {
    team_id: options.team_id,
    user_id: options.user ? options.user.get('id') : null,
    to: options.to || options.user.get('rfc822'),
    subject: ejs.render(template.subject, options.data),
    html,
    code: _.random(100000, 999999).toString(36)
  }

  const email = await Email.forge(data).save(null, { transacting: trx })

  const email_id = email.get('id')

  return { email_id }

}

const processor = async (job, trx) => {

  const conditions = {
    id: job.data.email_id
  }

  const email = await Email.where(conditions).fetch({ withRelated: ['team'], transacting: trx })

  const team = email.related('team')

  const parsed = cheerio.load(email.get('html'))

  await parsed(`<img src="${process.env.WEB_HOST}/v${email.get('code')}" />`).appendTo('body')

  const links = await parsed('a').map((i, elem) => ({
    text: parsed(elem).text(),
    url: parsed(elem).attr('href')
  })).get()

  const rendered = {
    from: `${team.get('title')} <mailer@mahaplatform.com>`,
    to: email.get('to'),
    subject: email.get('subject'),
    html: parsed.html()
  }

  const mapped = await Promise.reduce(links, async (rendered, link) => {

    const emailLink = await _findOrCreateLink(email, link, trx)

    const newUrl = `${process.env.WEB_HOST}/c${email.get('code')}${emailLink.get('code')}`

    return {
      ...rendered,
      html: rendered.html.replace(link.url, newUrl)
    }

  }, rendered)

  const result = await sendMail(mapped)

  await email.save(result, { patch: true, transacting: trx })

}

const _findOrCreateLink = async (email, link, trx) => {

  const emailLink = await EmailLink.where(link).fetch({ transacting: trx })

  if(emailLink) return emailLink

  const data = {
    team_id: email.get('team_id'),
    code: _.random(100000, 999999).toString(36),
    ...link
  }

  return await EmailLink.forge(data).save(null, { transacting: trx })

}

const mailerQueue = new Queue({
  name: 'mailer',
  enqueue,
  processor
})

export default mailerQueue

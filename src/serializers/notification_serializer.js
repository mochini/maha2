import serializer from '../objects/serializer'
import models from '../utils/model_activities'

const notificationSerializer = serializer((req, trx, result) => {

  const user = userData(result.related('user'))

  const subject = userData(result.related('subject'))

  const object = objectData(result)

  const subject_text = subjectText(subject, user)

  const article_text = articleText(subject, object, user)

  const object_text = objectText(subject, object, user)

  const story = result.related('story').get('text')

  const description = []

  if(subject_text) description.push(subject_text)

  description.push(story.replace('{object}', `${article_text}${object_text}`))

  return {

    id: result.get('id'),

    code: result.get('code'),

    url: result.get('url'),

    is_seen: result.get('is_seen'),

    is_visited: result.get('is_visited'),

    app: app(result.related('app')),

    user,

    subject,

    object,

    subject_text,

    article_text,

    story,

    object_text,

    description: description.join(' '),

    created_at: result.get('created_at'),

    updated_at: result.get('updated_at')

  }

})

const app = (app) => ({

  id: app.get('id'),

  title: app.get('title'),

  color: app.get('color'),

  icon: app.get('icon')

})

const userData = (result) => {

  if(!result.id) return null

  return {

    id: result.get('id'),

    first_name: result.get('first_name'),

    last_name: result.get('last_name'),

    full_name: result.get('full_name'),

    initials: result.get('initials'),

    rfc822: result.get('rfc822'),

    photo: result.related('photo').get('path')

  }

}

const objectData = (result) => {

  const model = models(result.get('object_table'))

  if(!result.get('object_text')) return null

  return {

    id: result.get('object_id'),

    owner_id: result.get('object_owner_id'),

    owner_full_name: result.related('object_owner').get('full_name'),

    type: model.displayName,

    text: result.get('object_text')

  }

}

const subjectText = (subject, user) => {

  if(!subject) return null

  return (subject.id === user.id) ? 'You' : subject.full_name

}

const articleText = (subject, object, user) => {
  const type = object.type ? ` ${object.type}` : ''
  if(object.owner_id === null) {
    return `the${type} `
  } else if(object.owner_id === user.id && (subject.id !== object.owner_id || !object.id)) {
    return `your${type} `
  } else if(object.owner_id !== user.id && subject.id !== object.owner_id ) {
    return `${object.owner_full_name}'s${type} `
  } else if(object.owner_id !== user.id && object.owner_id === subject.id) {
    return `their${type} `
  } else {
    return `the${type} `
  }
}

const objectText = (subject, object, user) => {
  if(object.type === 'user' && object.id === user.id) {
    return 'yourself'
  } else if(object.type === 'user' && object.id === subject.id) {
    return 'themself'
  }
  return object.text
}

export default notificationSerializer

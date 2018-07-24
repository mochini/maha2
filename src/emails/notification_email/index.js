import email from '../../core/objects/email'

const notificationEmail = email({
  code: 'maha.notification',
  name: 'Notification',
  subject: 'Here\'s what you\'ve missed!'
})

export default notificationEmail

import webpush from 'web-push'

export const sendViaPush = async (session, notification) => {

  const options = {
    gcmAPIKey: process.env.FCM_API_KEY,
    vapidDetails: {
      subject: 'mailto:greg@thinktopography.com',
      publicKey: process.env.VAPID_PUBLIC_KEY,
      privateKey: process.env.VAPID_PRIVATE_KEY
    }
  }

  const payload = JSON.stringify(notification)

  const config = {
    endpoint: session.related('device').get('push_endpoint'),
    keys: {
      p256dh: session.related('device').get('push_p256dh'),
      auth: session.related('device').get('push_auth')
    }
  }

  return await webpush.sendNotification(config, payload, options)

}

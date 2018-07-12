self.addEventListener('push', event => {
  if (!event.data) return
  const { title, body, url } = event.data.json()
  const data = {
    icon: '/images/maha.png',
    sound: '/audio/notification.mp3',
    body,
    data: {
      url: url
    }
  }
  return self.registration.showNotification(title, data)
})

self.addEventListener('notificationclick', event => {
  event.notification.close()
  var url = event.notification.data.url
  event.waitUntil(clients.matchAll({type: 'window'})
  .then(clientList => {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i]
      if(client.url === url && 'focus' in client) {
        return client.focus()
      }
    }
    if(clients.openWindow) {
      return clients.openWindow(url)
    }
  }))
})

'use strict';

self.addEventListener('push', function (event) {
  if (!event.data) return;

  var _event$data$json = event.data.json(),
      title = _event$data$json.title,
      body = _event$data$json.body,
      url = _event$data$json.url;

  var data = {
    icon: '/images/maha.png',
    sound: '/audio/notification.mp3',
    body: body,
    data: {
      url: url
    }
  };
  return self.registration.showNotification(title, data);
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  var url = event.notification.data.url;
  event.waitUntil(clients.matchAll({ type: 'window' }).then(function (clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url === url && 'focus' in client) {
        return client.focus();
      }
    }
    if (clients.openWindow) {
      return clients.openWindow(url);
    }
  }));
});
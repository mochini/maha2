import serializer from '../objects/serializer'

const commentSerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  uid: result.get('uid'),

  user: user(result.related('user')),

  attachments: result.related('attachments').map(attachment),

  text: result.get('text'),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

}))

const user = (user) => {

  if(!user.id) return null

  return {

    id: user.get('id'),

    full_name: user.get('full_name'),

    initials: user.get('initials'),

    photo: user.related('photo').get('path')

  }

}

const attachment = (attachment) => {

  if(!attachment.id) return null

  return {

    id: attachment.get('id'),

    type: attachment.get('type'),

    from_url: attachment.get('from_url'),

    image_bytes: attachment.get('image_bytes'),

    image_height: attachment.get('image_height'),

    image_url: attachment.get('image_url'),

    image_width: attachment.get('image_width'),

    service_icon: attachment.related('service').get('icon'),

    service_name: attachment.related('service').get('name'),

    service_url: attachment.related('service').get('url'),

    text: attachment.get('text'),

    title: attachment.get('title'),

    title_link: attachment.get('title_link'),

    author_link: attachment.get('author_link'),

    author_name: attachment.get('author_name'),

    thumb_height: attachment.get('thumb_height'),

    thumb_url: attachment.get('thumb_url'),

    thumb_width: attachment.get('thumb_width'),

    video_height: attachment.get('video_height'),

    video_url: attachment.get('video_url'),

    video_width: attachment.get('video_width'),

    asset: asset(attachment.related('asset'))

  }

}

const asset = (asset) => {

  if(!asset.id) return null

  return {

    id: asset.get('id'),

    content_type: asset.get('content_type'),

    original_file_name: asset.get('file_name'),

    file_name: asset.get('file_name'),

    file_size: asset.get('file_size'),

    icon: asset.get('icon'),

    path: asset.get('path'),

    source: asset.related('source').get('text'),

    source_url: asset.get('source_url')

  }

}

export default commentSerializer

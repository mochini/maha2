import serializer from '../objects/serializer'

const importSerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  asset: asset(result.related('asset')),

  stage: result.get('stage'),

  delimiter: result.get('delimiter'),

  headers: result.get('headers'),

  mapping: result.get('mapping'),

  user: user(result.related('user')),

  name: result.get('name'),

  object_type: result.get('object_type'),

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

export default importSerializer

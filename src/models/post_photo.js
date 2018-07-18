import Model from '../objects/model'
import Asset from './asset'
import Post from  './post'

const PostPhoto = new Model({

  tableName: 'maha_posts_photos',

  displayName: 'photo',

  asset() {
    return this.belongsTo(Asset, 'asset_id')
  },

  post() {
    return this.belongsTo(Post, 'post_id')
  }

})

export default PostPhoto

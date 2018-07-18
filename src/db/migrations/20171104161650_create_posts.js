import Migration from '../../objects/migration'

const CreatePosts = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('maha_posts', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.text('text')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_posts')
  }

})

export default CreatePosts

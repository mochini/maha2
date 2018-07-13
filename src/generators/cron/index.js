import generator from '../../objects/generator'

const Cron = generator({
  files: [
    {
      action: 'create',
      filepath: 'cron/<%= _.snakeCase(name) %>_cron.js',
      template: 'cron.ejs'
    }, {
      action: 'create',
      filepath: 'tests/cron/<%= _.snakeCase(name) %>_cron_test.js',
      template: 'test.ejs'
    }
  ]
})



export default Cron

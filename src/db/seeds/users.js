import Seeds from '../../objects/fixtures'

const contactSeeds= new Seeds({

  tableName: 'foo_contacts',

  records: [
    {
      id: 1,
      first_name: 'Greg',
      last_name: 'Kops',
      email: 'mochini@gmail.com'
    }
  ]

})

export default contactSeeds

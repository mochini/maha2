import Fixtures from '../../objects/fixtures'

const userFixtures = new Fixtures({

  tableName: 'maha_users',

  records: [
    {
      id: 1,
      first_name: 'Greg',
      last_name: 'Kops',
      email: 'mochini@gmail.com'
    }
  ]

})

export default userFixtures

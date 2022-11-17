const { User } = require('../models');

const userData = [{
        username: 'Billy',
        password: 'billy168'

    },
    {
        username: 'Jhon',
        password: 'jhon199'
    },
    {
        username: 'Justin',
        password: 'justin189'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
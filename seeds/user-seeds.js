const { User } = require('../models');

const userdata = [
  {
    username: 'v4l3sM0nd4',
    email: 'nwestnedge0@cbc.ca',
    password: 'password123'
  },
  {
    username: '3lbEr6a1aRga',
    email: 'rmebes1@sogou.com',
    password: 'locoshones123'
  },
  {
    username: 'ArmandoHoy0s',
    email: 'cstoneman2@last.fm',
    password: 'contracontra'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;

const { User } = require('../models');

const userdata = [
  {
    username: 'ElBukI',
    email: 'nwestnedge0@cbc.ca',
    password: 'password123'
  },
  {
    username: 'JohnnyBGoode',
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

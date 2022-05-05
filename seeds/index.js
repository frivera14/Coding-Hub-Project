const seedUsers = require('./user-seeds');
const seedPubs = require('./pub-seeds');
const seedComments = require('./comment-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('--------------');

  await seedPubs();
  console.log('--------------');

  await seedComments();
  console.log('--------------');

  process.exit(0);
};

seedAll();
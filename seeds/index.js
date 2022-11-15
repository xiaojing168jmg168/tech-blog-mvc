const sequelize = require('../config/connection');
const seedBlogs = require('./blogData');
const seedComments = require('./commentData');
const seedUsers = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });
 
  await seedBlogs();

  await seedComments();

  await seedUsers();
  process.exit(0);
};

seedAll();

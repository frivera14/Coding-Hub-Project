const { Pub } = require('../models');

const postdata = [
  {
    title: 'Front-end vs Back-end Development?.',
    pub_text: 'I feel people have very strong opinions either way',
    user_id: 3
  },
  {
    title: 'Morbi non quam nec dui luctus rutrum.',
    pub_text: 'something crazy', 
    user_id: 2
  },
  {
    title: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    pub_text: 'something crazy /ridiculus/mus/etiam/vel.aspx',
    user_id: 1
  }
];

const seedPubs = () => Pub.bulkCreate(postdata);

module.exports = seedPubs;
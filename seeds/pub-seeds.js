const { Pub } = require('../models');

const postdata = [
  {
    title: 'Front-end vs Back-end Development?.',
    pub_text: 'I feel people have very strong opinions either way',
    user_id: 3
  },
  {
    title: 'I learned HTML to try to understand some of the stuff here.',
    pub_text: 'something crazy', 
    user_id: 2
  },
  {
    title: 'How do you center a div?',
    pub_text: 'for the love of god someone help me',
    user_id: 1
  }
];

const seedPubs = () => Pub.bulkCreate(postdata);

module.exports = seedPubs;
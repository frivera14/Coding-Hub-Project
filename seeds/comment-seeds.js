const { Comment } = require('../models');

const commentdata = [
  {
    comment_text: 'Well thats politics for you.',
    user_id: 2,
    pub_id: 1
  },
  {
    comment_text: 'I feel like smart phones are making us less and less connected.',
    user_id: 1,
    pub_id: 2
  },
  {
    comment_text: 'Well aint that right.',
    user_id: 1,
    pub_id: 2
  },
  {
    comment_text: 'Joey doesnt share food.',
    user_id: 3,
    pub_id: 3
  }
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;

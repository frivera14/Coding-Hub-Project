const { Comment } = require('../models');

const commentdata = [
  {
    comment_text: 'Nunc rhoncus dui vel sem.',
    user_id: 2,
    pub_id: 1
  },
  {
    comment_text: 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    user_id: 1,
    pub_id: 2
  },
  {
    comment_text: 'Aliquam erat volutpat. In congue.',
    user_id: 1,
    pub_id: 2
  },
  {
    comment_text: 'Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    user_id: 3,
    pub_id: 3
  }
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;

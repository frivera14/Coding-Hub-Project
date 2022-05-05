const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll()
    .then(commentInfo => res.json(commentInfo))
    .catch(err => {
        console.log(err)
        res.status(400).json(err);
    });
});

router.post('/', (req, res) => {

    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.body.user_id,
            pub_id: req.body.pub_id
        })
        .then(commentInfo => res.json(commentInfo))
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        });
    }
});

router.delete('/:id', (req, res) => {
    Comment.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(commentInfo => {
        if (!commentInfo) {
          res.status(404).json({ message: 'No comment found with this id!' });
          return;
        }
        res.json(commentInfo);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;
  
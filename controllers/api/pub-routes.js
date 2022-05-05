const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Pub, User, Comment } = require('../../models');

router.get('/', (req, res) => {
    Pub.findAll({
        attributes: [
            'id',
            'title',
            'pub_text',
            'created_at'
        ],
        order: latest,
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
            model: User,
            attributes: ['username']
            }
        ]
    })
    .then(pubData => res.json(pubData))
    .catch(err => {
        console.log(err)
        res.status(400).json(err);
    });
});

router.get('/:id', (req, res) => {
    Pub.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'pub_text',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
            model: User,
            attributes: ['username']
            }
        ]
    })
    .then((postData) => {
        if (!postData) {
            res.status(400).json({ message: 'No post found' })
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err)
        res.status(400).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
    Pub.create({
        title: req.body.title,
        pub_text: req.body.pub_text,
        user_id: req.session.user_id
    })
    .then(pubData => res.json(pubData))
    .catch(err => {
        console.log(err)
        res.status(400).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
    Pub.update(
      {
        title: req.body.title
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(pubData => {
        if (!pubData) {
          res.status(404).json({ message: 'No publication was found' });
          return;
        }
        res.json(pubData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.delete('/:id', withAuth, (req, res) => {
      Pub.destroy({
          where: {
              id: req.params.id
          }
      })
      .then(pubData => {
          if (!pubData) {
              res.status(400).json({ message: 'No pub found with this name'});
              return;
          }
          res.json(pubData)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;
const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Pub, User, Comment } = require('../models');

router.get('/', withAuth, (req, res) => {
    console.log(req.session)
    Pub.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'pub_text',
            'created_at',
        ],
        include: [
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'pub_id', 'user_id', 'created_at'],
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
    .then(pubInfo => {

        const pubs = pubInfo.map(pub => pub.get({ plain: true }));
        res.render('profile', {
            pubs,
            loggedIn: true
        });
    })
    .catch(err => {
        console.log(err)
        res.status(400).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Pub.findByPk(req.params.id, {
      attributes: [
        'id',
        'title',
        'pub_text',
        'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'pub_id', 'user_id', 'created_at'],
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
      .then(dbPostData => {
        if (dbPostData) {
          const pub = dbPostData.get({ plain: true });
          
          res.render('edit', {
            pub,
            loggedIn: true
          });
        } else {
          res.status(404).end();
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
});

module.exports = router;
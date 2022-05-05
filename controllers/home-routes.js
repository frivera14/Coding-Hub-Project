const router = require('express').Router();
const { Pub, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Pub.findAll({
        attributes: [
            'id',
            'title',
            'pub_text',
            'created_at'
        ],
        order: [['created_at']],
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
        .then(userInfo => {

            const pubs = userInfo.map(pub => pub.get({ plain: true }))
            res.render('home', {
                pubs,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
});

router.get('/pub/:id', (req, res) => {
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
            if (!pubInfo) {
                res.status(400).json({ message: 'No publication found' });
                return;
            }

            const pub = pubInfo.get({ plain: true })

            res.render('publication', {
                pub,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;
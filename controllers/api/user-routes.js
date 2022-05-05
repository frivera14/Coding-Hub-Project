const router = require('express').Router();
const { User, Pub, Comment } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password']}
    })
    .then(userInfo => res.json(userInfo))
    .catch(err => {
        console.log(err)
        res.status(400).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
    attributes: { exclude: ['password']},
    where: {
        id: req.params.id
    },
    include: [
        {
            model: Pub,
            attributes: ['id', 'title', 'pub_text', 'created_at']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'created_at'],
            include: {
                model: Pub,
                attributes: ['title']
            }
        }
    ]
    })
    .then(userInfo => {
        if (!userInfo) {
            res.status(400).json({ message: 'No user found'})
            return;
        }
        res.json(userInfo);
    })
    .catch(err => {
        console.log(err)
        res.status(400).json(err);
    });
});

router.post('/', (req, res) => {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then((userInfo) => {
        req.session.save(() => {
          req.session.user_id = userInfo.id;
          req.session.username = userInfo.username;
          req.session.loggedIn = true;
  
          res.json(userInfo)
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.post('/login', (req, res) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(userInfo => {
      if (!userInfo) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }
  
      const validPassword = userInfo.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userInfo.id;
        req.session.username = userInfo.username;
        req.session.loggedIn = true;
  
        res.json({ user: userInfo, message: 'You are now logged in!' });
      });
    });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else{
      res.status(404).end();
    }
});

router.put('/:id', (req, res) => {
    User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      }
    })
      .then(userInfo => {
        if (!userInfo[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(userInfo);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.delete('/:id', (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  module.exports = router;
  





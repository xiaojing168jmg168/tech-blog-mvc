const router = require('express').Router();
const { Post, Comment, User } = require('../models');

//Import the auth middleware
// const withAuth = require('/utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
            attributes: [
                'id',
                'title',
                'content',
                'added_date'
               ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id','added_date'],
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
            const posts = dbPostData.map(post => post.get({ plain: true }));

            res.render('homepage',{ posts,  loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Get single post
router.get('/post/:id', (req,res) =>{
    Post.findOne({
    
      where: {id: req.params.id},
       attributes: [
                'id',
                'content',
                'title',
                'added_date'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'added_date'],
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
    }).then( postData => {

    if (postData) {
      // serialize the data
      const post = postData.get({ plain: true });
      // which view should we render for a single-post? - DONE!
      console.log(post);
      res.render('single-post', { post, loggedIn: req.session.loggedIn});
    }
})
    .catch(err =>{
           console.log(err);
            res.status(500).json(err);
       })
  
  
})




router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});



module.exports = router;
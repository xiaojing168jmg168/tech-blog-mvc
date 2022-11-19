const router = require('express').Router();

const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//Get all posts
router.get('/', withAuth, (req, res) => {
    Post.findAll({
            where: {
                user_id: req.session.user_id
                },
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
            res.render('dashboard',{ posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//Update post
router.get('/edit/:id',withAuth, (req,res)=>{
Post.findByPk(req.params.id)
  .then(dbPostData =>{
     if(!dbPostData){
        res.status(404).json({ message: 'No post found with this id' });
                return;
       }
       const post = dbPostData.get({plain:true});
       res.render("edit-post",{ post, loggedIn: true 
     })
    
     .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})
})

router.get('')

router.get('/new', (req, res) => {
    res.render('new-post');
});

module.exports = router;
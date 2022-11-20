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
console.log(req.session.loggedIn);
            res.render('homepage',{ posts,  loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

//Get single post
router.get('/post/:id', (req,res) =>{
    Post.findOne({
         where:{
           id:req.params.id
        },
         attributes:[
           'id',
           'content',
            'title',
            'added_date'
        ],
        include: [
          {
            model: User,
            attributes: ["username"],
          },
          {
            model: Comment,
            attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
            include: {
              model: User,
              attributes: ["username"],
            },
          },
    ]
    })
     .then(dbPostData =>{
       if(!dbPostData){
          res.status(404).json({message:"No post found with this id"});
          return;
         }
         const post = dbPostData.get({plain:true});
console.log(post);
        res.render('single-post', {post, loggedIn: true});
      })
       .catch(err =>{
       console.log(err);
       res.status(500).json(err);
       })
})
//Get comments
router.get('/post-comments', (req,res)=>{
    Post.findOne({
       where:{
          id: req.params.id
        },
       attributes:['id', 'content','title','added_date'],
       include:[{
           model: Comment,
           attributes:['id','comment_text', 'post_id','added_date'],
            include:{
              model:User,
              attributes:['username']    
             }

            },
            {
             model:User,
             attributes:['username']
              }
              ]
     })
      .then(dbPostData =>{
         if(!dbPostData){
        res.status(404).json({message:'No post found with this id'})
        return;
       }
       const post = dbPostData.get({plain:true});
       res.render('post-comments',{post,loggedIn:true});
      })
       .catch(err =>{
          console.log(err);
          res.status(500).json(err);
       })

})




module.exports = router;
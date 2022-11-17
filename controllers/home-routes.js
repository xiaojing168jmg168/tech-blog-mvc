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
               ],
            // include: [{
            //         model: Comment,
            //         attributes: ['id', 'comment_text', 'post_id', 'user_id'],
            //         include: {
            //             model: User,
            //             attributes: ['username']
            //         }
            //     },
            //     {
            //         model: User,
            //         attributes: ['username']
            //     }
            // ]
        })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('homepage',{ posts });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
const { Post } = require('../models');

const postData = [{
        title: 'Google product manager interview',
        content: 'Today, we’re going to cover everything you need to know to prepare for product manager interviews at Google.',
        user_id: 1

    },
    {
        title: 'Facebook / Meta software',
        content: 'Array and string questions are BY FAR the most common coding questions asked by Facebook, so you’ll want to make sure that you’re ready for them.',
        user_id: 2
    },
    {
        title: 'LResume, cover letter, and referrals',
        content: 'So take extra care to tailor your resume to the specific position.',
        user_id: 3
    }
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
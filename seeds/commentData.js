
const { Comment } = require('../models');

const commentData = [{
        comment_text: "I just learn this.",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "Here you go.",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "The current link item.",
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
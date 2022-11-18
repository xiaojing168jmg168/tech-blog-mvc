
const { Comment } = require('../models');

const commentData = [{
        comment_text: "I just learn this.",
        added_date: 'April 20, 2021 07:00:00',
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "Here you go.",
        added_date: 'June 20, 2022 08:00:00',
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "The current link item.",
        added_date: 'September 12, 2020 09:00:00',
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
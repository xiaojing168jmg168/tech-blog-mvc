const User = require('./User');
const Blog = require('./blog');
const Comment = require('./comment');

User.hasMany(Blog, {
  foreignKey: 'blog_id',
});

User.hasMany(Comment, {
  foreignKey: 'comment_id',
});

Blog.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});
module.exports = { User, Blog, Comment };

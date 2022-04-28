// importing User and Post models
const User = require('./User');
const Post = require('./Post')


// create association
User.hasMany(Post, {
    foreignKey: 'user_id'
})
// reverse association
Post.belongsTo(User, {
    foreignKey: 'user_id'
})


module.exports = { User, Post };

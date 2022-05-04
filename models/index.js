const Pub = require('./Pub');
const Comment = require('./Comment');
const User = require('./User');

User.hasMany(Pub, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Pub.hasMany(Comment, {
    foreignKey: 'pub_id'
});

Pub.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Pub, {
    foreignKey: 'pub_id'
});

module.exports = { User, Pub, Comment }
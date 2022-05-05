const Pub = require('./Pub');
const Comment = require('./Comment');
const User = require('./User');

User.hasMany(Pub, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Pub.hasMany(Comment, {
    foreignKey: 'pub_id'
});

Pub.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(Pub, {
    foreignKey: 'pub_id',
    onDelete: 'SET NULL'
});

module.exports = { User, Pub, Comment }
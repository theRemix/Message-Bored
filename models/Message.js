module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
    body: DataTypes.TEXT,
  }, {
    classMethods: {
      associate: function(models) {
        Message.belongsTo(models.User, {
          as: 'Author',
          foreignKey: 'author_id'
        });
        Message.belongsTo(models.Topic, {
          foreignKey: 'topic_id'
        });
      }
    }
  });

  return Message;
};

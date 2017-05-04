module.exports = function(sequelize, DataTypes) {
  var Topic = sequelize.define("Topic", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Topic.belongsTo(models.User, {
          foreignKey: 'created_by'
        });
      }
    }
  });

  return Topic;
};

module.exports = function(sequelize, DataTypes) {
  var Topic = sequelize.define("Topic", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        Topic.belongsTo(models.User, {
          foreignKey: {
            name: 'created_by',
            allowNull: false
          },
          as: 'Creator'
        });
      }
    }
  });

  return Topic;
};

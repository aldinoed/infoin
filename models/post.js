'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'author' // Ini optional, untuk memberi alias pada akses relasi
      });
    }
  }
  Post.init({
    user_id: DataTypes.INTEGER,
    post_title: DataTypes.STRING,
    post_content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
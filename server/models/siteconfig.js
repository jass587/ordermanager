'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SiteConfig extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SiteConfig.init({
    logo_url: DataTypes.TEXT,
    stripe_key: DataTypes.TEXT,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'SiteConfig',
  });
  return SiteConfig;
};
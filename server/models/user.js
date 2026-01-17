module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { isEmail: true },
      },

      password_hash: {
        type: DataTypes.STRING,
        // ✅ MUST be nullable for OAuth
        allowNull: true,
      },
      provider: {
        type: DataTypes.ENUM('local', 'google', 'github', 'twitter'),
        allowNull: false,
        defaultValue: 'local',
      },
      role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user',
      },
    },
    {
      tableName: 'Users',
      freezeTableName: true,
      timestamps: true,
    }
  );

  return User;
};

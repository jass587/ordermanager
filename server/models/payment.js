module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define("Payment", {
    orderId: { type: DataTypes.INTEGER, allowNull: true },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    method: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: "unpaid" },
    transactionId: { type: DataTypes.STRING, allowNull: false}
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.Order, { foreignKey: "orderId" });
  };

  return Payment;
};

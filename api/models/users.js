import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Users = sequelize.define(
    "users",
    {
      nama: {
        type: DataTypes.STRING,
        require: true,
      },
      username: {
        type: DataTypes.STRING,
        require: true,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        require: true,
      },
      whatsapp: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      lastLogin: {
        type: DataTypes.STRING,
      },
      refreshToken: {
        type: DataTypes.TEXT,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  );

  return Users;
};

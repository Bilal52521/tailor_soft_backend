import { DataTypes } from "sequelize";
import sequelize from "../db.js";
const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Users",
    timestamps: true,
  }
);

const createTable = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Users table has been created (if it didn't exist).");
  } catch (error) {
    console.error("Error creating Users table");
  }
};

// Call the function to create the table
createTable();

export default User;

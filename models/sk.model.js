import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const SK = sequelize.define(
  "sk",
  {
    c_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    c_cnic: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    c_mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "sk",
    timestamps: true,
  }
);

const createTable = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("SK table has been created (if it didn't exist).");
  } catch (error) {
    console.error("Error creating SK table");
  }
};

createTable();

export default SK;

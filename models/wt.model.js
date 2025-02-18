import { DataTypes } from "sequelize";
import sequelize from "../db.js ";

const WT = sequelize.define(
  "wt",
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
    tableName: "wt",
    timestamps: true,
  }
);

const createTable = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("WT table has been created (if it didn't exist).");
  } catch (error) {
    console.error("Error creating WT table:", error);
  }
};

createTable();

export default WT;

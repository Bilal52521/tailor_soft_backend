import { Sequelize } from "sequelize";


const sequelize = new Sequelize("tailordbtest", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,  
});


const validateConnection = async () => {
  try {

    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};


validateConnection();

export default sequelize;

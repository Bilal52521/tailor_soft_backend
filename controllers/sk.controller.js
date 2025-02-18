import SK from "../models/sk.model.js";

export const skGetAll = async (req, res, next) => {
  try {
    const customers = await SK.findAll();

    if (!customers || customers.length === 0) {
      return res.status(404).json({ message: "No customers found!" });
    }

    res.status(200).json({
      message: "Customers retrieved successfully!",
      customers,
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    next(error);
  }
};

export const skAddNew = async (req, res, next) => {
  try {
    const { c_name, c_cnic, c_mobile, bookno } = req.body;

    if (!c_name || !c_cnic || !c_mobile) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newCustomer = await SK.create({
      c_name,
      c_cnic,
      c_mobile,
      bookno, 
    });

    res.status(201).json({
      message: "Customer added successfully!",
      customer: newCustomer,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({
        message: "Duplicate CNIC detected. Customer already exists.",
      });
    } else {
      console.error("Error adding customer:", error);
      next(error);
    }
  }
};


export const skDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSK = await SK.destroy({ where: { id } });

    if (!deletedSK) {
      return res.status(404).json({ message: "Record not found!" });
    }

    res.status(200).json({ message: "Record deleted successfully!" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ message: "Error deleting customer", error });
  }
}



export const skUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { c_name, c_cnic, c_mobile, bookno } = req.body;

  
    if (!c_name && !c_cnic && !c_mobile && !bookno) {
      return res.status(400).json({ message: "At least one field is required to update!" });
    }

    const updatedSK = await SK.update(
      { c_name, c_cnic, c_mobile, bookno }, 
      { where: { id } }
    );

    if (updatedSK[0] === 0) { 
      return res.status(404).json({ message: "Record not found or no changes made!" });
    }

    res.status(200).json({ message: "Record updated successfully!" });
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ message: "Error updating customer", error });
  }
};

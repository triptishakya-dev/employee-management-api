import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postEmployee = async (req, res) => {
  try {
    const {
      empCode,
      fullName,
      officialEmail,
      department,
      designation,
      salary,
      joiningDate,
    } = req.body;

    if (
      !empCode ||
      !fullName ||
      !officialEmail ||
      !department ||
      !designation ||
    !salary ||
      !joiningDate
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // salary validation - salary should be greter then 0
    if (salary <= 0) {
      return res.status(400).json({ error: "Salary should be greater than 0" });
    }
    console.log("joiningDate", joiningDate);
    console.log("joiningDate", new Date(joiningDate));
    // joining date validation - joining date should not be past
    if (new Date(joiningDate) < new Date()) {
      return res.status(400).json({ error: "Joining date should not be past" });
    }

    // duplicate email validation
    const existingEmployee = await prisma.employee.findUnique({
      where: {
        officialEmail: officialEmail,
      },
    });
    if (existingEmployee) {
      return res
        .status(400)
        .json({ error: "Employee with this email already exists" });
    }

    const newEmployee = await prisma.employee.create({
      data: {
        empCode,
        fullName,
        officialEmail,
        department,
        designation,
        salary,
        joiningDate,
      },
    });

    return res.status(201).json({
      message: "Employee added sucessfully",
      postEmployee: newEmployee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    console.log(employees);
    res
      .status(200)
      .json({ message: "Employees fetched successfully", employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// delete api

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id.trim() === "") {
      return res.status(400).json({ error: "employee id is required" });
    }

    const existingEmployee = await prisma.employee.findUnique({
      where: { id: Number(id) },
    });

    if (!existingEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    await prisma.employee.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// update all field
  export const updateEmployee = async (req, res) => {
  try {
    console.log(req.params)
    const { id } = req.params;
    console.log(id)

    if (!id || id.trim() === "") {
      return res.status(400).json({ error: "Employee id is required" });
    }

    const existingEmployee = await prisma.employee.findUnique({
      where: { id: Number(id) },
    });

    if (!existingEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Update employee
    const updatedEmployee = await prisma.employee.update({
      where: { id: Number(id) },
      data: req.body,
    });

    return res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

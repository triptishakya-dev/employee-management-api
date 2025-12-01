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

    const newEmployee = await prisma.Employee.create({
      empCode,
      fullName,
      officialEmail,
      department,
      designation,
      salary,
      joiningDate,
    });

    return res.status(201).json({
      message: "Employee added sucessfully",
      postEmployee: newEmployee,
    });
  } catch (error) {
    console.log("error");
    res.status(500).json({ message: "Internal server error" });
  }
};

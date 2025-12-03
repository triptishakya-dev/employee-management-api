import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postAddress = async (req, res) => {
    console.log("api is running")
    console.log(req.body)
    try {
        const {
            types,
            street,
            city,
            state,
            pincode,
            country,
            employeeId
        } = req.body;
        




        // if (!types || !street || !city || !state || !pincode || !country || !employeeId) {
        //     return res.status(400).json({ error: "All fields are required" })
        // }

        const existingEmployee = await prisma.employee.findUnique({
            where: { id: Number(employeeId) },
        })


        if (!existingEmployee) {
            return res.status(404).json({ error: "Employee not found" })
        }


        const newAddress = await prisma.Address.create({
            data: {
                types,
                street,
                city,
                state,
                pincode,
                country,
                employeeId
            }
        })

        return res.status(201).json({ message: "Address added successfully", data: newAddress })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error" })
    }
}




export const getAddresses = async (req, res) => {
  try {
    const addresses = await prisma.Address .findMany();
    console.log(addresses);
    res
      .status(200)
      .json({ message: "Addresses fetched successfully", addresses });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

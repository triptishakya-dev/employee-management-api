import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postAddress = async (req, res) => {
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

        if (!types || !street || !city || !state || !pincode || !country || !employeeId) {
            return res.status(400).json({ error: "All fields are required" })
        }

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
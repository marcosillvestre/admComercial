
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import * as Yup from 'yup'
const prisma = new PrismaClient()

class UserController {
    async store(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
            role: Yup.string().required(),
            unity: Yup.array().required(),
            admin: Yup.boolean(),
        })

        try {
            await schema.validateSync(req.body, { abortEarly: false })
        } catch (err) {
            return res.status(400).json({ error: "Erro nos dados enviados" })
        }


        const { name, email, password, admin, role, unity } = req.body

        const password_hash = await bcrypt.hash(password, 10)

        try {
            const userExists = await prisma.login.findMany({ where: { email: email } })
            if (userExists.length === 0) {
                await prisma.login.create({
                    data: {
                        "name": name,
                        "email": email.toLowerCase(),
                        "password": password_hash,
                        "role": role,
                        "admin": admin,
                        "unity": unity
                    }
                })
            }

        } catch (error) {
            console.log(error)
            return res.status(401).json({ error })
        }
        return res.status(201).json({ name, email })
    }

    async index(req, res) {
        const userExists = await prisma.login.findMany()
        return res.status(200).json(userExists)
    }

    async delete(req, res) {
        const { id } = req.params
        const int = parseInt(id)
        if (int) {
            await prisma.login.delete({ where: { id: int } })
            return res.sendStatus(204);
        } else {
            return res.status(400).json({ message: "falta algo" })
        }
    }


}

export default new UserController()
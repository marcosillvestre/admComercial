
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
            admin: Yup.boolean(),
        })

        try {
            await schema.validateSync(req.body, { abortEarly: false })
        } catch (err) {
            return res.status(400).json({ error: "Erro nos dados enviados" })
        }


        const { name, email, password, admin } = req.body

        const password_hash = await bcrypt.hash(password, 10)

        try {
            const userExists = await prisma.login.findMany({ where: { email: email } })
            if (userExists.length === 0) {
                await prisma.login.create({
                    data: {
                        "name": name,
                        "email": email,
                        "password": password_hash,
                        "admin": admin
                    }
                }).then(res => console.log(res))
                return res.status(201).json({ name, email })
            }

        } catch (error) {
            return res.status(400).json({ error })
        }
    }

}

export default new UserController()
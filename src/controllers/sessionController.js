import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import * as Yup from 'yup'


const prisma = new PrismaClient()

class SessionsController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: "Tem alguma coisa faltando" })
        }
        const { email, password } = req.body

        const user = await prisma.login.findMany({ where: { email: email } })

        if (user.length === 0) {
            return res.status(401).json({ message: "Tem alguma coisa errada, verifique seus dados" })
        }

        const isLogged = await bcrypt.compare(password, user[0].password)

        if (!isLogged) {
            return res.status(401).json({ message: "Verifique seus dados" })
        }


        return res.status(200).json({
            data: {
                name: user[0].name,
                admin: user[0].admin,
                token: jwt.sign({ id: user[0].id, name: user[0].name }, process.env.JWT_SECRET,
                    { expiresIn: process.env.EXPIRES_IN })
            }
        })
    }
}

export default new SessionsController()
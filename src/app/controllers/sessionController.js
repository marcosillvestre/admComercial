import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import * as Yup from 'yup'

const prisma = new PrismaClient()

class SessionsController {

    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().required(),
            password: Yup.string().required(),
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: "Tem alguma coisa faltando" })
        }
        const { email, password } = req.body
        const lowerEmail = email.toLowerCase()

        const user = await prisma.login.findMany({ where: { email: lowerEmail } })

        if (user.length === 0) {
            return res.status(401).json({ message: "Tem alguma coisa errada, verifique seus dados" })
        }

        const isLogged = await bcrypt.compare(password, user[0].password)

        if (!isLogged) {
            return res.status(401).json({ message: "Verifique seus dados" })
        }


        return res.status(200).json({
            name: user[0].name,
            admin: user[0].admin,
            role: user[0].role,
            unity: user[0].unity,
            token: jwt.sign({ id: user[0].id, name: user[0].name }, process.env.JWT_SECRET,
                { expiresIn: process.env.EXPIRES_IN })

        })
    }

    async forgetPassword(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().required()
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: "Tem alguma coisa faltando" })
        }
        const { email } = req.body
        const lowerEmail = email.toLowerCase()

        const user = await prisma.login.findMany({ where: { email: lowerEmail } })

        if (user.length === 0) {
            return res.status(401).json({ message: "Nenhum usuário encontrado com esse Email" })
        }

        const email_hash = await bcrypt.hash(email, 1)


        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: "marcos.vinicius7170@gmail.com",
                    pass: "krau svuh tgdv uumr"
                }
            })

            transporter.sendMail({
                from: "Marcos vinicius <marcos.vinicius7170@gmail.com>",
                to: email,
                subject: `Recuperação de Senha: ${email_hash}`,
                text: "Deu good",
                html: "<h2>Esqueceu a senha?</h2> <p>Preencha o link com o código acima. Clique no link abaixo para redefini-la <a href=`https://controlecomercial.vercel.app/controle-comercial`>Clique aqui</a>"
            })

            return res.status(200).json({ message: "Sucesso" })
        } catch (error) {
            if (error) {
                console.log(error)
            }
            return res.status(401).json({ error })

        }



    }

    async redefinePassword(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().required(),
            code: Yup.string().required(),
            newPassword: Yup.string().required()
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: "Tem alguma coisa faltando" })
        }

        const { email, newPassword, code } = req.body
        const lowerEmail = email.toLowerCase()

        const user = await prisma.login.findMany({ where: { email: lowerEmail } })

        if (user.length === 0) {
            return res.status(401).json({ message: "Tem alguma coisa errada, verifique seus dados" })
        }

        const isLogged = await bcrypt.compare(email, code)

        if (isLogged) {
            try {
                await prisma.login.update({
                    where: { email: lowerEmail },
                    data: {
                        password: await bcrypt.hash(newPassword, 10)
                    }
                })
                return res.status(200).json({ message: "Senha alterada com sucesso" })

            } catch (error) {
                return res.status(200).json({ error })
            }
        } else {
            return res.status(401).json({ message: "Codigo invalido ou expirado" })
        }
    }
}

export default new SessionsController()
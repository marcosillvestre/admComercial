
import { PrismaClient } from '@prisma/client'
import * as Yup from 'yup'
const prisma = new PrismaClient()

class UnityController {

    async storeUnities(req, res) {
        const schema = Yup.object().shape({ name: Yup.string().required() })

        try {
            await schema.validateSync(req.body, { abortEarly: false })
        } catch (err) {
            return res.status(400).json({ error: "Erro nos dados enviados" })
        }

        const { name } = req.body;


        try {
            const userExists = await prisma.unities.findMany({ where: { name: name } })
            if (userExists.length === 0) {
                await prisma.unities.create({
                    data: { "name": name }
                })
            }

        } catch (error) {
            return res.status(401).json({ error })
        }
        return res.status(201).json({ data: "Unidade adicionada com sucesso" })
    }

    async unities(req, res) {
        const findAll = await prisma.unities.findMany()
        return res.status(200).json(findAll)
    }

    async deleteUnities(req, res) {
        const { id } = req.params
        await prisma.unities.delete({ where: { id: id } })
            .then(() => {
                return res.status(201).json({ message: "deletado com sucesso" })
            })
    }
}

export default new UnityController()


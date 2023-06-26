import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


class PostController {
    async store(req, res) {

        const { data: { id, name, owner } } = req.body

        await prisma.post.create({
            data: {
                "id": id,
                "name": name,
                "owner": owner.name
            }
        })

        return res.status(201).json({ message: "deu" })

    }

    async index(req, res) {
        const findAll = await prisma.post.findMany()
        return res.status(200).json(findAll)
    }
}

export default new PostController()
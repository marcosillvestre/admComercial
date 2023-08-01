import { PrismaClient } from "@prisma/client";
import "dotenv/config";
const prisma = new PrismaClient()
class PostController {


    async index(req, res) {
        const findAll = await prisma.person.findMany()
        return res.status(200).json(findAll)
    }

    async sender(req, res) {
        const str = JSON.stringify(req.body)
        const obj = JSON.parse(str)

        const name1 = obj['partes[0][nome]']?.split(" ")[0]
        const email1 = obj['partes[0][email]']
        const signed1 = obj['partes[0][assinado][created]']?.split(" ")[0]

        const name2 = obj['partes[1][nome]']?.split(" ")[0]
        const email2 = obj['partes[1][email]']
        const signed2 = obj['partes[1][assinado][created]']?.split(" ")[0]

        const name3 = obj['partes[2][nome]']?.split(" ")[0]
        const email3 = obj['partes[2][email]']
        const signed3 = obj['partes[2][assinado][created]']?.split(" ")[0]

        const name4 = obj['partes[3][nome]']?.split(" ")[0]
        const email4 = obj['partes[3][email]']
        const signed4 = obj['partes[3][assinado][created]']?.split(" ")[0]


        const body1 = {
            name1,
            email1,
            signed1,
        }
        const body2 = {
            name2,
            email2,
            signed2,
        }
        const body3 = {
            name3,
            email3,
            signed3,
        }
        const body4 = {
            name4,
            email4,
            signed4,
        }

        const Status = {
            body1, body2, body3, body4
        }
        console.log(Status)
        const newArr = []

        await prisma.person.findFirst({ where: { email: email1 } }).then(async res => {

            newArr.push(Status)


            await prisma.person.update({
                where: { contrato: res.contrato },
                data: {
                    "dataAC": newArr
                }
            }).then(() => console.log("Success"))
        })

        return res.status(200).json({ message: "funcinou" })
    }

    async update(req, res) {
        const { area, value, day, responsible } = req.body
        const { id } = req.params


        await prisma.person.update({
            where: { contrato: id },
            data: {
                [area]: value,
                dataValidacao: day,
                responsavelADM: responsible

            }
        }).then(() => {
            return res.status(200).json("Success")
        }).catch(() => {
            return res.status(200).json("Error")
        }
        )


    }
    async delete(req, res) {
        const { id } = req.params
        await prisma.person.delete({ where: { contrato: id } })
            .then(() => {
                return res.status(201).json({ message: "deletado com sucesso" })
            })

    }
}

export default new PostController()



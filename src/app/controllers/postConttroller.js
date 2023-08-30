import { PrismaClient } from "@prisma/client";
import axios from 'axios';
import { funis } from "../../utils/funnels.js";
import { stages } from "../../utils/stage.js";
const prisma = new PrismaClient()
const sstartDate = new Date()
sstartDate.setDate(sstartDate.getDate() - 1)
const startDate = sstartDate.toISOString()
const eendDate = new Date()
const endDate = eendDate.toISOString()
class PostController {

    async getRecent(req, res) {
        const { unity } = req.params

        await axios.get(`https://crm.rdstation.com/api/v1/deals?token=${process.env.RD_TOKEN}&deal_pipeline_id=${funis[unity]}&deal_stage_id=${stages[unity]}`)
            .then(response => {
                const array = []
                for (const index of response?.data?.deals) {
                    const body = {
                        vendedor: index.user.name,
                        contrato: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Nº do contrato')).map(res => res.value)[0],
                        dataMatricula: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de emissão da venda')).map(res => res.value)[0],
                        classe: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Classe')).map(res => res.value)[0],
                        unidade: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Unidade')).map(res => res.value)[0],
                        tipoModalidade: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Tipo/ modalidade')).map(res => res.value)[0],
                        name: index.name,
                        rg: index.deal_custom_fields.filter(res => res.custom_field.label.includes('RG responsável')).map(res => res.value)[0],
                        cpf: index.deal_custom_fields.filter(res => res.custom_field.label.includes('CPF')).map(res => res.value)[0],
                        DatadeNascdoResp: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de nascimento do  responsável')).map(res => res.value)[0],
                        CelularResponsavel: index.contacts[0]?.phones[0]?.phone,
                        EnderecoResponsavel: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Endereço')).map(res => res.value)[0],
                        NumeroEnderecoResponsavel: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Número')).map(res => res.value)[0],
                        complemento: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Complemento')).map(res => res.value)[0],
                        bairro: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Bairro')).map(res => res.value)[0],
                        cidade: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Cidade')).map(res => res.value)[0],
                        estado: index.deal_custom_fields.filter(res => res.custom_field.label === 'UF').map(res => res.value)[0],
                        cep: index.deal_custom_fields.filter(res => res.custom_field.label.includes('CEP')).map(res => res.value)[0],
                        estadoCivil: index.deal_custom_fields.filter(res => res.custom_field.label === 'Estado civil responsável').map(res => res.value)[0],
                        profissao: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Profissão')).map(res => res.value)[0],
                        email: index.contacts[0]?.emails[0]?.email,
                        nomeAluno: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Nome do aluno')).map(res => res.value)[0],
                        nascimentoAluno: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de nascimento do aluno')).map(res => res.value)[0],
                        formato: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Formato de Aula')).map(res => res.value)[0],
                        tipoModalidade: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Tipo/ modalidade')).map(res => res.value)[0],
                        classe: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Classe')).map(res => res.value)[0],
                        subclasse: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Subclasse')).map(res => res.value)[0],
                        cargaHoraria: `${index.deal_custom_fields.filter(res => res.custom_field.label.includes('Carga horário do curso')).map(res => res.value)}`,
                        paDATA: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data da primeira aula')).map(res => res.value)[0],
                        valorMensalidade: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Valor total da parcela')).map(res => res.value)[0],
                        numeroParcelas: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Número de parcelas')).map(res => res.value)[0],
                        diaVenvimento: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de vencimento da primeira parcela')).map(res => res.value)[0],
                        dataPrimeiraParcelaMensalidade: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de vencimento da primeira parcela')).map(res => res.value)[0],
                        dataUltimaParcelaMensalidade: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de vencimento da última parcela')).map(res => res.value)[0],
                        descontoTotal: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Desconto total')).map(res => res.value)[0],
                        descontoPorParcela: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Valor do desconto de pontualidade por parcela')).map(res => res.value)[0],
                        valorParcela: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Valor total da parcela')).map(res => res.value)[0],
                        testemunha1: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Testemunha 01')).map(res => res.value)[0],
                        testemunha2: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Testemunha 2')).map(res => res.value)[0],
                        curso: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Curso')).map(res => res.value)[0],
                        valorCurso: index.deal_products[0]?.total
                    }
                    array.push(body)
                }
                return res.status(200).json(array)

            })

    }

    async index(req, res) {
        const findAll = await prisma.person.findMany()
        return res.status(200).json(findAll)
    }

    async sender(req, res) {
        const str = JSON.stringify(req.body)
        const obj = JSON.parse(str)

        const name1 = obj['partes[0][nome]']?.split(" ")[0]
        const email1 = obj['partes[0][email]']
        const signed1 = obj['partes[0][assinado][created]']?.split("+")[0]

        const name2 = obj['partes[1][nome]']?.split(" ")[0]
        const email2 = obj['partes[1][email]']
        const signed2 = obj['partes[1][assinado][created]']?.split("+")[0]

        const name3 = obj['partes[2][nome]']?.split(" ")[0]
        const email3 = obj['partes[2][email]']
        const signed3 = obj['partes[2][assinado][created]']?.split("+")[0]

        const name4 = obj['partes[3][nome]']?.split(" ")[0]
        const email4 = obj['partes[3][email]']
        const signed4 = obj['partes[3][assinado][created]']?.split("+")[0]


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
        const newArr = []

        await prisma.person.findFirst({ where: { email: email1 } }).then(async res => {

            newArr.push(Status)
            try {
                await prisma.person.update({
                    where: { contrato: res.contrato },
                    data: {
                        "dataAC": newArr
                    }
                }).then(() => console.log("Success"))

            } catch (error) {
                if (error) {
                    console.log("Something went wrong")
                }
            }
        })

        return res.status(200).json({ message: "worked" })
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

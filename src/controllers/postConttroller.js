import { PrismaClient } from "@prisma/client";
import axios from "axios";
import "dotenv/config";
const prisma = new PrismaClient()

class PostController {
    async store(req, res) {

        const { data: { id } } = req.body

        const headers = {
            'content-type': "application/json",
            "Authorization": `Token ${process.env.AGENDOR_TOKEN}`
        }


        await axios.get(`https://api.agendor.com.br/v3/deals/${id}?withCustomFields=true`, { headers })
            .then(async res => {
                await prisma.person.create({
                    data: {
                        "name": res.data.data.person.name,
                        "id": res.data.data.id,
                        "owner": res.data.data.owner.name,
                        "aluno": res.data.data.customFields.nome_do_aluno,
                        "unidade": res.data.data.customFields.unidade?.value,
                        "contrato": res.data.data.customFields.n_do_contrato,
                        "background": res.data.data.customFields.background_do_aluno?.value,
                        "classe": res.data.data.customFields.classe?.value,
                        "subclasse": res.data.data.customFields.subclasse?.value,
                        "tmStatus": "Pendente",
                        "tmVencimento": res.data.data.customFields.tm_data_de_pagamento,
                        "tmValor": res.data.data.customFields.tm_valor_ex_150_00,
                        "ppVencimento": res.data.data.customFields.data_de_vencimento_da_primeira,
                        "ppStatus": "Pendente",
                        "mdValor": res.data.data.customFields.md_valor_ex_300_00,
                        "mdStatus": "Pendente",
                        "acStatus": "Pendente",
                        "acFormato": res.data.data.customFields.metodo_de_assinatura?.value,
                        "Valor": res.data.data?.value,
                        "tipoMatricula": "Pendente",
                        "tipoComissao": "Pendente",
                        "comissaoValor": "Pendente",
                        "aprovacaoADM": "Pendente",
                        "responsavelADM": "Pendente",
                        "aprovacaoDirecao": "Pendente",
                        "diretorResponsavel": "Pendente",
                        "dataAC": "Pendente",
                        "paDATA": res.data.data.customFields.data_da_primeira_aula,
                        "inicioContrato": res.data.data.customFields.data_de_vencimento_da_primeira,
                        "fimContrato": res.data.data.customFields.data_de_vencimento_da_ultima_p,
                        "tel": res.data.data.person.contact.mobile,
                        "email": res.data.data.person.email,
                        "situMatric": "Pendente",
                        "paStatus": "Pendente"
                    }
                })

            })

        return res.status(201).json({ message: "deu" })

    }

    async index(req, res) {
        const findAll = await prisma.person.findMany()
        return res.status(200).json(findAll)
    }

    async sender(req, res) {
        // console.log(res)
        // console.log(req.body)
        console.log(req)
        // console.log(partes.map(res => res.assinado))
        return res.status(200).json({ message: "deu" })
    }

    async update(req, res) {
        const {
            paStatus, situMatric, mdStatus,
            tmStatus, ppStatus, acStatus, tipoMatricula, tipoComissao,
            comissaoValor, aprovacaoADM, aprovacaoDirecao, diretorResponsavel,
            dataAC, paDATA, responsavelADM,
            area, value
        } = req.body

        const id = req.params.id

        if (id) {
            if (area === "acStatus") {
                await prisma.person.update({
                    where: { contrato: id },
                    data: {
                        "acStatus": value
                    }
                })
            }
            if (area === "tmStatus") {
                await prisma.person.update({
                    where: { contrato: id },
                    data: {
                        "tmStatus": value
                    }
                })
            }
            if (area === "ppStatus") {
                await prisma.person.update({
                    where: { contrato: id },
                    data: {
                        "ppStatus": value
                    }
                })
            }
            if (area === "tipoMatricula") {
                await prisma.person.update({
                    where: { contrato: id },
                    data: {
                        "tipoMatricula": value
                    }
                })
            }
            if (area === "tipoComissao") {
                await prisma.person.update({
                    where: { contrato: id },
                    data: {
                        "tipoComissao": value
                    }
                })
            }
            if (area === "comissaoValor") {
                await prisma.person.update({
                    where: { contrato: id },
                    data: {
                        "comissaoValor": value
                    }
                })
            }
            if (area === "aprovacaoADM") {
                await prisma.person.update({
                    where: { contrato: id },
                    data: {
                        "aprovacaoADM": value
                    }
                })
            }
            if (area === "aprovacaoDirecao") {
                await prisma.person.update({
                    where: { contrato: id },
                    data: {
                        "aprovacaoDirecao": value
                    }
                })
            }
            if (area === "diretorResponsavel") {
                await prisma.person.update({
                    where: { contrato: id },
                    data: {
                        "diretorResponsavel": value
                    }
                })
            }
            if (area === "dataAC") {
                await prisma.person.update({
                    where: { contrato: id },
                    data: {
                        "dataAC": value
                    }
                })
            }
            if (area === "paDATA") {
                await prisma.person.update({
                    where: { contrato: id },
                    data: {
                        "paDATA": value
                    }
                })
            }
            if (area === "responsavelADM") {
                await prisma.person.update({
                    where: { contrato: id },
                    data: {
                        "responsavelADM": value
                    }
                })
            }
            if (area === "situMatric") {
                await prisma.person.update({
                    where: { contrato: id },
                    data: {
                        "situMatric": value
                    }
                })
            }
            if (area === "paStatus") {
                await prisma.person.update({
                    where: { contrato: id },
                    data: {
                        "paStatus": value
                    }
                })
            }
            if (area === "mdStatus") {
                await prisma.person.update({
                    where: { contrato: id },
                    data: {
                        "mdStatus": value
                    }
                })
            }
        }

        if (id) {
            await prisma.person.update({
                where: { contrato: id },
                data: {
                    "tmStatus": tmStatus,
                    "ppStatus": ppStatus,
                    "acStatus": acStatus,
                    "tipoMatricula": tipoMatricula,
                    "tipoComissao": tipoComissao,
                    "comissaoValor": comissaoValor,
                    "aprovacaoADM": aprovacaoADM,
                    "aprovacaoDirecao": aprovacaoDirecao,
                    "diretorResponsavel": diretorResponsavel,
                    "dataAC": dataAC,
                    "paDATA": paDATA,
                    "responsavelADM": responsavelADM,
                    "situMatric": situMatric,
                    "paStatus": paStatus,
                    "mdStatus": mdStatus
                }
            }).then(() => {
                return res.status(200).json({ message: "Atualizado com sucesso" })
            })
        } else {
            return res.status(400).json({ message: "Tem alguma coisa faltando" })
        }
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
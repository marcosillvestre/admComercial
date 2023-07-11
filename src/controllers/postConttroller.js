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
                        "tmStatus": "",
                        "tmVencimento": res.data.data.customFields.tm_data_de_pagamento,
                        "tmValor": res.data.data.customFields.tm_valor_ex_150_00,
                        "ppVencimento": res.data.data.customFields.data_de_vencimento_da_primeira,
                        "ppStatus": "",
                        "mdValor": res.data.data.customFields.md_valor_ex_300_00,
                        "mdStatus": "",
                        "acStatus": "",
                        "acFormato": res.data.data.customFields.metodo_de_assinatura?.value,
                        "Valor": res.data.data?.value,
                        "tipoMatricula": "",
                        "tipoComissao": "",
                        "comissaoValor": "",
                        "aprovacaoADM": "",
                        "responsavelADM": "",
                        "aprovacaoDirecao": "",
                        "diretorResponsavel": "",
                        "dataAC": "",
                        "paDATA": res.data.data.customFields.data_da_primeira_aula,
                        "inicioContrato": res.data.data.customFields.data_de_vencimento_da_primeira,
                        "fimContrato": res.data.data.customFields.data_de_vencimento_da_ultima_p,
                        "tel": res.data.data.person.contact.mobile,
                        "email": res.data.data.person.email,
                        "situMatric": "",
                        "paStatus": ""
                    }
                })

            })

        return res.status(201).json({ message: "deu" })

    }

    async index(req, res) {
        const findAll = await prisma.person.findMany()
        return res.status(200).json(findAll)
    }


    async update(req, res) {
        const { paStatus, situMatric, mdStatus,
            tmStatus, ppStatus, acStatus, tipoMatricula, tipoComissao,
            comissaoValor, aprovacaoADM, aprovacaoDirecao, diretorResponsavel,
            dataAC, paDATA, responsavelADM,
        } = req.body

        const id = req.params.id

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
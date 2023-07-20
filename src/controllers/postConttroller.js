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
                        "owner": res.data.data.owner.name,
                        "unidade": res.data.data.customFields.unidade.value,
                        "background": res.data.data.customFields.background_do_aluno.value,
                        "tipoMatricula": "Pendente",
                        "tipoComissao": "Pendente",
                        "comissaoValor": "Pendente",
                        "diretorResponsavel": "Pendente",
                        "Valor": res.data.data.value,
                        "id": res.data.data.id,
                        "situMatric": "Pendente",
                        "paStatus": "Pendente",


                        "responsavelADM": "Pendente",
                        "aprovacaoADM": "Pendente",
                        "aprovacaoDirecao": "Pendente",
                        "contrato": res.data.data.customFields.n_do_contrato,
                        "inicioContrato": res.data.data.customFields.data_de_vencimento_da_primeira,
                        "fimContrato": res.data.data.customFields.data_de_vencimento_da_ultima_p,
                        "acFormato": res.data.data.customFields.metodo_de_assinatura.value,
                        "acStatus": "Pendente",
                        "tmValor": res.data.data.customFields.tm_valor_ex_150_00,
                        "tmVencimento": res.data.data.customFields.tm_data_de_pagamento,
                        "tmStatus": "Pendente",
                        "ppVencimento": res.data.data.customFields.data_de_vencimento_da_primeira,
                        "mdValor": res.data.data.customFields.md_valor_ex_300_00,
                        "mdStatus": "Pendente",
                        "aluno": res.data.data.customFields.nome_do_aluno,
                        "tel": res.data.data.person.contact.mobile,
                        "email": res.data.data.person.email,
                        "paDATA": res.data.data.customFields.data_da_primeira_aula,
                        "classe": res.data.data.customFields.classe?.value,
                        "subclasse": res.data.data.customFields.subclasse?.value,
                        "ppStatus": "Pendente",


                        "dataAC": "",
                        "formatoAula": res.data.data.customFields.formato_de_aula.value,
                        "tipoModalidade": res.data.data.customFields.tipo_modalidade.value,
                        "professor": res.data.data.customFields.professor.map(res => res.value),
                        "horarioFim": res.data.data.customFields.horario_de_inicio_ex_9_00,

                        "horarioInicio": res.data.data.customFields.horario_do_fim_ex_10_00,
                        "materialDidatico": res.data.data.customFields.material_didatico.map(res => res.value),
                        "nivelamento": res.data.data.customFields.precisa_de_nivelamento.value,
                        "diaAula": res.data.data.customFields.dia_de_aula.map(res => res.value),
                        "alunoNascimento": res.data.data.customFields.data_de_nascimento_do_aluno,
                        "idadeAluno": `${res.data.data.customFields.idade_do_aluno}`,
                        "tempoContrato": "",
                        "dataMatricula": res.data.data.customFields.data_de_emissao_da_venda,
                        "observacao": "",
                        "dataValidacao": "",
                        "dataComissionamento": "",
                        "contratoStatus": "",
                        "cargaHoraria": `${res.data.data.customFields.carga_horaria_do_curso}`,
                        "tmDesconto": "res.data.data.customFields",
                        "tmFormaPg": res.data.data.customFields.tm_forma_de_pagamento.value,
                        "tmParcelas": "",
                        "tmData": "",
                        "ppDesconto": "res.data.data.customFields",
                        "ppFormaPg": res.data.data.customFields.parcela_forma_de_pagamento.value,
                        "ppParcelas": res.data.data.customFields.n_de_parcelas.value,
                        "ppData": "",
                        "ppValor": res.data.data.customFields.valor_da_primeira_parcela,
                        "mdDesconto": "res.data.data.customFields",
                        "mdFormaPg": res.data.data.customFields.md_forma_de_pagamento.value,
                        "mdParcelas": "res.data.data.customFields",
                        "mdData": "",
                        "mdVencimento": res.data.data.customFields.md_data_de_pagamento

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


        const Status = JSON.stringify({
            name1,
            email1,
            signed1,

            name2,
            email2,
            signed2,

            name3,
            email3,
            signed3,

            name4,
            email4,
            signed4,
        })

        const newArr = []

        await prisma.person.findFirst({ where: { email: email1 }, }).then(async res => {

            if (res.acStatus.length < 5) {
                newArr.push(Status)
            }

            const ac = (newArr[0])

            await prisma.person.update({
                where: { contrato: res.contrato },
                data: {
                    "acStatus": ac
                }
            }).then(res => console.log(res))


        })

        return res.status(200).json({ message: "funcinou" })
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




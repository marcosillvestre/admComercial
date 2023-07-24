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

        const obj = "Pendente"
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


                        "dataAC": { set: obj },
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
                        "contratoStatus": "Pendente",
                        "cargaHoraria": `${res.data.data.customFields.carga_horaria_do_curso}`,
                        "tmDesconto": "",
                        "tmFormaPg": res.data.data.customFields.tm_forma_de_pagamento.value,
                        "tmParcelas": "",
                        "tmData": "",
                        "ppDesconto": "",
                        "ppFormaPg": res.data.data.customFields.parcela_forma_de_pagamento.value,
                        "ppParcelas": res.data.data.customFields.n_de_parcelas.value,
                        "ppData": "",
                        "ppValor": res.data.data.customFields.valor_da_primeira_parcela,
                        "mdDesconto": "res.data.data.customFields",
                        "mdFormaPg": res.data.data.customFields.md_forma_de_pagamento.value,
                        "mdParcelas": "res.data.data.customFields",
                        "mdData": "",
                        "mdVencimento": res.data.data.customFields.md_data_de_pagamento,
                        "comissaoStatus": "Pendente"
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
            console.log(res)
            // if (res.dataAC) {
            //     newArr.push(Status)
            // }

            // await prisma.person.update({
            //     where: { contrato: res.contrato },
            //     data: {
            //         "dataAC": newArr
            //     }
            // }).then(() => console.log("Success"))
        })

        return res.status(200).json({ message: "funcinou" })
    }

    async update(req, res) {
        const { area, value } = req.body
        const { id } = req.params


        await prisma.person.update({
            where: { contrato: id },
            data: {
                [area]: value
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



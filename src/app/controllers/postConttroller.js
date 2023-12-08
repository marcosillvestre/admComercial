import { PrismaClient } from "@prisma/client";
import axios from 'axios';
import "dotenv/config";
import { funis } from "../../utils/funnels.js";
import { stages } from "../../utils/stage.js";

const prisma = new PrismaClient()

const limit = 200
const comebackDays = 3

const backDay = new Date()
backDay.setDate(backDay.getDate() - comebackDays)
const startDate = backDay.toISOString()

const currentDate = new Date()
const endDate = currentDate.toISOString()

const options = { method: 'GET', headers: { accept: 'application/json' } };


class PostController {

    async searchSync(req, res) {

        await axios.get(`https://crm.rdstation.com/api/v1/deals?limit=${limit}&token=${process.env.RD_TOKEN}&win=true&closed_at_period=true&start_date=${startDate}&end_date=${endDate}`, options)
            .then(async response => {
                if (response.data.total > 0) {
                    const array = []
                    for (const index of response?.data?.deals) {

                        const body = {
                            name: index.name ? index.name : "Sem este dado no rd",
                            owner: index.user.name ? index.user.name : "Sem este dado no rd",

                            unidade: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Unidade')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Unidade')).map(res => res.value)[0] : "Sem este dado no rd",
                            background: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Background')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Background')).map(res => res.value)[0] : "Sem este dado no rd",
                            tipoMatricula: "Pendente",
                            tipoComissao: "Pendente",
                            comissaoValor: "Pendente",
                            diretorResponsavel: "Pendente",
                            Valor: index.amount_total ? index.amount_total : 0.0,
                            id: 1,
                            situMatric: "Pendente",
                            paStatus: "Pendente",


                            responsavelADM: "Pendente",
                            aprovacaoADM: "Pendente",
                            aprovacaoDirecao: "Pendente",
                            contrato: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Nº do contrato')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Nº do contrato')).map(res => res.value)[0] : "Sem este dado no rd",
                            inicioContrato: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de início do contrato')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de início do contrato')).map(res => res.value)[0] : "Sem este dado no rd",
                            fimContrato: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de fim do contrato')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de fim do contrato')).map(res => res.value)[0] : "Sem este dado no rd",
                            acFormato: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Tipo de assinatura')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Tipo de assinatura')).map(res => res.value)[0] : "Sem este dado no rd",
                            acStatus: "Pendente",

                            tmValor: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Valor de taxa de matrícula')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Valor de taxa de matrícula')).map(res => res.value)[0] : "Sem este dado no rd",
                            tmFormaPg: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Forma de pagamento TM')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Forma de pagamento TM')).map(res => res.value)[0] : "Sem este dado no rd",
                            tmVencimento: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de pagamento TM')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de pagamento TM')).map(res => res.value)[0] : "Sem este dado no rd",

                            tmStatus: "Pendente",
                            ppVencimento: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de vencimento da primeira parcela')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de vencimento da primeira parcela')).map(res => res.value)[0] : "Sem este dado no rd",

                            mdValor: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Valor do material didático')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Valor do material didático')).map(res => res.value)[0] : "Sem este dado no rd",
                            mdStatus: "Pendente",
                            aluno: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Nome do aluno')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Nome do aluno')).map(res => res.value)[0] : "Sem este dado no rd",
                            tel: index.contacts.map(res => res.phones).map(res => res[0]?.phone)[0] ? index.contacts.map(res => res.phones).map(res => res[0]?.phone)[0] : "Sem este dado no rd",
                            email: index.contacts.map(res => res.emails).map(res => res[0]?.email)[0] ? index.contacts.map(res => res.emails).map(res => res[0]?.email)[0] : "Sem este dado no rd",
                            paDATA: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data da primeira aula')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data da primeira aula')).map(res => res.value)[0] : "Sem este dado no rd",
                            classe: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Classe')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Classe')).map(res => res.value)[0] : "Sem este dado no rd",
                            subclasse: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Subclasse')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Subclasse')).map(res => res.value)[0] : "Sem este dado no rd",
                            ppStatus: "Pendente",

                            formatoAula: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Formato de Aula')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Formato de Aula')).map(res => res.value)[0] : "Sem este dado no rd",
                            tipoModalidade: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Tipo/ modalidade')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Tipo/ modalidade')).map(res => res.value)[0] : "Sem este dado no rd",
                            professor: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Professor')).map(res => res.value) ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Professor')).map(res => res.value) : "Sem este dado no rd",

                            horarioFim: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Horário de fim')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Horário de fim')).map(res => res.value)[0] : "Sem este dado no rd",
                            horarioInicio: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Horário de Inicio')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Horário de Inicio')).map(res => res.value)[0] : "Sem este dado no rd",

                            materialDidatico: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Material didático')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Material didático')).map(res => res.value)[0] : "Sem este dado no rd",
                            nivelamento: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Precisa de nivelamento?')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Precisa de nivelamento?')).map(res => res.value)[0] : "Sem este dado no rd",
                            diaAula: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Dia de aula')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Dia de aula')).map(res => res.value)[0] : "Sem este dado no rd",
                            alunoNascimento: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de nascimento do aluno')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de nascimento do aluno')).map(res => res.value)[0] : "Sem este dado no rd",
                            idadeAluno: `${index.deal_custom_fields.filter(res => res.custom_field.label.includes('Idade do Aluno')).map(res => res.value)}`,
                            tempoContrato: "",
                            dataMatricula: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de emissão da venda')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de emissão da venda')).map(res => res.value)[0] : "Sem este dado no rd",
                            observacao: "",
                            dataValidacao: "",
                            dataComissionamento: "",
                            contratoStatus: "Pendente",
                            cargaHoraria: `${index.deal_custom_fields.filter(res => res.custom_field.label.includes('Carga horário do curso')).map(res => res.value)}`,
                            tmDesconto: "",
                            tmParcelas: "",
                            tmData: "",
                            ppDesconto: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Valor do desconto de pontualidade por parcela')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Valor do desconto de pontualidade por parcela')).map(res => res.value)[0] : "Sem este dado no rd",
                            ppFormaPg: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Forma de pagamento da parcela')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Forma de pagamento da parcela')).map(res => res.value)[0] : "Sem este dado no rd",
                            ppParcelas: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Número de parcelas')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Número de parcelas')).map(res => res.value)[0] : "Sem este dado no rd",
                            ppData: "",
                            ppValor: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Valor total da parcela')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Valor total da parcela')).map(res => res.value)[0] : "Sem este dado no rd",
                            mdDesconto: "",

                            mdFormaPg: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Forma de pagamento do MD')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Forma de pagamento do MD')).map(res => res.value)[0] : "Sem este dado no rd",
                            mdVencimento: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de pagamento MD')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de pagamento MD')).map(res => res.value)[0] : "Sem este dado no rd",

                            mdParcelas: "",
                            mdData: "",
                            comissaoStatus: "Pendente",
                            curso: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Curso')).map(res => res.value)[0] ? index.deal_custom_fields.filter(res => res.custom_field.label.includes('Curso')).map(res => res.value)[0] : "Sem este dado no rd",

                        }
                        array.push(body)
                    }
                    if (array) {

                        for (let i = 0; i < array.length; i++) {
                            if (!(array[i].contrato.includes("/"))) {

                                await prisma.person.create({
                                    data: {
                                        name: array[i].name,
                                        owner: array[i].owner,
                                        unidade: array[i].unidade,
                                        background: array[i].background,
                                        tipoMatricula: "Pendente",
                                        tipoComissao: "Pendente",
                                        comissaoValor: "Pendente",
                                        diretorResponsavel: "Pendente",
                                        Valor: array[i].Valor || 0.0,
                                        id: array[i].id,
                                        situMatric: "Pendente",
                                        paStatus: "Pendente",

                                        responsavelADM: "Pendente",
                                        aprovacaoADM: "Pendente",
                                        aprovacaoDirecao: "Pendente",
                                        contrato: array[i].contrato,
                                        inicioContrato: array[i].inicioContrato,
                                        fimContrato: array[i].fimContrato,
                                        acFormato: array[i].acFormato,
                                        acStatus: "Pendente",
                                        tmValor: array[i].tmValor,
                                        tmVencimento: array[i].tmVencimento,
                                        tmStatus: "Pendente",
                                        ppVencimento: array[i].ppVencimento,
                                        mdValor: array[i].mdValor,
                                        mdStatus: "Pendente",
                                        aluno: array[i].aluno,
                                        tel: array[i].tel,
                                        email: array[i].email,
                                        paDATA: array[i].paDATA,
                                        classe: array[i].classe,
                                        subclasse: array[i].subclasse,
                                        ppStatus: "Pendente",


                                        dataAC: [{ name: 'Pendente' }],
                                        formatoAula: array[i].formatoAula,
                                        tipoModalidade: array[i].tipoModalidade,
                                        professor: array[i].professor,
                                        horarioFim: array[i].horarioFim,

                                        horarioInicio: array[i].horarioInicio,
                                        materialDidatico: array[i].materialDidatico,
                                        nivelamento: array[i].nivelamento,
                                        diaAula: array[i].diaAula,
                                        alunoNascimento: array[i].alunoNascimento,
                                        idadeAluno: `${array[i].idadeAluno}`,
                                        tempoContrato: "",
                                        dataMatricula: array[i].dataMatricula,
                                        observacao: "",
                                        dataValidacao: "",
                                        dataComissionamento: "",
                                        contratoStatus: "Pendente",
                                        cargaHoraria: `${array[i].cargaHoraria}`,
                                        tmDesconto: "",
                                        tmFormaPg: array[i].tmFormaPg,
                                        tmParcelas: "",
                                        tmData: "",
                                        ppDesconto: array[i].ppDesconto,
                                        ppFormaPg: "",
                                        ppParcelas: array[i].ppParcelas,
                                        ppData: "",
                                        ppValor: array[i].ppValor,
                                        mdDesconto: "",
                                        mdFormaPg: array[i].mdFormaPg,
                                        mdParcelas: "",
                                        mdData: "",
                                        mdVencimento: array[i].mdVencimento,
                                        curso: array[i].curso,
                                        comissaoStatus: "Pendente",
                                    }
                                })
                                    .then(() => console.log(`${array[i].name} foi cadastrado no sistema com sucesso`))
                                    .catch((err) => {
                                        if (err.meta) {
                                            console.log(`${array[i].name} está com o contrato repetido : ${array[i].contrato}, ${array[i].dataMatricula} `)
                                        }
                                        if (!err.meta) {
                                            console.log("Error : " + err)
                                        }
                                    })
                            }
                            if (array[i].contrato.includes("/")) {
                                console.log(`${array[i].name} está com o / no contrato : ${array[i].contrato}`)
                            }

                        }
                    }
                }
                return res.status(200).json({
                    data: {
                        message: 'Success',
                        total: `${response.data.total} pessoa(s) foram dadas como ganho nos últimos ${comebackDays} dias`
                    }
                })
            })
            .catch(() => {
                return res.status(400).json({ message: 'Something went wrong' })

            })
    }

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
                        NumeroEnderecoResponsavel: index.deal_custom_fields.filter(res => res.custom_field.label === 'Número').map(res => res.value)[0],
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
                    console.log("Contrato não encontrado")
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
        }).catch((error) => {
            console.log(error)
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

    async indexPeriod(req, res) {

        const { range, role, name, unity, dates, types, skip, take } = req.body


        const settledPeriod = {
            "Mês passado": 1, //
            "Mês retrasado": 2, //
            "Período personalizado": 0,//
            "Este mês": 3,
        }
        const rangePeriod = {
            "Últimos 7 dias": 7,
            "Este ano": 365,
        }

        const currentDay = new Date()

        if (settledPeriod[range] === 3) {
            const dbData = await prisma.person.findMany()
            const firstDayThisMonth = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1);

            const generalMonthsBefore = dbData?.filter(res => {
                const date = res[types].split("/")
                return new Date(`${date[2]}-${date[1]}-${date[0]}`) >= firstDayThisMonth
            })

            const slicedData = generalMonthsBefore.slice(skip, take + skip)

            if (role === 'comercial') {
                const sellerRanges = slicedData.filter(res => res.owner.toLowerCase().includes(name.toLowerCase()))
                return res.status(200).json({
                    data: {
                        period: range,
                        total: sellerRanges.length,
                        deals: sellerRanges
                    }
                })
            }

            return res.status(200).json({
                data: {
                    period: range,
                    total: generalMonthsBefore.length,
                    deals: slicedData
                }
            })


        }

        if (settledPeriod[range] === 1 || settledPeriod[range] === 2) {
            const dbData = await prisma.person.findMany()

            const firstDayLastMonth = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1); // Obtém o primeiro dia do mês atual.

            // Agora, para obter o primeiro dia do mês passado, subtraímos um mês do primeiro dia do mês atual.
            firstDayLastMonth.setMonth(firstDayLastMonth.getMonth() - settledPeriod[range]);

            const diaDeHoje = new Date(); // Obtém a data atual.
            const diaPrimeiroDesseMes = new Date(diaDeHoje.getFullYear(), diaDeHoje.getMonth(), 1); // Obtém o primeiro dia do mês atual.

            // Agora, para obter o último dia do mês passado, subtraímos um dia do primeiro dia do mês atual.
            const primeiroDiaDoMesPassado = new Date(diaPrimeiroDesseMes);


            primeiroDiaDoMesPassado.setMonth(primeiroDiaDoMesPassado.getMonth() - settledPeriod[range]);
            const lastDayLastMonth = new Date(primeiroDiaDoMesPassado);
            lastDayLastMonth.setMonth(lastDayLastMonth.getMonth() + 1);
            lastDayLastMonth.setDate(0);


            const generalMonthsBefore = dbData?.filter(res => {
                const date = res[types].split("/")
                return new Date(`${date[2]}-${date[1]}-${date[0]}`) >=
                    firstDayLastMonth &&
                    new Date(`${date[2]}-${date[1]}-${date[0]}`) <=
                    lastDayLastMonth
            })

            const slicedData = generalMonthsBefore.slice(skip, take + skip)

            if (role === 'comercial') {
                const sellerRanges = slicedData.filter(res => res.owner.toLowerCase().includes(name.toLowerCase()))
                return res.status(200).json({
                    data: {
                        period: range,
                        total: sellerRanges.length,
                        deals: sellerRanges
                    }
                })
            }

            return res.status(200).json({
                data: {
                    period: range,
                    total: generalMonthsBefore.length,
                    deals: slicedData
                }
            })
        }

        if (settledPeriod[range] === 0) {
            const dbData = await prisma.person.findMany()

            const mixedDates = dates.split("~")

            const generalRangeDates = dbData?.filter(res => {
                const date = res[types].split("/")
                return new Date(`${date[2]}-${date[1]}-${date[0]}`) >=
                    new Date(mixedDates[0]) &&
                    new Date(`${date[2]}-${date[1]}-${date[0]}`) <=
                    new Date(mixedDates[1])
            })

            const slicedData = generalRangeDates.slice(skip, take + skip)

            if (role === 'comercial') {
                const sellerRanges = slicedData.filter(res => res.owner.toLowerCase().includes(name.toLowerCase()))
                return res.status(200).json({
                    data: {
                        period: range,
                        total: sellerRanges.length,
                        deals: sellerRanges
                    }
                })
            }

            return res.status(200).json({
                data: {
                    period: range,
                    total: generalRangeDates.length,
                    deals: slicedData
                }
            })
        }

        if (rangePeriod[range] !== undefined) {
            const dbData = await prisma.person.findMany()

            const periodDate = new Date(currentDay.setDate(currentDay.getDate() - rangePeriod[range]))

            const generalRangePeriod = dbData?.filter(res => {
                const date = res[types].split("/")
                return new Date(`${date[2]}-${date[1]}-${date[0]}`) >= periodDate
            })


            const slicedData = generalRangePeriod.slice(skip, take + skip)


            if (role === 'comercial') {
                const sellerRanges = slicedData.filter(res => res.owner.toLowerCase().includes(name.toLowerCase()))
                return res.status(200).json({
                    data: {
                        period: range,
                        total: sellerRanges.length,
                        deals: sellerRanges
                    }
                })
            }

            return res.status(200).json({
                data: {
                    period: range,
                    total: generalRangePeriod.length,
                    deals: slicedData
                }
            })

        }
    }

    async updateMany(req, res) {
        const { contracts, where, value } = req.body

        if (contracts.length > 0) {
            try {
                contracts.map(async data => {
                    await prisma.person.update(
                        {
                            where: {
                                contrato: data
                            },
                            data: {
                                [where]: value
                            }

                        }).catch(err => {
                            if (err) {
                                return res.status(400).json({ error: err })
                            }
                        })

                })

                return res.status(200).json({ message: "Success" })

            } catch (error) {
                return res.status(400).json({ error: error })
            }
        }

    }

    async comissionData(req, res) {
        const selectedDbData = await prisma.person.findMany({
            orderBy: {
                name: 'asc',
            },
            select: {
                name: true,
                aluno: true,
                curso: true,
                tipoMatricula: true,
                unidade: true,
                dataMatricula: true,
                owner: true
            }
        })

        const { range, unity, dates } = req.body

        const settledPeriod = {
            "Mês passado": 1,
            "Mês retrasado": 2,
            "Período personalizado": 0,
            "Este mês": 3,
        }
        const rangePeriod = {
            "Últimos 7 dias": 7,
            "Este ano": 365,
        }

        const currentDay = new Date()
        try {

            if (settledPeriod[range] === 3) {
                const firstDayThisMonth = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1);

                const generalMonthsBefore = selectedDbData.filter(res => {
                    const date = res["dataMatricula"].split("/")
                    return new Date(`${date[2]}-${date[1]}-${date[0]}`) >= firstDayThisMonth
                })

                return res.status(200).json({
                    data: {
                        period: range,
                        total: generalMonthsBefore.length,
                        deals: generalMonthsBefore
                    }
                })

            }

            if (settledPeriod[range] === 1 || settledPeriod[range] === 2) {
                const firstDayLastMonth = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1); // Obtém o primeiro dia do mês atual.

                // Agora, para obter o primeiro dia do mês passado, subtraímos um mês do primeiro dia do mês atual.
                firstDayLastMonth.setMonth(firstDayLastMonth.getMonth() - settledPeriod[range]);

                const diaDeHoje = new Date(); // Obtém a data atual.
                const diaPrimeiroDesseMes = new Date(diaDeHoje.getFullYear(), diaDeHoje.getMonth(), 1); // Obtém o primeiro dia do mês atual.

                // Agora, para obter o último dia do mês passado, subtraímos um dia do primeiro dia do mês atual.
                const primeiroDiaDoMesPassado = new Date(diaPrimeiroDesseMes);


                primeiroDiaDoMesPassado.setMonth(primeiroDiaDoMesPassado.getMonth() - settledPeriod[range]);
                const lastDayLastMonth = new Date(primeiroDiaDoMesPassado);
                lastDayLastMonth.setMonth(lastDayLastMonth.getMonth() + 1);
                lastDayLastMonth.setDate(0);


                const generalMonthsBefore = selectedDbData.filter(res => {
                    const date = res["dataMatricula"].split("/")
                    return new Date(`${date[2]}-${date[1]}-${date[0]}`) >=
                        firstDayLastMonth &&
                        new Date(`${date[2]}-${date[1]}-${date[0]}`) <=
                        lastDayLastMonth
                })

                return res.status(200).json({
                    data: {
                        period: range,
                        total: generalMonthsBefore.length,
                        deals: generalMonthsBefore
                    }
                })
            }

            if (settledPeriod[range] === 0) {
                const mixedDates = dates.split("~")

                const generalRangeDates = selectedDbData.filter(res => {
                    const date = res["dataMatricula"].split("/")
                    return new Date(`${date[2]}-${date[1]}-${date[0]}`) >=
                        new Date(mixedDates[0]) &&
                        new Date(`${date[2]}-${date[1]}-${date[0]}`) <=
                        new Date(mixedDates[1])
                })

                return res.status(200).json({
                    data: {
                        period: range,
                        total: generalRangeDates.length,
                        deals: generalRangeDates
                    }
                })
            }

            if (rangePeriod[range] !== undefined) {
                const periodDate = new Date(currentDay.setDate(currentDay.getDate() - rangePeriod[range]))

                const generalRangePeriod = selectedDbData.filter(res => {
                    const date = res["dataMatricula"].split("/")
                    return new Date(`${date[2]}-${date[1]}-${date[0]}`) >= periodDate
                })


                return res.status(200).json({
                    data: {
                        period: range,
                        total: generalRangePeriod.length,
                        deals: generalRangePeriod
                    }
                })

            }
        } catch (error) {

            return res.status(401).json({ Erro: "Tente novamente mais tarde, se o erro persistir entre em contato com o suporte " })
        }
    }

    async graphData(req, res) {

        const { typeGraphic } = req.body

        const selectedDbData = await prisma.person.findMany({
            orderBy: {
                name: 'asc',
            },
            select: {
                curso: true,
                tipoMatricula: true,
                unidade: true,
                dataMatricula: true,
                owner: true
            }
        })
        const filteringDateAndTypeForYou = (month, type, value) => {
            if (value.length === 1) {
                const parameter1 = selectedDbData.filter(res => res.dataMatricula.split("/")[1] === month
                    && res[type].includes(value[0])).length
                return { parameter1 }
            }
            if (value.length === 2) {
                const parameter1 = selectedDbData.filter(res => res.dataMatricula.split("/")[1] === month
                    && res[type].includes(value[0])).length
                const parameter2 = selectedDbData.filter(res => res.dataMatricula.split("/")[1] === month
                    && res[type].includes(value[1])).length
                return { parameter1, parameter2 }
            }
            if (value.length === 3) {
                const parameter1 = selectedDbData.filter(res => res.dataMatricula.split("/")[1] === month
                    && res[type].includes(value[0])).length
                const parameter2 = selectedDbData.filter(res => res.dataMatricula.split("/")[1] === month
                    && res[type].includes(value[1])).length
                const parameter3 = selectedDbData.filter(res => res.dataMatricula.split("/")[1] === month
                    && res[type].includes(value[2])).length
                return { parameter1, parameter2, parameter3 }
            }
        }

        if (typeGraphic.type !== 'vendas' && typeGraphic.value.length >= 1) {
            let months = [
                { name: "Jan", type: typeGraphic.type, fn: filteringDateAndTypeForYou('01', typeGraphic.type, typeGraphic.value) },
                { name: "Fev", type: typeGraphic.type, fn: filteringDateAndTypeForYou('02', typeGraphic.type, typeGraphic.value) },
                { name: "Mar", type: typeGraphic.type, fn: filteringDateAndTypeForYou('03', typeGraphic.type, typeGraphic.value) },
                { name: "Abr", type: typeGraphic.type, fn: filteringDateAndTypeForYou('04', typeGraphic.type, typeGraphic.value) },
                { name: "Mai", type: typeGraphic.type, fn: filteringDateAndTypeForYou('05', typeGraphic.type, typeGraphic.value) },
                { name: "Jun", type: typeGraphic.type, fn: filteringDateAndTypeForYou('06', typeGraphic.type, typeGraphic.value) },
                { name: "Jul", type: typeGraphic.type, fn: filteringDateAndTypeForYou('07', typeGraphic.type, typeGraphic.value) },
                { name: "Ago", type: typeGraphic.type, fn: filteringDateAndTypeForYou('08', typeGraphic.type, typeGraphic.value) },
                { name: "Set", type: typeGraphic.type, fn: filteringDateAndTypeForYou('09', typeGraphic.type, typeGraphic.value) },
                { name: "Out", type: typeGraphic.type, fn: filteringDateAndTypeForYou('10', typeGraphic.type, typeGraphic.value) },
                { name: "Nov", type: typeGraphic.type, fn: filteringDateAndTypeForYou('11', typeGraphic.type, typeGraphic.value) },
                { name: "Dez", type: typeGraphic.type, fn: filteringDateAndTypeForYou('12', typeGraphic.type, typeGraphic.value) },
            ]

            return res.status(200).json({
                data: months

            })
        }

    }
}

export default new PostController()

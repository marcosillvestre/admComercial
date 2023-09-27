import { PrismaClient } from "@prisma/client";
import axios from 'axios';
import { CronJob } from "cron";
import "dotenv/config";

const prisma = new PrismaClient()

const job = new CronJob(
    '0 */60 * * * *',

    function () {
        searchSync();
    },
    null,
    true,
    'America/Los_Angeles'
)

const sstartDate = new Date()
sstartDate.setDate(sstartDate.getDate() - 2)
const startDate = sstartDate.toISOString()

const eendDate = new Date()
const endDate = eendDate.toISOString()


async function searchSync() {
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    await axios.get(`https://crm.rdstation.com/api/v1/deals?token=${process.env.RD_TOKEN}&win=true&closed_at_period=true&start_date=${startDate}&end_date=${endDate}`, options)
        .then(async response => {
            const array = []
            for (const index of response?.data?.deals) {

                const body = {
                    name: index.name,
                    owner: index.user.name,

                    unidade: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Unidade')).map(res => res.value)[0],
                    background: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Background')).map(res => res.value)[0],
                    tipoMatricula: "Pendente",
                    tipoComissao: "Pendente",
                    comissaoValor: "Pendente",
                    diretorResponsavel: "Pendente",
                    Valor: index.amount_total,
                    id: index.id,
                    situMatric: "Pendente",
                    paStatus: "Pendente",


                    responsavelADM: "Pendente",
                    aprovacaoADM: "Pendente",
                    aprovacaoDirecao: "Pendente",
                    contrato: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Nº do contrato')).map(res => res.value)[0],
                    inicioContrato: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de início do contrato')).map(res => res.value)[0],
                    fimContrato: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de fim do contrato')).map(res => res.value)[0],
                    acFormato: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Tipo de assinatura')).map(res => res.value)[0],
                    acStatus: "Pendente",

                    tmValor: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Valor de taxa de matrícula')).map(res => res.value)[0],
                    tmFormaPg: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Forma de pagamento TM')).map(res => res.value)[0],
                    tmVencimento: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de pagamento TM')).map(res => res.value)[0],

                    tmStatus: "Pendente",
                    ppVencimento: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de vencimento da primeira parcela')).map(res => res.value)[0],

                    mdValor: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Valor do material didático')).map(res => res.value)[0],
                    mdStatus: "Pendente",
                    aluno: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Nome do aluno')).map(res => res.value)[0],
                    tel: index.contacts.map(res => res.phones).map(res => res[0]?.phone),
                    email: index.contacts.map(res => res.emails).map(res => res[0]?.email),
                    paDATA: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data da primeira aula')).map(res => res.value)[0],
                    classe: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Classe')).map(res => res.value)[0],
                    subclasse: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Subclasse')).map(res => res.value)[0],
                    ppStatus: "Pendente",

                    formatoAula: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Formato de Aula')).map(res => res.value)[0],
                    tipoModalidade: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Tipo/ modalidade')).map(res => res.value)[0],
                    professor: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Professor')).map(res => res.value),

                    horarioFim: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Horário de fim')).map(res => res.value)[0],
                    horarioInicio: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Horário de Inicio')).map(res => res.value)[0],

                    materialDidatico: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Material didático')).map(res => res.value)[0],
                    nivelamento: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Precisa de nivelamento?')).map(res => res.value)[0],
                    diaAula: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Dia de aula')).map(res => res.value)[0],
                    alunoNascimento: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de nascimento do aluno')).map(res => res.value)[0],
                    idadeAluno: `${index.deal_custom_fields.filter(res => res.custom_field.label.includes('Idade do Aluno')).map(res => res.value)}`,
                    tempoContrato: "",
                    dataMatricula: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de emissão da venda')).map(res => res.value)[0],
                    observacao: "",
                    dataValidacao: "",
                    dataComissionamento: "",
                    contratoStatus: "Pendente",
                    cargaHoraria: `${index.deal_custom_fields.filter(res => res.custom_field.label.includes('Carga horário do curso')).map(res => res.value)}`,
                    tmDesconto: "",
                    tmParcelas: "",
                    tmData: "",
                    ppDesconto: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Valor do desconto de pontualidade por parcela')).map(res => res.value)[0],
                    ppFormaPg: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Forma de pagamento da parcela')).map(res => res.value)[0],
                    ppParcelas: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Número de parcelas')).map(res => res.value)[0],
                    ppData: "",
                    ppValor: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Valor total da parcela')).map(res => res.value)[0],
                    mdDesconto: "",

                    mdFormaPg: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Forma de pagamento do MD')).map(res => res.value)[0],
                    mdVencimento: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Data de pagamento MD')).map(res => res.value)[0],

                    mdParcelas: "",
                    mdData: "",
                    comissaoStatus: "Pendente",
                }

                array.push(body)

            }
            if (array) {
                array.map(async res => {
                    try {
                        await prisma.person.create({
                            data: {
                                name: res['name'] || "",
                                owner: res['owner'] || "", // 
                                unidade: res['unidade'] || "",
                                background: res['background'] || "",
                                tipoMatricula: "Pendente",
                                tipoComissao: "Pendente",
                                comissaoValor: "Pendente",
                                diretorResponsavel: "Pendente",
                                Valor: res['Valor'] || 0.0,  //
                                id: parseInt(res['id']),
                                situMatric: "Pendente",
                                paStatus: "Pendente",


                                responsavelADM: "Pendente",
                                aprovacaoADM: "Pendente",
                                aprovacaoDirecao: "Pendente",
                                contrato: res['contrato'] || "",
                                inicioContrato: res['inicioContrato'] || "", // 
                                fimContrato: res['fimContrato'] || "", // 
                                acFormato: res['acFormato'] || "",
                                acStatus: "Pendente",
                                tmValor: res['tmValor'] || "",
                                tmVencimento: res['tmVencimento'] || "",
                                tmStatus: "Pendente",
                                ppVencimento: res['ppVencimento'] || "",
                                mdValor: res['mdValor'] || "", // 
                                mdStatus: "Pendente",
                                aluno: res['aluno'] || "",
                                tel: res['tel'][0] || "", //
                                email: res['email'][0] || "", //
                                paDATA: res['paDATA'] || "",
                                classe: res['classe'] || "",
                                subclasse: res['subclasse'] || "",
                                ppStatus: "Pendente",


                                dataAC: [{ name: 'Pendente' }] || "",
                                formatoAula: res['formatoAula'] || "",
                                tipoModalidade: res['tipoModalidade'] || "",
                                professor: res['professor'] || "",
                                horarioFim: res['horarioFim'] || "",

                                horarioInicio: res['horarioInicio'] || "",
                                materialDidatico: res['materialDidatico'] || "",
                                nivelamento: res['nivelamento'] || "",
                                diaAula: res['diaAula'] || "",
                                alunoNascimento: res['alunoNascimento'] || "",
                                idadeAluno: `${res['idadeAluno']}`,
                                tempoContrato: "",
                                dataMatricula: res['dataMatricula'] || "",
                                observacao: "",
                                dataValidacao: "",
                                dataComissionamento: "",
                                contratoStatus: "Pendente",
                                cargaHoraria: `${res['cargaHoraria']}`,
                                tmDesconto: "", // 
                                tmFormaPg: res['tmFormaPg'] || "",
                                tmParcelas: "", //
                                tmData: "",
                                ppDesconto: res['ppDesconto'], //
                                ppFormaPg: "", // 
                                ppParcelas: res["ppParcelas"], // 
                                ppData: "",
                                ppValor: res['ppValor'], //
                                mdDesconto: "", //,
                                mdFormaPg: res['mdFormaPg'] || "",
                                mdParcelas: "", //
                                mdData: "",
                                mdVencimento: res['mdVencimento'] || "",
                                comissaoStatus: "Pendente",
                            }
                        })

                    } catch (error) {
                        if (error) {
                            console.log(new Date().toISOString())
                        }
                    }
                })
            }

        })
}




// id: 19296114,
// accountId: 354646,
// organization: null,
// person: {
// id: 44647139,
// name: 'Aline Lourenço Vasconcelos Rocha',
// email: 'alinecesar2010@hotmail.com'
// },
// author: { accountId: 354646, id: 720504, name: 'Louryane Vianey Sandes' },
// dealStage: {
// id: 2745808,
// name: 'Plano Financeiro',
// sequence: 5,
// funnel: { id: 624236, name: 'Funil de Venda - Centro' }
// },
// dealStatus: { id: 2, name: 'Ganho' },
// lossReason: null,
// owner: { accountId: 354646, id: 720504, name: 'Louryane Vianey Sandes' },
// title: '1902 - Aline Lourenço Vasconcelos Rocha',
// description: 'Matricula: R$50,00<br />Material: R$171,90<br />Parcela: R$165-R$149',
// startTime: '2023-06-20T00:00:00.000Z',
// endTime: '2023-06-29T00:00:00.000Z',
// wonAt: '2023-07-25T20:12:34.000Z',
// lostAt: null,
// createdAt: '2023-06-28T19:13:19.000Z',
// updatedAt: '2023-07-25T20:12:34.000Z',
// ranking: 0,
// value: 2970,
// products: [
// {
// id: 651626,
// name: 'Fluency Way Class - Kids',
// code: 'FWCK',
// category: 'Fluency Way Class',
// categoryId: 6726,
// price: 3296,
// active: true,
// createdAt: '2023-01-15T20:36:17.000Z'
// }
// ],
// allowedUsers: [
// { accountId: 354646, id: 430751, name: 'Victor' },
// { accountId: 354646, id: 621908, name: 'Recepção' },
// { accountId: 354646, id: 706675, name: 'Financeiro' },
// { accountId: 354646, id: 720504, name: 'Louryane Vianey Sandes' },
// {
// accountId: 354646,
// id: 732382,
// name: 'Aracelly Nascimento de Gois'
// }
// ],
// _email: '1902-354646n19296114@to.agendor.com.br',
// customFields: {
// valor_da_primeira_parcela: '149.0',
// valor_da_parcela_apos_pp: '149.0',
// parcela_forma_de_pagamento: { id: 2069, value: 'Pix Cobrança' },
// parcela_dia_de_vencimento: { id: 2077, value: '25' },
// data_de_vencimento_da_primeira: '25/07/2023',
// data_de_vencimento_da_ultima_p: '25/12/2024',
// n_de_parcelas: { id: 4458, value: '18' },
// desconto_total_pontualidade: '288.0',
// tm_valor_ex_150_00: '50.0',
// tm_forma_de_pagamento: { id: 2225, value: 'Pix - Pagamento Instantâneo' },
// tm_data_de_pagamento: '30/06/2023',
// data_de_emissao_da_venda: '28/06/2023',
// md_valor_ex_300_00: '171.9',
// md_forma_de_pagamento: { id: 2211, value: 'Pix - Pagamento Instantâneo' },
// md_data_de_pagamento: '30/07/2023',
// nome_do_aluno: 'Laura Patrícia Lourenço Vasconcelos ',
// data_de_nascimento_do_aluno: '17/02/2016',
// background_do_aluno: { id: 2160, value: 'Novo Aluno' },
// idade_do_aluno: 7,
// possui_conhecimento_no_idioma: { id: 2171, value: 'Nao' },
// precisa_de_nivelamento: { id: 2173, value: 'Nao' },
// horario_de_inicio_ex_9_00: '08;30',
// horario_do_fim_ex_10_00: '10:30',
// classe: { id: 2192, value: 'Fluency Way – Class' },
// subclasse: { id: 2096, value: 'SUB. 1: Kids' },
// tipo_modalidade: { id: 2092, value: 'Em Grupo' },
// formato_de_aula: { id: 2113, value: 'Presencial' },
// curso: { id: 2115, value: 'Inglês' },
// data_da_primeira_aula: '04/07/2023',
// n_do_contrato: 'C280623',
// carga_horaria_do_curso: 135,
// unidade: { id: 2197, value: 'Centro' },
// tipo_de_plano: { id: 2391, value: 'Único' },
// testemunha_01: { id: 4049, value: 'louryane.americanway@gmail.com' },
// testemunha_02: { id: 4060, value: 'financeiro.amwaycentro@outlook.com' },
// metodo_de_assinatura: { id: 4721, value: 'Online' },
// material_didatico: [[Object]],
// dia_de_aula: [[Object]],
// professor: [[Object]]
// },
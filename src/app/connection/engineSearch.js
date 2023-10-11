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

    let count = 0

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
                    curso: index.deal_custom_fields.filter(res => res.custom_field.label.includes('Curso')).map(res => res.value)[0],

                }
                console.log(body.name)
                array.push(body)
                count++
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
                                curso: res['curso'] || "",
                                comissaoStatus: "Pendente",

                            }
                        })

                    } catch (error) {
                        if (error.meta) {
                            console.log(error.meta.target + count);
                        } else {
                            console.log(error)
                        }

                    }
                })
            }

        })
}


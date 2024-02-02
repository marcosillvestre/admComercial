import { PrismaClient } from "@prisma/client";
import axios from 'axios';
import { CronJob } from "cron";
import "dotenv/config";

const prisma = new PrismaClient()

const limit = 200
const comebackDays = 3
const job = new CronJob(
    '0 */30 * * * *',

    function () {
        searchSync(limit);
    },
    null,
    true,
    'America/Los_Angeles'
)


const options = { method: 'GET', headers: { accept: 'application/json' } };


async function searchSync(limit) {

    const backDay = new Date()
    backDay.setDate(backDay.getDate() - comebackDays)
    const startDate = backDay.toISOString()

    const currentDate = new Date()
    const endDate = currentDate.toISOString()

    await axios.get(`https://crm.rdstation.com/api/v1/deals?limit=${limit}&token=${process.env.RD_TOKEN}&win=true&closed_at_period=true&start_date=${startDate}&end_date=${endDate}`, options)
        .then(async response => {
            console.log(response.data.total)
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
                                .then(() => {
                                    console.log(`${array[i].name} foi cadastrado no sistema com sucesso`)
                                    trelloCreateCard(array)
                                })
                                .catch((err) => {
                                    if (err.meta) {
                                        console.log(`${array[i].name} está com o contrato repetido : ${array[i].contrato}, ${array[i].dataMatricula} `)
                                    }
                                    if (!err.meta) {
                                        console.log("Error : " + err)
                                    }
                                })

                        }
                        else {
                            console.log(`${array[i].name} está com o / no contrato : ${array[i].contrato}`)
                        }

                    }
                }
            }
        })
}
function addUsefullDays(data, diasUteis) {
    var dataAtual = new Date(data);
    var diasAdicionados = 0;

    while (diasAdicionados < diasUteis) {
        dataAtual.setDate(dataAtual.getDate() + 1);

        // Verifica se o dia adicionado é um dia útil (de segunda a sexta)
        if (dataAtual.getDay() !== 0 && dataAtual.getDay() !== 6) {
            diasAdicionados++;
        }
    }

    return dataAtual;
}


async function trelloCreateCard(array) {

    let today = new Date();
    let futureDate = addUsefullDays(today, 7);

    const data = array[0]

    const templates = {
        "Golfinho azul": process.env.PTB_TEMPLATE,
        'PTB': process.env.PTB_TEMPLATE,
        'Centro': process.env.CENTRO_TEMPLATE
    }

    const idList = {
        "Golfinho azul": process.env.PTB_LIST,
        'PTB': process.env.PTB_LIST,
        'Centro': process.env.CENTRO_LIST

    }

    const body = {
        name: data.name,
        desc: `
        background:${data.background},
        nome do aluno:${data.aluno},
        idade : ${data.idadeAluno},
        vendedor : ${data.owner},
        responsável : ${data.professor},
        whatsapp : ${data.tel},
        Precisa de nivelamento: ${data.nivelamento},
        Professor: ${data.professor},
        Dia de aula: ${data.diaAula.map(res => res)},
        Dia da Primeira aula: ${data.paDATA},
        Horario: ${data.horarioInicio} às ${data.horarioFim},
        Caga Horaria do curso: ${data.cargaHoraria},
        Curso: ${data.curso},
        Classe: ${data.classe},
        Sub Classe: ${data.subclasse},
        Material: ${data.materialDidatico.map(res => res)},
        modalidade: ${data.tipoModalidade},
        Formato das aulas: ${data.formatoAula},
        anotações: ${data.observacao},
        Valor do material: ${data.mdValor},
        Vaor da taxa de matricula: ${data.tmValor},
        Valor da mensalidade: ${data.ppValor},
        `,
        pos: 'top',
        due: futureDate,
        start: today,
        idList: idList[data.unidade],
        idCardSource: templates[data.unidade]
    }

    let list = idList[data.unidade]

    await axios.post(`https://api.trello.com/1/cards?idList=${list}&key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`, body)
        .then(() => console.log("Enviado ao trello"))
        .catch(() => console.log("Erro ao enviar ao trello"))
}



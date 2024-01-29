import axios from 'axios';
import 'dotenv';
import FormData from 'form-data';
import fs from 'fs';
import pdf from 'pdf-creator-node';

import { dirname } from 'path';
import { rimraf } from 'rimraf';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



class CreateDocuments {
    async store(req, res) {

        const contractData = req.body


        const archives = {
            "Kids": "idioma",
            "Teens": "idioma",
            "Adults and YA": "idioma",
            "Little Ones": "idioma",
            "Español - En grupo": "idioma",
            "Standard One": "standard",
            "Fluency Way One - X": "particulares",
            "Fluency Way Double - X": "particulares",
            "Fluency Way Triple - X": "particulares",
            "Español - X1": "particulares",
            "Español - X2": "particulares",
            "Español - X3": "particulares",
            "Pacote Office Essentials": "office",
            "Excel Avaçado": "excel"
        }


        const rawPhone = contractData[0].CelularResponsavel

        let phone = rawPhone.includes("+55") ? rawPhone : `+55${rawPhone}`


        rimraf(`${__dirname}/../contract`)


        try {

            var html = fs.readFileSync(`${__dirname}/../public/${archives[contractData[0].subclasse]}.html`, 'utf-8')

            const options = {
                format: "A4",
                orientation: "portrait",
                border: "10mm",
                header: {
                    height: "15mm",
                    contents: '<div style="text-align: center;">Author: American Way </div>'
                },
                footer: {
                    height: "10mm",
                    contents: {
                        first: 'First page',
                        2: 'Second page', // Any page number is working. 1-based index
                        default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                        last: 'Last Page'
                    }
                }
            }

            const document = {
                html: html,
                data: {
                    users: contractData,
                },
                path: `${__dirname}/../contract/adesao_${contractData[0].name}.pdf`,
                type: "",
            }

            pdf
                .create(document, options)
                .then(async (res) => {
                    if (res) {
                        await sender()

                    }
                })
                .catch((error) => {
                    if (error) {
                        console.error(error);
                        return res.status(401).json({ message: "Erro na criação do contrato" })

                    }
                });



            var data = new FormData();

            data.append("operations", `{"query":"mutation CreateDocumentMutation($document:DocumentInput!, $signers: [SignerInput!]!,$file: Upload!){createDocument(document:$document, signers: $signers, file: $file){id name refusable sortable created_at signatures { public_id name email created_at action { name } link { short_link } user { id name email }}}}","variables":{"document": {"name": "adesão-${contractData[0].nome}","message": "A American Way está te enviando um contrato para assinar. Clique no link abaixo para ser redirecionado","reminder":"DAILY"},"signers":[{"phone": "${phone}", "delivery_method": "DELIVERY_METHOD_WHATSAPP","action": "SIGN", "positions": [{"x": "55.0", "y": "90.0", "z": 1, "element": "DATE"}]},{"phone": "+5531989103911","delivery_method": "DELIVERY_METHOD_WHATSAPP","action":"SIGN","positions": [{ "x": "50.0", "y": "80.0", "z": 1, "element": "CPF" }]}],"file":null}}`);

            data.append('map', '{"file": ["variables.file"]}');

            const sender = async () => {

                await data.append('file', fs.createReadStream(`${__dirname}/../contract/adesao_${contractData[0].name}.pdf`));

                var config = {
                    method: 'post',
                    url: 'https://api.autentique.com.br/v2/graphql',
                    headers: {
                        'Authorization': `Bearer ${process.env.TOKEN_AUTENTIQUE}`,
                        ...data.getHeaders()
                    },
                    data: data
                };

                await axios(config)
                    .then(function () {
                        return res.status(201).json({ message: "Contrato enviado com sucesso" })

                    })
                    .catch(function (error) {
                        console.log(error);
                        return res.status(401).json({ message: "Erro ao enviar o contrato" })
                    })


            }

            //Envia um email para a pessoa que criou o contrato

        } catch (error) {
            if (error) {
                console.log(error)
            }
        }
    }
}

export default new CreateDocuments()

function defineStructure() {
    addColumn('FILIAL', DatasetFieldType.STRING);
    addColumn('NUMERO_PEDIDO', DatasetFieldType.STRING);
    addColumn('NOME_CLIENTE', DatasetFieldType.STRING);
    addColumn('CPF_CLIENTE', DatasetFieldType.STRING);
    addColumn('PROCESSO_FLUIG', DatasetFieldType.STRING);
    addColumn('STATUS_MONTAGEM', DatasetFieldType.STRING);
    setKey(["PROCESSO_FLUIG"]);
}

function onSync(lastSyncDate) {
    try {
        var dataset = crmDataSet.createDataset();
        // Chame o método montaFiltro para preparar o conteúdo do e-mail
        var tabelaEmail = crmUtil.montaFiltro(dataset);
        // Envia o e-mail
        crmMontaEmail.enviaEmail("status_montagem", tabelaEmail, "Status de montagem [Montagem de Móveis]");
    } catch (error) {
        log.dir(error);
    }
}

var crmDataSet = {
    //Faz a query para buscar os status 'EM AGENDAMENTO' ou 'EM CONFIRMACAO'  ps:ao subir para a prod alterar a consulta
    makeQuery: function () {
        return "SELECT " +
            "FILIAL, " +
            "NUMERO_PEDIDO, " +
            "NOME_CLIENTE, " +
            "CPF_CLIENTE, " +
            "PROCESSO_FLUIG, " +
            "STATUS_MONTAGEM " +
            "FROM TI_CALENDARIO_MONTAGEM A " +
            "WHERE " +
            "A.MONTADORA = 'FORMOSA' " +
            "AND A.DATA_MONTAGEM < TO_DATE(SYSDATE,'DD/MM/RRRR') " +
            "AND (A.STATUS_MONTAGEM = 'EM AGENDAMENTO' OR A.STATUS_MONTAGEM = 'EM CONFIRMACAO')";
    },

    createDataset: function (statusMontagem, fields, constraints, sortFields) {
        var dataset = DatasetBuilder.newDataset();
        var sqlQuery = this.makeQuery(statusMontagem);
        var retornoDB = DatasetFactory.getDataset('ds_sql_fluig', [sqlQuery], null, null);

        // Adicionar colunas ao dataset
        var columns = [
            "FILIAL",
            "NUMERO_PEDIDO",
            "NOME_CLIENTE",
            "CPF_CLIENTE",
            "PROCESSO_FLUIG",
            "STATUS_MONTAGEM",
        ];
        log.dir(columns)

        for (var i = 0; i < columns.length; i++) {
            dataset.addColumn(columns[i]);
        }
        // Preencher o dataset com os dados da consulta
        for (var i = 0; i < retornoDB.rowsCount; i++) {
            var rowData = [];
            for (var j = 0; j < columns.length; j++) {
                rowData.push(retornoDB.getValue(i, columns[j]));
            }
            dataset.addRow(rowData);
        }
        return dataset;
    },
}

var crmDestinatarios = {
    //Realiza a query para buscar os destinatários da lista de e-mail
    makeQueryDestinatarios: function () {
        return "SELECT * FROM ti_email_agendam_montagem_pend a WHERE a.flgativo = 'A'";
    },

    createDestinatarios: function () {
        var sqlQuery = this.makeQueryDestinatarios();
        var emailDataset = DatasetFactory.getDataset('ds_sql_fluig', [sqlQuery], null, null);
        var emailList = new java.util.ArrayList();
        // Itera sobre os resultados e adiciona os e-mails na lista
        for (var k = 0; k < emailDataset.rowsCount; k++) {
            var email = emailDataset.getValue(k, 'EMAIL');
            emailList.add(email);
        }
        return emailList;
    }
}
//Objeto que utilizei para filtrar valores do dataset e irão definir as duas tabelas que vão para o e-mail
var crmUtil = {
    montaFiltro: function (dataset) {
        var tabelaEntregue = crmMontaEmail.montaEmailComValores(dataset, 'EM AGENDAMENTO');
        var tabelaEmConfirmacao = crmMontaEmail.montaEmailComValores(dataset, 'EM CONFIRMACAO');
        return tabelaEntregue + tabelaEmConfirmacao;
    }
}

var crmMontaEmail = {
    //Personaliza o HTML para as ocasiões em não foi encontrado valores no STATUS_MONTAGEM
    montaEmailSemValores: function (status) {
        return "<h3 style=\"text-align: center;\"> <u> Não há montagens com o status '" + status + "'.</u></h3>";
    },

    montaAvisoCabecalho: function (status) {
        return "<h3 style=\"text-align:center\"> Seguem abaixo as montagens com status  " + status + " </h3>"
    },

    montaCabecalho: function () {
        return "<table style=\"border-collapse: collapse; margin: 0 auto; max-width: 600px; border-radius: 15px; font-family: Arial, Helvetica, sans-serif; \">"
            + "<tr>"
            + "<th style=\"border: 1px solid #024C86; padding: 5px; background-color: #024C86; color:#FFFF\"><b>FILIAL</b></th>"
            + "<th style=\"border: 1px solid #024C86; padding: 5px; background-color: #024C86; color:#FFFF\"><b>NUMERO PEDIDO</b></th>"
            + "<th style=\"border: 1px solid #024C86; padding: 5px; background-color: #024C86; color:#FFFF\"><b>NOME CLIENTE</b></th>"
            + "<th style=\"border: 1px solid #024C86; padding: 5px; background-color: #024C86; color:#FFFF\"><b>CPF CLIENTE</b></th>"
            + "<th style=\"border: 1px solid #024C86; padding: 5px; background-color: #024C86; color:#FFFF\"><b>PROCESSO FLUIG</b></th>"
            + "<th style=\"border: 1px solid #024C86; padding: 5px; background-color: #024C86; color:#FFFF\"><b>STATUS MONTAGEM</b></th>"
            + "</tr>";
    },

    //Cria a estrutura e monta a tabela com os valores
    montaEmailComValores: function (dataset, statusFiltro) {
        var avisoCabecalho = this.montaAvisoCabecalho(statusFiltro);
        var tabelaAgendamentos = this.montaCabecalho();
        var hasStatus = false;

        for (var j = 0; j < dataset.rowsCount; j++) {
            var status = dataset.getValue(j, 'STATUS_MONTAGEM');
            if (status != statusFiltro) {
                continue;
            }

            hasStatus = true;
            var campos = [
                'FILIAL',
                'NUMERO_PEDIDO',
                'NOME_CLIENTE',
                'CPF_CLIENTE',
                'PROCESSO_FLUIG',
                'STATUS_MONTAGEM'
            ];

            var valores = [];

            for (var i = 0; i < campos.length; i++) {
                valores[i] = dataset.getValue(j, campos[i]);
            }
            tabelaAgendamentos += this.montaLinhasTabela.apply(this, valores);
        }

        tabelaAgendamentos += "</table><br>";

        if (!hasStatus) {
            return this.montaEmailSemValores(statusFiltro);
        }

        return avisoCabecalho + tabelaAgendamentos;
    },

    enviaEmail: function (template, tabela, assunto) {
        var parametros = new java.util.HashMap();
        var destinatarios = crmDestinatarios.createDestinatarios();
        if (destinatarios) { // Verifique se destinatarios não é nulo ou undefined
            destinatarios.add("luckas.delboni@crmservices.com.br");
        }
        parametros.put("moveis", tabela);
        parametros.put("subject", assunto);
        notifier.notify("admin", template, parametros, destinatarios, "text/html");
    },

    montaLinhasTabela: function (filial, numeroPedido, nomeCliente, cpfCliente, processoFluig, statusMontagem) {
        // Forma o link para o processo
        // var linkProcesso = "http://10.13.2.13:8080/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + processoFluig;
        var linkProcesso = "https://formosaweb.net.br/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + processoFluig;
        var processoLink = "<a href=\"" + linkProcesso + "\">" + processoFluig + "</a>";

        return "<tr style=\"border-radius: 15px;\">"
            + "<td style= \"border: 1px solid #827e7e; padding: 5px;\">" + filial + "</td>"
            + "<td style= \"border: 1px solid #827e7e; padding: 5px;\">" + numeroPedido + "</td>"
            + "<td style= \"border: 1px solid #827e7e; padding: 5px;\">" + nomeCliente + "</td>"
            + "<td style= \"border: 1px solid #827e7e; padding: 5px;\">" + cpfCliente + "</td>"
            + "<td style= \"border: 1px solid #827e7e; padding: 5px;\">" + processoLink + "</td>"
            + "<td style= \"border: 1px solid #827e7e; padding: 5px;\">" + statusMontagem + "</td>"
            + "</tr>";
    }
}

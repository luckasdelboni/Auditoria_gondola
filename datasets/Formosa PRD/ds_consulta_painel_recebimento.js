function createDataset(fields, constraints, sortFields) {
  var dataset = DatasetBuilder.newDataset();
  dataset.addColumn("ERRO");
  dataset.addColumn("MSG");
  dataset.addColumn("DETALHES");

  if (constraints != null) {
    if (constraints[0].fieldName == "GET") {
      var FILIAL_SEMDIG;
      var DATA_FORMATRMS;

      for (var i = 0; i < constraints.length; i++) {
        if (constraints[i].fieldName == "FILIAL_SEMDIG") {
          FILIAL_SEMDIG = constraints[i].initialValue;
        }
        if (constraints[i].fieldName == "DATA_FORMATRMS") {
          DATA_FORMATRMS = constraints[i].initialValue;
        }
      } // final for;

      log.info("FILIAL_SEMDIG: " + FILIAL_SEMDIG);
      log.info("DATA_FORMATRMS: " + inputString_para_RMS(DATA_FORMATRMS));

      var sql = " SELECT " +
        " MVG_FILIAL, " +
        " MVG_DAT_ALTER, " +
        " MVG_COD_ITEM, " +
        " MVG_COD_EAN13, " +
        " MVG_SECAO, " +
        " MVG_LOTE, " +
        " MVG_PRECO_ATUAL, " +
        " MVG_PRECO_NOVO, " +
        " GIT_DESC_REDUZ " +
        " FROM " +
        " FLUIG.TI_AUDITORIA_GONDOLA_MIX " +
        " WHERE " +
        " MVG_FILIAL = '" + FILIAL_SEMDIG + "' " +
        " AND MVG_DAT_ALTER = '" + DATA_FORMATRMS + "'";

      log.info("SQL: " + sql);
      log.dir(sql)


      return DatasetFactory.getDataset("ds_sql_fluig", [sql], null, null);
    } else if (constraints[0].fieldName == "GET") {
      try {
        var PERIODO_FORMATRMS;
        var FILIAL_SEMDIG;

        for (var i = 0; i < constraints.length; i++) {
          if (constraints[i].fieldName == "PERIODO_FORMATRMS") {
            PERIODO_FORMATRMS = constraints[i].initialValue;
          }
          if (constraints[i].fieldName == "FILIAL_SEMDIG") {
            FILIAL_SEMDIG = constraints[i].initialValue;
          }
        } //final for;

        let sql = "SELECT " +
          "RIT_COD_ATIV AS ATIVIDADE, " +
          "to_number(GIT_COD_ITEM||GIT_DIGITO) AS CODPROD, " +
          "GIT_CODIGO_EAN13 AS EAN, " +
          "GIT_DESC_REDUZ AS DESCRICAO, " +
          "RIT_EMB_PED AS EMB_PED, " +
          "RIT_QTD_PED AS QTD_PED, " +
          "RIT_EMB_FAT AS EMB_FAT, " +
          "RIT_QTD_FAT AS QTD_FAT, " +
          "RIT_EMB_REC1 AS EMB_REC, " +
          "RIT_QTD_REC1 AS QTD_REC1, " +
          "RIT_QTD_REC2 AS QTD_REC2, " +
          "'0' AS QTD_REC3, " +
          "COALESCE( (SELECT COUNT(*) " +
          "FROM FLUIG.TI_AUDIT_RECEB_CARGAS_ITEM@LK_FLUIG ARCB " +
          "WHERE 1=1 AND ARCB.FLGATIVO = 'A' " +
          "AND ARCB.COD_ITEM = GIT_COD_ITEM " +
          "),0) AS EXISTE_PAR, " +
          "RMS.RMS7TO_DATE(RIT_DT_VALID) AS VALIDADE, " +
          "RIT_STA_RECEPCAO AS SIT, " +
          "RIT_DT_VALID AS RIT_DT_VALID_RMS, " +
          "CASE WHEN (RIT_QTD_FAT <> RIT_QTD_REC1) THEN 'ERRO' WHEN (RIT_QTD_FAT = RIT_QTD_REC1) THEN 'OK' END AS CRITICA1, " +
          "CASE WHEN (RIT_QTD_FAT <> RIT_QTD_REC2) THEN 'ERRO' WHEN (RIT_QTD_FAT = RIT_QTD_REC2) THEN 'OK' END AS CRITICA2, " +
          "CASE WHEN (RIT_QTD_REC1 <> RIT_QTD_REC2) THEN 'ERRO' WHEN (RIT_QTD_REC1 = RIT_QTD_REC2) THEN 'OK' END AS CRITICA3 " +
          "FROM RMS.AG5RECDT, RMS.AA3CITEM, (SELECT rcp_cod_ativ, rcp_loja, " +
          "tip_nome_fantasia, " +
          "NVL(RCP_PLA_VEIC,'       ')  as PLACA, " +
          "rcp_dt_ativ AS DATA, " +
          "rcp_hr_ativ AS HORA, " +
          "NVL(rcp_dt_aloc,'0') AS DATA_ALOC, " +
          "NVL(rcp_hr_aloc,'0') AS HORA_ALOC, " +
          "NVL(RCP_NUM_DOCA,0)  as DOCA, " +
          "rcp_cod_oper " +
          "From RMS.AG5RECCP, RMS.AA2CTIPO " +
          "WHERE 1=1 ";
        if (STATUS_RECEB != 'XX') {
          sql += "AND rcp_sta_recepcao = '" + STATUS_RECEB + "' ";
        };
        /*rcp_sta_recepcao = '"+STATUS_RECEB+"' "+*/
        sql += "AND RCP_LOJA = " + FILIAL_SEMDIG + " " +
          "AND RCP_DT_ATIV = " + PERIODO_FORMATRMS + " " +
          "AND TIP_CODIGO = rcp_cod_forn " +
          "AND TIP_DIGITO = rcp_DIG_forn ) CP " +
          "WHERE RIT_COD_ATIV = CP.rcp_cod_ativ " +
          "AND RIT_loja = cp.rcp_loja " +
          "AND GIT_COD_ITEM (+) = RIT_COD_PROD " +
          "AND GIT_DIGITO (+) = RMS.DAC(RIT_COD_PROD) " +
          "ORDER BY EXISTE_PAR DESC";

        return DatasetFactory.getDataset(
          "ds_sql_ti_guests_rms",
          [sql],
          null,
          null
        );
      } catch (e) {
        log.error(
          'Encontrei um erro em ds_audit_recebimento_cargas_widget fieldName=="GET" && initialValue=="CRITICA_RECEBIMENTOS" ERRO==>' +
          e
        );
      }
    } else if (
      constraints[0].fieldName == "PUT" &&
      constraints[0].initialValue == "CONTROLE_RECEBIMENTOS"
    ) {
      try {
        let ATIVIDADE;
        let FILIAL_SEMDIG;
        let DATA_FORMATRMS;
        let VOLUME_AUDITADO;
        let USUARIO_LOGADO;
        let CODPROD;
        let EAN;
        let DESCRICAO;
        let EMB_PED;
        let QTD_PED;
        let EMB_FAT;
        let QTD_FAT;
        let EMB_REC;
        let QTD_REC1;
        let QTD_REC2;
        let QTD_CENTRAL3;
        let VALIDADE;
        let SIT;
        let EXISTE_PAR;
        let DOCA;
        let NOME;
        let OPERADOR;
        let PLACA;
        let VALIDADE_FORMATRMS;

        for (var i = 0; i < constraints.length; i++) {
          if (constraints[i].fieldName == "DATA_FORMATRMS") {
            DATA_FORMATRMS = constraints[i].initialValue;
          }
          if (constraints[i].fieldName == "ATIVIDADE") {
            ATIVIDADE = constraints[i].initialValue;
          }
          if (constraints[i].fieldName == "FILIAL_SEMDIG") {
            FILIAL_SEMDIG = constraints[i].initialValue;
          }
          if (constraints[i].fieldName == "VOLUME_AUDITADO") {
            VOLUME_AUDITADO = constraints[i].initialValue;
          }
          if (constraints[i].fieldName == "USUARIO_LOGADO") {
            USUARIO_LOGADO = constraints[i].initialValue;
          }
          if (constraints[i].fieldName == "CODPROD") {
            CODPROD = constraints[i].initialValue;
          }
          if (constraints[i].fieldName == "EAN") {
            EAN = constraints[i].initialValue;
          }
          if (constraints[i].fieldName == "DESCRICAO") {
            DESCRICAO = constraints[i].initialValue;
          }
          if (constraints[i].fieldName == "EMB_PED") {
            EMB_PED = constraints[i].initialValue;
          }
          if (constraints[i].fieldName == "QTD_PED") {
            QTD_PED = constraints[i].initialValue;
          }
          if (constraints[i].fieldName == "EMB_FAT") {
            EMB_FAT = constraints[i].initialValue;
          }
          if (constraints[i].fieldName == "QTD_FAT") {
            QTD_FAT = constraints[i].initialValue;
          }
          if (constraints[i].fieldName == "EMB_REC") {
            EMB_REC = constraints[i].initialValue;
          }
          if (constraints[i].fieldName == "QTD_REC1") {
            QTD_REC1 = constraints[i].initialValue;
          }
          if (constraints[i].fieldName == "QTD_REC2") {
            QTD_REC2 = constraints[i].initialValue;
          }
          if (constraints[i].fieldName == "QTD_CENTRAL3") {
            QTD_CENTRAL3 = constraints[i].initialValue;
          }
          if (constraints[i].fieldName == "VALIDADE") {
            VALIDADE = constraints[i].initialValue;
          }
          if (constraints[i].fieldName == "SIT") {
            SIT = constraints[i].initialValue;
          }
          if (constraints[i].fieldName == "EXISTE_PAR") {
            EXISTE_PAR = constraints[i].initialValue;
          }
          if (constraints[i].fieldName == "DOCA") {
            DOCA = constraints[i].initialValue;
          }
          if (constraints[i].fieldName == "NOME") {
            NOME = constraints[i].initialValue;
          }
          if (constraints[i].fieldName == "OPERADOR") {
            OPERADOR = constraints[i].initialValue;
          }
          if (constraints[i].fieldName == "PLACA") {
            PLACA = constraints[i].initialValue;
          }
          if (constraints[i].fieldName == "VALIDADE_FORMATRMS") {
            VALIDADE_FORMATRMS = constraints[i].initialValue;
          }
        } //final for;

        var sql = "SELECT " +
          "ID,FILIAL_SEMDIG,ATIVIDADE,CODPROD,EAN,DESCRICAO,EMB_PED,QTD_PED,EMB_FAT,QTD_FAT,EMB_REC,QTD_REC1,QTD_REC2,QTD_CENTRAL3,EXISTE_PAR,VALIDADE,SIT,RIT_DT_VALID_RMS,DOCA,PLACA,OPERADOR,NOME_OPERADOR,DATA_CADASTRO_TAB,DATA_ULT_ALTERACAO_TAB,USER_CADASTRO,FLG_INTEGRACAO_01,FLG_INTEGRACAO_02,FLG_EMAIL_ENVIADO,FLGATIVO " +
          "FROM ti_audit_receb_cargas_ctrl A WHERE 1=1 " +
          "AND A.filial_semdig = '" + FILIAL_SEMDIG + "' " +
          "AND A.atividade = '" + ATIVIDADE + "' " +
          "AND A.DOCA = '" + DOCA + "' " +
          "AND A.codprod = '" + CODPROD + "' " +
          "AND A.DATA_RECEBIMENTO = '" + DATA_FORMATRMS + "' " +
          "AND A.FLGATIVO = 'A' ";

        var ds = DatasetFactory.getDataset("ds_sql_fluig", [sql], null, null);
        if (ds.rowsCount > 0) {
          let ID = ds.getValue(0, "ID");
          //UPDATE;
          let queryUpdate = "BEGIN UPDATE TI_AUDIT_RECEB_CARGAS_CTRL A SET A.qtd_central3 = '" + VOLUME_AUDITADO + "' , A.DATA_ULT_ALTERACAO_TAB = TO_DATE('" + retorna_formatadoDataHoraAtual() + "','DD/MM/YYYY HH24:MI:SS') , A.USER_CADASTRO = '" + USUARIO_LOGADO + "' WHERE 1=1 " +
            "AND A.ID = '" + ID + "' " +
            "AND A.ATIVIDADE = '" + ATIVIDADE + "' " +
            "AND A.CODPROD = '" + CODPROD + "' ; END;";

          let rowUpdate = fDML_FLUIG(queryUpdate);
          let dsSTATUS = rowUpdate.getValue(0, "STATUS");
          let dsMSG = rowUpdate.getValue(0, "MSG");

          if (dsSTATUS == "OKPASS") {
            dataset.addRow(new Array(false, "OKPASS", "Registro executado com sucesso!"));
          } else {
            dataset.addRow(new Array(true, "ERROR", dsMSG));
          };

        } else {
          //INSERT;
          let queryInsert = "BEGIN INSERT INTO TI_AUDIT_RECEB_CARGAS_CTRL (FILIAL_SEMDIG,ATIVIDADE,CODPROD,EAN,DESCRICAO,EMB_PED,QTD_PED,EMB_FAT,QTD_FAT,EMB_REC,QTD_REC1,QTD_REC2,QTD_CENTRAL3,EXISTE_PAR,VALIDADE,SIT,RIT_DT_VALID_RMS,DOCA,PLACA,OPERADOR,NOME_OPERADOR,DATA_RECEBIMENTO,USER_CADASTRO) " +
            "VALUES('" + FILIAL_SEMDIG + "','" + ATIVIDADE + "','" + CODPROD + "','" + EAN + "','" + DESCRICAO + "','" + EMB_PED + "','" + QTD_PED + "','" + EMB_FAT + "','" + QTD_FAT + "','" + EMB_REC + "','" + QTD_REC1 + "','" + QTD_REC2 + "','" + VOLUME_AUDITADO + "','" + EXISTE_PAR + "','" + VALIDADE + "','" + SIT + "','" + VALIDADE_FORMATRMS + "','" + DOCA + "','" + PLACA + "','" + OPERADOR + "','" + NOME + "','" + DATA_FORMATRMS + "','" + USUARIO_LOGADO + "'); END;";
          let rowInsert = fDML_FLUIG(queryInsert);
          let dsSTATUS = rowInsert.getValue(0, "STATUS");
          let dsMSG = rowInsert.getValue(0, "MSG");

          if (dsSTATUS == "OKPASS") {
            dataset.addRow(
              new Array(false, "OKPASS", "Registro executado com sucesso!")
            );
          } else {
            dataset.addRow(new Array(true, "ERROR", dsMSG));
          }
        }
      } catch (e) {
        log.error(
          'Encontrei um erro em ds_audit_recebimento_cargas_widget catch(e) fieldName=="GET" && initialValue=="CRITICA_RECEBIMENTOS" ERRO==>' +
          e
        );
      }
      return dataset;
    }
  } //final if constraints;
} // final createDataset;

function substituirDecimal(valor_string, decimal) {
  var ambiente = DatasetFactory.getDataset("ds_get_servidor", null, null, null);
  let nome_ambiente = ambiente.getValue(0, "ambiente") || "";
  let row_decimal = nome_ambiente == "producao" ? "," : decimal;
  return valor_string.replace(",", row_decimal).replace(".", row_decimal);
} //final substituirDecimal;

//Formata para o RMS 1220707, originado de New Date;
function dataFormatoRMS(data) {
  var resposta;
  var ano;
  var mes;
  var dia;

  ano = data.getFullYear().toString().substr(2, 2);
  mes = pad(data.getMonth() + 1);
  dia = pad(data.getDate());

  resposta = "1" + ano + mes + dia;

  return resposta;
} //dataFormatoRMS(data);

function pad(num) {
  var res = num;
  if (num < 10) {
    res = "0" + num;
  }

  return res;
} // final pad;

function fDML_FLUIG(myQuery) {
  var dsNewDataset = DatasetBuilder.newDataset();
  dsNewDataset.addColumn("STATUS");
  dsNewDataset.addColumn("MSG");

  log.info(
    "[ds_audit_recebimento_cargas_widget] [fDML_FLUIG] QUERY: " + myQuery
  );

  try {
    var dataSource = "/jdbc/FluigDS";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    var conn = ds.getConnection();
    var stmt = conn.createStatement();
    stmt.setQueryTimeout(1800);
    var rs = stmt.execute(myQuery);
    dsNewDataset.addRow(new Array("OKPASS", rs));
  } catch (e) {
    dsNewDataset.addRow(new Array("ERRO", e.message));
    log.error("ERRO==============> " + e.message);
  } finally {
    if (stmt != null) {
      stmt.close();
    }
    if (conn != null) {
      conn.close();
    }
  }

  return dsNewDataset;
} //final fDML_FLUIG_UPDATE();

function fDML_RMS(myQuery) {
  var dsNewDataset = DatasetBuilder.newDataset();
  dsNewDataset.addColumn("STATUS");
  dsNewDataset.addColumn("MSG");

  var dsNewDataset = DatasetBuilder.newDataset();
  var dataSource = "/jdbc/FluigDSRMS";
  var ic = new javax.naming.InitialContext();
  var ds = ic.lookup(dataSource);
  var created = false;
  log.info("[ds_audit_recebimento_cargas_widget] [fDML_RMS] QUERY: " + myQuery);

  try {
    var conn = ds.getConnection();
    var stmt = conn.createStatement();
    stmt.setQueryTimeout(1800);
    var rs = stmt.execute(myQuery);
    dsNewDataset.addRow(new Array("OKPASS", rs));
  } catch (e) {
    dsNewDataset.addRow(new Array("ERRO", e.message));
    log.error("ERRO==============> " + e.message);
  } finally {
    if (stmt != null) {
      stmt.close();
    }
    if (conn != null) {
      conn.close();
    }
  }
  return dsNewDataset;
} //final fDML_RMS();
function retorna_formatadoDataHoraAtual() {
  var data = new Date();
  var dia = data.getDate().toString();
  var diaF = dia.length == 1 ? "0" + dia : dia;
  var mes = (data.getMonth() + 1).toString(); // +1 pois no getMonth Janeiro começa com zero.
  var mesF = mes.length == 1 ? "0" + mes : mes;
  var anoF = data.getFullYear();
  var hora = data.getHours().toString();
  var horaF = hora.length == 1 ? "0" + hora : hora;
  var min = data.getMinutes().toString();
  var minF = min.length == 1 ? "0" + min : min;
  var seg = data.getSeconds().toString();
  var segF = seg.length == 1 ? "0" + seg : seg;

  return diaF + "/" + mesF + "/" + anoF + " " + horaF + ":" + minF + ":" + segF;
} //final retorna_formatadoDataHoraAtual();

//Formata para o RMS 1220707, originado de input;
function inputString_para_RMS(paramdata) {
  ano = paramdata.substr(6, 4);
  mes = paramdata.substr(3, 2);
  dia = paramdata.substr(0, 2);
  var data = new Date([ano, mes, dia]);
  var ano = data.getFullYear().toString().substr(2, 4);
  var mes = (data.getMonth() + 1).toString();
  var dia = data.getDate().toString();
  var novaData = "1" + ano + pad(mes) + pad(dia);

  return novaData;
} //final dateto_rms7;

// var crmDataTable = {
//   makeQuery: function () {
//     var PERIODO_FORMATRMS;
//     var FILIAL_SEMDIG;
//     return (
//       "SELECT " +
//       "MVG_FILIAL, " +
//       "MVG_DAT_ALTER, " +
//       "MVG_COD_ITEM, " +
//       "MVG_COD_EAN13, " +
//       "MVG_SECAO, " +
//       "MVG_LOTE, " +
//       "MVG_PRECO_ATUAL, " +
//       "MVG_PRECO_NOVO, " +
//       "GIT_DESC_REDUZ " +
//       "FROM FLUIG.TI_AUDITORIA_GONDOLA_MIX "
//       //   "WHERE MVG_FILIAL = '" +
//       //   FILIAL_SEMDIG +
//       //   "' " +
//       //   "AND DATA_CADASTRO_TAB = '" +
//       //   PERIODO_FORMATRMS +
//       //   "'"
//     );
//   },

//   createDataset: function (fields, constraints, sortFields) {
//     var dataset = DatasetBuilder.newDataset();
//     var sqlQuery = this.makeQuery();
//     var retornoDB = DatasetFactory.getDataset(
//       "ds_sql_fluig",
//       [sqlQuery],
//       null,
//       null
//     );

//     // Adicionar colunas ao dataset
//     var columns = [
//       "MVG_FILIAL",
//       "MVG_DAT_ALTER",
//       "MVG_COD_ITEM",
//       "MVG_COD_EAN13",
//       "MVG_SECAO",
//       "MVG_LOTE",
//       "MVG_PRECO_ATUAL",
//       "MVG_PRECO_NOVO",
//       "GIT_DESC_REDUZ",
//       "DATA_CADASTRO_TAB",
//     ];
//     log.dir(columns);

//     for (var i = 0; i < columns.length; i++) {
//       dataset.addColumn(columns[i]);
//     }
//     // Preencher o dataset com os dados da consulta
//     for (var i = 0; i < retornoDB.rowsCount; i++) {
//       var rowData = [];
//       for (var j = 0; j < columns.length; j++) {
//         rowData.push(retornoDB.getValue(i, columns[j]));
//       }
//       dataset.addRow(rowData);
//     }
//     return dataset;
//   },
// };

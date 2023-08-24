//! Classe responsavel pelas chamadas feitas no servido responsável por abstrair as regras de negócio e controlar o acesso aos dados.
class Services {
  constructor(){
    console.log('Class Services Entrei.');
  };//final constructor;

/*
* TODO:[]- AQUI PERCEBEMOS QUE ESTÁ SENDO MONTADO OS PADRÕES DE CONSULTA DA APLICAÇÃO (Configurar conforme necessário)
**/

  async getRowsRecebimentosCargas(PERIODO_FORMATRMS,STATUS_RECEB,FILIAL_SEMDIG){
    return new Promise((resolve, reject)=>{
      try {
        //STATUS --'FC';
        let parametros = new Array();
        parametros.push(DatasetFactory.createConstraint("GET","RECEBIMENTOS", "RECEBIMENTOS", ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint("PERIODO_FORMATRMS",PERIODO_FORMATRMS, PERIODO_FORMATRMS, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint("STATUS_RECEB",STATUS_RECEB, STATUS_RECEB, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint("FILIAL_SEMDIG",FILIAL_SEMDIG, FILIAL_SEMDIG, ConstraintType.MUST));
        DatasetFactory.getDataset('ds_audit_recebimento_cargas_widget', null, parametros, null, {
          success: function (content){
            let { values } = content;
            if (!values.length) return resolve([]);
            if (values[0].ERRO) return reject(new Error(values[0].DETALHES));
            return resolve(values);
          },
          error: function (jqXHR, textStatus, errorThrown){
            console.error(jqXHR, textStatus, errorThrown);
            throw reject(new Error(errorThrown));
          },
        });

      }catch(e){
        return reject(new Error(e));
      };
    });
  };//final getRowsRecebimentosCargas;

  async getRowsRecebimentosDetalhesCargas(ATIVIDADE,FILIAL_SEMDIG,DATA_FORMATRMS){
    return new Promise((resolve, reject)=>{
      try {
        let parametros = new Array();
        parametros.push(DatasetFactory.createConstraint('GET','DET_RECEBIMENTOS', 'DET_RECEBIMENTOS', ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('ATIVIDADE', ATIVIDADE, ATIVIDADE, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('FILIAL_SEMDIG', FILIAL_SEMDIG, FILIAL_SEMDIG, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('DATA_FORMATRMS', DATA_FORMATRMS, DATA_FORMATRMS, ConstraintType.MUST));
        DatasetFactory.getDataset('ds_audit_recebimento_cargas_widget', null, parametros, null, {
          success: function (content){
            let { values } = content;
            if (!values.length) return resolve([]);
            if (values[0].ERRO) return reject(new Error(values[0].DETALHES));
            return resolve(values);
          },
          error: function (jqXHR, textStatus, errorThrown){
            console.error(jqXHR, textStatus, errorThrown);
            throw reject(new Error(errorThrown));
          },
        });

      }catch(e){
        return reject(new Error(e));
      };
    });
  };//final getRowsRecebimentosDetalhesCargas;

  async getCriticasRowsRecebimentosCargas(PERIODO_FORMATRMS,STATUS_RECEB,FILIAL_SEMDIG){
    return new Promise((resolve, reject)=>{
      try {
        //STATUS --'FC';
        let parametros = new Array();
        parametros.push(DatasetFactory.createConstraint("GET","CRITICA_RECEBIMENTOS", "CRITICA_RECEBIMENTOS", ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint("PERIODO_FORMATRMS",PERIODO_FORMATRMS, PERIODO_FORMATRMS, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint("STATUS_RECEB",STATUS_RECEB, STATUS_RECEB, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint("FILIAL_SEMDIG",FILIAL_SEMDIG, FILIAL_SEMDIG, ConstraintType.MUST));
        DatasetFactory.getDataset('ds_audit_recebimento_cargas_widget', null, parametros, null, {
          success: function (content){
            let { values } = content;
            if (!values.length) return resolve([]);
            if (values[0].ERRO) return reject(new Error(values[0].DETALHES));
            return resolve(values);
          },
          error: function (jqXHR, textStatus, errorThrown){
            console.error(jqXHR, textStatus, errorThrown);
            throw reject(new Error(errorThrown));
          },
        });

      }catch(e){
        return reject(new Error(e));
      };
    });
  };//final getCriticasRowsRecebimentosCargas;

  async putRegistroAuditoria(vARR){
    console.log('putRegistroAuditoria() Entrei: ',vARR);
    return new Promise((resolve, reject)=>{
      try {
        let parametros = new Array();

        let ATIVIDADE = vARR[0].ATIVIDADE;
        let FILIAL_SEMDIG = vARR[0].FILIAL_SEMDIG;
        let DATA_FORMATRMS = vARR[0].DATA_FORMATRMS;
        let VOLUME_AUDITADO = vARR[0].VOLUME_AUDITADO;
        let USUARIO_LOGADO = WCMAPI.getUserCode(); 
        let DOCA = vARR[0].DOCA;
        let CODPROD = vARR[0].TD_PRODUTO;
        let EAN = vARR[0].TD_EAN;
        let DESCRICAO = vARR[0].TD_DESCRICAO;
        let EMB_PED = vARR[0].TD_EMB_PED;
        let QTD_PED = vARR[0].TD_QTD_PED;
        let EMB_FAT = vARR[0].TD_EMB_FAT;
        let QTD_FAT = vARR[0].TD_QTD_FAT;
        let EMB_REC = vARR[0].TD_EMB_REC;
        let QTD_REC1 = vARR[0].TD_QTD_REC1;
        let QTD_REC2 = vARR[0].TD_QTD_REC2;
        let QTD_CENTRAL3 = vARR[0].TD_QTDE_CENTRAL3;
        let VALIDADE = vARR[0].TD_VALIDADE;
        let SIT = vARR[0].TD_SIT;
        let EXISTE_PAR = vARR[0].TD_EXISTE_PAR;

        let NOME = vARR[0].NOME;
        let OPERADOR = vARR[0].OPERADOR;
        let PLACA = vARR[0].PLACA;
        let VALIDADE_FORMATRMS = vARR[0].VALIDADE_FORMATRMS;
        let DATA_RECEBIMENTO = vARR[0].DATA_RECEBIMENTO;

        parametros.push(DatasetFactory.createConstraint('PUT','CONTROLE_RECEBIMENTOS', 'CONTROLE_RECEBIMENTOS', ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('ATIVIDADE', ATIVIDADE, ATIVIDADE, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('FILIAL_SEMDIG', FILIAL_SEMDIG, FILIAL_SEMDIG, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('DATA_FORMATRMS', DATA_FORMATRMS, DATA_FORMATRMS, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('VOLUME_AUDITADO', VOLUME_AUDITADO, VOLUME_AUDITADO, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('USUARIO_LOGADO', USUARIO_LOGADO, USUARIO_LOGADO, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('DOCA', DOCA, DOCA, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('CODPROD', CODPROD, CODPROD, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('EAN', EAN, EAN, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('DESCRICAO', DESCRICAO, DESCRICAO, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('EMB_PED', EMB_PED, EMB_PED, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('QTD_PED', QTD_PED, QTD_PED, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('EMB_FAT', EMB_FAT, EMB_FAT, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('QTD_FAT', QTD_FAT, QTD_FAT, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('EMB_REC', EMB_REC, EMB_REC, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('QTD_REC1', QTD_REC1, QTD_REC1, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('QTD_REC2', QTD_REC2, QTD_REC2, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('QTD_CENTRAL3', QTD_CENTRAL3, QTD_CENTRAL3, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('VALIDADE', VALIDADE, VALIDADE, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('SIT', SIT, SIT, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('EXISTE_PAR', EXISTE_PAR, EXISTE_PAR, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('NOME', NOME, NOME, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('OPERADOR', OPERADOR, OPERADOR, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('PLACA', PLACA, PLACA, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('VALIDADE_FORMATRMS', VALIDADE_FORMATRMS, VALIDADE_FORMATRMS, ConstraintType.MUST));
        parametros.push(DatasetFactory.createConstraint('DATA_RECEBIMENTO', DATA_RECEBIMENTO, DATA_RECEBIMENTO, ConstraintType.MUST));
        DatasetFactory.getDataset('ds_audit_recebimento_cargas_widget', null, parametros, null, {
          success: function (content){
            let { values } = content;
            if (!values.length) return resolve([]);
            if (values[0].ERRO) return reject(new Error(values[0].DETALHES));
            return resolve(values);
          },
          error: function (jqXHR, textStatus, errorThrown){
            console.error(jqXHR, textStatus, errorThrown);
            throw reject(new Error(errorThrown));
          },
        });
      }catch(e){
        return reject(new Error(e));
      };
    });
  };//final putRegistroAuditoria();

};
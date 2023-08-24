/**
 * 
 */
class View{

  constructor(obj){
    this.alreadyStarted = false;
  };

  async fCHAMAMODAL_VIEW(array){
    console.log('Entrei fCHAMAMODAL_VIEW()');
    console.log('array: ',array);
  
    if(array.length > 0){

      let infoDET ;
      var modalDetalhes ;
      var modal_ATIVIDADE = array[0].ATIVIDADE;
      var modal_FILIAL_SEMDIG = array[0].FILIAL_SEMDIG;
      var modal_DATA_FORMATRMS = array[0].DATA_FORMATRMS;
      var modal_DOCA = array[0].DOCA;
      var modal_PLACA = array[0].PLACA;
      var modal_OPERADOR = array[0].OPERADOR;
      var modal_NOMEOPERADOR = array[0].NOME_OPERADOR;
      console.log('Class View: ATIVIDADE: '+modal_ATIVIDADE+' FILIAL_SEMDIG:'+modal_FILIAL_SEMDIG+' '+modal_DATA_FORMATRMS);
  
      var tableLoading = FLUIGC.loading('.tbl-item');
      tableLoading.show();
   
      try {
        infoDET = await services.getRowsRecebimentosDetalhesCargas(modal_ATIVIDADE,modal_FILIAL_SEMDIG,modal_DATA_FORMATRMS);
        if(infoDET.length){
          console.log('Retorno a ser listado no painel: ', infoDET);
          tableLoading.hide();
          let table_content = ``;
          for(var r=0; r < infoDET.length; r++){
            
            let ATIVIDADE_B = infoDET[r].ATIVIDADE;
            let CODPROD = infoDET[r].CODPROD;
            let EAN = infoDET[r].EAN;
            let DESCRICAO = infoDET[r].DESCRICAO;
            let DESCRICAO_COMPLETA = infoDET[r].DESCRICAO_COMPLETA;
            let EMB_PED = infoDET[r].EMB_PED;
            let QTD_PED = infoDET[r].QTD_PED;
            let EMB_FAT = infoDET[r].EMB_FAT;
            let QTD_FAT = infoDET[r].QTD_FAT;
            let EMB_REC = infoDET[r].EMB_REC;
            let QTD_REC1 = infoDET[r].QTD_REC1;
            let QTD_REC2 = infoDET[r].QTD_REC2;
            let QTD_REC3 = infoDET[r].QTD_REC3; //val se existe cadastro central;
            let QTD_CENTRAL3 = `<input name="VALUE_CENTRAL_${r}" id="VALUE_CENTRAL_${r}" class="form-control auditcentral VALUE_CENTRAL_${r}" type="text" value="${QTD_REC3}">`;
            let VALIDADE = infoDET[r].VALIDADE;
            let SIT = infoDET[r].SIT;
            let EXISTE_PAR = infoDET[r].EXISTE_PAR;
            let VALIDADE_FORMATRMS = infoDET[r].VALIDADE_FORMATRMS;
            let DATA_RECEBIMENTO = infoDET[r].DATA_RECEBIMENTO;

            /*====================== GERAR TABELA COM DIFERENÇAS ========================*/
            if( QTD_PED == QTD_FAT && QTD_PED == QTD_REC1 && QTD_PED == QTD_REC3 ){
              table_content += `<tr id="IDTR_AUDITADOOK_${r}" name="IDTR_AUDITADOOK_${r}" class="IDTR_AUDITADOOK tr-auditadook IDTR_${r}">
                                  <td id="IDTD_CODPROD_${r}">${CODPROD}</td>
                                  <td id="IDTD_EAN_${r}">${EAN}</td>
                                  <td id="IDTD_DESCRICAO_${r}" title="${DESCRICAO_COMPLETA}">${DESCRICAO}</td>
                                  <td id="IDTD_EMB_PED_${r}">${EMB_PED}</td>
                                  <td id="IDTD_QTD_PED_${r}">${QTD_PED}</td>
                                  <td id="IDTD_EMB_FAT_${r}">${EMB_FAT}</td>
                                  <td id="IDTD_QTD_FAT_${r}">${QTD_FAT}</td>
                                  <td id="IDTD_EMB_REC_${r}">${EMB_REC}</td>
                                  <td id="IDTD_QTD_REC1_${r}">${QTD_REC1}</td>
                                  <td id="IDTD_QTD_REC2_${r}">${QTD_REC2}</td>
                                  <td id="IDTD_QTD_CENTRAL3_${r}">${QTD_CENTRAL3}</td>
                                  <td id="IDTD_VALIDADE_${r}">${VALIDADE}</td>
                                  <td id="IDTD_SIT_${r}">${SIT}</td>
                                  <td id="IDTD_EXISTE_PAR_${r}">${EXISTE_PAR}</td>
                                  <td id="IDTD_VALIDADE_FORMATRMS_${r}" style="display:none;">${VALIDADE_FORMATRMS}</td>
                                  <td id="IDTD_DATA_RECEBIMENTO_${r}" style="display:none;">${DATA_RECEBIMENTO}</td>
                                </tr>`;
            }else if( QTD_FAT != QTD_REC1 ){
              table_content += `<tr id="IDTR_DIVERGENTE_${r}" name="IDTR_DIVERGENTE_${r}" class="IDTR_DIVERGENTE IDTR_${r}">
                                  <td id="IDTD_CODPROD_${r}">${CODPROD}</td>
                                  <td id="IDTD_EAN_${r}">${EAN}</td>
                                  <td id="IDTD_DESCRICAO_${r}" title="${DESCRICAO_COMPLETA}">${DESCRICAO}</td>
                                  <td id="IDTD_EMB_PED_${r}">${EMB_PED}</td>
                                  <td id="IDTD_QTD_PED_${r}">${QTD_PED}</td>
                                  <td id="IDTD_EMB_FAT_${r}">${EMB_FAT}</td>
                                  <td id="IDTD_QTD_FAT_${r}">${QTD_FAT}</td>
                                  <td id="IDTD_EMB_REC_${r}">${EMB_REC}</td>
                                  <td id="IDTD_QTD_REC1_${r}">${QTD_REC1}</td>
                                  <td id="IDTD_QTD_REC2_${r}">${QTD_REC2}</td>
                                  <td id="IDTD_QTD_CENTRAL3_${r}">${QTD_CENTRAL3}</td>
                                  <td id="IDTD_VALIDADE_${r}">${VALIDADE}</td>
                                  <td id="IDTD_SIT_${r}">${SIT}</td>
                                  <td id="IDTD_EXISTE_PAR_${r}">${EXISTE_PAR}</td>
                                  <td id="IDTD_VALIDADE_FORMATRMS_${r}" style="display:none;">${VALIDADE_FORMATRMS}</td>
                                  <td id="IDTD_DATA_RECEBIMENTO_${r}" style="display:none;">${DATA_RECEBIMENTO}</td>
                                </tr>`;

            }else if( (QTD_FAT == QTD_REC1) && (QTD_FAT == QTD_REC2) ){
              table_content += `<tr id="IDTR_OK_${r}" name="IDTR_OK_${r}" class="IDTR_OK IDTR_${r}">
                                <td id="IDTD_CODPROD_${r}">${CODPROD}</td>
                                <td id="IDTD_EAN_${r}">${EAN}</td>
                                <td id="IDTD_DESCRICAO_${r}" title="${DESCRICAO_COMPLETA}">${DESCRICAO}</td>
                                <td id="IDTD_EMB_PED_${r}">${EMB_PED}</td>
                                <td id="IDTD_QTD_PED_${r}">${QTD_PED}</td>
                                <td id="IDTD_EMB_FAT_${r}">${EMB_FAT}</td>
                                <td id="IDTD_QTD_FAT_${r}">${QTD_FAT}</td>
                                <td id="IDTD_EMB_REC_${r}">${EMB_REC}</td>
                                <td id="IDTD_QTD_REC1_${r}">${QTD_REC1}</td>
                                <td id="IDTD_QTD_REC2_${r}">${QTD_REC2}</td>
                                <td id="IDTD_QTD_CENTRAL3_${r}">${QTD_CENTRAL3}</td>
                                <td id="IDTD_VALIDADE_${r}">${VALIDADE}</td>
                                <td id="IDTD_SIT_${r}">${SIT}</td>
                                <td id="IDTD_EXISTE_PAR_${r}">${EXISTE_PAR}</td>
                                <td id="IDTD_VALIDADE_FORMATRMS_${r}" style="display:none;">${VALIDADE_FORMATRMS}</td>
                                <td id="IDTD_DATA_RECEBIMENTO_${r}" style="display:none;">${DATA_RECEBIMENTO}</td>
                              </tr>`;
            }else{
              table_content += `<tr id="IDTR_${r}" name="IDTR_${r}" class="IDTR_${r}">
                                <td id="IDTD_CODPROD_${r}">${CODPROD}</td>
                                <td id="IDTD_EAN_${r}">${EAN}</td>
                                <td id="IDTD_DESCRICAO_${r}" title="${DESCRICAO_COMPLETA}">${DESCRICAO}</td>
                                <td id="IDTD_EMB_PED_${r}">${EMB_PED}</td>
                                <td id="IDTD_QTD_PED_${r}">${QTD_PED}</td>
                                <td id="IDTD_EMB_FAT_${r}">${EMB_FAT}</td>
                                <td id="IDTD_QTD_FAT_${r}">${QTD_FAT}</td>
                                <td id="IDTD_EMB_REC_${r}">${EMB_REC}</td>
                                <td id="IDTD_QTD_REC1_${r}">${QTD_REC1}</td>
                                <td id="IDTD_QTD_REC2_${r}">${QTD_REC2}</td>
                                <td id="IDTD_QTD_CENTRAL3_${r}">${QTD_CENTRAL3}</td>
                                <td id="IDTD_VALIDADE_${r}">${VALIDADE}</td>
                                <td id="IDTD_SIT_${r}">${SIT}</td>
                                <td id="IDTD_EXISTE_PAR_${r}">${EXISTE_PAR}</td>
                                <td id="IDTD_VALIDADE_FORMATRMS_${r}" style="display:none;">${VALIDADE_FORMATRMS}</td>
                                <td id="IDTD_DATA_RECEBIMENTO_${r}" style="display:none;">${DATA_RECEBIMENTO}</td>
                              </tr>`;
            };//final if/else;
          };//final for;
          
          modalDetalhes = FLUIGC.modal({
            title: `...`,
            content: `<div class="panel panel-primary">
                        <div class="panel-heading">
                            <h3 class="panel-title">Detalhe da Atividade</h3>
                        </div>
                        <div class="panel-body">
                            <div class="form-group col-md-1">
                                <label for="txtBem">Atividade.:</label>
                                <input type="text" name="input_atividade" id="input_atividade" class="form-control" value=" ${modal_ATIVIDADE} "/>
                                <input type="hidden" name="input_atividade" id="input_atividade" value=" ${modal_ATIVIDADE} "/>
                                <input type="hidden" name="input_atividade" id="input_atividade" value=" ${modal_ATIVIDADE} "/>
                                <input type="hidden" name="input_atividade" id="input_atividade" value=" ${modal_ATIVIDADE} "/>
                                <input type="hidden" name="input_atividade" id="input_atividade" value=" ${modal_ATIVIDADE} "/>
                                <input type="hidden" name="input_atividade" id="input_atividade" value=" ${modal_ATIVIDADE} "/>
                                <input type="hidden" name="input_atividade" id="input_atividade" value=" ${modal_ATIVIDADE} "/>
                            </div>
                            <div class="form-group col-md-1">
                                <label for="txtDescBem">Doca:</label>  
                                <input type="text" name="input_doca" id="input_doca" class="form-control" readonly="readonly" value=" ${modal_DOCA} "/>
                            </div>
                            <div class="form-group col-md-1">
                                <label for="txtCC">Placa:</label>  
                                <input type="text" name="input_placa" id="input_placa" class="form-control" readonly="readonly" value=" ${modal_PLACA} "/>
                            </div>
                            <div class="form-group col-md-1">
                                <label for="txtDescCC">Operador:</label>  
                                <input type="text" name="input_operador" id="input_operador" class="form-control" readonly="readonly" value=" ${modal_OPERADOR} "/>
                            </div>
                            <div class="form-group col-md-3">
                                <label for="txtDescCC">Nome Operador:</label>  
                                <input type="text" name="input_nomeoperador" id="input_nomeoperador" class="form-control" readonly="readonly" value=" ${modal_NOMEOPERADOR} "/>
                            </div>
                            <div class="form-group">
                              <table id="TABLE_RECEBIMENTO_DETALHES" class="table table-hover">
                                <thead>
                                  <tr>
                                    <th>PRODUTO</th>
                                    <th>EAN</th>
                                    <th>DESCRICAO</th>
                                    <th>EMB PED</th>
                                    <th>QTDE PED</th>
                                    <th>EMB FAT</th>
                                    <th>QTDE FAT</th>
                                    <th>EMB REC</th>
                                    <th>QTDE1 REC</th>
                                    <th>QTDE2 REC</th>
                                    <th>QTDE3 CENTRAL</th>
                                    <th>VALIDADE</th>
                                    <th>SIT</th>
                                    <th>P.A.R</th>
                                  </tr>
                                </thead>
                                <tbody id="TABLE_RECEBIMENTO_DETALHES_TBODY">
                                  ${table_content}
                                </tbody>
                              </table>
                            </div>  
                        </div>
                    </div>`,
            id: 'fluigModalDetalhesRecebimento',
            size: 'full',
            actions: [{
                'label': 'Close',
                'autoClose': true
            }]
          });
          //REMOVEDOR DE LETRAS DE UM INPUT:
          $('.auditcentral').on('input', function(){
            let regex = new RegExp('[^ 0-9\b]', 'g');
            $(this).val($(this).val().replace(regex, ''));
          });

          /*====================== BOTÃO INSERT VALUE INPUT AUDITORIA CENTRAL =====================*/
          $("input[id^='VALUE_CENTRAL_']").change(async function(){
            let vARR = [];
            let volumeDigitado = $(this).val();
            let index = $(this).index();
            let idx = ($(this).attr("class").split("_")[2]).toString();            
            if(volumeDigitado == null || volumeDigitado == '' || volumeDigitado == ' ' ){
              console.log('Campo Null ou com Espaços, Zerando campo.')
              volumeDigitado = 0;
              $(this).val(0);
            };
            vARR.push({
              VOLUME_AUDITADO: volumeDigitado,
              INDEX: index,
              IDX: idx,
              FILIAL_SEMDIG: modal_FILIAL_SEMDIG,
              DATA_FORMATRMS: modal_DATA_FORMATRMS,
              ATIVIDADE: modal_ATIVIDADE,
              DOCA: modal_DOCA,
              PLACA: modal_PLACA,
              OPERADOR: modal_OPERADOR,
              NOME: modal_NOMEOPERADOR,
              TD_PRODUTO: $("#IDTD_CODPROD_"+idx).text(),
              TD_EAN: $("#IDTD_EAN_"+idx).text(),
              TD_DESCRICAO: $("#IDTD_DESCRICAO_"+idx).text().trim(),
              TD_EMB_PED: $("#IDTD_EMB_PED_"+idx).text(),
              TD_QTD_PED: $("#IDTD_QTD_PED_"+idx).text(),
              TD_EMB_FAT: $("#IDTD_EMB_FAT_"+idx).text(),
              TD_QTD_FAT: $("#IDTD_QTD_FAT_"+idx).text(),
              TD_EMB_REC: $("#IDTD_EMB_REC_"+idx).text(),
              TD_QTD_REC1: $("#IDTD_QTD_REC1_"+idx).text(),
              TD_QTD_REC2: $("#IDTD_QTD_REC2_"+idx).text(),
              TD_QTDE_CENTRAL3: $("#IDTD_QTD_CENTRAL3_"+idx).text(),
              TD_VALIDADE: $("#IDTD_VALIDADE_"+idx).text(),
              TD_SIT: $("#IDTD_SIT_"+idx).text(),
              TD_EXISTE_PAR: $("#IDTD_EXISTE_PAR_"+idx).text(),
              USUARIO_LOGADO: WCMAPI.getUserCode(),
              VALIDADE_FORMATRMS: $("#IDTD_VALIDADE_FORMATRMS_"+idx).text(),
              DATA_RECEBIMENTO: $("#IDTD_DATA_RECEBIMENTO_"+idx).text()
            });
            console.log('JSON_CLICK: ',vARR);
            let dsServices = await services.putRegistroAuditoria(vARR);
            console.log('dsServices: ',dsServices);

            if(dsServices.length > 0){
              let ERRO = dsServices[0].ERRO;
              let MSG = dsServices[0].MSG;
              let DETALHES = dsServices[0].DETALHES;
              let PROD = $("#IDTD_CODPROD_"+idx).text();
              if(!(ERRO) && MSG == "OKPASS"){
                FLUIGC.toast({
                  title: 'Valor: '+volumeDigitado+' atualizado com sucesso! Produto:'+PROD+' Atividade:'+modal_ATIVIDADE,
                  message: '',
                  type: 'success',
                });
              }else{
                FLUIGC.toast({
                  title: '',
                  message: 'ERRO na atualização '+ERRO+' '+MSG+' '+DETALHES+'! Produto'+PROD+' Atividade:'+modal_ATIVIDADE,
                  type: 'error',
                });
              };
            };

          });

        }else{
          tableLoading.hide();
          FLUIGC.toast({
            message: 'Nenhum retorno de detalhes para periodo selecionado foi encontrado.',
            type: 'info',
          });
        };
      }catch(e){
        tableLoading.hide();
        return Utils.unexpectedError('Erro ao preencher a tabela detalhes ', e.message);
      };
    }else{
      console.warn('fCHAMAMODAL_VIEW() está com array zerado.');
    };

  };

  async fNOTIFICA_WIDGET(TITULO,MENSAGEM){
    console.log('fNOTIFICA_WIDGET Entrei;')
    if(TITULO||MENSAGEM){
      let notification = FLUIGC.notification({
        title: TITULO,
        body: MENSAGEM,
        tag: new Date().getTime(),
        icon: 'images/user_picture.png'
      });
      notification.show();
    };
  };

};
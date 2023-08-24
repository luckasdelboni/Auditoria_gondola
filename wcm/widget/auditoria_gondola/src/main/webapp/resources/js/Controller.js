class Controller{
  constructor(obj){
    console.log('Class Controller Entrei.');
    this.fLOADING();
    this.fTECLA_PRESSIONADA(document);
    this.table = null;
    this.sec = $('.secPainel');
    this.alreadyStarted = false;

    /*   Pré-Carregamento   */
    this.DATA_FORMATRMS = Utils.dateto_rms7_2( Utils.fSYSDATE_DDMMYYYY() );
    this.STATUS_ATIVIDADE = "XX";
    this.FILIAL_SEMDIG = '907';

  };

  fLOADING(){

    this.loading = FLUIGC.loading(window, {
      textMessage: 'Aguarde, consultando servidor ...',
      overlayCSS: {
        backgroundColor: '#000',
        "border-radius": '6px',
        opacity: 0.6,
        cursor: 'wait'
      },
      css: {
        "z-index": 1101,
        border: 'inherit',
        "background-color": 'inherit',
      },
      baseZ: 1100,
      fadeIn: 200,
      fadeOut: 400,
      timeout: 0,
    });

  };

  show(){
    this.sec.show();
  };

  hide(){
    this.sec.hide();
  };

  async init(){
    this.loading.show();
    $('.loading-text').html(`Aguarde, carregando painel...`);

    if(!this.alreadyStarted){

      try{
        this.table = await this.newTable('#tblPrincipal');

      }catch(e){
        this.loading.hide();
        return Utils.unexpectedError('Erro ao montar nova tabela', e);
      };

      //Seta Status TODOS no campo filtragem de Status de atividades:
      $('.btn-exibicaostatus').html(`TODOS <span class="caret"></span>`);

      //SELECIONAR STATUS
      $(`.div-btn-exibicaostatus ul li a`).off().on('click', async (element)=>{
        this.STATUS_ATIVIDADE = $(element.currentTarget).data('status'); // status selecionada
        let txtExibS = $(element.currentTarget).data('nome'); // status selecionada
        console.log('Status Selecionado: ',this.STATUS_ATIVIDADE,' ',txtExibS);

        console.log('Opa. Troquei o status');

        //muda o valor de exibição do dropdown
        $('.btn-exibicaostatus').html(`${txtExibS} <span class="caret"></span>`);

        await  this.loadTable(this.DATA_FORMATRMS,this.STATUS_ATIVIDADE,this.FILIAL_SEMDIG);
      });

      //SELECIONAR FILIAL
      $(`.div-btn-exibicaofilial ul li a`).off().on('click', async (element)=>{
        this.FILIAL_SEMDIG = $(element.currentTarget).data('filial'); // status selecionada
        console.log('filial Selecionado: ',this.FILIAL_SEMDIG);

        console.log('Opa. Troquei a filial.');

        //muda o valor de exibição do dropdown
        let txtExibF = this.FILIAL_SEMDIG;
        $('.btn-exibicaofilial').html(`${txtExibF} <span class="caret"></span>`);

        await this.loadTable(this.DATA_FORMATRMS,this.STATUS_ATIVIDADE,this.FILIAL_SEMDIG);

      });

      /*
      FLUIGC.calendar('#DATAPERIODO',{
        minViewMode: 1,
        maxViewMode: 2,
        format: "DD/MM/YYYY",
        defaultDate: moment().subtract(1,'months').format('DD/MM/YYYY')
      });
      */

      FLUIGC.calendar('#DATAPERIODO',{
        pickDate: true,
        pickTime: false,
        /*defaultDate: moment().subtract(1,'months').format('DD/MM/YYYY')*/
        defaultDate: Utils.fSYSDATE_DDMMYYYY()
      });
  
      $('#DATAPERIODO').parent().find('.iconData').off('click').on('click', function(){
        $('#DATAPERIODO').focus().trigger('click');
      });
  
      $('#DATAPERIODO').on('change',async ()=>{
        console.log('Opa. Troquei a data selecionada.');
        this.DATA_FORMATRMS = Utils.dateto_rms7_2($('#DATAPERIODO').val());

        await this.loadTable(this.DATA_FORMATRMS,this.STATUS_ATIVIDADE,this.FILIAL_SEMDIG);

      });

      $("tr").click(function(){
        $('tr').not(this).css({"background-color": "white", "color": "black"});
        $(this).css({"background-color": "#a5d6a7", "color": "red"});
      });
  
      this.alreadyStarted = true;

    };//final não estou editando();

    this.loading.hide();

    await this.loadTable(this.DATA_FORMATRMS,this.STATUS_ATIVIDADE,this.FILIAL_SEMDIG);

  };

  async loadTable(DATA_FORMATRMS,STATUS_ATIVIDADE,FILIAL_SEMDIG){
    var tableLoading = FLUIGC.loading('.tbl-item');
    tableLoading.show();

    try{
      var info = await services.getRowsRecebimentosCargas(DATA_FORMATRMS,STATUS_ATIVIDADE,FILIAL_SEMDIG);
      if (info.length) {
        this.table.clear();

        console.log('Retorno a ser listado no painel: ', info);
        tableLoading.hide();
        this.table.rows.add(info).draw();

        await this.fCRITICAR_RECEBIMENTOS_DATATABLE();

      } else {
        tableLoading.hide();
        this.table.clear().draw();
        FLUIGC.toast({
          message: 'Nenhum retorno do periodo selecionado foi encontrado.',
          type: 'info',
        });
      }
    }catch(e){
      tableLoading.hide();
      return Utils.unexpectedError('Erro ao preencher a tabela', e.message);
    };
  };

  async newTable(table){
    // objeto com informações desta widget para iniciar a tabela
    const objInit = {
      // string de descrição da tabela (singular/plural)
      langDesc: {
        s: 'Auditoria de Gôndola',
        p: 'Auditoria de Gôndola',
      },
      // ordenação inicial da tabela
      objOrder: [[6, 'desc']], // Atividade column

      // dicionário dos dados das colunas
      objColumns: [
        {
          title: 'FILIAL',
          data: 'MVG_FILIAL',
          className: 'text-left text-nowrap',
          width: '1%',
          render: function (data, type, row, meta) {
            if (type != 'display') return data;
            if (!data) return '';

            return `<b class="CLASS_MVG_FILIAL_${meta.row}"> ${data} </b>`;
          },
        },
        {
          title: 'DATA ALTERAÇÃO',
          data: 'MVG_DAT_ALTER',
          className: 'text-left text-nowrap',
          width: '1%',
          render: function (data, type, row, meta) {
            if (type != 'display') return data;
            if (!data) return '';

            return `<b class="CLASS_MVG_DAT_ALTER_${meta.row}"> ${data} </b>`;
          },
        },
        {
          title: 'COD. ITEM',
          data: 'MVG_COD_ITEM',
          className: 'text-left text-nowrap',
          width: '1%',
          render: function (data, type, row, meta) {
            if (type != 'display') return data;
            if (!data) return '';

            return `<b class="CLASS_MVG_COD_ITEM_${meta.row}"> ${data} </b>`;
          },
        },
        {
          title: 'CÓD. BARRAS',
          data: 'MVG_COD_EAN13',
          className: 'text-left text-nowrap',
          width: '1%',
          render: function (data, type, row, meta) {
            if (type != 'display') return data;
            if (!data) return '';

            return `<b class="CLASS_MVG_COD_EAN13_${meta.row}"> ${data} </b>`;
          },
        },
        {
          title: 'Data Alocada',
          data: 'DATA_ALOC',
          className: 'text-left text-nowrap',
          width: '1%',
          render: function (data, type, row, meta) {
            if (type != 'display') return data;
            if (!data) return '';

            return `<b class="CLASS_DATAALOCADA_${meta.row}"> ${data} </b>`;
          },
        },
        {
          title: 'SECAO',
          data: 'MVG_SECAO',
          className: 'text-left text-nowrap',
          width: '1%',
          render: function (data, type, row, meta) {
            if (type != 'display') return data;
            if (!data) return '';

            return `<b class="CLASS_MVG_SECAO_${meta.row}"> ${data} </b>`;
          },
        },
        {
          title: 'LOTE',
          data: 'MVG_LOTE',
          className: 'text-left text-nowrap',
          width: '1%',
          render: function (data, type, row, meta) {
            if (type != 'display') return data;
            if (!data) return '';

            return `<b class="MVG_LOTE_${meta.row}"> ${data} </b>`;
          },
        },
        {
          title: 'PREÇO ATUAL',
          data: 'MVG_PRECO_ATUAL',
          className: 'text-left text-nowrap',
          width: '1%',
          render: function (data, type, row, meta) {
            if (type != 'display') return data;
            if (!data) return '';

            return `<b class="CLASS_PLACA_${meta.row}"> ${data} </b>`;
          },
        },
        {
          title: 'PREÇO NOVO',
          data: 'MVG_PRECO_NOVO',
          className: 'text-left text-nowrap',
          width: '1%',
          visible: true,
          render: function (data, type, row, meta) {
            if (type != 'display') return data;
            if (!data) return '';

            return `<b class="CLASS_MVG_PRECO_NOVO_${meta.row}"> ${data} </b>`;
          },
        },
        {
          title: 'DESCRIÇÃO ITEM',
          data: 'GIT_DESC_REDUZ',
          className: 'text-left text-nowrap',
          width: '1%',
          visible: true,
          render: function (data, type, row, meta) {
            if (type != 'display') return data;
            if (!data) return '';

            return `<b class="CLASS_ITENS_${meta.row}"> ${data} </b>`;
          },
        }
      ],

      // essa função será passada como callback na chamada de criação do DataTable
      functionRow: (row, data, index) => {
        //console.log('Linha add', row)
      },
    };

    const dt = $(table).DataTable({
      dom: "<'row'<'col-xs-12't>><'row tabela-rodape'<'col-xs-12 col-md-5'i><'col-xs-12 col-md-7'p>>",
      displayLength: 25,
      autoWidth: true,
      order: objInit.objOrder,

      columns: objInit.objColumns,
      createdRow: objInit.functionRow,
    });

    dt.on('click', 'tr', function(){
      $(document).find('tr').removeClass("dtSelected");
      $(dt.row(this).selector.rows).addClass("dtSelected");
    });

    await this.barraFerramentas(dt, objInit);

    return dt;

  };

  async barraFerramentas(objDt, objInit){
    // nome do arquivo que será exportado
    
    await new $.fn.dataTable.Buttons(objDt, {
      buttons: [
        {
          text: '<div id="btn-exportar"><i class="fas fa-file-excel text-left" aria-hidden="true"></i>&nbsp; Exportar Excel (.csv)</div>',
        },
      ],
    });


    //exibição: 25, 50, 100, etc
    $(`.div-btn-exibicao ul li a`)
      .off()
      .on('click', function (element) {
        var qtd = $(element.currentTarget).data('qtd'); // quantidade selecionada

        // atualiza a tabela
        objDt.page.len(qtd).draw();

        var txtExib = qtd;
        if (qtd == '-1') txtExib = 'Todas';

        // muda o valor de exibição do dropdown
        $('.btn-exibicao').html(`${txtExib} <span class="caret"></span>`);
      });

    //Adiciona dinamicamente as colunas da tabela para o filtro
    var list = '';

    objInit.objColumns.forEach(function (element, index) {
      var classe = typeof element.visible != undefined && element.visible == false ? '' : 'exibindo';
      if (element.data) list += '<li><a href="javascript:;" class="' + classe + '" data-colid="[' + index + ']"><i class="fas fa-check-circle fa-fw"></i> <i class="far fa-circle fa-fw"></i> ' + element.title + '</a></li>';
    });

    $('.btn-colunas').siblings('ul').html(list);

    // esconde exibe colunas
    $(`.div-btn-colunas ul li a`)
      .off()
      .on('click', function (element) {
        var ids = $(element.currentTarget).data('colid'); // Array com uma ou mais colunas [2, 3]
        var status = $(element.currentTarget).hasClass('exibindo'); // Status atual da opção

        // Seleciona as colunas através do array e exibe/oculta
        // https://datatables.net/reference/type/column-selector
        objDt.columns(ids).visible(!status);

        $(element.currentTarget).toggleClass('exibindo'); // Troca o status

        return false; // Previne fechar o dropdown
      });

    // filtro
    $("[name='FILTRO']")
      .off()
      .on('keyup', function (element) {
        objDt.search(element.target.value).draw();
      });
    $('.btn-limpa-filtro').on('click', () => {
      $("[name='FILTRO']").val('');
      objDt.search('').draw();
    });

    $('.div-btn-exportar > ul').html('');
    // formata cada botão para adicionar no DOM
    objDt.buttons(0, null).each(function (btn, id) {
      // Adiciona divisória após o 2º botão
      if (id == 3)
        $('<li>', {
          class: 'divider',
        }).appendTo(`.div-btn-exportar > ul`);

      // Retira as classes originais e adicina dentro de um <li>
      var $el = $('<li>').append($(btn.node).removeClass('btn btn-default'));
      $el.appendTo(`.div-btn-exportar > ul`);
    });


    await this.fCLICK_DATATABLE();

  };

  async fCLICK_DATATABLE(){

    let arrayClicado = [];
    let tableData ;
    let linhaNew ;
    let textoNew ;
    let modal ;

    $('#tblPrincipal').on('click', 'tr', async function(event){

      tableData = $(event).closest("tr").find("td:not(:last-child)").map(function(){
        return $(this).text().trim();
      }).get();

      /*============================================*/
      linhaNew = $(this).closest("tr");
      //var textoNew = $('#tblPrincipal').DataTable().row(linhaNew).data().Nomes;
      textoNew = $('#tblPrincipal').DataTable().row(linhaNew).data();
      console.log('textoNew: ',textoNew);
      /*============================================*/

      //console.log('Linha $(this).text(): ',$(this).text());
      console.log('Idx Clicado: ',$(this).index());

      //let row = $(this).text();
      arrayClicado.length = 0;
      if(textoNew){

        //let rowTmp = row.split('  ');
        //console.log('rowTmp: ',rowTmp);
        arrayClicado.push({
          ATIVIDADE: textoNew.RCP_COD_ATIV.trim(),
          DATA: textoNew.DATA,
          HORA: textoNew.HORA,
          DATA_ALOC: textoNew.DATA_ALOC,
          HORA_ALOC: textoNew.HORA_ALOC,
          DOCA: textoNew.DOCA.trim(),
          PLACA: textoNew.PLACA.trim(),
          FORNECEDOR: textoNew.FORNECEDOR.trim(),
          ITENS: textoNew.ITENS.trim(),
          VOLUMES: textoNew.VOLUMES.trim(),
          OPERADOR: textoNew.OPERADOR.trim(),
          FILIAL_SEMDIG: textoNew.FILIAL_SEMDIG.trim(),
          NOME_OPERADOR: textoNew.NOME_OPERADOR.trim(),
          DATA_FORMATRMS: textoNew.DATA_FORMATRMS.trim()
        });

      };
      console.log('arrayClicado: ',arrayClicado);
      modal = await view.fCHAMAMODAL_VIEW(arrayClicado);
    });

  };

  async dateto_rms7_2(paramdata){

    let anoP = paramdata.substr(6,4);
    let mesP = paramdata.substr(3,2);
    let diaP = paramdata.substr(0,2);
    var data = new Date([anoP,mesP,diaP]);

    var ano = data.getFullYear().toString().substr(2,4);
    var anoF = (ano.length == 1) ? '0'+ano : ano;

    var mes = (data.getMonth()+1).toString();
    var mesF = (mes.length == 1) ? '0'+mes : mes;

    var dia = data.getDate().toString();
    var diaF = (dia.length == 1) ? '0'+dia : dia;
    
    var novaData = '1' + anoF + mesF + diaF;
    //console.log('novaData: '+novaData);

    return novaData;

  };//final dateto_rms7_2;

  async pad(num){
    var res = num;
    if (num < 10) {
            res = '0' + num;
    }
    return res;

  };// final pad

  async fCRITICAR_RECEBIMENTOS_DATATABLE(PERIODO_FORMATRMS,STATUS_RECEB,FILIAL_SEMDIG){
    console.log('fCRITICAR_RECEBIMENTOS_DATATABLE() Entrei');

    try{

      /* Laço 1. ============================================= */
      let table = $('#tblPrincipal').DataTable();

      table.rows().every(async function( rowIdx, tableLoop, rowLoop ){
        let dtrow = this.data();
        let dtATIVIDADE = (dtrow.RCP_COD_ATIV).toString().trim();
        let dtPARPREENCHIDO = (dtrow.PAR_PREENCHIDO).toString().trim();
        let dtEXISTE_PAR = (dtrow.EXISTE_PAR).toString().trim();
        let dtITENS = (dtrow.ITENS).toString().trim();
        
        //console.log(d);
        //console.log('Procurando no datatable o registro: ',dtATIVIDADE,' PAR:',dtPARPREENCHIDO);

        if(dtEXISTE_PAR > 0 && dtPARPREENCHIDO == 0){
          console.log('Encontrei no registro: ',dtATIVIDADE,' PAR:',dtPARPREENCHIDO,' adicionando class cor');
          let linha2 = table.row(rowIdx).nodes();
          //$(linha2).css("color", "red");
          $(linha2).addClass('tr-dtable-existepar');

          await view.fNOTIFICA_WIDGET('Encontrei PAR','Na Atividade:'+dtATIVIDADE);

        }else if(dtEXISTE_PAR > 0 && dtPARPREENCHIDO == dtITENS){
          console.log('Encontrei no registro ok no datatable: ',dtATIVIDADE,' PAR:',dtPARPREENCHIDO,' adicionando class cor');
          let linha2 = table.row(rowIdx).nodes();
          //$(linha2).css("color", "red");
          $(linha2).addClass('tr-dtable-existeparok');

        }else if(dtEXISTE_PAR > 0 && dtPARPREENCHIDO != dtITENS){
          console.log('Encontrei no registro parcialmente preenchidos no datatable: ',dtATIVIDADE,' PAR:',dtPARPREENCHIDO,' adicionando class cor');
          let linha2 = table.row(rowIdx).nodes();
          //$(linha2).css("color", "red");
          $(linha2).addClass('tr-dtable-existeparparcial');

        };
  
      });

    }catch(e){
      return Utils.unexpectedError('Erro na chamada da função de analise de críticas: ', e.message);
    };

  };

  async fMARCARA_INPUT_SOMENTE_LETRAS(){

    $(function(){
        var regex = new RegExp('[^ a-zA-Z\b]', 'g');
        // repare a flag "g" de global, para substituir todas as ocorrências
        $('input[class="select2-search__field"][placeholder="Descricao Produto"]').bind('input', function(){
        $(this).val($(this).val().replace(regex, ''));
        });
    });

  };

  async fTECLA_PRESSIONADA(document){

    $(document).keyup(async (e)=>{

      if(e.which == 27){
        console.log('Esc Pressionado!');
        if($("#fluigModalDetalhesRecebimento").length > 0){
          console.log('Fechando modal.');
          $("#fluigModalDetalhesRecebimento").modal('hide');
          await this.loadTable(this.DATA_FORMATRMS,this.STATUS_ATIVIDADE,this.FILIAL_SEMDIG);
        };
      };//final if/else;

    });

  };

};

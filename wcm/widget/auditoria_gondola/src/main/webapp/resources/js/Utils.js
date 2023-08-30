class Utils {
    static fMOMENT_JS(){
        moment().format('LT'); // 12:21 - Horário
        moment().format('LTS'); // 12:21 - Horário + segundos
        moment().format('L'); // 11/09/2020 - Dia/mês/ano (pt-br)
        moment().format('l'); // 11/9/2020 - Dia/mês/ano sem zero na frente
        moment().format('LL'); // 11 de setembro de 2020
        moment().format('ll'); // 11 de set de 2020
        moment().format('LLL'); // 11 de setembro de 2020 às 12:21
        moment().format('lll'); // 11 de set de 2020 às 12:21
        moment().format('LLLL'); // sexta-feira, 11 de setembro de 2020 às 12:21
        moment().format('llll'); // sex, 11 de set de 2020 às 12:21
        moment().format(); // 2020-09-11T12:33:14-03:00
        moment().format('DD/MM/YYYY'); // 11/09/2020
        moment().format('DD/MM/YYYY HH:mm:ss'); // 11/09/2020 12:34:03
        moment().format("[Hoje é] dddd"); // Hoje é sexta-feira
    };

    static fPRIMEIRODIAMES_ULTIMODIAMES(){
        let ano = '2022';
        let mes = '10';
        let dia = '01';
        const date = new Date([ano,mes,dia]);
		const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
		const firstDayDate = firstDay. toLocaleDateString('pt-br');
		const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		const lastDayDate = lastDay.toLocaleDateString('pt-br');
    };

    static retorna_Data_Hora_Atual(data){
        var dia  = data.getDate().toString().padStart(2, '0');
        var mes  = (data.getMonth()+1).toString().padStart(2, '0');
        var ano  = data.getFullYear();
        var hora = data.getHours().toString().padStart(2, '0');
        var min  = data.getMinutes().toString().padStart(2, '0');
        return dia + "/" + mes + "/" + ano + " " + hora + ":"+ min;
    }

    static retorna_Data_Hora_Seg_Atual(data){
        var dia  = data.getDate().toString().padStart(2, '0');
        var mes  = (data.getMonth()+1).toString().padStart(2, '0');
        var ano  = data.getFullYear();
        var hora = data.getHours().toString().padStart(2, '0');
        var min  = data.getMinutes().toString().padStart(2, '0');
        var seg  = data.getSeconds().toString().padStart(2, '0');

        return dia + "/" + mes + "/" + ano + " " + hora + ":"+ min +":"+ seg;
    };

    static fSYSDATE_DDMMYYYY(){
        var	data = new Date();
        var dia  = data.getDate().toString();
        var diaF = (dia.length == 1) ? '0'+dia : dia;
        var mes  = (data.getMonth() + 1).toString(); // +1 pois no getMonth Janeiro começa com zero.
        var mesF = (mes.length == 1) ? '0'+mes : mes;
        var anoF = data.getFullYear();
        var hora = data.getHours().toString();
        var horaF = (hora.length == 1) ? '0'+hora : hora;
        var min  = data.getMinutes().toString();
        var minF = (min.length == 1) ? '0'+min : min;
        var seg  = data.getSeconds().toString();
        var segF = (seg.length == 1) ? '0'+seg : seg;

        return diaF + "/" + mesF + "/" + anoF ;
        
    };//fSYSDATE_DDMMYYYY();

    static fSYSDATE_DDMMYYYY_HHMMSS(){
        var	data = new Date();
        var dia  = data.getDate().toString();
        var diaF = (dia.length == 1) ? '0'+dia : dia;
        var mes  = (data.getMonth()+1).toString(); // +1 pois no getMonth Janeiro começa com zero.
        var mesF = (mes.length == 1) ? '0'+mes : mes;
        var anoF = data.getFullYear();
        var hora = data.getHours().toString();
        var horaF = (hora.length == 1) ? '0'+hora : hora;
        var min  = data.getMinutes().toString();
        var minF = (min.length == 1) ? '0'+min : min;
        var seg  = data.getSeconds().toString();
        var segF = (seg.length == 1) ? '0'+seg : seg;
        
        return diaF + "/" + mesF + "/" + anoF + " " + horaF + ":"+ minF +":"+ segF;
        
    };//fSYSDATE_DDMMYYYY();

    static retorna_formatadoDataHoraAtual(){
        var	data = new Date();
        var dia  = data.getDate().toString();
        var diaF = (dia.length == 1) ? '0'+dia : dia;
        var mes  = (data.getMonth()+1).toString(); // +1 pois no getMonth Janeiro começa com zero.
        var mesF = (mes.length == 1) ? '0'+mes : mes;
        var anoF = data.getFullYear();
        var hora = data.getHours().toString();
        var horaF = (hora.length == 1) ? '0'+hora : hora;
        var min  = data.getMinutes().toString();
        var minF = (min.length == 1) ? '0'+min : min;
        var seg  = data.getSeconds().toString();
        var segF = (seg.length == 1) ? '0'+seg : seg;

        return diaF + "/" + mesF + "/" + anoF + " " + horaF + ":"+ minF +":"+ segF;
        
    };

    static retorna_formatadoDataMenosOutrosPeriodos(MENOSDATA){
        var	data = new Date();
        var duedate = new Date(data);
        duedate.setDate(data.getDate() - MENOSDATA);
        var dia  = duedate.getDate().toString();
        var diaF = (dia.length == 1) ? '0'+dia : dia;
        var mes  = (duedate.getMonth()+1).toString(); // +1 pois no getMonth Janeiro começa com zero.
        var mesF = (mes.length == 1) ? '0'+mes : mes;
        var anoF = duedate.getFullYear();
        var hora = duedate.getHours().toString();
        var horaF = (hora.length == 1) ? '0'+hora : hora;
        var min  = duedate.getMinutes().toString();
        var minF = (min.length == 1) ? '0'+min : min;
        var seg  = duedate.getSeconds().toString();
        var segF = (seg.length == 1) ? '0'+seg : seg;

        return diaF + "/" + mesF + "/" + anoF ;
        
    };//final retorna_formatadoDataMenosOutrosPeriodos();
    
    static retorna_formatadoDataMenosOutrosPeriodos(){
        var	data = new Date();
        var dia  = data.getDate().toString();
        var diaF = (dia.length == 1) ? '0'+dia : dia;
        var mes  = (data.getMonth()+1).toString(); // +1 pois no getMonth Janeiro começa com zero.
        var mesF = (mes.length == 1) ? '0'+mes : mes;
        var anoF = data.getFullYear();
        var hora = data.getHours().toString();
        var horaF = (hora.length == 1) ? '0'+hora : hora;
        var min  = data.getMinutes().toString();
        var minF = (min.length == 1) ? '0'+min : min;
        var seg  = data.getSeconds().toString();
        var segF = (seg.length == 1) ? '0'+seg : seg;

        return diaF + "/" + mesF + "/" + anoF ;
        
    };//final retorna_formatadoDataHoraAtual();

    static retorna_Data_Atual(data){
        var dia  = (data.getDate().toString().padStart(2, '0'));
        var mes  = (data.getMonth()+1).toString().padStart(2, '0');
        var ano  = (data.getFullYear());
        return dia + "/" + mes + "/" + ano;
    };

    static formatar_DATA(data){
        var dia  = data.getDate().toString().padStart(2, '0');
        var mes  = (data.getMonth()+1).toString().padStart(2, '0');
        var ano  = data.getFullYear();
        return dia + "/" + mes + "/" + ano;
    };

    static formatar_DATA_HORA(data){
        var dia  = data.getDate().toString().padStart(2, '0');
        var mes  = (data.getMonth()+1).toString().padStart(2, '0');
        var ano  = data.getFullYear();
        var hora = data.getHours().toString().padStart(2, '0');
        var min  = data.getMinutes().toString().padStart(2, '0');
        return dia + "/" + mes + "/" + ano + " " + hora + ":"+ min;
    };

    static formatar_DATA_HORA_SEG(data){
        var dia  = data.getDate().toString().padStart(2, '0');
        var mes  = (data.getMonth()+1).toString().padStart(2, '0');
        var ano  = data.getFullYear();
        var hora = data.getHours().toString().padStart(2, '0');
        var min  = data.getMinutes().toString().padStart(2, '0');
        var seg  = data.getSeconds().toString().padStart(2, '0');
        return dia + "/" + mes + "/" + ano + " " + hora + ":"+ min +":"+ seg;
    };

    static formatarDataNewDate(data) {
        // Pega Data no Formato DD/MM/YYYY e Devolve no Formato YYYY-MM-DD para o new Date() criar uma instância de Date
        var dia = data.substring(0,2);
        var mes = data.substring(3,5);
        var ano = data.substring(6,10);
        return ano + "-" + mes + "-" + dia + 'T00:00:00'; //a menos que o fuso horário seja passado, new Date() converte as horas em UTC, o que resulta em uma difernça de -3 horas.
    };
    
    static formatarDataNovaString(data) {
        if(data == null || data == "")
            data = new Date();
        var dia  = data.getDate().toString();
        var diaF = (dia.length == 1) ? '0'+dia : dia;
        var mes  = (data.getMonth()+1).toString(); // +1 pois no getMonth Janeiro começa com zero.
        var mesF = (mes.length == 1) ? '0'+mes : mes;
        var anoF = data.getFullYear();
        return diaF + "/" + mesF + "/" + anoF;
    };

    static dateto_rms7(paramdata){
        let anoP = paramdata.substr(6,4);
        let mesP = paramdata.substr(3,2);
        let diaP = paramdata.substr(0,2);
        var data = new Date([anoP,mesP,diaP]);
        var ano = data.getFullYear().toString().substr(2,4);
        var mes = (data.getMonth()+1).toString();
        var dia = data.getDate().toString();
        var novaData = '1'+ano+pad(mes)+pad(dia);
        
        return novaData;

    };//final dateto_rms7;

    static dateto_rms7_2(paramdata){

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
        console.log('novaData: '+novaData);

        return novaData;

    };//final dateto_rms7_2;

    static dateto_rms7to_date(paramdata){ //pega da DATA 1220804 e tranforma em 04/08/2022;

        let anoP = paramdata.substr(1,2);
        let mesP = paramdata.substr(3,2);
        let diaP = paramdata.substr(5,2);
        var data = new Date(['20'+anoP,mesP,diaP]);

        var ano = data.getFullYear().toString().substr(2,4);
        var anoF = (ano.length == 1) ? '0'+ano : ano;

        var mes = (data.getMonth()+1).toString();
        var mesF = (mes.length == 1) ? '0'+mes : mes;

        var dia = data.getDate().toString();
        var diaF = (dia.length == 1) ? '0'+dia : dia;
        
        //var novaData = '1' + anoF + mesF + diaF;
        var novaData = diaF+'/'+mesF+'/'+anoF;
        console.log('novaData: '+novaData); //pega da DATA 1220804 e tranforma em 04/08/2022;

        return novaData;

    };//final dateto_rms7_2;

    static pad(num){
        var res = num;
        if (num < 10) {
                res = '0' + num;
        }
        return res;
    };// final pad

    static dataFormatoRMS(data){
        var resposta;
        var ano;
        var mes;
        var dia;
        
        ano = data.getFullYear().toString().substr(2,2);
        mes = pad(data.getMonth() + 1);
        dia = pad(data.getDate());
    
        resposta =  '1' + ano + mes + dia;
        
        return resposta;
    };//dataFormatoRMS(data);

    static rms6to_rms7(paramdata){ //Quando a data vem: 290822 => 29''08''22 retorna => 1220829 / valor 60521 => 1210506;
        if (paramdata.length == 5){
            paramdata = '0'+paramdata;
        }
        var ano = paramdata.substr(4,2);
        var mes = paramdata.substr(2,2);
        var dia = paramdata.substr(0,2);
        var rms7 = '1'+ano+mes+dia;
        
        return rms7;
    
    };//final getLote

    static fINFOBANCOCONECTADO_RMS(){
        var dataset = "";
        var query = "SELECT UTL_INADDR.GET_HOST_ADDRESS(HOST_NAME) AS HOSTIP, HOST_NAME , INSTANCE_NAME , INSTANCE_ROLE , ACTIVE_STATE ,(SELECT NAME FROM V$DATABASE) AS DATABASE FROM V$INSTANCE";
        try {
            dataset = DatasetFactory.getDataset("ds_sql_rms", [query], null, null);
        } catch (error) {
            console.error('ClassUtils. Erro fINFOBANCOCONECTADO_RMS() ==>ERRO:'+error);
        }
        console.log('####### ClassUtils. CONECTADO AO BANCO RMS=>: ',dataset.values);
    
    };//final fINFOBANCOCONECTADO_RMS;

    static fPREVENTDEFAULT(event){
        event.preventDefault();
    };//final fPREVENTDEFAULT;

    static handleKeyPress(event){
        var key=event.keyCode || event.which;
        if (key==13){
            console.log('Enter pressionado!');
            consultarItem();
            $("#codigo_barras").select();
        };
    };//final handleKeyPress;

    static disablePullToRefresh(){ //Disable atualizar tela Mobile:
        return true;
    };//final disablePullToRefresh

    /* Dataset */
    static fDML_FLUIG(myQuery){
        var dsNewDataset = DatasetBuilder.newDataset();
        var dataSource = "/jdbc/FluigDS";
        var ic = new javax.naming.InitialContext();
        var ds = ic.lookup(dataSource);
        var created = false;
        log.info("QUERY: "+myQuery);
    
        dsNewDataset.addColumn("STATUS");
        try {
            var conn = ds.getConnection();
            var stmt = conn.createStatement();
            stmt.setQueryTimeout(1800);
            var rs = stmt.execute(myQuery);
            dsNewDataset.addRow(["OKPASS"]);
        } catch(e) {
            
            dsNewDataset.addRow(["ERRO"]);
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
    };//final fDML_FLUIG();
    
    /* Dataset */
    static fDML_RMS(myQuery){
        var dsNewDataset = DatasetBuilder.newDataset();
        var dataSource = "/jdbc/FluigDSRMS";
        var ic = new javax.naming.InitialContext();
        var ds = ic.lookup(dataSource);
        var created = false;
        log.info("QUERY: "+myQuery);
    
        dsNewDataset.addColumn("STATUS");
        try {
            var conn = ds.getConnection();
            var stmt = conn.createStatement();
            stmt.setQueryTimeout(1800);
            var rs = stmt.execute(myQuery);
            dsNewDataset.addRow(["OKPASS"]);
        } catch(e) {
            
            dsNewDataset.addRow(["ERRO"]);
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
    };//final fDML_RMS();

    /* Function Dataset - consulta tabelas de usuários e senha pra startar processo*/
    static fGETUSER_STARTPROCESS_CLASSICO(vNOMEPROCESS){
        try {

            var vARRAY = {};
            var vSQL = "select COD_FILIAL,DIG_FILIAL,DESC_FILIAL,SIGLA_FILIAL,NOME_USER,LOGIN_USER,SENHA_USER,NOME_PROCESS,EMAIL,MATRICULA,DESC_SETOR,OBSERVACAO, "+
                        "DATA_CADASTRO_TAB,DATA_ULT_ALTERACAO_TAB,FLG_INTEGRACAO_01,FLG_INTEGRACAO_02,FLGATIVO "+
                    "from ti_processclassic_userkeys a where 1=1 and a.flgativo = 'A' and NOME_PROCESS = '"+vNOMEPROCESS+"'";
    
            var ds_obj = DatasetFactory.getDataset("ds_sql_fluig", [vSQL], null, null);
            if(ds_obj.rowsCount > 0){
                for (var i = 0; i < ds_obj.rowsCount; i++) {
                    vARRAY.push({
                        COD_FILIAL: ds_obj.getValue(i, 'COD_FILIAL'),
                        DIG_FILIAL: ds_obj.getValue(i, 'DIG_FILIAL'),
                        DESC_FILIAL: ds_obj.getValue(i, 'DESC_FILIAL'),
                        SIGLA_FILIAL: ds_obj.getValue(i, 'SIGLA_FILIAL'),
                        NOME_USER: ds_obj.getValue(i, 'NOME_USER'),
                        LOGIN_USER: ds_obj.getValue(i, 'LOGIN_USER'),
                        SENHA_USER: ds_obj.getValue(i, 'SENHA_USER'),
                        NOME_PROCESS: ds_obj.getValue(i, 'NOME_PROCESS'),
                        EMAIL: ds_obj.getValue(i, 'EMAIL'),
                        MATRICULA: ds_obj.getValue(i, 'MATRICULA'),
                        DESC_SETOR: ds_obj.getValue(i, 'DESC_SETOR'),
                        OBSERVACAO: ds_obj.getValue(i, 'OBSERVACAO'),
                        DATA_CADASTRO_TAB: ds_obj.getValue(i, 'DATA_CADASTRO_TAB'),
                        DATA_ULT_ALTERACAO_TAB: ds_obj.getValue(i, 'DATA_ULT_ALTERACAO_TAB'),
                        FLG_INTEGRACAO_01: ds_obj.getValue(i, 'FLG_INTEGRACAO_01'),
                        FLG_INTEGRACAO_02: ds_obj.getValue(i, 'FLG_INTEGRACAO_02'),
                        FLGATIVO: ds_obj.getValue(i, 'FLGATIVO')
                    })
                };//final for
                return vARRAY;
                
            }else{
    
                log.warn('[dataset_recebimento_p_a_r] Total registros fGETUSER_STARTPROCESS_CLASSICO: '+ds_obj.rowsCount);
                return false;
    
            };//final if
    
        } catch (error) {
            log.error('[dataset_recebimento_p_a_r] cath Erro fGETUSER_STARTPROCESS_CLASSICO error: '+error);
            return false;
    
        };//final catch
    
    };//final fGETUSER_STARTPROCESS_CLASSICO;

    static dDISABLED_JQUERY(){
        // Disable #x
        $( "#x" ).prop( "disabled", true );
        
        // Enable #x
        $( "#x" ).prop( "disabled", false );

        // Disable #x
		$("#btnSalvarPlanejamento").prop( "disabled", true );
		$("#btnCarregarPlanejamento").prop( "disabled", true );
		// Enable #x
		$("#btnSalvarPlanejamento").prop( "disabled", false );
		$("#btnCarregarPlanejamento").prop( "disabled", false );

    };//dDISABLED_JQUERY

    static get_browser_version(){
        var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
        if(/trident/i.test(M[1])){
            tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
            return {name:'IE',version:(tem[1]||'')};
            }   
        if(M[1]==='Chrome'){
            tem=ua.match(/\bOPR\/(\d+)/)
            if(tem!=null)   {return {name:'Opera', version:tem[1]};}
            }   
        M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
        return {
          name: M[0],
          version: M[1]
        };
    };//final get_browser_version().

    static get_browser_version_new(){
        var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
        if(/trident/i.test(M[1])){
            tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
            return {name:'IE',version:(tem[1]||'')};
        };

        if(M[1]==='Chrome'){
            tem=ua.match(/\bOPR\/(\d+)/)
            if(tem!=null)   {return {name:'Opera', version:tem[1]};}
        };

        if(M[1]==='Safari'){
            return {name:'Safari',version:M[0]};
        };

        M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}

        if(M[0] == 'Firefox' && M[1] < 100){
            FLUIGC.toast({
                title: 'Navegador Desatualizado!<br>',
                message: 'Atenção seu navegador Firefox precisa de atualização, pois está abaixo da versão 100.',
                type: 'warning',
                timeout: 300000
            });
        };//

        if(M[0] == 'Chrome' && M[1] < 100){
            FLUIGC.toast({
                title: 'Navegador Desatualizado!<br>',
                message: 'Atenção seu navegador Chrome ou Microsoft Edge precisa de atualização, pois está abaixo da versão 100.',
                type: 'warning',
                timeout: 300000
            });
        };//

        if(M[0] == "Opera" && M[1] < 87){
            FLUIGC.toast({
                title: 'Navegador Desatualizado!<br>',
                message: 'Atenção seu navegador Opera precisa de atualização, pois está abaixo da versão 87.',
                type: 'warning',
                timeout: 300000
            });
        };//
        return {
          name: M[0],
          version: M[1]
        };
    
    };//final get_browser_version().

    static get_browser_boolean(){
        // Opera 8.0+;
        var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

        // Firefox 1.0+;
        var isFirefox = typeof InstallTrigger !== 'undefined';

        // Safari 3.0+ "[object HTMLElementConstructor]";
        var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

        // Internet Explorer 6-11;
        var isIE = /*@cc_on!@*/false || !!document.documentMode;

        // Edge 20+;
        var isEdge = !isIE && !!window.StyleMedia;

        // Chrome 1 - 79;
        var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

        // Edge (based on chromium) detection;
        var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);

        // Blink engine detection;
        var isBlink = (isChrome || isOpera) && !!window.CSS;

        var output = 'Detecting browsers by ducktyping:<hr>';
        output += 'isFirefox: ' + isFirefox + '<br>';
        output += 'isChrome: ' + isChrome + '<br>';
        output += 'isSafari: ' + isSafari + '<br>';
        output += 'isOpera: ' + isOpera + '<br>';
        output += 'isIE: ' + isIE + '<br>';
        output += 'isEdge: ' + isEdge + '<br>';
        output += 'isEdgeChromium: ' + isEdgeChromium + '<br>';
        output += 'isBlink: ' + isBlink + '<br>';
        document.body.innerHTML = output;

    };

    static fIMPRESSAO_DIV(){
        $('.printFunction_13').on('click',function(){
            $("#IDTABLENAMELISTACOMPRASFINAL").print({
                    globalStyles: true,
                    mediaPrint: false,
                    stylesheet: null,
                    noPrintSelector: ".no-print",
                    iframe: true,
                    append: null,
                    prepend: null,
                    manuallyCopyFormValues: true,
                    deferred: $.Deferred(),
                    timeout: 750,
                    title: null,
                    doctype: '<!doctype html>'
            });
        });

    };//fIMPRESSAO_DIV

    static validateEmail(email){
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    };//validateEmail

    static getDiaDaSemana(){
        var data = new Date();
        var dw = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
        return dw[data.getDay()];
    };//final getDiaDaSemana;

    static cancelarDuplicidadesZanthus(FILIAL,DATA_AUDITADA){
        console.log('====================== AUDUITORIA DE TROCA AS CEGAS - CANCELANDO TROCAS DUPLICADAS ======================');
        if(FILIAL||DATA_AUDITADA){
            console.log('========== AUDUITORIA DE TROCA AS CEGAS - LOJA: '+FILIAL+' DATA_AUDITADA: '+DATA_AUDITADA+' =============');
            var parametros = new Array();
            parametros.push(DatasetFactory.createConstraint("AUDITORIA_TROCAS_ASCEGAS","CANCELAR_DUPLICIDADES_ZANTHUS", "CANCELAR_DUPLICIDADES_ZANTHUS", ConstraintType.MUST));
            parametros.push(DatasetFactory.createConstraint("FILIAL",FILIAL, FILIAL, ConstraintType.MUST));
            parametros.push(DatasetFactory.createConstraint("DATA_AUDITADA",DATA_AUDITADA, DATA_AUDITADA, ConstraintType.MUST));
            var ds = DatasetFactory.getDataset("ds_auditoriatrocas_ascegas_consultaritens", null, parametros, null);
        };//final if
    
    };//final cancelarDuplicidadesZanthus();

    static consultarQueryViaNavegador(){
        try {
            var query = "select ux.lojaorigem AS FILIAL,ux.solicitante AS solicitante,ux.escolhadeptosetororigem AS COD_SETOR,ux.nomeorigem AS SETOR, y.CODITEM AS coditemrecebido, TRIM(y.DESCITEM) AS DESCRICAO, sum(y.QTDPEDIDO) AS TOTAL,y.PRCITEM AS MEDIA_PRECO,y.EANITEM AS eanitemrecebido from ML001035 ux inner join ml001036 y on ux.DOCUMENTID = y.documentid and ux.version = y.version where 1=1 and ux.lojaorigem = 132 group by ux.lojaorigem,ux.solicitante,ux.escolhadeptosetororigem,ux.nomeorigem,y.CODITEM,y.DESCITEM,y.EANITEM,y.PRCITEM order by ux.lojaorigem, ux.solicitante, ux.nomeorigem, y.DESCITEM";
            var dataset = DatasetFactory.getDataset("ds_sql_fluig", [query], null, null);
            } catch (error) {
                console.error('ClassUtils. Erro fINFOBANCOCONECTADO_RMS() ==>ERRO:'+error);
            }
            console.log('####### ClassUtils. CONECTADO AO BANCO RMS=>: ',dataset.values);

    };//final consultarQueryViaNavegador();

    static fDATASET_VIA_NAVEGADOR_TESTES_DS(){
        var c1  = DatasetFactory.createConstraint("PERIODO", '202211', '202211', ConstraintType.MUST);
        var c2  = DatasetFactory.createConstraint("LOJACOMDIG", '132', '132', ConstraintType.MUST);
        var constraint = new Array(c1,c2);
        let ds = DatasetFactory.getDataset("ds_comissao_venda_suvinil_atualiza", null, constraint, null);
        console.log('ds:',ds);
    };

    static retornaSO(){
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        } else if (/android/i.test(userAgent)) {
            return "Android";
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        } else {
            return "unknown";
        };
    };//retornaSO

    static fDATEPICKER(){
        jQuery(function($){
            $.datepicker.regional['pt-BR'] = {
                closeText: 'Fechar',
                prevText: '&#x3C;Anterior',
                nextText: 'Próximo&#x3E;',
                currentText: 'Hoje',
                monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
                monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
                dayNames: ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'],
                dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
                dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
                weekHeader: 'Sm',
                dateFormat: 'dd/mm/yyyy',
                firstDay: 0,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: ''
            };$.datepicker.setDefaults($.datepicker.regional['pt-BR']);
        });

    };//fDATEPICKER

    static fREMOVE_CARACTERE_STR(){
        const str = 'hello´`/\@*- 123 !@#$%^WORLD?.';
        const noSpecialCharacters = str.replace(/[^a-zA-Z0-9 ]/g, '');
        console.log(noSpecialCharacters);
    };//fREMOVE_CARACTERE_STR

    static fCONTADOR_TEMPOEMTEMPO(){
        //count = 0; variavel global;
        let interval = setInterval(()=>{
            // increasing the count by 1
            this.count += 1;
            // when count equals to 5, stop the function
            if(this.count === 5){
                clearInterval(interval);
            };
            // display the current time
            let dateTime= new Date();
            let time = dateTime.toLocaleTimeString();
            this.atualizarTI_nfecommerce_controle_nfe();
            console.log( (this.count).toString(),'/ 5 - Execução de atualização de NF geradas: ', time);
        
        }, 60000);
    };//fCONTADOR_TEMPOEMTEMPO

    static fORDENAR_ARRAY(vArray){
        vArray.sort((a,b)=>{
            //return a.ESTOQUE > b.ESTOQUE ? -1 : a.ESTOQUE < b.ESTOQUE ? 1 : 0;
            return a.PRECO_CUSTO_INSU_S < b.PRECO_CUSTO_INSU_S;
        });
        //Ordenar Array() pela coluna Estoque;
        dataset.values.sort((a,b)=>{
            //return a.ESTOQUE > b.ESTOQUE ? -1 : a.ESTOQUE < b.ESTOQUE ? 1 : 0;
            return b.ESTOQUE - a.ESTOQUE;
        });

    };//fORDENAR_ARRAY
      
    static unexpectedError(msg, err){
        return Swal.fire({
        
            title: 'Algo deu errado :(',
            html: msg + ' ' + err,
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Atualizar página',
            showCancelButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.value) {
            window.location.reload();
            }
        });
    };//unexpectedError
      
    static swalError(msg, err){
        return Swal.fire({
            title: 'Algo deu errado :(',
            html: msg,
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            showCancelButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
        });
    };//
      
    static swalHome(title, msg){
        return Swal.fire({
            title: title,
            html: msg,
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Voltar pro inicio',
            showCancelButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.value) {
            window.location.href = WCMAPI.serverURL
            }
        });
    };//

    static mascaraMoeda(event) {
        const onlyDigits = event.target.value
        .split("")
        .filter(s => /\d/.test(s))
        .join("")
        .padStart(3, "0")
        const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
        event.target.value = maskCurrency(digitsFloat)
    };//

    static maskCurrency(valor, locale = 'pt-BR', currency = 'BRL') {
        return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency
        }).format(valor)
    };//maskCurrency

    static fHOJE_E_SEGUNDA(){ //retorna true caso for segunda e demais retornos é false;
        return new Date().getDay() == 1;
    };//

    static carregamentoFluig(){
        var myLoading2 = FLUIGC.loading(window);
        var myLoading2 = FLUIGC.loading(window,{textMessage:'Insira seu Texto aqui!...'});
		myLoading2.show();
        setTimeout(()=> {
            myLoading2.hide();fSYSDATE_DDMMYYYY() 
        }, 200);
    }; //final carregamentoFluig.

    static retorna_Ambiente_UsuarioLogado(){
        let retornoAmbiente = DatasetFactory.getDataset('DS_SQL_FLUIG_QUALAMBIENTEESTOU', null, null, null);
        let login = fetch(retornoAmbiente.values[0].URL_REDUZ+'/api/public/2.0/users/getCurrent').
                    then( response => response.json()).then( data => {
                        var usuariologado = data.content.login;
                        return usuariologado+','+retornoAmbiente.values[0].DESCRICAO;
                    });
    };// retorna_Ambiente_UsuarioLogado();

    static fRETURN_AMBIENTE_USUARIOLOGADO(){
        let login ;
        login = fetch('https://formosaweb.net.br/api/public/2.0/users/getCurrent').
            then( response => response.json()).then( data => {
                let loginNovo = data.content.login;
                console.log('Olá usuário: ' + loginNovo);

                if (loginNovo == 'admin') {
                    $('#lojaOrigem').val( '132' );
                }else {
                    // Quebra String do Login
                    let array = loginNovo.split(".");
                    let sufixo = array[array.length - 1];
                    console.log('Sigla Filial pelo [sufixo]: ' + sufixo);
                    if(sufixo == 'UM' || sufixo == 'um') {
                        //$('#lojaOrigem').val( '132' );
                    } else if(sufixo == 'AM' || sufixo == 'am') {
                        //$('#lojaOrigem').val( '124' );
                    } else if(sufixo == 'DQ' || sufixo == 'dq') {
                        //$('#lojaOrigem').val( '19' );
                    } else if(sufixo == 'CN' || sufixo == 'cn') {
                        //$('#lojaOrigem').val( '35' );
                    } else if(sufixo == 'cafre') {
                        //$('#lojaOrigem').val( '35' );
                    } else {
                        //$('#lojaOrigem').val( '100' );
                    }
                };
            }
        );
    };//final vRETURN_AMBIENTE_USUARIOLOGADO;

    static fMOSTRA_ESCONDE_ACCORDION(){
        $(async function(){
            $('.btn-success').on('click', function(e) {
                $('#accordion .collapse').removeAttr("data-parent").collapse('show');
            });
            $('.btn-danger').on('click', function(e) {
                $('#accordion .collapse').attr("data-parent","#accordion").collapse('hide');
            });
        });
    };
}; //final da class utils
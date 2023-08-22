var auditoria_gondola = SuperWidget.extend({

    //método iniciado quando a widget é carregada
    init: async function(){
        console.info('INÍCIO | Script da widget MyWidget.');
        if(!this.isEditMode){
            // modo view.ftl
            //Redireciona para o filtro caso de F5
            var url = window.location.origin + window.location.pathname;
            if(window.location.href != url){
                //$('.consultaRoteirizacao').hide();
                window.location.href = url;
                return;
            };
      
            try{
                //Iniciando classe dos services
                window.services = new Services();
            }catch(e){
                return Utils.unexpectedError('Erro ao iniciar classe Services', e);
            };
      
            try{
                //Inicia a classe do Controller
                window.controller = new Controller();
            }catch(e){
                return Utils.unexpectedError('Erro ao iniciar classe Controller', e);
            };
      
            try{
                // Inicia a classe do View
                window.view = new View();
            }catch(e){
                return Utils.unexpectedError('Erro ao iniciar classe View', e);
            };

            await controller.init();
        };
    },
  
    //BIND de eventos
    bindings: {
        local: {
          'save-preferences': ['click_savePreferences'],
          'data-fINICIAR_PROCESS_FLUIG': ['click_fINICIAR_PROCESS_FLUIG'],
        },
      },
    
    savePreferences: function(){
        var preferences = {}; // cria dinamicamente o objeto
        $('.' + this.reposi + ' input, .' + this.reposi + ' textarea').each(function (idx, cmp) {
            preferences[cmp.name] = cmp.value;
        });
        WCMSpaceAPI.PageService.UPDATEPREFERENCES(
            {
            async: true,
            success: function (data) {
                FLUIGC.toast({
                title: data.message,
                message: '',
                type: 'success',
                });
            },
            fail: function (xhr, message, errorData) {
                console.error('fail', xhr, message, errorData);
                FLUIGC.toast({
                title: '',
                message: message,
                type: 'error',
                });
            },
            },
            this.widgetId,
            preferences
        );
    },
});


<#assign reposi='auditoria_gondola'> 
<#assign versao='1.0.0'> 
<#assign parametros="{usuAdmin: '${usuAdmin!''}'}">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous" />
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs/jszip-2.5.0/dt-1.10.18/b-1.5.6/b-html5-1.5.6/b-print-1.5.6/datatables.min.css" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet" />
<link href="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/css/select2.min.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/promise-polyfill"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

<div id="${reposi}_${instanceId}" class="${reposi} super-widget wcm-widget-class" data-params="${reposi}.instance({reposi:'${reposi}', versao:'${versao}', widgetId: ${instanceId}})">
    <div class="fluig-style-guide">  
        <form id="painelzao">
            <!-- CAMPOS OCULTOS -->
            <input type="hidden" class="form-control" id="CODIGOUSER" name="CODIGOUSER" readonly>
            <!-- CAMPOS OCULTOS -->
            <section class="secPainel">
                <div class="row barra-ferramentas" style="padding-left: 10px; display: flex; align-items: center">
                    <div class="col-md-2">
                        <div class="form-group">
                            <label class="control-label">DATA - PERIODO</label>
                            <div class="input-group">
                            <input type="text" class="form-control" id="DATAPERIODO" ><span class="input-group-addon iconData"><i class="far fa-calendar-alt"></i></span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-md-2">
                        <label>FILIAL</label>
                        <div class="btn-group btn-group-justified" role="group" aria-label="...">
                            <div class="btn-group div-btn-exibicaofilial" role="group">
                                <button type="button" class="btn btn-ans dropdown-toggle btn-exibicaofilial" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Filial">907-0<span class="caret"></span></button>
                                <ul class="dropdown-menu" role="menu">
                                    <li style="font-size: 18px;"><a href="javascript:;" data-filial="907">907-0</a></li>
                                    <li style="font-size: 18px;"><a href="javascript:;" data-filial="904">904-0</a></li>
                                    <li style="font-size: 18px;"><a href="javascript:;" data-filial="1">1-9</a></li>
                                    <li style="font-size: 18px;"><a href="javascript:;" data-filial="3">3-5</a></li>
                                    <li style="font-size: 18px;"><a href="javascript:;" data-filial="12">12-4</a></li>
                                    <li style="font-size: 18px;"><a href="javascript:;" data-filial="13">13-2</a></li>
                                    <li style="font-size: 18px;"><a href="javascript:;" data-filial="15">15-9</a></li>
                                    <li role="separator" class="divider"></li>
                                </ul>
                            </div>
                            <input type="hidden" class="form-control" id="FILTRAR_FILIAL" name="FILTRAR_FILIAL" readonly>
                        </div>
                    </div>

                    <div class="form-group col-md-2">
                        <label>EXIBIÇÃO</label>
                        <div class="btn-group btn-group-justified" role="group" aria-label="...">
                            <div class="btn-group div-btn-exibicao" role="group">
                            <button type="button" class="btn btn-ans dropdown-toggle btn-exibicao" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Itens por Página">100 <span class="caret"></span></button>
                            <ul class="dropdown-menu" role="menu">
                                <li style="font-size: 18px;"><a href="javascript:;" data-qtd="25">Exibir 25 linhas</a></li>
                                <li style="font-size: 18px;"><a href="javascript:;" data-qtd="50">Exibir 50 linhas</a></li>
                                <li style="font-size: 18px;"><a href="javascript:;" data-qtd="100">Exibir 100 linhas</a></li>
                                <li style="font-size: 18px;"><a href="javascript:;" data-qtd="200">Exibir 200 linhas</a></li>
                                <li style="font-size: 18px;"><a href="javascript:;" data-qtd="500">Exibir 500 linhas</a></li>
                                <li role="separator" class="divider"></li>
                                <li style="font-size: 18px;"><a href="javascript:;" data-qtd="-1">Todas as linhas</a></li>
                            </ul>
                            </div>
                            <input type="hidden" class="form-control" id="DADOSTABLE" name="DADOSTABLE" readonly>
                        </div>
                    </div>
                    
                    <div class="form-group col-md-6">
                        <label for="FILTRO">FILTRO</label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="FILTRO" placeholder="Pesquisar..." />
                            <span class="input-group-btn">
                            <button class="btn btn-primary btn-limpa-filtro" type="button" data-toggle="tooltip" title="Limpar Filtro"><i class="fas fa-ban"></i></button>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="tabela" id="linhaTbl" style="overflow: auto; margin-left: 10px">
                    <div class="tbl-item resp">
                        <table id="tblPrincipal" class="table table-hover nothing-check">
                            <thead></thead>
                            <tbody id="tblPrincipal_tbody"></tbody>
                        </table>
                    </div>
                </div>
            </section>
        </form>
    </div>
</div>

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/v/bs/jszip-2.5.0/dt-1.10.18/b-1.5.6/b-html5-1.5.6/b-print-1.5.6/datatables.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js"></script>
<script src="/${reposi}/resources/js/jquery.maskMoney.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.0/jquery.mask.js"></script>
<script src="https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.0/FileSaver.min.js" ></script>
<script src="https://unpkg.com/xlsx/dist/xlsx.full.min.js"></script>
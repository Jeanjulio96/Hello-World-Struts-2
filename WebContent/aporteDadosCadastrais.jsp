<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html>
<head>
    <title>Dados Cadastrais - Aporte</title>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    
    <script src="aporteDadosCadastrais.js"></script>

    <style type="text/css">
        body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, fieldset, input, textarea, p, blockquote, th, td, a { margin: 0; padding: 0; vertical-align: bottom; }
        ol, ul { list-style: none; }
        form, body { -webkit-appearance: none; font: 16px/100% "Bradesco Sans", sans-serif !important; height: auto; color: #4d4e53; position: relative; background-color: #fff; }
        .formulario { width: 100%; margin-top: 30px; }
        .formulario li { margin-left: 0px; clear: both; float: none; padding-bottom: 0; margin-right: 30px; }
        .formulario input, .formulario select { font-family: "Bradesco Sans", sans-serif !important; font-weight: 500 !important; color: #4d4e53; background: #FFFFFF 0% 0% no-repeat padding-box; border: 1px solid #ABB0BB; border-radius: 5px; text-align: left; margin-right: 0px !important; height: 50px; vertical-align: middle; padding: 15px; width: -webkit-fill-available; box-sizing: border-box; font-size: 16px; }
        .formulario input:disabled, .formulario select:disabled, .formulario input[readonly] { background-color: #F4F4F6; opacity: 0.7; }
        .erroInput { border: 1px solid #CC092F !important; }
        .title { font-weight: bold; font-size: 22px; padding-bottom: 10px; }
        .subTitle { padding-top: 16px !important; padding-bottom: 5px; }
        .box-alerta { background: #FCF8E3; border: 1px solid #F8EDD6 !important; border-radius: 5px; padding: 12px 16px; font-size: 14px; line-height: 1.3em; }
        .btos_bottom { float: none; }
        .btos_bottom li { float: left; margin-right: 20px; }
        .form_erro .msg_erro, .errorMessage { color: #CC092F !important; font-size: 12px; font-weight: 500; padding-top: 5px; display: block; }
        .contentScrollNew { max-height: 200px; overflow-y: auto; background-color: #F4F4F6; padding: 10px; border: 1px solid #E0E0E0; position: absolute; z-index: 1000; width: 100%; box-sizing: border-box;}
        .contentScrollNew a { display: block; padding: 8px; text-decoration: none; color: #333; }
        .contentScrollNew a:hover { background-color: #ddd; }
        .hide { display: none; }
        .bs-container { padding: 20px 40px; }
        .bs-aporte-titulo-texto { font-size: 34px; font-weight: 300; }
        .semNumeroCheckBox { width: 20px; height: 20px; border: 1px solid #D2D4DA; border-radius: 5px; margin-left: 10px; cursor: pointer; }
        .semNumeroCheckBox-true { background-color: #CC092F; }
        .pt50 { padding-top: 50px !important; }
        .pb100 { padding-bottom: 100px !important; }
        .mr0 { margin-right: 0px !important; }
    </style>
</head>
<body>

<s:form id="aporteDadosCadastraisForm" action="confirmacaoDadosAporte">
    <s:hidden name="aporteRequest.nrEndereco" id="hNrEndereco" />
    <s:hidden name="aporteRequest.flagSemNumero" id="hSemNumero" />
    <s:hidden name="aporteRequest.numTelefone" id="hNumTelefone" />
    <s:hidden name="aporteRequest.detalhaDadosParticipante.pessoaExposta" id="pessoaExposta" />
    <s:hidden name="aporteRequest.detalhaDadosParticipante.relacionamento" id="relacionamento" />
    <s:hidden name="aporteRequest.municipio" id="hCidade" />
    <s:hidden name="aporteRequest.uf" id="hUf" />

    <div class="bs-container">
        <div class="bs-aporte-titulo"><p class="bs-aporte-titulo-texto">Dados <b>cadastrais</b></p></div>
        <p>Os campos com asterisco são de preenchimento obrigatório.</p>

        <div class="formulario">
            <div class="title">Dados Pessoais</div>
            <ul style="display: flex; width: 100%;">
                <li style="width: 66%;">
                    <div class="subTitle">Nome</div>
                    <s:textfield name="aporteRequest.nmParticipante" id="nomeInput" readonly="true" />
                </li>
                <li class="mr0" style="width: 34%;">
                    <div class="subTitle">CPF</div>
                    <s:textfield name="aporteRequest.cpfApresentacao" id="cpfInput" readonly="true" />
                </li>
            </ul>
            <ul style="display: flex; width: 100%;">
                <li style="width: 33%;">
                    <div class="subTitle">Data de nascimento</div>
                    <s:textfield name="aporteRequest.dtNascimento" id="dtNascimentoInput" readonly="true" />
                </li>
                <li style="width: 33%;">
                    <div class="subTitle">Sexo</div>
                    <s:select name="aporteRequest.sexo" id="sexolInput" list="listaSexo" disabled="true" />
                    <s:hidden name="aporteRequest.sexo" />
                </li>
                <li class="mr0" style="width: 34%;">
                    <div class="subTitle">Estado civil*</div>
                    <s:select name="aporteRequest.estadoCivil" id="estadoCivilInput" list="listaEstadoCivil" />
                    <div class="msg_erro"><s:fielderror fieldName="aporteRequest.estadoCivil"/></div>
                </li>
            </ul>
            <ul style="display: flex; width: 100%;">
                <li style="width: 50%; position: relative;">
                    <div class="subTitle">Profissão*</div>
                    <s:textfield name="aporteRequest.descricaoOcupacao" id="inputProfissao" onkeyup="buscarOcupacao(this.value);" autocomplete="off"/>
                    <div class="divPopup hide">
                        <div class="contentScrollNew hide">
                            <table id="listaOcupacao" width="100%">
                                <s:iterator value="ocupacoes">
                                    <tr><td>
                                        <a href="javascript:;" onclick="selecioneOcupacao('<s:property value="codOcupacao"/>', '<s:property value="descOcupacao"/>');">
                                            <span class="considerar"><s:property value="codOcupacao"/> - <s:property value="descOcupacao"/></span>
                                        </a>
                                    </td></tr>
                                </s:iterator>
                            </table>
                        </div>
                    </div>
                    <div class="msg_erro"><s:fielderror fieldName="aporteRequest.descricaoOcupacao"/></div>
                </li>
                <li class="mr0" style="width: 50%;">
                    <div class="subTitle">Renda mensal</div>
                    <s:textfield name="aporteRequest.vlrRendaMesFluxo" id="rendaMensalInput" onkeyup="maskMonetarioCampo(this);" />
                    <div class="msg_erro"><s:fielderror fieldName="aporteRequest.vlrRendaMesFluxo"/></div>
                </li>
            </ul>

            <div class="title pt50">Contato</div>
            <ul style="display: flex; width: 100%;">
                <li style="width: 50%;">
                    <div class="subTitle">Celular*</div>
                    <s:textfield name="aporteRequest.numTelefone" id="celularInput" maxlength="15" onkeyup="maskCelular(this.value); validarCelular();" />
                    <div class="msg_erro"><s:fielderror fieldName="aporteRequest.numTelefone"/></div>
                </li>
                <li class="mr0" style="width: 50%;">
                    <div class="subTitle">E-mail*</div>
                    <s:textfield name="aporteRequest.emailParticipante" id="emailInput" maxlength="100" onkeyup="trim(this.id);validarEmail();" />
                    <div class="msg_erro"><s:fielderror fieldName="aporteRequest.emailParticipante"/></div>
                </li>
            </ul>
            
            <div class="title pt50">Endereço</div>
            <ul style="display: flex; width: 100%;">
                <li style="width: 25%;">
                    <div class="subTitle">CEP*</div>
                    <s:textfield name="aporteRequest.cepMascara" id="cepInput" maxlength="9" onkeyup="maskCEP(0);" />
                    <div class="msg_erro"><s:fielderror fieldName="aporteRequest.cepMascara"/></div>
                </li>
               <li style="width: 50%;">
    <div class="subTitle">Logradouro*</div>
    <s:textfield name="aporteRequest.logradouro" 
                 id="logradouroInput" 
                 maxlength="40" 
                 onkeyup="validaLogradouroSeguro();" 
                 onblur="trim(this.id);"
                 onpaste="validaPasteLogradouro(event);" />
    <div class="msg_erro"><s:fielderror fieldName="aporteRequest.logradouro"/></div>
</li>
                <li class="mr0" style="width: 25%;">
                    <div class="subTitle">Bairro*</div>
                    <s:textfield name="aporteRequest.bairro" id="bairroInput" maxlength="20" onkeyup="validaBairro();" onblur="trim(this.id);" />
                    <div class="msg_erro"><s:fielderror fieldName="aporteRequest.bairro"/></div>
                </li>
            </ul>
            <ul style="display: flex; width: 100%;">
                <li style="width: 25%;">
                    <div class="subTitle">Número*</div>
                    <div style="display: flex; align-items: center;">
                        <s:textfield name="aporteRequest.nrEndereco" id="numeroInput" maxlength="5" onkeyup="soNumeros(this.id); validaNumeroLogradouro();" />
                        <button class="semNumeroCheckBox" onclick="validaSemNumero(); return false;" id="semNumero" type="button"></button>
                        <label style="margin-left:5px;">Sem número</label>
                    </div>
                    <div class="msg_erro"><s:fielderror fieldName="aporteRequest.nrEndereco"/></div>
                </li>
                <li style="width: 25%;">
                    <div class="subTitle">Complemento</div>
                    <s:textfield name="aporteRequest.complementoParticipante" id="complementoInput" maxlength="15" onblur="trim(this.id);" />
                </li>
                <li style="width: 25%;">
                    <div class="subTitle">Cidade*</div>
                    <s:textfield name="aporteRequest.municipio" id="cidadeInput" maxlength="30" onkeyup="soLetras(this.id, this.value); validaCidade();" onblur="trim(this.id);" />
                    <div class="msg_erro"><s:fielderror fieldName="aporteRequest.municipio"/></div>
                </li>
                <li class="mr0" style="width: 25%;">
                    <div class="subTitle">Estado*</div>
                    <s:select name="aporteRequest.uf" id="estadoInput" list="listaUf" />
                    <div class="msg_erro"><s:fielderror fieldName="aporteRequest.uf"/></div>
                </li>
            </ul>

            <s:if test="aporteRequest.detalhaDadosParticipante.pessoaExposta == 'S' || aporteRequest.detalhaDadosParticipante.relacionamento == 'S'">
                <div class="title pt50">Origem do recurso</div>
                <ul style="display: flex; width: 100%;">
                    <li style="width: 33%;">
                        <div class="subTitle">Qual a origem do recurso?*</div>
                        <s:select name="aporteRequest.origemRecProdt" id="origemRecInput" list="listaRecursos"/>
                        <div class="msg_erro"><s:fielderror fieldName="aporteRequest.origemRecProdt"/></div>
                    </li>
                    <li class="descricaoOrigemRec hide mr0" style="width: 33%;">
                        <div class="subTitle">Escreva a origem do recurso*</div>
                        <s:textfield name="aporteRequest.observacaoOrigem" id="descricaoOrigemRecInput" maxlength="50" onkeyup="validarDescricaoRecurso(this.value);" onblur="trim(this.id);"/>
                        <div class="msg_erro"><s:fielderror fieldName="aporteRequest.observacaoOrigem"/></div>
                    </li>
                </ul>
            </s:if>

            <div class="pt50">
                <div class="box-alerta"><b>Atenção:</b> Para fazer alterações nos seus dados pessoais é necessário entrar em contato com nossa <b>central de atendimento.</b></div>
            </div>
            
            <div class="btos_bottom pt50 pb100">
                <ul>
                    <li><input type="button" value="Voltar" onclick="history.back();" style="width: 100px; height: 40px; cursor: pointer;"/></li>
                    <li><s:submit value="Salvar e avancar" style="width: 180px; height: 40px; cursor: pointer;" /></li>
                </ul>
            </div>
        </div>
    </div>
</s:form>

</body>
</html>
/** BVP - Nao Correntista */
var FORM_ID = "aporteDadosCadastraisForm";

jQuery(document).ready(function(){	
	
	jQuery("select[id$=estadoCivilInput]").change(function(){	
		validarSelect(this);
	});
	
	jQuery("select[id$=estadoInput]").change(function(){	
		jQuery("input[id$=hUf]").val(this.value);
		validarSelect(this);
	});
	
	jQuery("select[id$=origemRecInput]").change(function(){	
		validarSelect(this);
		validarOrigemRecurso();
	});
	
	loadValores();
	validarFormulario();
	removeAllErrorInput();
	
	ajustaPositionCaminhoDePao();
	
	/* INICIO TAGUEAMENTO  - PAGEVIEW - DADOS CADASTRAIS*/
	window.dataLayer = window.dataLayer || [];
	dataLayer.push({
	  'event': 'pageView',
	  'page': {
	    'ambiente': 'portal-previdencia-nao-correntista',
	    'produto': 'previdencia',
	    'funcionalidade': 'aporte',
	    'detalhe': 'dados-cadastrais',
	    'nome': 'portal-previdencia-nao-correntista:previdencia:aporte:dados-cadastrais'
	  }
	});
	/* FIM TAGUEAMENTO  - PAGEVIEW - DADOS CADASTRAIS*/
});

function removerErro(idCampo) {
    var nomeSeletor = prepararSeletor(idCampo);

    (function ($) {
    	var de = $("input[name=" + nomeSeletor + "]");
    	$(de).parents(".campos_form").removeClass("form_erro")
    	                .find(".msg_erro").html("");
    	removerErroTitle(de);

	var deSelect = $("select[name=" + nomeSeletor + "]");
    	$(deSelect).parents(".campos_form").removeClass("form_erro")
    	                .find(".msg_erro").html("");
    	removerErroTitle(deSelect);

    })(jQuery);
}

//Trim whitespace from left and right sides of s.
function trim(id) {
    var s = jQuery("#" + id).val();
    s = s.replace(/^\s+|\s+$/g, '');
    s = s.replace(/\s+/g, ' ');
    jQuery("#" + id).val(s);
    return s;
}

function $ctrl(id) {
	return jQuery("input[id$=" + id + "]"); 
}

function isNullOrEmpty(valueToCheck) {
	if (valueToCheck == '' || valueToCheck == null || valueToCheck == undefined || String(jQuery.trim(valueToCheck)).length == 0) {
		return true;
	} else {
		return false;
	}
}

function validarFormulario() {
	bindFields();
    
    if(verificaErroNoFormulario()){
		jQuery(".form_erro").closest("li").find('.tabindex').addClass("erroInput");
		jQuery(".form_erro").closest("li").find(".msg_erro").html( 'Preenchimento obrigat&oacute;rio' );
		return false;
	}
	
	return true;
}

function ancorarErro(){
	if(verificaErroNoFormulario()){
		carregarModal();
        return false;
	}
	
	window.dataLayer = window.dataLayer || [];
	dataLayer.push({
		'event': 'interaction',
		'custom': {
			'category': 'portal-previdencia-nao-correntista:previdencia:aporte:dados-cadastrais',
			'action': 'clique:botao',
			'label': 'salvar-e-avancar'
		}
	});
	
	return true;
}

function carregarModal(){
	jQuery('#modalCamposObrigatorios').show();
}

function closeModal() {
	validarFormulario();

	$('html,body').animate({
		scrollTop: $(".form_erro:first").offset().top - 177
	}, 1000, function() {
		$("#comment-textarea").focus();
	});
	
	jQuery('#modalCamposObrigatorios').hide();
}

function loadValores() {
	var pessoaExposta = false;
	if($ctrl('pessoaExposta').val() == 'S' || $ctrl('relacionamento').val() == 'S'){
		pessoaExposta = true;
	}
	
	validarSelect(document.getElementById("aporteDadosCadastraisForm:estadoCivilInput"));
	
	if(jQuery("#aporteDadosCadastraisForm\\:hUf").val() != ''){
		jQuery("#aporteDadosCadastraisForm\\:estadoInput").val(jQuery("#aporteDadosCadastraisForm\\:hUf").val());
	}
	validarSelect(document.getElementById("aporteDadosCadastraisForm:estadoInput"));
	
	if(pessoaExposta){
		validarSelect(document.getElementById("aporteDadosCadastraisForm:origemRecInput"));
		
		if(jQuery("select[id$=origemRecInput]").val() == '99'){
			jQuery(".descricaoOrigemRec").removeClass("hide");
			validarDescricaoRecurso(jQuery("input[id$=descricaoOrigemRecInput]").val());
		}
	}
	
	maskCPF();
	maskCelular($ctrl('celularInput').val());
	maskCEP(1);
	maskMonetarioValue($ctrl('rendaMensalInput').val());
	maskDtNascimento();
	validarCelular();
	
	validarEmail();
	validaLogradouro();
	validaBairro();
	
	var semNumnero = jQuery("input[id$=hSemNumero]").val();
	if(semNumnero == 'true'){
		validaSemNumero();
	}
	
	validaNumeroLogradouro();
	validaCidade();
	validaOcupacao();
}

function bindFields() {
	if($ctrl('pessoaExposta') == 'S' || $ctrl('relacionamento') == 'S'){
		var pessoaExposta = true;
	}
	
	validarSelect(document.getElementById("aporteDadosCadastraisForm:estadoCivilInput"));
	validarSelect(document.getElementById("aporteDadosCadastraisForm:estadoInput"));
	
	if(pessoaExposta){
		validarSelect(document.getElementById("aporteDadosCadastraisForm:origemRecInput"));
		
		validarDescricaoRecurso(jQuery("input[id$=descricaoOrigemRecInput]").val());
	}
	
	validarCelular();
	validarEmail();
	validaCep();
	validaLogradouro();
	validaBairro();
	validaNumeroLogradouro();
	validaCidade();
	validaOcupacao();
}

function getCleanValue(formatedValue) {
	return clearString(formatedValue.toString(), "-0123456789");
}

function clearString(value, validCharacters) {
	var result = '';
	var index = -1;
	var i = 0;

	for(i = 0; i < value.length; i++) {
		index = validCharacters.indexOf(value.charAt(i));
		if(index > -1) {
			result += validCharacters.charAt(index);
		}
	}
	return result;
}

function setErrorById(ctrlId, message) {
	jQuery("#"+ctrlId).closest("li").addClass("form_erro");
	jQuery("#"+ctrlId).addClass("erroInput");
	jQuery("#"+ctrlId).closest("li").find(".msg_erro").html( message );
}

function setErrorByIdSelect(ctrlId, message) {
	jQuery("select[id$="+ctrlId+"]").closest("li").addClass("form_erro");
	jQuery("select[id$="+ctrlId+"]").addClass("erroInput");
	jQuery("select[id$="+ctrlId+"]").closest("li").find(".msg_erro").html( message );
}

function setFormErroById(ctrlId) {
	jQuery("#"+ctrlId).closest("li").addClass("form_erro");
}

function removeErrorById(ctrlId) {
	jQuery("#"+ctrlId).closest("li").removeClass("form_erro");
	jQuery("#"+ctrlId).removeClass("erroInput");
	jQuery("#"+ctrlId).closest("li").find(".msg_erro").html("");
}

function removeErrorByIdSelect(ctrlId) {
	jQuery("select[id$="+ctrlId+"]").closest("li").removeClass("form_erro");
	jQuery("select[id$="+ctrlId+"]").removeClass("erroInput");
	jQuery("select[id$="+ctrlId+"]").closest("li").find(".msg_erro").html("");
}

function removeAllErrorInput() {
	jQuery(".erroInput").removeClass("erroInput");
	jQuery(".msg_erro").html("");
}

/*Recebe o campo*/
function maskMonetarioCampo(campo) {
	var valor = campo.value;
	const v = ((valor.replace(/\D/g, '') / 100).toFixed(2) + '').split('.');
	const m = v[0].split('').reverse().join('').match(/.{1,3}/g);
	for (let i = 0; i < m.length; i++)
		m[i] = m[i].split('').reverse().join('') + '.';
	const r = m.reverse().join('');
	var result = r.substring(0, r.lastIndexOf('.')) + ',' + v[1];
	result = 'R$ ' + result;
	campo.value = result;
	return result;
}

/*Recebe valor*/
function maskMonetarioValue(value) {
	if (isMaskMonetario(value)) {
		value = removeMonetario(value);
	}
	value = value.replace(/[^0-9.]/g, '');
	if (value.indexOf('.') === -1) {
		value += '.00';
	}
	if (value.split('.')[1].length === 1) {
		value += '0';
	}
	const v = ((value.replace(/\D/g, '') / 100).toFixed(2) + '').split('.');
	const m = v[0].split('').reverse().join('').match(/.{1,3}/g);
	for (let i = 0; i < m.length; i++)
		m[i] = m[i].split('').reverse().join('') + '.';
	const r = m.reverse().join('');
	var result = r.substring(0, r.lastIndexOf('.')) + ',' + v[1];
	result = 'R$ ' + result;
	$ctrl('rendaMensalInput').val(result);
	return result;
}

function isMaskMonetario(value) {
  return value.includes("R$");
}

function removeMonetario(value) {
	var valor = value;
	valor = valor.replaceAll(".", "").replaceAll("R$ ", "");
	valor = valor.replaceAll(",", ".")
	return valor;
}

function maskCPF() {
	var cpf = jQuery("#cpfInput").val();
	if (cpf.length === 11) {
		cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
	}
	jQuery("#cpfInput").val(cpf);
}

function maskCelular(valor) {
	var value = valor;
    value = value.replace(/\D/g, '');
    value = value.replace(/^(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{5})(\d)/, '$1 $2');
	jQuery("#celularInput").val(value);
}

function maskCEP(init) {
	var cep = jQuery("input[id$=cepInput]").val();
	if (init == 1 && cep != "" && cep.length < 8) {
		for (i = 0; cep.length < 8; i++) {
			cep = "0" + cep;
		}
	}
	cep = cep.replace(/\D/g, "")
	cep = cep.replace(/(\d{5})(\d{1,3})$/, "$1-$2")
	jQuery("input[id$=cepInput]").val(cep);
}

function soNumeros(obj) {
	var value = jQuery("input[id$=" + obj + "]").val();
	jQuery("input[id$=" + obj + "]").val(value.replace(/\D/g, ''))
}

function soLetras(obj, value) {
	value = value.replaceAll(/[0-9]/gi, '')
	value = value.replaceAll("  ", " ");
	value = value.replaceAll(/[-!"#$%&'()*+,./:;<=>?@[\\\]_`{|}~\u00A0-\u00BF]/gi, '')
	jQuery("input[id$=" + obj + "]").val(value);
}

function maskDtNascimento() {
	var data = $ctrl('dtNascimentoInput').val();
	const dia = data.substring(0, 2);
    const mes = data.substring(2, 4);
    const ano = data.substring(4);
    $ctrl('dtNascimentoInput').val(dia+'/'+mes+'/'+ano);
}

function validaCep() {
	var idDiv = "cepInput";
	var cep = jQuery("input[id$=cepInput]").val();
	if (cep.length < 9 || cep === "00000 000") {
		setErrorById(idDiv, "Preenchimento obrigat&oacute;rio");
		return false;
	} else {
		removeErrorById(idDiv);
		jQuery("#hCep").val(cep);
		return true;
	}
}

function validarCelular() {
	var idDiv = "celularInput";
	var celular = jQuery("input[id$="+idDiv+"]").val();

	var celularInvalidos = ["90000 0000",
		"91111 1111", "92222 2222", "93333 3333",
		"94444 4444", "95555 5555", "96666 6666",
		"97777 7777", "98888 8888", "99999 9999"];
	expTel1 = /^\d{9}$/;

	if (celular != "") {
		if (celular.length < 15 || parseInt(celular.substring(5, 6)) != 9) {
			setErrorById(idDiv, "Insira um n&uacute;mero v&aacute;lido");
		} else {
			removeErrorById(idDiv);
			jQuery("#hNumTelefone").val(celular);
			for (var i = 0; i < celularInvalidos.length; i++) {
				if (celular.substring(5, 15) == celularInvalidos[i]) {
					setErrorById(idDiv, "Insira um n&uacute;mero v&aacute;lido");
				}
			}
		}
	} else {
		setErrorById(idDiv, "Preenchimento obrigat&oacute;rio");
	}
}

function validarEmail() {
	var idDiv = "emailInput";
	var emailStr = jQuery("input[id$="+idDiv+"]").val();
	
	if (emailStr.length == 0) {
		setErrorById(idDiv, "Preenchimento obrigat&oacute;rio");
		return false;
	} else if (emailStr.length > 0 && !checkEmail(emailStr)) {
		setErrorById(idDiv, "Insira um e-mail v&aacute;lido");
		return false;
	} else {
		removeErrorById(idDiv);
		jQuery("#hEmail").val(emailStr);
		return true;
	}
}

function checkEmail(emailStr) {
    if (emailStr.length == 0) {
        return true;
    }
    var emailPat = /^(.{3,})@(.+)$/;
    var specialChars = "\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";
    var validChars = "\[^\\s" + specialChars + "\]";
    var quotedUser = "(\"[^\"]*\")";
    var ipDomainPat = /^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;
    var atom = validChars + '+';
    var word = "(" + atom + "|" + quotedUser + ")";
    var userPat = new RegExp("^" + word + "(\\." + word + ")*$");
    var domainPat = new RegExp("^" + atom + "(\\." + atom + ")*$");
    var matchArray = emailStr.match(emailPat);
    if (matchArray == null) {
        return false;
    }
    var user = matchArray[1];
    var domain = matchArray[2];
    if (user.match(userPat) == null) {
        return false;
    }
    var IPArray = domain.match(ipDomainPat);
    if (IPArray != null) {
        for (var i = 1; i <= 4; i++) {
            if (IPArray[i] > 255) {
                return false;
            }
        }
        return true;
    }
    var domainArray = domain.match(domainPat);
    if (domainArray == null) {
        return false;
    }
    var atomPat = new RegExp(atom, "g");
    var domArr = domain.match(atomPat);
    var len = domArr.length;
    if ((domArr[domArr.length - 1].length < 2) ||
        (domArr[domArr.length - 1].length > 10)) {
        return false;
    }
    if (len < 2) {
        return false;
    }
    return true;
}

function validarSelect(campo) {
	var idDiv = campo.id;
	var value = campo.value;
	idDiv = idDiv.replace('aporteDadosCadastraisForm:', '');
	if (value == '0') {
		setErrorByIdSelect(idDiv, "Preenchimento obrigat&oacute;rio");
	} else {
		removeErrorByIdSelect(idDiv);
		return true;
	}
}

function validarOrigemRecurso() {
	if(jQuery("select[id$=origemRecInput]").val() == '99') {
		jQuery(".descricaoOrigemRec").removeClass("hide");
		setFormErroById('descricaoOrigemRecInput');
	} else {
		jQuery(".descricaoOrigemRec").addClass("hide");
		jQuery("#descricaoOrigemRecInput").val("");
		removeErrorById('descricaoOrigemRecInput');
	}
}

function validarDescricaoRecurso(value){
	if(jQuery("select[id$=origemRecInput]").val() == '99'){
		if(value.length < 3){
		setErrorById('descricaoOrigemRecInput', 'Preenchimento obrigat&oacute;rio');
		} else {
			removeErrorById('descricaoOrigemRecInput');
		}
	}
}

function validaLogradouro() {
    var idDiv = "logradouroInput";
    var logradouro = jQuery("input[id$=logradouroInput]").val();
    var regex = /^[a-zA-Z0-9ãÃáÁàÀâÂéÉêÊíÍóÓôÔõÕúÚçÇ ]+$/;
    if (logradouro === "" || logradouro.length < 4) {
        setErrorById(idDiv, "Preenchimento obrigatório");
        return false;
    } else if (!regex.test(logradouro)) {
        setErrorById(idDiv, "Só é permitido letras, números e espaço. Caracteres especiais não são aceitos.");
        return false;
    } else {
        removeErrorById(idDiv);
        jQuery("#hLogradouro").val(logradouro);
        return true;
    }
}

function validaLogradouroSeguro() {
    var input = document.getElementById('logradouroInput');
    var valor = input.value;
    
    // Remove caracteres perigosos em tempo real
    var valorLimpo = valor.replace(/[<>/\\&"'`=;(){}[\]|*+?^$]/g, '');
    
    // Permite apenas letras, números, espaços, hífen, ponto e acentos
    valorLimpo = valorLimpo.replace(/[^a-zA-Z0-9ãÃáÁàÀâÂéÉêÊíÍóÓôÔõÕúÚçÇ\s\-\.]/g, '');
    
    // Atualiza o campo se houve mudança
    if (valor !== valorLimpo) {
        input.value = valorLimpo;
    }
    
    // Validação adicional
    if (valorLimpo.length > 40) {
        input.value = valorLimpo.substring(0, 40);
    }
}

// Função para prevenir colagem de conteúdo malicioso
function validaPasteLogradouro(event) {
    event.preventDefault();
    
    var clipboardData = event.clipboardData || window.clipboardData;
    var pastedData = clipboardData.getData('text');
    
    // Remove caracteres perigosos do texto colado
    var textoLimpo = pastedData.replace(/[<>/\\&"'`=;(){}[\]|*+?^$]/g, '');
    textoLimpo = textoLimpo.replace(/[^a-zA-Z0-9ãÃáÁàÀâÂéÉêÊíÍóÓôÔõÕúÚçÇ\s\-\.]/g, '');
    
    var input = event.target;
    var start = input.selectionStart;
    var end = input.selectionEnd;
    var currentValue = input.value;
    
    // Insere o texto limpo na posição do cursor
    var newValue = currentValue.substring(0, start) + textoLimpo + currentValue.substring(end);
    
    if (newValue.length <= 40) {
        input.value = newValue;
        input.setSelectionRange(start + textoLimpo.length, start + textoLimpo.length);
    }
}

function validaBairro() {
	var idDiv = "bairroInput";
	var bairro = jQuery("input[id$=bairroInput]").val();
	if (bairro == "" || bairro.length < 4) {
		setErrorById(idDiv, "Preenchimento obrigat&oacute;rio");
	} else {
		removeErrorById(idDiv);
		jQuery("#hLogradouro").val(bairro);
		return true;
	}
}

function validaNumeroLogradouro() {
	var idDiv = "numeroInput";
	var numero = jQuery("input[id$=numeroInput]").val();
	if (numero == "" && (!jQuery("button[id$=semNumero]").hasClass("semNumeroCheckBox-true"))) {
		setErrorById(idDiv, "Preenchimento obrigat&oacute;rio");
	} else if (numero.length < 1 && numero != "") {
		setErrorById(idDiv, "Preenchimento obrigat&oacute;rio");
	} else {
		removeErrorById(idDiv);
		jQuery("#hLogradouro").val(numero);
	}
}

function validaSemNumero() {
    if(jQuery("button[id$=semNumero]").hasClass("semNumeroCheckBox-true")){
        jQuery("button[id$=semNumero]").removeClass("semNumeroCheckBox-true");
        jQuery("input[id$=numeroInput]").attr("disabled", false);
        jQuery("input[id$=hSemNumero]").val(false);
        setErrorById("numeroInput", "Preenchimento obrigat&oacute;rio");
    } else {
        jQuery("button[id$=semNumero]").addClass("semNumeroCheckBox-true");
        jQuery("input[id$=hNrEndereco]").val("");
        jQuery("input[id$=numeroInput]").val("").attr("disabled", true);
		jQuery("input[id$=hSemNumero]").val(true);
        removeErrorById("numeroInput");
    }
}

function validaCidade() {
	var idDiv = "cidadeInput";
	var cidade = jQuery("input[id$=cidadeInput]").val();
	if (cidade == "" || cidade.length < 4) {
		setErrorById(idDiv, "Preenchimento obrigat&oacute;rio");
	} else {
		removeErrorById(idDiv);
		jQuery("input[id$=hCidade]").val(cidade);
		return true;
	}
}

function verificaErroNoFormulario() {
    var formulario = document.getElementById(FORM_ID);
    var camposComErro = formulario.querySelectorAll(".form_erro");
    return camposComErro.length > 0;
}

function buscarOcupacao(valor) {
	$(".contentScroll").addClass("hide");
	$(".divPopup").addClass("hide");

	if (valor.length > 0) {
		$(".contentScroll").removeClass("hide");
		$(".divPopup").removeClass("hide");
	}
	var tabFavorecido = $("table[id$=listaOcupacao]");
	var contLinha = 0;
	var identico = false;

	tabFavorecido.find("tr").each(function() {
		contLinha++;
		var linha = $(this);
		var results = linha.find("span.considerar").filter(function() {
			var texto = $(this).text();
			var regexValor = new RegExp(valor, 'gi');

			if ($.trim(valor) == "" || texto.match(regexValor)) {
				if (texto.match(regexValor) === valor) {
					identico = true;
				} else {
					identico = false;
				}
				return true;
			} else {
				return false;
			}
		});
		if (results.length > 0) {
			results.each(function() {
				$(this).html($(this).html().replace(/<\/strong>/gi, "").replace(/<strong>/gi, ""));
				var v = $(this).html();
				if (valor != "")
					$(this).html(v);
			});
			linha.show();
		} else {
			linha.hide();
			contLinha--;
		}
	});

	var result = valor.indexOf(" - ") > -1;
	if (contLinha == 0) {
		$(".contentScroll").addClass("hide");
		$(".divPopup").addClass("hide");
	}
	if ((result == false) || (contLinha == 0) || (identico == false)) {
		setErrorById("inputProfissao", "Preenchimento obrigat&oacute;rio");
	}
}

function selecioneOcupacao(codigoOcupacao, descricaoOcupacao) {
	jQuery(".contentScroll").addClass("hide");
	jQuery(".divPopup").addClass("hide");
	
	var ocupacao = codigoOcupacao;
	ocupacao = ocupacao + " - ";
	ocupacao = ocupacao + descricaoOcupacao;
	
	jQuery("input[id$=inputProfissao]").val(ocupacao);
	jQuery("#hProfissao").val(ocupacao);
	
	removeErrorById('inputProfissao');
	
	codigoOcupacao = parseInt(codigoOcupacao);
	
	jQuery("input[id$=hCodigoEprofissao]").val(ocupacao);
}

function validaOcupacao() {
	var idDiv = "inputProfissao";
	var ocupacao = jQuery("input[id$="+idDiv+"]").val();
	if (ocupacao == '') {
		setErrorById(idDiv, "Preenchimento obrigat&oacute;rio");
	} else {
		removeErrorById(idDiv);
	}
}

function ajustaPositionCaminhoDePao() {
	document.getElementById('btnMenuRealizarAporte').classList.add('bs-quick-menu--active');
	setTimeout(function() {
		var elementoHeader = $("#fixedHeader");
		var elementoTituloEspecifico = $("#tituloEspecifico");
		var alturaElementoHeader = elementoHeader.height();
		var alturaElementoTitulo = elementoTituloEspecifico.height();
		var valorTop = alturaElementoHeader - alturaElementoTitulo;
		elementoTituloEspecifico.css("margin-top", valorTop + "px");
	}, 1000);
}
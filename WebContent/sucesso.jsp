<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html>
<head>
    <title>Sucesso!</title>
</head>
<body>
    <h1>Operação Concluída com Segurança!</h1>
    <p>Obrigado, <strong><s:property value="aporteRequest.nmParticipante" escapeHtml="true"/></strong>!</p>
    
    <h3>Dados Recebidos (Exibidos de forma segura):</h3>
    <p>
        <strong>Logradouro:</strong> 
        <s:property value="aporteRequest.logradouro" escapeHtml="true" />
    </p>
    <p>
        <strong>Bairro:</strong>
        <s:property value="aporteRequest.bairro" escapeHtml="true" />
    </p>
    <p>
        <strong>E-mail:</strong>
        <s:property value="aporteRequest.emailParticipante" escapeHtml="true" />
    </p>
    
    <br/>
    <a href="<s:url action='exibirDadosCadastrais'/>">Voltar para o formulário</a>
</body>
</html>

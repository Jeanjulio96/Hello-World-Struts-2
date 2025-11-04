<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html>
<head>
    <title>Início - Aporte Previdência</title>
    <style>
        body { font-family: sans-serif; padding: 20px; }
        a { font-size: 1.2em; }
    </style>
</head>
<body>
    <h1>Página Inicial</h1>
    <p>Bem-vindo ao mock do sistema de Aporte de Previdência.</p>
    <p>
        <a href="<s:url action='exibirDadosCadastrais'/>">
            Iniciar Aporte (Preencher Dados Cadastrais)
        </a>
    </p>
</body>
</html>
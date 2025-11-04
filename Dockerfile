# 1. Imagem Base com Tomcat 9 e Java 8
FROM tomcat:9.0-jdk8-temurin

# 2. (Opcional) Limpa a pasta de apps de exemplo
RUN rm -rf /usr/local/tomcat/webapps/*

# 3. Copia o .war DE DENTRO DA PASTA TARGET
# Esta é a principal mudança!
# O Docker vai procurar em "target/HelloWorldStruts2.war"
COPY target/HelloWorldStruts2.war /usr/local/tomcat/webapps/ROOT.war
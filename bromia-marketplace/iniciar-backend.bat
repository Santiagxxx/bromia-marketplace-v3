@echo off
set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr"
set "PATH=%JAVA_HOME%\bin;%PATH%"
cd /d "%~dp0backend"
echo Iniciando Backend Spring Boot de Bromia en http://localhost:8080 ...
mvn spring-boot:run

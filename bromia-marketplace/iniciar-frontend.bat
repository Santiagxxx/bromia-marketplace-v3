@echo off
cd /d "%~dp0frontend"
if not exist node_modules (
    echo Instalando dependencias del frontend...
    call npm install
)
echo Iniciando Frontend Vue 3 de Bromia en http://localhost:5173 ...
call npm run dev

#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/frontend"
if [ ! -d "node_modules" ]; then
  echo "📦 Instalando dependencias de Vue + Tailwind..."
  npm install
fi
echo "✨ Iniciando Frontend Vue 3 de Bromia en http://localhost:5173 ..."
npm run dev

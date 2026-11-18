#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/backend"
echo "🍫 Iniciando Backend Spring Boot de Bromia en http://localhost:8080 ..."
mvn spring-boot:run

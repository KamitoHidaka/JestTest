pipeline {
    agent any

    tools {
        nodejs "NodeJS_20"
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Instalar dependencias') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Ejecutar tests') {
            steps {
                bat 'npx jest --coverage'
            }
        }

        stage('Publicar cobertura') {
            steps {
                junit 'coverage/junit.xml'
                publishHTML(target: [
                    reportName : 'Cobertura de pruebas',
                    reportDir  : 'coverage/lcov-report',
                    reportFiles: 'index.html',
                    keepAll    : true,
                    alwaysLinkToLastBuild: true,
                    allowMissing: false
                ])
            }
        }

        stage('Guardar cobertura como artefacto') {
            steps {
                archiveArtifacts artifacts: 'coverage/**', fingerprint: true
            }
        }
    }
}

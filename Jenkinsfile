pipeline {
    agent any

    environment {
        COVERAGE_DIR = 'coverage'
    }

    stages {
        stage('Instalar dependencias') {
            steps {
                sh 'npm install'
            }
        }

        stage('Ejecutar tests') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Publicar cobertura') {
            steps {
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: "${COVERAGE_DIR}/lcov-report",
                    reportFiles: 'index.html',
                    reportName: 'Coverage Report'
                ])
            }
        }
    }
}

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
                sh 'npm run test -- --coverage'
            }
        }

        stage('Publicar cobertura') {
            steps {
                publishHTML([
                    allowMissing: true, // Cambiar a false si quieres que falle si no hay cobertura
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: "${COVERAGE_DIR}/lcov-report",
                    reportFiles: 'index.html',
                    reportName: 'Coverage Report'
                ])
            }
        }

        stage('Guardar cobertura como artefacto') {
            steps {
                archiveArtifacts artifacts: "${COVERAGE_DIR}/**", allowEmptyArchive: true
            }
        }
    }
}

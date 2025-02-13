pipeline {
    agent any

    environment {
        NODEJS_HOME = tool '23'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Henrique-Assme/Food-delivery-site'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run tests') {
            steps {
                sh 'npm test'
            }
        }
        
    }

    post {
        always {
            junit 'reports/*.xml'
        }

        failure {
            mail to: 'heniassme@gmail.com',
                subject: "Falha no build: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "verifique o Jenkins para mais detalhes"
        }
    }
}
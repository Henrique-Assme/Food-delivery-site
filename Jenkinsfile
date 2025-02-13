pipeline {
    agent any

    environment {
        NODEJS_HOME = tool 'NodeJS 23'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
        STRIPE_SECRET_KEY = credentials('STRIPE_SECRET_KEY')
    }

    stages {
        stage('checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/Henrique-Assme/Food-delivery-site'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'cd backend/ && npm install'
            }
        }

        stage('Run tests') {
            steps {
                dir('backend') {
                    sh 'npm test'
                }
            }
        }
        
    }

    post {
        failure {
            mail to: 'heniassme@gmail.com',
                subject: "Falha no build: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "verifique o Jenkins para mais detalhes"
        }
    }
}
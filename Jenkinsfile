pipeline {
    agent any

    environment {
        NODEJS_VERSION = '23.7.0'
    }

    stages {
        stage('checkout') {
            steps {
                git brach: 'main', url: 'https://github.com/Henrique-Assme/Food-delivery-site'
            }
        }

        stage('Install Dependencies') {
            steps {
                def nodejs = tool name: 'NodeJs', type: 'jenkins.plugin.nodejs.tools.NodeJSInstallation'
                env.PATH = "${nodejs}/bin:${env.PATH}"
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
pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t mynode .'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh 'docker rm -f node-container || true'
                sh 'docker run -d -p 3000:3000 --name node-container mynode'
            }
        }
    }

     post {
        success {
            withCredentials([
                string(credentialsId: 'telegram-bot-token',
                       variable: 'BOT_TOKEN'),
                string(credentialsId: 'telegram-chat-id',
                       variable: 'CHAT_ID')
            ]) {
                sh '''
                    curl -sS -X POST \
                    "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
                    --data-urlencode "chat_id=${CHAT_ID}" \
                    --data-urlencode "text=SUCCESS: ${JOB_NAME} Build #${BUILD_NUMBER} completed successfully. ${BUILD_URL}"
                '''
            }
        }

        failure {
            withCredentials([
                string(credentialsId: 'telegram-bot-token',
                       variable: 'BOT_TOKEN'),
                string(credentialsId: 'telegram-chat-id',
                       variable: 'CHAT_ID')
            ]) {
                sh '''
                    curl -sS -X POST \
                    "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
                    --data-urlencode "chat_id=${CHAT_ID}" \
                    --data-urlencode "text=FAILURE: ${JOB_NAME} Build #${BUILD_NUMBER} failed. Check Jenkins console output. ${BUILD_URL}"
                '''
            }
        }
     }
}
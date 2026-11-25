
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
        always {
            script {

                def message = """
Jenkins Notification

Repository: react-sample-codes
Build Number: ${env.BUILD_NUMBER}
Commit Message: ${sh(script: 'git log -1 --pretty=%s', returnStdout: true).trim()}
Committed By: ${sh(script: 'git log -1 --pretty=%an', returnStdout: true).trim()}
Build Status: ${currentBuild.currentResult}
"""

                withCredentials([
                    string(credentialsId: 'telegram-api-token1', variable: 'BOT_TOKEN'),
                    string(credentialsId: 'telegram-id1', variable: 'CHAT_ID')
                ]) {

                    withEnv(["MESSAGE=${message}"]) {
                        sh '''
                            curl -sS -X POST \
                            "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
                            --data-urlencode "chat_id=${CHAT_ID}" \
                            --data-urlencode "text=${MESSAGE}"
                        '''
                    }
                }
            }
        }
    }
}

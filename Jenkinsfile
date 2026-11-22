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
             emailext(
                to: 'sankarpraveen287@gmail.com',
                subject: "SUCCESS: React-Job #${env.BUILD_NUMBER}",
                body: "Node.js application built and executed successfully: ${env.BUILD_URL}"
            )
        }

        failure {
            emailext(
                to: 'sankarpraveen287@gmail.com',
                subject: "FAILED: React-Job #${env.BUILD_NUMBER}",
                body: "Node.js application built and executed successfully: ${env.BUILD_URL}"
            )
        }
    }
}
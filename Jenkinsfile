pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Build') {
            steps { sh 'docker build -t demo-app:${GIT_COMMIT} .' }
        }
        stage('Test') {
            steps { sh 'npm test' }
        }
        stage('Deploy (simulado)') {
            steps {
                sh 'docker stop demo-app || true'
                sh 'docker rm demo-app || true'
                sh 'docker run -d --name demo-app -p 3001:3001 demo-app:${GIT_COMMIT}'
            }
        }
    }
}

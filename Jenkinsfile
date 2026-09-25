pipeline {
    agent any
    environment {
        DOCKERHUB_USER = 'abelcornejo'
        IMAGE_NAME = 'demo-app-cicd'
    }
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Build') {
            steps { sh 'docker build -t ${DOCKERHUB_USER}/${IMAGE_NAME}:${GIT_COMMIT} .' }
        }
        stage('Test') {
            steps { sh 'docker run --rm ${DOCKERHUB_USER}/${IMAGE_NAME}:${GIT_COMMIT} npm test' }
        }
        stage('Push a Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-token', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh 'docker push ${DOCKERHUB_USER}/${IMAGE_NAME}:${GIT_COMMIT}'
                }
            }
        }
        stage('Deploy a Kubernetes') {
            steps {
                sh 'kubectl set image deployment/demo-app demo-app=${DOCKERHUB_USER}/${IMAGE_NAME}:${GIT_COMMIT} --record'
                sh 'kubectl rollout status deployment/demo-app'
            }
        }
    }
}

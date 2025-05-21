pipeline {
    agent any

    environment {
        SONARQUBE_SERVER = 'SonarQube' // This must match what you named in Jenkins config
        DOCKER_IMAGE = 'todo-devops-app'
    }

    stages {

        stage('Build') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Code Quality - SonarQube') {
            steps {
                echo 'Running SonarQube code analysis...'
                withSonarQubeEnv("${SONARQUBE_SERVER}") {
                    sh '''
                        npx sonar-scanner \
                        -Dsonar.projectKey=todo-devops-app \
                        -Dsonar.sources=. \
                        -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                        -Dsonar.host.url=$SONAR_HOST_URL \
                        -Dsonar.login=$SONAR_AUTH_TOKEN
                    '''
                }
            }
        }

        stage('Security - Trivy Scan') {
            steps {
                echo 'Running Trivy security scan on Docker image...'
                sh 'trivy image $DOCKER_IMAGE || true'
            }
        }

        stage('Deploy to Test') {
            steps {
                echo 'Deploying to test environment...'
                sh 'docker-compose up -d'
            }
        }

        stage('Release to Prod') {
            steps {
                echo 'Simulating production deployment...'
                sh '''
                    if [ -f docker-compose.prod.yml ]; then
                        docker-compose -f docker-compose.prod.yml up -d
                    else
                        echo "Production file not found. Skipping..."
                    fi
                '''
            }
        }

        stage('Monitoring & Alerts') {
            steps {
                echo 'Simulated Monitoring: Checking container logs...'
                sh 'docker logs $(docker ps -qf "name=app") | tail -n 20 || true'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up environment...'
            sh 'docker-compose down || true'
        }
    }
}

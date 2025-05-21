pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'todo-devops-app'
    }

    stages {

        stage('Build') {
            steps {
                echo 'Building Docker image...'
                bat 'docker build -t %DOCKER_IMAGE% .'
            }
        }

        stage('Test') {
            steps {
                echo 'Installing dependencies and running tests...'
                bat 'npm install'
                bat 'npm test'
            }
        }

        stage('Code Quality - SonarQube') {
            steps {
                echo 'Skipping SonarQube stage for Windows compatibility.'
                // To re-enable on Windows, install SonarScanner CLI and invoke using `bat`
                // Or use SonarCloud in GitHub Actions for more stability
            }
        }

        stage('Security - Trivy Scan') {
            steps {
                echo 'Scanning Docker image with Trivy...'
                bat '''
                IF EXIST "C:\\ProgramData\\chocoportable\\bin\\trivy.exe" (
                    trivy image %DOCKER_IMAGE%
                ) ELSE (
                    echo "Trivy not found. Skipping security scan."
                )
                '''
            }
        }

        stage('Deploy to Test') {
            steps {
                echo 'Deploying to test environment...'
                bat 'docker-compose up -d'
            }
        }

        stage('Release to Prod') {
            steps {
                echo 'Simulating production deployment...'
                bat '''
                IF EXIST docker-compose.prod.yml (
                    docker-compose -f docker-compose.prod.yml up -d
                ) ELSE (
                    echo "Production file not found. Skipping release."
                )
                '''
            }
        }

        stage('Monitoring & Alerts') {
            steps {
                echo 'Simulated monitoring via Docker logs...'
                bat 'for /f "tokens=*" %%i in (\'docker ps -q -f "name=app"\') do docker logs %%i'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up environment...'
            bat 'docker-compose down'
        }
    }
}

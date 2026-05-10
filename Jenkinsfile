pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-2'
        S3_BUCKET = 'jack-cloud-final-project-site-336449586341-us-east-2-an'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }

        stage('List Website Files') {
            steps {
                echo 'Listing website files...'
                sh 'ls -la'
            }
        }

        stage('Validate Static Website') {
            steps {
                echo 'Validating static website files...'
                sh '''
                    test -f index.html
                    test -f script.js

                    if ! find . -maxdepth 1 -type f -name "*.css" | grep -q .; then
                        echo "ERROR: No CSS file found"
                        exit 1
                    fi
                '''
            }
        }

        stage('Deploy to S3') {
            steps {
                echo 'Deploying website to Amazon S3...'
                sh '''
                    aws s3 sync . s3://$S3_BUCKET --delete \
                    --exclude ".git/*" \
                    --exclude "Jenkinsfile" \
                    --exclude "README.md"
                '''
            }
        }

        stage('Complete') {
            steps {
                echo 'CI/CD deployment completed successfully.'
            }
        }
    }
}

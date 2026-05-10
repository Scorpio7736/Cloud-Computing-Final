pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-2'
        S3_BUCKET = 'jack-cloud-final-project-site-336449586341-us-east-2-an'
        SITE_FOLDER = 'FINAL'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }

        stage('List Project Files') {
            steps {
                echo 'Listing files in the website folder...'
                sh 'ls -la $SITE_FOLDER'
            }
        }

        stage('Validate Static Website') {
            steps {
                echo 'Checking for at least one HTML file...'
                sh '''
                    if ! ls $SITE_FOLDER/*.html >/dev/null 2>&1; then
                        echo "ERROR: No HTML file found in $SITE_FOLDER"
                        exit 1
                    fi
                '''
            }
        }

        stage('Deploy to S3') {
            steps {
                echo 'Deploying website files to Amazon S3...'
                sh '''
                    aws s3 sync $SITE_FOLDER/ s3://$S3_BUCKET --delete
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

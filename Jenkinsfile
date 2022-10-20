pipeline {
    agent any

    parameters {
        string(name: 'SPEC', defaultValue:"cypress/e2e/**/**", description:"Enter the script path that you want to execute")
        choice(name: 'BROWSER', choices: ['chrome', 'edge'], description:"Choose the broswer")
    }

    options {
        ansiColor('xterm')
    }

    stages {
        stage('Building') {
            steps{
                echo "Building the application"
            }
        }
        stage('Testing') {
            steps {
                bat "npm i"
                bat "npx cypress run --browser ${BROWSER} --spec ${SPEC}"
            }
        }
        stage('Deploying') {
            steps {
                echo "Deploying the application"
            }
        }
    }

    post {
        always {
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'C:/Katia/cypressIo/Cypress-TestFramework/cypress/report', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: ''])
        }
    }
}
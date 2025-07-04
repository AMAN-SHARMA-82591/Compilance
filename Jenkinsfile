pipeline {
    agent any
    stages {
        stage('Code') {
            steps {
                // git url: "https://github.com/AMAN-SHARMA-82591/Compilance.git", branch: "master"
                script {
                    clone("https://github.com/AMAN-SHARMA-82591/Compilance.git", "master")
                }
            }
        }
        stage('Build') {
            steps {
                dir('front-end') {
                    sh "docker build -t compilance-frontend:latest ."
                }
                echo("=================front-end complete==================")
                dir('backend') {
                    sh "docker build -t compilance-backend:latest ."
                }
                echo("=================back-end complete==================")
            }
        }
        // stage('Inject .env files') {
        //     steps {
        //         script {
        //             withCredentials([
        //                 file(credentialsId: 'compilance-frontend', variable: 'FRONT_ENV'),
        //                 file(credentialsId: 'compilance-backend', variable: 'BACK_ENV')
        //             ]) {
        //                 dir('front-end') {
        //                     // sh 'chmod u+w .'
        //                     sh 'cp $FRONT_ENV .env'
        //                 }
        //                 dir('backend') {
        //                     // sh 'chmod u+w .'
        //                     sh 'cp $BACK_ENV .env'
        //                 }
        //             }
        //         }
        //     }
        // }
        stage('Push to docker hub') {
            steps {
                echo "Pushing image to docker hub"
                withCredentials([usernamePassword(
                    'credentialsId':"dockerHubCred",
                    passwordVariable:"dockerHubPass",
                    usernameVariable:"dockerHubUser"
                    )]){
                        sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                        sh "docker image tag compilance-frontend:latest ${env.dockerHubUser}/compilance-frontend"
                        sh "docker image tag compilance-backend:latest ${env.dockerHubUser}/compilance-backend"
                        sh "docker push ${env.dockerHubUser}/compilance-frontend"
                        sh "docker push ${env.dockerHubUser}/compilance-backend"   
                }
            }
        }
        stage('Deploy') {
            steps {
                sh "docker compose up -d"
                // sh "docker run -d -p 3000:3000 compilance-frontend"
                echo("Docker deploy successful")
            }
        }
    }
}

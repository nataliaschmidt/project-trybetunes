pipeline {
    agent any

    stages {
        stage('Baixar fonte') {
            steps { 
                    sh 'ssh ubuntu@172.17.0.1 "rm -rf /home/ubuntu/apps/TrybeTunes"'
                    sh 'ssh ubuntu@172.17.0.1 "mkdir -p /home/ubuntu/apps/TrybeTunes"'
                    sh 'scp -r /var/jenkins_home/workspace/project-trybetunes/. ubuntu@172.17.0.1:/home/ubuntu/apps/TrybeTunes'
            } 
        }
        stage('Instalar') {
            steps {
                        sh 'ssh ubuntu@172.17.0.1 "cd /home/ubuntu/apps/TrybeTunes;npm install"'
            }
        }
        stage('Construir') {
            steps {
                        sh 'ssh ubuntu@172.17.0.1 "cd /home/ubuntu/apps/TrybeTunes;npm run build"'
            }
        }
        stage('Iniciar') { 
            steps {
                    sh 'ssh ubuntu@172.17.0.1 "cd /home/ubuntu/apps/TrybeTunes;export JENKINS_NODE_COOKIE=dontKillMe;pm2 stop TrybeTunes --silent;pm2 delete TrybeTunes --silent"'
                    sh 'ssh ubuntu@172.17.0.1 "cd /home/ubuntu/apps/TrybeTunes;pm2 start -n TrybeTunes npm -- start;pm2 save --force"' 
            }
        }
    }
}

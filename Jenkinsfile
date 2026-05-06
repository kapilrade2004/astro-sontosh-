pipeline {
    agent any
    
    environment {
        ANSIBLE_DIR = '/opt/ansible'
    }

    stages {
        stage('Init - load deploy.yml into env') {
            steps {
                script {
                    def cfgFile = 'deploy-config.yml'
                    if (!fileExists(cfgFile)) {
                        error "deploy-config.yml not found in workspace"
                    }
                    def cfg = readYaml file: cfgFile
                    echo "cfg.class = ${cfg.getClass().getName()}"
                    echo "cfg.toString(): ${cfg.toString()}"
                    env.APP_NAME          = cfg.app_name
                    env.APP_PORT          = cfg.app_port.toString()
                    env.HEALTH_CHECK_PATH = cfg.health_check_path
                    env.NODE_ENV          = cfg.env
                    env.DOMAIN            = cfg.domain
                    env.TARGET_HOST       = cfg.target_host
                    env.SSL_EMAIL         = cfg.ssl_email
                    env.REGISTRY          = cfg.registry
                    env.REGISTRY_IMAGE    = cfg.registry_image
                    env.DOCKER_IMAGE      = "${cfg.registry_image}:${BUILD_NUMBER}"
                }
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
                echo "Building: ${APP_NAME}"
                echo "Domain: ${DOMAIN}"
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    docker.withRegistry("https://${env.REGISTRY}", 'gitlab-registry-credentials') {
                        def image = docker.build("${env.DOCKER_IMAGE}")
                        image.push()
                        image.push('latest')
                    }
                }
            }
        }

        stage('Deploy with Ansible') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'gitlab-registry-credentials',
                    usernameVariable: 'REGISTRY_USER',
                    passwordVariable: 'REGISTRY_PASS'
                )]) {
                    sh '''
                        ansible-playbook -i ''' + env.ANSIBLE_DIR + '''/inventory.yml ''' + env.ANSIBLE_DIR + '''/deploy.yml \
                            -e "target_host=''' + env.TARGET_HOST + '''" \
                            -e "app_name=''' + env.APP_NAME + '''" \
                            -e "app_port=''' + env.APP_PORT + '''" \
                            -e "health_check_path=''' + env.HEALTH_CHECK_PATH + '''" \
                            -e "env=''' + env.NODE_ENV + '''" \
                            -e "domain=''' + env.DOMAIN + '''" \
                            -e "ssl_email=''' + env.SSL_EMAIL + '''" \
                            -e "docker_image=''' + env.DOCKER_IMAGE + '''" \
                            -e "registry=''' + env.REGISTRY + '''" \
                            -e "registry_image=''' + env.REGISTRY_IMAGE + '''" \
                            -e "registry_user=$REGISTRY_USER" \
                            -e "registry_pass=$REGISTRY_PASS" \
                            -e "env_file=''' + env.WORKSPACE + '''/.env"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "Deployed successfully to https://${env.DOMAIN}"
        }
        failure {
            echo "Deployment failed!"
        }
    }
}
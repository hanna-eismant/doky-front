job("Deploy front to azure") {
    startOn {
        gitPush {
            anyRefMatching {
                +"refs/heads/main"
            }
        }
    }

    val sharedBuildPath = "client-dist"
    val zipFile = "dist.zip"
    container(displayName = "Build", image = "node:18-alpine") {
        shellScript {
            content = """
                   npm ci && npm run build
                   cd dist
                   mkdir ${'$'}JB_SPACE_FILE_SHARE_PATH/$sharedBuildPath/
                   zip -r $zipFile dist
                   cp dist.zip ${'$'}JB_SPACE_FILE_SHARE_PATH/$sharedBuildPath/$zipFile
               """.trimIndent()
        }
    }

    container("microsoft/azure-cli") {

        env["AZURE_SUBSCRIPTION"] = "{{ project:azure-subscription }}"
        env["AZURE_RESOURCE_GROUP"] = "{{ project:azure-resource-group }}"
        env["AZURE_APP_NAME"] = "{{ project:azure-app-name-front }}"
        env["AZURE_TENANT"] = "{{ project:azure-tenant }}"
        env["AZURE_CLIENT"] = "{{ project:azure-client }}"
        env["AZURE_AUTH_KEY"] = "{{ project:azure-auth-key }}"

        env["web"] = "{{ project:web }}"
        env["ACCOUNT_KEY"] = "{{ project:azure-account-key }}"
        env["ACCOUNT_NAME"] = "{{ project:azure-account-name }}"

        shellScript {
            content = """
                az login --service-principal -t ${'$'}AZURE_TENANT -u ${'$'}AZURE_CLIENT -p ${'$'}AZURE_AUTH_KEY
                az webapp deployment source config-zip -g ${'$'}AZURE_RESOURCE_GROUP -n ${'$'}AZURE_APP_NAME --src ${'$'}JB_SPACE_FILE_SHARE_PATH/$sharedBuildPath/$zipFile
            """
        }
    }
}

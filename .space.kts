job("Azure DEV Deployment") {
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
                   mkdir ${'$'}JB_SPACE_FILE_SHARE_PATH/$sharedBuildPath/dist
                   cd ${'$'}JB_SPACE_FILE_SHARE_PATH/$sharedBuildPath/
                   ls -la
               """.trimIndent()
        }
    }

    container(displayName = "Zip dist", image = "joshkeegan/zip") {
        shellScript {
            content = """
                   cd ${'$'}JB_SPACE_FILE_SHARE_PATH/$sharedBuildPath/
                   zip -r $zipFile dist             
                   ls -la
               """.trimIndent()
        }
    }

    container(displayName = "Deploy to azure","mcr.microsoft.com/azure-cli") {
        env["AZURE_SUBSCRIPTION"] = "{{ project:azure-subscription }}"
        env["AZURE_RESOURCE_GROUP"] = "{{ project:azure-resource-group }}"
        env["AZURE_APP_NAME"] = "{{ project:azure-app-name-front }}"
        env["AZURE_TENANT"] = "{{ project:azure-tenant }}"
        env["AZURE_CLIENT"] = "{{ project:azure-client }}"
        env["AZURE_AUTH_KEY"] = "{{ project:azure-auth-key }}"

        shellScript {
            content = """
                az login --service-principal -t ${'$'}AZURE_TENANT -u ${'$'}AZURE_CLIENT -p ${'$'}AZURE_AUTH_KEY
                az webapp deployment source config-zip -g ${'$'}AZURE_RESOURCE_GROUP -n ${'$'}AZURE_APP_NAME --src ${'$'}JB_SPACE_FILE_SHARE_PATH/$sharedBuildPath/$zipFile
            """
        }
    }
}

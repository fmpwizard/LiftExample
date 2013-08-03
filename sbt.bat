set SCRIPT_DIR=%~dp0
java -XX:+CMSClassUnloadingEnabled -XX:MaxPermSize=512m -Xmx1524M -Xss2M -jar "%SCRIPT_DIR%\sbt-launch-0.12.1.jar" %*

export MAVEN_OPTS="-Xmx512m"

echo "git pulling last changes"
git  pull

echo "Building Ninho Application"
mvn clean install -f application

echo "Starting Ninho Application"
cd application
mvn spring-boot:run




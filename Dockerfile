FROM openjdk:8

ENV P_HOME /opt/redwebf
ENV JAR_FILE ROOT.jar

WORKDIR ${P_HOME}
COPY . .

RUN apt-get update && \
apt-get install -y redis nodejs npm
RUN cd ./src/main/javascript && npm install
RUN ./gradlew build -x test

EXPOSE 8080
CMD ./run.sh

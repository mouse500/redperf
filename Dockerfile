FROM openjdk:8

WORKDIR /opt/redperf
COPY . .

RUN apt-get update && \
apt-get install -y redis
RUN ./gradlew build -x test

EXPOSE 8080
CMD ./run.sh

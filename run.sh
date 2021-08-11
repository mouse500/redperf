redis-server &
node src/main/javascript/redisproxy.js &
java -Xms7584m -Xmx7584m -XX:+UseParallelGC -jar build/libs/ROOT.jar

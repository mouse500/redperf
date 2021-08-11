redis-server &
#pm2 start src/main/javascript/redisproxy.js -i 0 &
java -Xms7584m -Xmx7584m -XX:+UseParallelGC -jar build/libs/ROOT.jar

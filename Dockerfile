# actual container
FROM eclipse-temurin:21.0.3_9-jre-jammy
ENV APP_HOME=/com/example/locationproject

WORKDIR $APP_HOME
COPY build/libs/locationProject-0.0.1-SNAPSHOT.jar locationProject-0.0.1-SNAPSHOT.jar
#
#EXPOSE 8082:8082
EXPOSE 8082
CMD ["java", "-jar", "locationProject-0.0.1-SNAPSHOT.jar"]
#






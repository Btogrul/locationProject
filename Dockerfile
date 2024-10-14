# First Stage: Build the application using a more recent Gradle version
FROM gradle:7.5.1-jdk17 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy all project files to the container
COPY . .

# Build the project without running tests
RUN gradle build -x test --no-daemon

# Second Stage: Create the final runtime image
FROM eclipse-temurin:21.0.3_9-jre-jammy

# Define the application directory
ENV APP_HOME=/com/example/locationproject

# Set the working directory
WORKDIR $APP_HOME

# Copy the JAR file from the builder stage
COPY --from=builder /app/build/libs/locationProject-0.0.1-SNAPSHOT.jar locationProject-0.0.1-SNAPSHOT.jar

# Expose the application port
EXPOSE 8082

# Command to run the application
CMD ["java", "-jar", "locationProject-0.0.1-SNAPSHOT.jar"]
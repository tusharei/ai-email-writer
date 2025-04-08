# === Stage 1: Build ===
FROM maven:3.9.9-eclipse-temurin-22 AS build
WORKDIR /app

# Copy pom.xml and download dependencies first (for layer caching)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the entire source code
COPY src ./src

# Package the application
RUN mvn clean package -DskipTests

# === Stage 2: Run ===
FROM eclipse-temurin:22-jdk
WORKDIR /app

# Copy the jar file from the build stage
COPY --from=build /app/target/email-writer-sb-0.0.1-SNAPSHOT.jar email-writer-sb-0.0.1-SNAPSHOT.jar

# Expose port (adjust if your app uses a different port)
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "email-writer-sb-0.0.1-SNAPSHOT.jar"]

# Notification Service

This project is designed to handle web push notifications using RabbitMQ for message queuing and MongoDB for storing VAPID details. The service consists of producers and consumers that interact with a RabbitMQ queue to manage the sending of notifications.

## Table of Contents

- [Notification Service](#notification-service)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Usage](#usage)
    - [1. Run the Consumer](#1-run-the-consumer)
    - [2. Run the Producer](#2-run-the-producer)
    - [3. Example](#3-example)
  - [Project Structure](#project-structure)

## Installation

1. **Clone the repository:**

```bash
   git clone https://github.com/Prithviraj2003/rabbitMQ-notiffication-service.git
   cd rabbitMQ-notiffication-service
```


2. **Install dependencies:**

Make sure you have Node.js installed. Then run:

```bash
    npm install
```


3. **Setup Environment Variables:**

Create a `.env` file in the root directory and configure the necessary environment variables as described below.

## Environment Variables

The following environment variables are required:

- `SERVER_URL`: The RabbitMQ server URL.
- `WEB_PUSH_PUBLIC_KEY`: Your VAPID public key for web push notifications.
- `WEB_PUSH_PRIVATE_KEY`: Your VAPID private key for web push notifications.
- `MONGO_URI`: MongoDB connection string.

Example `.env` file:

```bash
    SERVER_URL=your-rabbitmq-server-url
    WEB_PUSH_PUBLIC_KEY=your-vapid-public-key
    WEB_PUSH_PRIVATE_KEY=your-vapid-private-key
    MONGO_URI=your-mongo-db-uri
```


## Usage

### 1. Run the Consumer

The consumer listens to the `NotificationService` queue for incoming messages and sends web push notifications accordingly. To start the consumer, run:

```bash
    node Consumer.js
```


### 2. Run the Producer

The producer sends messages to the `NotificationService` queue. To start the producer, run:

```bash
    node Producer.js
```


### 3. Example

An example notification payload:

```json
    {
      "UserId": "user-id",
      "title": "Notification Title",
      "body": "Notification Body"
    }
```

You can modify the `Producer.js` script to send messages like this to the RabbitMQ queue.

## Project Structure

```perl
    notification-service/
    │
    ├── .env exp # Example environment variables file
    ├── .gitignore # Git ignore file
    ├── Consumer.js # RabbitMQ consumer script
    ├── dbSetup.js # Database setup and connection script
    ├── package.json # NPM configuration file
    ├── package-lock.json # Dependency lock file
    ├── Producer.js # RabbitMQ producer script
    ├── SendNotification.js # Notification sending logic
    └── VapidDetailsModel.js # MongoDB model for Vapid details
```

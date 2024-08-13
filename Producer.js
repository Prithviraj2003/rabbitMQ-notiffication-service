const amqp = require("amqplib/callback_api");
require("dotenv").config();
let channel = null;

const connectRabbitMQ = () => {
  return new Promise((resolve, reject) => {
    amqp.connect(`amqp://${process.env.SERVER_URL}`, (error0, connection) => {
      if (error0) {
        return reject(error0);
      }
      console.log("connected to rabbitMQ");
      connection.createChannel((error1, ch) => {
        if (error1) {
          return reject(error1);
        }
        const queue = "NotificationService";
        ch.assertQueue(queue, {
          durable: false,
        });
        channel = ch;
        resolve();
        sendNotification({UserId:"65b64bca757962495ee003de",title:"test",body:"order recived"})
      });
    });
  });
};

const sendNotification = (message) => {
  if (!channel) {
    throw new Error("Channel is not set. Ensure RabbitMQ is connected.");
  }
  const queue = "NotificationService";
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  console.log(" [x] Sent %s", JSON.stringify(message));
};
connectRabbitMQ();
// module.exports = { connectRabbitMQ, sendNotification };

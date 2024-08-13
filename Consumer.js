var amqp = require("amqplib/callback_api");
require("dotenv").config();
const sendNotification = require("./SendNotification");
const connectDB = require("./dbSetup");
connectDB();
amqp.connect(`amqp://${process.env.SERVER_URL}`, function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = "NotificationService";
    channel.assertQueue(queue, {
      durable: false,
    });
    channel.consume(
      queue,
      function (msg) {
        const notification = JSON.parse(msg.content.toString());
        sendNotification(notification);
      },
      {
        noAck: true,
      }
    );
  });
});

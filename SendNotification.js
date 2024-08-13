const webpush = require("web-push");
const VapidDetailsModel = require("./VapidDetailsModel");
require("dotenv").config();
webpush.setVapidDetails(
  "mailto:prithvirajindulkar2003@gmail.com",
  process.env.WEB_PUSH_PUBLIC_KEY,
  process.env.WEB_PUSH_PRIVATE_KEY
);
const sendNotification = async (notification) => {
  const exist = VapidDetailsModel.exists({ UserId: notification.UserId });
  exist.then((ex) => {
    console.log("exist", ex);
  });
  if (!exist) {
    return;
  } else {
    try {
      const vapidDetails = await VapidDetailsModel.findOne({
        UserId: notification.UserId,
      });
      const payload = JSON.stringify({
        title: notification.title,
        msg: notification.body,
      });
      vapidDetails?.VapidDetails?.forEach((vapidDetail, i) => {
        console.log("index", i);
        webpush
          .sendNotification(vapidDetail, payload)
          .catch(() => {
            console.error("Error in sending notification");
            VapidDetailsModel.findOneAndUpdate(
              { UserId: notification.UserId },
              { $pull: { VapidDetails: vapidDetail } }
            ).then(() => {
              console.log("Vapid Details Removed");
            });
          })
          .then(() => {
            console.log("Notification Sent");
          });
      });
    } catch (error) {
      console.log(error);
    }
  }
};
module.exports = sendNotification;

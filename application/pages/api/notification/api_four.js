import { sendMail } from "../../../service/mailService";

export default async function handler(req, res) {
  const { userid, username, useremail, notificationProducts } = req.body;

  if (req.method === "POST") {
    // Send email with the notification data
    try {
      await sendMail(
        "Notification for You",
        userid,
        username,
        useremail,
        "This is an sample email",
        notificationProducts
      );
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error sending email: ", error);
      console.log(req.body);
      res.status(500).json({ error: "Error sending email" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

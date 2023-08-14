import { query } from "../../../data/db";

export default async function handler(req, res) {
  const userInterest = req.body;
  console.log("Request Body:", req.body);

  if (req.method === "POST") {
    try {
      const emailExists = await query({
        query: "SELECT * FROM users WHERE email = ?",
        values: [userInterest.email],
      });

      if (emailExists.length > 0) {
        // If the user with the email already exists, insert the data into user_interest table
        const result = await query({
          query:
            "UPDATE user_interest SET interest1 = ? , interest2 = ?, interest3 = ? WHERE email = ? ;",
          values: [
            userInterest.interest1,
            userInterest.interest2,
            userInterest.interest3,
            userInterest.email,
          ],
        });

        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ error: "Email not registered" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error inserting user data" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

import { query } from "../../../data/db";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    try {
      console.log(req.body);
      const userData = await query({
        query:
          "SELECT userid, firstname, lastname, email, password FROM users WHERE email = ? ;",
        values: [username],
      });

      if (userData.length > 0) {
        const user = userData[0];
        const hashedPassword = user.password;
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        // if (password === user.password) {
        //   // If the email and password match, return the user object
        //   return res.status(200).json({
        //     userid: user.userid,
        //     firstname: user.firstname,
        //     lastname: user.lastname,
        //     email: user.email,
        //   });
        // }
        if (passwordMatch) {
          return res.status(200).json({
            userid: user.userid,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
          });
        } else {
          return res.status(400).json({ error: "Password is incorrect" });
        }
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error Occurred" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

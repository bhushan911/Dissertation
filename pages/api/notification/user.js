import { query } from "../../../data/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const result = await query({
        query:
          "SELECT  u.email,u.userid,u.firstname,u.lastname, ui.interest1, ui.interest2, ui.interest3 FROM users u INNER JOIN user_interest ui ON u.email = ui.email;",
        values: [],
      });
      res.status(200).json({ users: result }); // Return the users data from the database
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error fetching users data" });
    }
  }
}

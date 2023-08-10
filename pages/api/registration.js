import { query } from "../../data/db";
import { redirect } from "next/navigation";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const result = await query({
        query: "SELECT * from users",
        values: [],
      });
      res.status(200).json({ users: result }); // Return the users data from the database
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error fetching users data" });
    }
  } else if (req.method === "POST") {
    const userdetails = req.body;
    try {
      const emailExists = await query({
        query: "SELECT * FROM users WHERE email = ?",
        values: [userdetails.email],
      });

      if (emailExists.length > 0) {
        // If the user with the email already exists, send an alert and return an error response
        return res.status(400).json({ error: "Email already registered" });
      }

      await query({
        query: "INSERT INTO user_interest (email) VALUES (?)",
        values: [userdetails.email],
      });
      const result = await query({
        query:
          "INSERT INTO users (firstname, lastname, email, age, gender, password) VALUES (?, ?, ?, ?, ?, ?)",
        values: [
          userdetails.firstName,
          userdetails.lastName,
          userdetails.email,
          userdetails.age,
          userdetails.gender,
          userdetails.password,
        ],
      });

      res.status(200).json({ success: true }); // Return a success response if the data is successfully inserted
      // if (result.affectedRows > 0) {
      //   // If the registration is successful, redirect to the login page
      //   redirect("/login");
      // }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error inserting user data" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

import { query } from "../../../data/db";
// import { redirect } from "next/navigation";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { sku } = req.query;
    try {
      const result = await query({
        query: "SELECT * from products where sku = ?",
        values: [sku],
      });
      res.status(200).json({ product: result }); // Return the products data from the database
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error fetching products data" });
    }
  }
}

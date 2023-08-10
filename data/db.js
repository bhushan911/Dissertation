import mysql from "mysql2/promise";

export async function query({ query, values = [] }) {
  // PlanetScale;
  // const dbconnection = await mysql.createConnection(
  //   process.env.MYSQL_DATABASE_URL
  // );

  //Digital ocean ubuntu
  const dbconnection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  try {
    console.log("connected as id " + dbconnection.threadId);
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error) {
    throw Error(error.message);
    return { error };
  }
}

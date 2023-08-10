import React from "react";

function Newlogic() {
  async function fetchUserData() {
    try {
      const response = await fetch(
        "http://localhost:3000/api/notification/user"
      );
      const result = await response.json();
      return result.users;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return [];
    }
  }

  // Function to fetch product data from the API
  async function fetchProductData() {
    try {
      const response = await fetch(
        "http://localhost:3000/api/notification/product"
      );
      const result = await response.json();
      return result.products;
    } catch (error) {
      console.error("Error fetching product data:", error);
      return [];
    }
  }

  // Function to extract user interests
  function extractUserInterests(userData) {
    return userData.map((user) => {
      return {
        userid: user.userid,
        username: user.firstname + " " + user.lastname,
        useremail: user.email,
        userInterest1: user.interest1 || "",
        userInterest2: user.interest2 || "",
        userInterest3: user.interest3 || "",
      };
    });
  }

  // Function to get random products
  function getRandomProducts(products, count) {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Function to send notification
  async function sendNotification(data) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/notification/api_four",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      if (result.success) {
        console.log("Email sent successfully!");
      } else {
        console.error("Error sending email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}

export default Newlogic;

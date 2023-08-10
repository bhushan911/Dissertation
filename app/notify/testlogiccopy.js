// Import necessary modules (you may need to install 'node-fetch' if not already installed)
// const fetch = require("node-fetch");

// Function to fetch user data from the API
async function fetchUserData() {
  try {
    const response = await fetch("http://localhost:3000/api/notification/user");
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

// Function to process notification data and send emails
async function processNotificationDataAndSendEmails() {
  try {
    const userData = await fetchUserData();
    const productData = await fetchProductData();

    if (userData.length === 0 || productData.length === 0) {
      console.log("Insufficient data to process notifications.");
      return;
    }

    const userInterests = extractUserInterests(userData);

    const notificationData = userInterests.map((userInterest) => {
      const {
        userid,
        username,
        useremail,
        userInterest1,
        userInterest2,
        userInterest3,
      } = userInterest;

      const filteredProducts = productData.filter(
        (product) =>
          product.subcategory === userInterest1.toLowerCase() ||
          product.subcategory === userInterest2.toLowerCase() ||
          product.subcategory === userInterest3.toLowerCase()
      );

      const notificationProducts = getRandomProducts(filteredProducts, 2);

      return {
        userid,
        username,
        useremail,
        notificationProducts,
      };
    });

    const sentUserIds = [];

    for (const data of notificationData) {
      if (!sentUserIds.includes(data.userid)) {
        await sendNotification(data);
        console.log(`Email sent successfully to User ID: ${data.userid}`);
        sentUserIds.push(data.userid);
      }
    }

    return {
      success: true,
      message: "Notifications processed and emails sent successfully.",
    };
  } catch (error) {
    console.error("Error processing notifications:", error);
    return { success: false, message: "Internal Server Error" };
  }
}

// Call the function to start processing notification data and sending emails
// processNotificationDataAndSendEmails();

// async function handler(req, res) {
//   if (req.method === "GET") {
//     try {
//       // Fetch and process data
//       const response = await processNotificationDataAndSendEmails();

//       const result = await response.json();
//       // Construct the JSON response
//       // const jsonResponse = {
//       //   status: "success",
//       //   message: "Notifications processed and emails sent successfully.",
//       // };

//       // Send the JSON response as the API response with 200 status code
//       res.status(200).json(result);
//     } catch (error) {
//       console.error("Error processing notifications:", error);
//       // If there's an error, send a JSON response with 500 status code
//       const errorResponse = {
//         status: "error",
//         message: "Internal Server Error",
//       };
//       res.status(500).json(errorResponse);
//     }
//   } else {
//     // For other HTTP methods, return a JSON response with 405 status code
//     const errorResponse = {
//       status: "error",
//       message: "Method Not Allowed",
//     };
//     res.status(405).json(errorResponse);
//   }
// }

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const result = await processNotificationDataAndSendEmails();
      res.status(200).json(result);
    } catch (error) {
      console.error("Error processing notifications:", error);
      const errorResponse = {
        success: false,
        message: "Internal Server Error",
      };
      res.status(500).json(errorResponse);
    }
  } else {
    const errorResponse = { success: false, message: "Method Not Allowed" };
    res.status(405).json(errorResponse);
  }
}

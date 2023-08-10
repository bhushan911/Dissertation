import React, { useState, useEffect } from "react";

function NotificationUserData() {
  const [userData, setUserData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [userInterests, setUserInterests] = useState([]);
  const [notificationData, setNotificationData] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/notification/user"
      );
      const result = await response.json();
      setUserData(result.users);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchProductData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/notification/product"
      );
      const result = await response.json();
      setProductData(result.products);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchProductData();
  }, []);

  const extractUserInterests = (userData) => {
    return userData.map((user) => {
      return {
        userid: user.userid,
        useremail: user.email,
        userInterest: user.interest1,
      };
    });
  };

  useEffect(() => {
    if (userData.length > 0) {
      // Once the userData is fetched, extract the user interests
      const interests = extractUserInterests(userData);
      setUserInterests(interests);
    }
  }, [userData]);

  useEffect(() => {
    if (productData.length > 0 && userInterests.length > 0) {
      const notificationData = userInterests.map((userInterest) => {
        const { userid, useremail, userInterest: interest } = userInterest;
        // Filter products based on user interests
        const filteredProducts = productData.filter(
          (product) => product.subcategory === interest
        );

        // Randomly select two products from the filtered list
        const notificationProducts = getRandomProducts(filteredProducts, 2);

        return {
          userid,
          useremail,
          notificationProducts,
        };
      });

      // Set the notification data for all users
      setNotificationData(notificationData);

      // notificationData.forEach((data) => {
      //   try {
      //     sendNotification(data);
      //     console.log(`Email sent successfully to User ID: ${data.userid}`);
      //   } catch (error) {
      //     console.error(`Error sending email to User ID: ${data.userid}`);
      //   }
      // });
      // sendAllNotifications(notificationData);
    }
  }, [productData, userInterests]);

  useEffect(() => {
    if (notificationData.length > 0) {
      // Send email with the notification data one at a time
      notificationData.forEach(async (data) => {
        try {
          await sendNotification(data);
          console.log(`Email sent successfully to User ID: ${data.userid}`);
        } catch (error) {
          console.error(`Error sending email to User ID: ${data.userid}`);
        }
      });
    }
  }, [notificationData]);

  async function sendAllNotifications(notificationData) {
    for (const data of notificationData) {
      try {
        await sendNotification(data);
        console.log(`Email sent successfully to User ID: ${data.userid}`);
      } catch (error) {
        console.error(`Error sending email to User ID: ${data.userid}`);
      }
    }
  }

  // api request to send notification data
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

  const getRandomProducts = (products, count) => {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  return (
    <div>
      {/* Loop through each user's notificationProducts */}
      {notificationData.map((data) => (
        <div key={data.userid}>
          <h3>User ID: {data.userid}</h3>
          <h3>User Email: {data.useremail}</h3>
          {/* Use the 'data.notificationProducts' array to display the products */}
          {data.notificationProducts.map((product) => (
            <div key={product.sku}>
              <h4>{product.name}</h4>
              <img src={product.image} alt={product.name} />
              {/* <p>{product.shortDescription}</p> */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default NotificationUserData;

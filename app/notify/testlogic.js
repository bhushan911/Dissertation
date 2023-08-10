import React, { useState, useEffect } from "react";

function NotificationUserData() {
  const [userData, setUserData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [userInterests, setUserInterests] = useState([]);
  const [notificationData, setNotificationData] = useState([]);
  const [sentUserIds, setSentUserIds] = useState([]);

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
        username: user.firstname + " " + user.lastname,
        useremail: user.email,
        userInterest1: user.interest1 || "",
        userInterest2: user.interest2 || "",
        userInterest3: user.interest3 || "",
      };
    });
  };
  useEffect(() => {
    if (userData.length > 0) {
      // Once the userData is fetched, extract the user interests
      const interests = extractUserInterests(userData);
      console.log("interests:", interests);
      setUserInterests(interests);
    }
  }, [userData]);
  console.log("userInterests:", userInterests);
  console.log("userData:", userData);

  useEffect(() => {
    if (productData.length > 0 && userInterests.length > 0) {
      const notificationData = userInterests.map((userInterest) => {
        const {
          userid,
          username,
          useremail,
          userInterest1,
          userInterest2,
          userInterest3,
        } = userInterest;
        console.log("interest1:", userInterest1);
        console.log("interest2:", userInterest2);
        console.log("interest3:", userInterest3);
        // Filter products based on user interests
        const filteredProducts = productData.filter(
          (product) =>
            product.subcategory == userInterest1.toLowerCase() ||
            product.subcategory == userInterest2.toLowerCase() ||
            product.subcategory == userInterest3.toLowerCase()
        );
        console.log("filteredProducts:", filteredProducts);

        // Randomly select two products from the filtered list
        const notificationProducts = getRandomProducts(filteredProducts, 2);
        console.log("notificationProducts:", notificationProducts);
        return {
          userid,
          username,
          useremail,
          notificationProducts,
        };
      });

      // Set the notification data for all users
      setNotificationData(notificationData);
    }
  }, [productData, userInterests]);

  useEffect(() => {
    console.log("userInterests:", userInterests);
  }, [userInterests]);
  useEffect(() => {
    console.log("notificationData:", notificationData);
  }, [notificationData]);

  useEffect(() => {
    if (notificationData.length > 0) {
      // Send email with the notification data one at a time
      notificationData.forEach((data) => {
        if (!sentUserIds.includes(data.userid)) {
          try {
            setSentUserIds((prevSentUserIds) => [
              ...prevSentUserIds,
              data.userid,
            ]);
          } catch (error) {
            console.error(`Error sending email to User ID: ${data.userid}`);
          }
        }
      });
    }
  }, [notificationData]);

  useEffect(() => {
    notificationData.forEach((data) => {
      if (!sentUserIds.includes(data.userid)) {
        try {
          sendNotification(data);
          console.log(`Email sent successfully to User ID: ${data.userid}`);
          setSentUserIds((prevSentUserIds) => [
            ...prevSentUserIds,
            data.userid,
          ]);
        } catch (error) {
          console.error(`Error sending email to User ID: ${data.userid}`);
        }
      }
    });
  }, [notificationData]);

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
    <></>
    // <div>
    //   {/* Loop through each user's notificationProducts */}
    //   {notificationData.map((data, index) => (
    //     <div key={index}>
    //       <h3>User ID: {data.userid}</h3>
    //       <h3>User Email: {data.useremail}</h3>
    //       {/* Use the 'data.notificationProducts' array to display the products */}
    //       {data.notificationProducts.map((product, productIndex) => (
    //         <div key={product.sku}>
    //           <h4>{product.name}</h4>
    //           <img src={product.image} alt={product.name} />
    //           {/* <p>{product.shortDescription}</p> */}
    //         </div>
    //       ))}
    //     </div>
    //   ))}
    // </div>
  );
}

export default NotificationUserData;

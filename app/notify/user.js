import React, { useState, useEffect } from "react";

function NotificationUserData() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/notification/user`
        );
        const data = await response.json();
        console.log(data);
        setData(data);
        // Set the 'products' array from the result
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUserData();
  }, []);
}

export default NotificationUserData;

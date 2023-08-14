import { SessionProvider } from "next-auth/react";
// import NotificationUserData from "../app/notify/testlogic";
import React, { useEffect } from "react";

export default function App({
  Component,
  pageProps: { ...pageProps },
  session,
}) {
  // useEffect(() => {
  //   // Function to call the API route
  //   async function callNotificationAPI() {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:3000/api/notification/logic"
  //       );
  //       const result = await response.json();
  //       console.log(result);
  //     } catch (error) {
  //       console.error("Error calling notification API:", error);
  //     }
  //   }

  //   // Call the API every 2 minutes (120,000 milliseconds)
  //   const interval = 2 * 60 * 1000;
  //   const intervalId = setInterval(callNotificationAPI, interval);

  //   // Clear the interval on unmount
  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      {/* <NotificationUserData></NotificationUserData> */}
    </SessionProvider>
  );
}

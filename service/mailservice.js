import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

var nodemailer = require("nodemailer");
//-----------------------------------------------------------------------------
export async function sendMail(
  subject,
  userid,
  username,
  toEmail,
  text,
  notificationProducts
) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PW,
      },
    });

    const htmlContent = generateEmailContent(
      userid,
      username,
      notificationProducts
    );

    var mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: toEmail,
      subject: subject,
      text: text,
      html: htmlContent,
    };
    // useEffect(() => {
    //  setInterval(() => {
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
  // }, 1000 * 60 * 2);
  // });
}

function generateEmailContent(userid, username, notificationProducts) {
  if (notificationProducts.length === 0) {
    // If notificationData is not an array or is empty, return a default message
    return "<p>No notification data available.</p>";
  } else {
    let emailContent = `<h2>Notification Data for User: ${username}</h2>`;
    emailContent += "<ul>";
    notificationProducts.forEach((product) => {
      emailContent += `
        <li>
          <h3>${product.name}</h3>
          <a href="${product.url}" target="_blank">
          <img src="${product.image}" alt="${product.name}"  />
          </a>
          <br />
          <a href="${product.url}" target="_blank"><button>View Product</button></a>
        </li>`;
    });
    emailContent += "</ul>";
    return emailContent;
  }
}

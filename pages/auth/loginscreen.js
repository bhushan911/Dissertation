"use client";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    submitForm(); // Call the submitForm function if the form is valid
  };
  const submitForm = async () => {
    const result = await signIn("credentials", {
      username: email,
      password: password,
      redirect: false,
      callbackUrl: "/",
    });

    console.log(`email:${email} password: ${password}`);
    if (result?.error) {
      // If there is an error, display it to the user
      window.alert("Login failed: " + result.error);
    } else if (result?.url) {
      // If the login was successful and a redirect URL is provided,
      // navigate to the redirect URL
      window.alert("Login Successful");
      router.push("/");
    }
    //   try {
    //     const response = await fetch("http://localhost:3000/api/auth/login", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         accept: "application/json",
    //       },
    //       body: JSON.stringify(data),
    //     });
    //     const result = await response.json();
    //     console.log(result);

    //     if (response.status === 200) {
    //       // If the registration is successful, redirect to the login page
    //       window.alert("Login Successful");
    //       router.replace("/");
    //     } else if (response.status === 400) {
    //       window.alert("Password is incorrect");
    //     } else if (response.status === 404) {
    //       window.alert("User does not exist");
    //     }
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }
    // };
  };
  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target?.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target?.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
        <p className="my-2">
          Don't have an account?
          <Link href="/registrationscreen" className="mx-2">
            Register
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default LoginScreen;

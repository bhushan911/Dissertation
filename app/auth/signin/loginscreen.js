"use client";

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../styles/Home.module.css";
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
    // const data = {
    //   email: email,
    //   password: password,
    // };
    const result = await signIn("credentials", {
      username: email,
      password: password,
      callbackUrl: "/",
      redirect: true,
    });

    console.log(data);

    return (
      <></>
      // <div className={styles.container}>
      //   <h2>Login</h2>
      //   <Form>
      //     <Form.Group className="mb-3" controlId="formBasicEmail">
      //       <Form.Label>Email address</Form.Label>
      //       <Form.Control
      //         type="email"
      //         placeholder="Enter email"
      //         value={email}
      //         onChange={(e) => setEmail(e.target?.value)}
      //       />
      //       <Form.Text className="text-muted">
      //         We'll never share your email with anyone else.
      //       </Form.Text>
      //     </Form.Group>

      //     <Form.Group className="mb-3" controlId="formBasicPassword">
      //       <Form.Label>Password</Form.Label>
      //       <Form.Control
      //         type="password"
      //         placeholder="Password"
      //         value={password}
      //         onChange={(e) => setPassword(e.target?.value)}
      //       />
      //     </Form.Group>
      //     <Button variant="primary" type="submit" onClick={handleSubmit}>
      //       Submit
      //     </Button>
      //     <p className="my-2">
      //       Don't have an account?
      //       {/* <Link
      //         onClick={}
      //         className="mx-2"
      //       > */}
      //       <Button onClick={() => router.push("/registrationscreen")}>
      //         Register
      //       </Button>
      //       {/* </Link> */}
      //     </p>
      //   </Form>
      // </div>
    );
  };
}
export default LoginScreen;

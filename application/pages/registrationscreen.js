import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

function RegistrationScreen() {
  const router = useRouter(); // Import useRouter hook

  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  // console.log(
  //   `firstName:${firstName} lastname:${lastName} email:${email} Age:${age} gender:${gender} password:${password}`
  // );

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      setValidated(true);
      submitForm(); // Call the submitForm function if the form is valid
    }
  };
  const submitForm = async () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      age: age,
      gender: gender,
      password: password,
    };
    console.log(data);
    try {
      const response = await fetch("http://localhost:3000/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);

      if (result.success) {
        // If the registration is successful, redirect to the login page
        window.alert("Registration successful.");

        // router.push("/auth/loginscreen");
      } else if (result.error === "Email already registered") {
        window.alert("User already exists. Please login.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className={styles.formcontainer}>
      <h1 className="">Registration Form</h1>
      <Form
        className="my-3"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        {/* <Row className="mb-3"> */}
        <Form.Group md="3" controlId="validationFirstName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target?.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group md="3" controlId="validationLastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target?.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group md="3" controlId="validationCustomEmail">
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target?.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter an email.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        {/* </Row> */}
        {/* <Row className="my-3"> */}
        <Form.Group as={Col} md="3" controlId="validationAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="age"
            required
            value={age}
            onChange={(e) => setAge(e.target?.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter age
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          as={Col}
          md="3"
          className="mt-3"
          controlId="validationGender"
        >
          <Form.Label>Gender</Form.Label>
          <Form.Check
            type="radio"
            id="male"
            label="male"
            value="male"
            name="gender"
            onChange={(e) => setGender(e.target?.value)}
          />
          <Form.Check
            type="radio"
            id="female"
            label="female"
            value="female"
            name="gender"
            onChange={(e) => setGender(e.target?.value)}
          />
        </Form.Group>
        {/* / </Row> */}
        <Form.Group md="3" controlId="validationPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target?.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Button className="mt-3" type="submit" onClick={handleSubmit}>
          Submit form
        </Button>
      </Form>
      <Link href="/auth/loginscreen" className="mx-2">
        sign in
      </Link>
    </div>
  );
}

export default RegistrationScreen;

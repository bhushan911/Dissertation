import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSession, signIn, signOut } from "next-auth/react";
import InterestModal from "/components/InterestModal";

function Header() {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [userInterests, setUserInterests] = useState([]);
  let userEmail;
  if (session) {
    userEmail = session.user.email;
  }

  useEffect(() => {
    // Check if the modal has been shown before in sessionStorage
    const modalShownBefore = sessionStorage.getItem("modalShown");

    // If the user is logged in and the modal is not shown before in this session then show the modal
    if (session && !modalShownBefore) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 5000);

      // Mark the modal as shown in sessionStorage
      sessionStorage.setItem("modalShown", "true");
    }
  }, [session]);

  const handleLogout = async () => {
    // clear sessionStorage
    sessionStorage.clear();

    // calling the signOut function
    await signOut();
  };

  const handleSaveInterests = (userInterests) => {
    setUserInterests(userInterests);
    // Send the interests to the database here
    console.log("Interests:", userInterests);

    // Move the submitForm function here
    const submitForm = async () => {
      const data = {
        interest1: userInterests[0],
        interest2: userInterests[1],
        interest3: userInterests[2],
        email: userEmail,
      };
      console.log(data);
      try {
        const response = await fetch(
          `http://localhost:3000/api/product/userinterest`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const result = await response.json();
        console.log(result);

        if (result.success) {
          // If the registration is successful, redirect to the login page
          window.alert("Interest saved successfully.");
        }
      } catch (error) {
        console.error("Error in saving interests:", error);
      }
    };

    // Call the submitForm function here
    submitForm();
  };

  if (session) {
    return (
      <div>
        <Navbar expand="lg" className="bg-dark-subtle">
          <Container fluid>
            <Navbar.Brand href="/">Notify Offers</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="/appliances">Appliances</Nav.Link>
                <Nav.Link href="/computers">Computers</Nav.Link>
                <Nav.Link href="/mobile&tablet">Mobiles & Tablets</Nav.Link>
                <Nav.Link href="/movie&music">Movies & Music</Nav.Link>
                <Nav.Link href="/personalcare">Personal Care</Nav.Link>
                <Nav.Link href="/tv&speaker">TV & Speakers</Nav.Link>
              </Nav>
              <Form className="d-flex">
                {/* <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                /> */}
                <span className="mx-3 mt-1">
                  Signed In: {session.user.email}
                </span>
                <Button
                  className="mx-3"
                  variant="outline-success"
                  // onClick={() => signOut()}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Form>
              {/* <Nav.Link className="mr-2" href="/login">
                Sign Out
              </Nav.Link> */}
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {session && (
          <InterestModal
            show={showModal}
            onHide={() => setShowModal(false)}
            onSave={handleSaveInterests}
          />
        )}
      </div>
    );
  } else {
    return (
      <div>
        <Navbar expand="lg" className="bg-dark-subtle">
          <Container fluid>
            <Navbar.Brand href="/">Notify Offers</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="/appliances">Appliances</Nav.Link>
                <Nav.Link href="/computers">Computers</Nav.Link>
                <Nav.Link href="/mobile&tablet">Mobiles & Tablets</Nav.Link>
                <Nav.Link href="/movie&music">Movies & Music</Nav.Link>
                <Nav.Link href="/personalcare">Personal Care</Nav.Link>
                <Nav.Link href="/tv&speaker">TV & Speakers</Nav.Link>
                {/* <Nav.Link href="#action1">Token{accessToken}</Nav.Link> */}
              </Nav>
              <Form>
                {/* <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                /> */}
                <span className="mx-3">Not Signed In</span>
                <Button
                  className="btn"
                  variant="outline-success"
                  size="md"
                  onClick={() => signIn()}
                >
                  Login
                </Button>
              </Form>
              {/* <Nav.Link className="mr-2" href="/login">
                Sign Out
              </Nav.Link> */}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Header;

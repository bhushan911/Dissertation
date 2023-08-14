import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import DataFetcher from "../components/DataFetcher";
export default function Home() {
  const { data: session } = useSession();
  // console.log(data);
  console.log(session);

  const carouselImages = [
    "https://pisces.bbystatic.com/prescaled/500/500/image2/BestBuy_US/images/products/4901/4901809_sd.jpg",
    "https://pisces.bbystatic.com/prescaled/500/500/image2/BestBuy_US/images/products/4901/4901868_sd.jpg",
    "https://pisces.bbystatic.com/prescaled/500/500/image2/BestBuy_US/images/products/4904/4904800_sd.jpg",
  ];
  const productUrl = [
    "https://api.bestbuy.com/click/-/4904800/pdp",
    "https://api.bestbuy.com/click/-/4904502/pdp",
    "https://api.bestbuy.com/click/-/4901906/pdp",
  ];
  const handleClick = (productUrl) => {
    window.open(productUrl, "_blank");
  };

  return (
    <>
      <Layout>
        <div></div>
        <div className={styles.container}>
          <Head></Head>

          <main>
            <div>
              {/* Top Container with Carousel */}
              <Container fluid className="my-5">
                <Row>
                  <Col>
                    <Carousel
                      data-bs-theme="dark"
                      // style={{ border: "1px solid black" }}
                    >
                      {carouselImages.map((image, index) => (
                        <Carousel.Item key={index}>
                          <img
                            className="d-block w-500 h-500 mx-auto"
                            src={image}
                            alt={`Slide ${index + 1}`}
                            onClick={() => {
                              handleClick(productUrl[index]);
                            }}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </Col>
                </Row>
              </Container>

              {/* Bottom Container with Product Cards */}
              <Container className="mt-5">
                <Row>
                  <Col>
                    <h2 style={{ textAlign: "center", margin: "20px" }}>
                      Featured Products
                    </h2>
                  </Col>
                </Row>
                <DataFetcher queryParam="digitalcommunication" />
              </Container>
            </div>
          </main>
          <footer></footer>
        </div>
      </Layout>
      {/* <NotificationUserData></NotificationUserData> */}
    </>
  );
}

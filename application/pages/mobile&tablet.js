import React from "react";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import DataFetcher from "../components/DataFetcher";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function MobileTablet() {
  return (
    <Layout>
      <Container className="mt-3">
        <Row>
          <Col>
            <div>
              <h2 style={{ textAlign: "center", margin: "20px 0px" }}>
                Mobiles and Tablets
              </h2>
              {/* Fetch data with the queryParam "appliance" */}
              <DataFetcher queryParam="digitalcommunication" />
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default MobileTablet;

// import React, { useState } from "react";
// import Layout from "../components/Layout";

// function Appliances() {
//   const [products, setProducts] = useState([]);
//   const getProducts = async (department) => {
//     try {
//       const response = await fetch(
//         "http://localhost:3000/api/category/[department]",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             accept: "application/json",
//           },
//           //  body: JSON.stringify(data),
//         }
//       );
//       const result = await response.json();
//       console.log(result);
//       // setProducts(result.products);
//       console.log(result);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//     useEffect(() => {
//       getProducts("appliance"); // Fetch products data when the component is mounted
//     }, []);
//   };
//   return (
//     <Layout>
//       {/* Show the fetched products data */}
//       <div>
//         {products.map((product) => (
//           <div key={product.sku}>
//             <span>{product.name}</span>
//             <span>{product.url}</span>
//           </div>
//         ))}
//       </div>
//     </Layout>
//   );
// }

// export default Appliances;

import React from "react";
import Layout from "../components/Layout";
import DataFetcher from "../components/DataFetcher";
import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Appliances() {
  const { data: session } = useSession();
  console.log("Session Object:");
  console.log(session);
  return (
    <Layout>
      <Container className="mt-3">
        <Row>
          <Col>
            <div>
              <h2 style={{ textAlign: "center", margin: "20px 0px" }}>
                Appliances
              </h2>
              {/* Fetch data with the queryParam "appliance" */}
              <DataFetcher queryParam="appliance" />
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Appliances;

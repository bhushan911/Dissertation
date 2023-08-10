import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";

function ProductDetails({ product }) {
  const productData = product[0]; // Access the first object inside the 'product' array

  if (!productData) {
    return <div>Loading...</div>;
  }

  const formattedPrice = parseFloat(productData.salePrice).toFixed(2);

  return (
    <div className="container mt-5 ml-4">
      <div className="row">
        <div className="col-md-5" style={{ marginTop: "10px" }}>
          <Image
            src={productData.image}
            alt="Product Image"
            width={300}
            height={300}
            className="img-fluid rounded"
            style={{
              width: "35rem",
              height: "35rem",
              margin: "10px",
              padding: "10px",
              textAlign: "center",
            }}
          />
        </div>
        <div className="col-md-6" style={{ width: "42rem", margin: "10px" }}>
          <Card
            style={{
              border: "1px solid black",
              padding: "10px",
            }}
          >
            <Card.Body>
              <h2>{productData.name}</h2>
              <p className="text-muted">SKU: {productData.sku}</p>
              <p>{productData.longDescription}</p>
              <p className="fw-bold">Price: ${formattedPrice}</p>
              <a
                href={productData.url}
                target="_blank"
                // rel="noreferrer"
                className="btn btn-primary"
              >
                View Product
              </a>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import Link from "next/link";

function ProductItem({
  id,
  imageUrl,
  title,
  price,
  desc,
  producturl,
  angleImage,
}) {
  const [liked, setLiked] = useState(false);
  const formattedPrice = parseFloat(price).toFixed(2);
  const handleLikeClick = () => {
    // You can implement your logic here to save the like in the database
    // For simplicity, I'll just toggle the 'liked' state.
    setLiked((prevLiked) => !prevLiked);
  };

  return (
    <div>
      <Card
        style={{
          width: "20rem",
          height: "31rem",
          margin: "10px",
          padding: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <Image
          src={imageUrl}
          height={230}
          width={220}
          alt="image"
          className="m-auto"
        />
        <Card.Body
          style={{
            height: "280px", // Set a fixed height for card body
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Card.Title style={{ fontSize: "20px", fontWeight: "bold" }}>
            {title}
          </Card.Title>
          <Card.Text style={{ fontSize: "16px", margin: "auto" }}>
            Price: {formattedPrice}
          </Card.Text>
          {/* <Button variant="primary">View Details</Button> */}
          <Link href={`/product/${id}`}>
            <Button variant="primary" style={{ margin: "10px" }}>
              View Details
            </Button>
          </Link>
          {/* <Button
            variant="primary"
            style={{ margin: "10px" }}
            className={"btn btn-primary btn-sm"}
            onClick={handleLikeClick}
          >
            {liked ? "Unlike" : "Like"}
          </Button> */}

          <Button
            variant="light"
            size="xs"
            onClick={handleLikeClick}
            style={{}}
          >
            {liked ? (
              <Image src="/like.png" alt="Like" width={20} height={20} />
            ) : (
              <Image src="/unlike.png" alt="Unlike" width={20} height={20} />
            )}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductItem;

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductDetails from "../../components/ProductDetails";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";

function ProductDetailsPage() {
  const router = useRouter();
  console.log(router.query);
  const { sku } = router.query;
  const [product, setProduct] = useState();

  console.log(sku);
  useEffect(() => {
    // Fetch the product data based on the SKU from the API or database
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/product/${sku}`
        );
        const data = await response.json();
        setProduct(data.product); // Set the product data in the state
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    if (sku) {
      fetchProductData(); // Call the fetchProductData function when SKU is available
    }
  }, [sku]);
  console.log(product);
  if (!product) {
    return <div>Loading...</div>;
  }

  return <ProductDetails product={product} />;
}

export default ProductDetailsPage;

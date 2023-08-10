import React, { useState, useEffect } from "react";
import ProductItem from "./ProductItem";

function DataFetcher({ queryParam }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/category/${queryParam}`
      );
      const result = await response.json();
      setData(result.products);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [queryParam]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = data.slice(firstIndex, lastIndex);

  return (
    <div>
      <div className="row">
        {currentItems.map((item) => (
          <div key={item.sku} className="col-md-3 mb-3 ">
            <ProductItem
              id={item.sku}
              imageUrl={item.image}
              title={item.name}
              price={item.salePrice}
              desc={item.longDescription}
              producturl={item.url}
              angleImage={item.angleImage}
            />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => handlePagination(index + 1)}
              style={{
                margin: "5px",
                padding: "5px 10px",
                backgroundColor: index + 1 === currentPage ? "blue" : "white",
                color: index + 1 === currentPage ? "white" : "black",
                border: "1px solid black",
              }}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default DataFetcher;

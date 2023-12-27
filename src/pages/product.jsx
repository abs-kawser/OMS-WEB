import React, { useEffect, useState } from "react";
import { BASE_URL, PASSWORD, USERNAME, blackColor } from "./../../varible";
import { useLogin } from "../Context/LoginProvider";

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //comeing from contex
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { userDetails } = isLoggedIn;
  console.log("isLoggedIn",isLoggedIn);

  const fetchProductDatax = async () => {
    try {
      const credentials = `${USERNAME}:${PASSWORD}`;
      const base64Credentials = btoa(credentials);
      const apiUrl = "api/ProductApi/GetAllProduct";

      const response = await fetch(`${apiUrl}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Basic ${base64Credentials}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });

      console.log("response", response);

      if (response.ok) {
        const responseData = await response.json(); // Parse JSON data
        console.log("Product fetch successfully!", responseData);

        setProductData(responseData); // Update productData state
        setIsLoading(false); // Update isLoading state

      } else {
        console.error("Product not fetch successfully");
        // Handle unsuccessful fetch (show error message, etc.)
      }
    } catch (error) {
      console.error("An error occurred during fetch-Product:", error.message);
    }
  };

  useEffect(() => {
    fetchProductDatax();
  }, []);

  return (
    <div>
  {/* <h1 style={{ marginBottom: '20px', color: '#333' }}>Full-Name: {userDetails?.FullName}</h1> */}

  {isLoading ? (
    <p>Loading...</p>
  ) : (
    <div style={{marginLeft:20}}>
      <h1 style={{ color:blackColor }}>Product Page</h1>
      <table style={{ width: '60%', borderCollapse: 'collapse', }}>
        <thead>
          <tr style={{ background: '#008080', color: '#fff' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Product Name</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Product Id</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Product Code</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Pack Size</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>MRP</th>
          </tr>
        </thead>
        <tbody>
          {productData.map((product) => (
            <tr key={product.id}>
              <td style={{ padding: '10px' }}>{product.ProductFamilyName}</td>
              <td style={{ padding: '10px' }}>{product.ProductId}</td>
              <td style={{ padding: '10px' }}>{product.ProductCode}</td>
              <td style={{ padding: '10px' }}>{product.PackSize}</td>
              <td style={{ padding: '10px' }}>{product.MRP}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
  );
};

export default Product;

import React, { useEffect, useState } from 'react';
import { fetchProductData } from '../Api/ProductListApi';

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProductData(setIsLoading);
        setProductData(data);
      } catch (error) {
        // Handle error, e.g., show an error message
        console.error('Error fetching product data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Run the effect only on mount

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Product Page</h1>
          <ul>
            {productData.map((product) => (
              <li key={product.id}>
                {product.name} - {product.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Product;

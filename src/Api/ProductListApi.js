import base64 from "base-64";
import { BASE_URL, PASSWORD, USERNAME } from "../../varible";
import axios from 'axios';



export const fetchProductData = async ( setIsLoading) => {
  try {
    const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);
    const response = await fetch(`${BASE_URL}/api/ProductApi/GetAllProduct`, {
      headers: {
        Authorization: authHeader,
      },
    });
    const jsonData = await response.json();
   
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    setIsLoading(false);
    // setIsLoading(false);
    throw error;
  }
};
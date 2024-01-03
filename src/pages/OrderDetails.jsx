import { Button } from "@mui/material";
import React from "react";

const OrderDetails = () => {
  return (
    <div>
      <h3 style={{ textAlign:"center"}}>
        Order Details
      </h3>

      <div
        style={{
          display: "flex",
          gap: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button variant="contained">Product List</Button>
        <Button variant="contained">Order Details</Button>
      </div>
       
      <> </>

      <> </>
    </div>
  );
};

export default OrderDetails;

//  first  need two button
//fetch product data with a qty box
//those selected qty box was show in orderDetails
//orderDetails have submit button

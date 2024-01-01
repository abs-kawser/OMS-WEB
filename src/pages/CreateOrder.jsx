import React, { useEffect, useState } from "react";
import { useLogin } from "../Context/LoginProvider";

import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";

import Button from "@mui/material/Button";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { USERNAME, PASSWORD } from "./../../varible";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getData } from "../utils/utils";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { FaCalendar } from 'react-icons/fa';

const CreateOrder = () => {
  // const user = localStorage.getItem("userData");
  // console.log({ user });

  // const userData = JSON.parse(user);

  // const territoryId = userData.TerritoryId;
  // console.log(territoryId);

  const theme = useTheme();

  const [customerData, setCustomerData] = useState();
  const [selectedData, setSelectedData] = useState([]);
  const [orderDate, setOrderDate] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [note, setNote] = useState("");

  // console.log({ customerData });
  // console.log({ selectedData });
  // console.log({ note });
  // console.log({ orderDate });
  // console.log("getData", getData());

  // const data = getData();
  // console.log( "Data paise ",data.TerritoryId);
  //console.log("userDetails", { userDetails });


  console.log("orderDate",orderDate);
  console.log("deliveryDate",deliveryDate);
  console.log({ note });
 

  //comeing from contex
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { userDetails } = isLoggedIn;
 

  function getStyles(name, customerData, theme) {
    return {
      fontWeight:
        customerData.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleChange = (event) => {
    setSelectedData(event.target.value);
  };

 
  const fetchCustomerData = async () => {
    try {
      const credentials = `${USERNAME}:${PASSWORD}`;
      const base64Credentials = btoa(credentials);
      const apiUrl = "api/CustomerApi/GetAllCustomer";
      const queryParams = `territoryId=${userDetails?.TerritoryId}`;
      // const queryParams = `territoryId=${user?.TerritoryId}`;
      console.log("queryParams", { queryParams });

      // const queryParams = 'territoryId=46';
      const response = await fetch(`${apiUrl}?${queryParams}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Basic ${base64Credentials}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      console.log("response", response);
      const result = await response.json();
      // console.log("result", result);
      setCustomerData(result);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("user.TerritoryId", user.TerritoryId);
  useEffect(() => {
    fetchCustomerData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
      }}
    >
      <form>
        <h3>Create Order</h3>
        <div style={{ alignSelf: "center" }}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Name</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Name"
                value={selectedData}
                onChange={handleChange}
              >
                {customerData?.map((item) => (
                  <MenuItem
                    value={item.CustomerId}
                    style={getStyles(item, selectedData, theme)}
                  >
                    {item?.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
        <br />
        <div>
        

          <DatePicker
            selected={orderDate}
            onChange={(date) => setOrderDate(date)}
            dateFormat="dd/MM/yyyy"           
            placeholderText="Select Order Date"

          />
          <br />
          <br />
          <DatePicker
            selected={deliveryDate}
            onChange={(date) => setDeliveryDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Delivery Date"
            // showIcon
          />
        </div>
        <br />

        <div className="form-group" style={{ alignSelf: "center" }}>
          <label htmlFor="formGroupExampleInput">Note</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Note"
            value={note}
            onChange={(event) => {
              setNote(event.target.value);
            }}
          />
        </div>
        <br />
        <Button variant="contained">Next</Button>
      </form>
    </div>
  );
};

export default CreateOrder;

import React, { useEffect, useState } from "react";
import { useLogin } from "../Context/LoginProvider";

import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { USERNAME,PASSWORD } from './../../varible';

const CreateOrder = () => {

  const theme = useTheme();

  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  console.log("selectedData",selectedData);

  //  console.log("data",data);

  //comeing from contex
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { userDetails } = isLoggedIn;
  console.log('userDetails', {userDetails});

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  function getStyles(name, data, theme) {
    return {
      fontWeight:
      data.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }



  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    // Update the selectedData instead of data
    setSelectedData((prevSelectedData) => {
      // Check if the selected value is already in the array
      if (prevSelectedData.includes(value)) {
        // If it is, remove it
        return prevSelectedData.filter((item) => item !== value);
      } else {
        // If it's not, add it
        return [...prevSelectedData, value];
      }
    });
  };


  const fetchCustomerData = async () => {
    try {
      const credentials = `${USERNAME}:${PASSWORD}`;
      const base64Credentials = btoa(credentials);
      const apiUrl = "api/CustomerApi/GetAllCustomer";
      const queryParams = `territoryId=${userDetails?.TerritoryId}`;
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
      console.log("result", result);
      setData(result);
    } catch (error) {

    }
  };

  useEffect(() => {
    // if (userDetails?.TerritoryId) {
    //   fetchCustomerData();
    // }
    fetchCustomerData()
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

    <FormControl sx={{ width: 300 }}>
      <InputLabel id="demo-multiple-name-label">Name</InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        multiple
        value={selectedData}  
        onChange={handleChange}
        input={<OutlinedInput label="Name" />}
        MenuProps={MenuProps}
      >
        {data?.map((item) => (
          <MenuItem
            value={data}
            style={getStyles(item, selectedData, theme)}
          >
            {item?.Name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

  </div>

  <div>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker label="Order Date " />
      </DemoContainer>
    </LocalizationProvider>

    <br />
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DemoContainer components={["DatePicker"]}>
        <DatePicker label="Delivery Date" />
      </DemoContainer>
    </LocalizationProvider>
  </div>
  <br />

  <div className="form-group" style={{ alignSelf: "center" }}>
    <label for="formGroupExampleInput">Note</label>
    <input
      type="text"
      className="form-control"
      id="formGroupExampleInput"
      placeholder="Note"
    />
  </div>
  <br />
  <Button variant="contained">Next</Button>
</form>
    </div>
  );
};

export default CreateOrder;

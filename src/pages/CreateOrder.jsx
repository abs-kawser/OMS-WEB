import React, { useEffect, useState } from 'react'
import BasicDatePicker from '../Component/DatePicker'
import { BASE_URL, PASSWORD, USERNAME } from "./../../varible";
import { useLogin } from '../Context/LoginProvider';

const CreateOrder = () => {
  const [data, setData] = useState([]);



  //comeing from contex
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { userDetails } = isLoggedIn;
  console.log(userDetails);


const fetchCustomerData = async () => {
try {
  const credentials = `${USERNAME}:${PASSWORD}`;
  const base64Credentials = btoa(credentials);
  const apiUrl = "api/CustomerApi/GetAllCustomer";
  const queryParams =`territoryId=${userDetails?.TerritoryId}`;

  const response = await fetch(`${apiUrl}?${queryParams}`,{
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
    fetchCustomerData()
  }, [])


  return (
<div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 20 }}>
<form>

  <div style={{ alignSelf: "center" }}>
    <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
      <option selected>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </div>
  <div>
    <BasicDatePicker />
    <BasicDatePicker />
  </div>


  <div class="form-group" style={{ width: "50%", alignSelf: "center" }}>
    <label for="formGroupExampleInput">note</label>
    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="note" />
  </div>

</form>
</div>
  )
}

export default CreateOrder
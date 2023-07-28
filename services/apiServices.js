import axios from "axios";
import { BACKEND_BASE_URL } from "../CONSTANTS";

//1. company Logo--
export async function companyLogoApi() {
  const logo_url = `${BACKEND_BASE_URL}/api/v1/company-settings/1`; //${userProfle?.org_id}
  try {
    const response = await axios.get(logo_url);
    return response?.data?.data?.logo;
  } catch (error) {
    console.log("error", error);
    // return error;
  }
}

//2. User Login--   integrate later...
// export async function loginUserApi({ email, password, pos_agent }) {
//   const url = `${BACKEND_BASE_URL}/api/v1/auth/user/login`;
//   try {
//     const payload = {
//       email,
//       password,
//       pos_agent,
//     };
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const data = await axios.post(url, payload, config);
//     return data;
//   } catch (error) {
//     return error;
//   }
// }
// ${BACKEND_BASE_URL}/api/v1/insurance-category/product-type/field

// 3. Get dynamic form json ---
export async function getdynamicFormJsonApi() {
  const json_live_url =
    "https://insurance.ellocentlabs.in/api/v1/insurance-category/product-type/field"; //${userProfle?.org_id}
  try {
    const data = await axios.get(json_live_url);
    return data;
  } catch (error) {
    console.log("error is", error);
    // return error;
  }
}

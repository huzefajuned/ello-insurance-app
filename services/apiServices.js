import axios from "axios";
import { BACKEND_BASE_URL } from "../LOCALS";
import base64 from "react-native-base64";

//1. company Logo only
export async function companyLogoApi() {
  const logo_url = `${BACKEND_BASE_URL}company-settings/1`; //${userProfle?.org_id}
  try {
    const response = await axios.get(logo_url);
    return response?.data?.data?.logo;
  } catch (error) {
    console.log("error in api of catch", error.response);
    // return error;
  }
}

//1. company Logo only
export async function userProfileApi(id, headers) {
  if (id !== undefined) {
    const url = `${BACKEND_BASE_URL}pos/${id}`;
    try {
      const data = await axios.get(url, { headers });
      return data;
    } catch (error) {
      console.log("error is", error.response);
      // return error;
    }
  }
  return;
}
//2. User Login
export async function loginUserApi(email, password, pos_agent) {
  const url = `${BACKEND_BASE_URL}auth/user/login`;
  try {
    const payload = {
      email,
      password,
      pos_agent,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = await axios.post(url, payload, config);
    return data;
  } catch (error) {
    return error;
  }
}
//3. Register User
export async function registerUserApi() {}

// 4. Get dynamic form json
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

//5.Post an Inquiry
export async function postInquiry(formValues, id, requiredFields) {
  // id is sepecific to loggged innuser only--
  const url = `${BACKEND_BASE_URL}user/product/data`;
  try {
    // Create an empty payload object with insurance_details property
    const payload = {
      insurance_details: {},
      source_ref: id,
      insurance_category: requiredFields[0],
      source: "pos",
      // sold_another: true,
      // insurance_category: 3,
      // product_type: 41,
      // Add the id to the source_ref property
    };

    // Extract and add name, email, and contact to the payload directly
    payload.name = formValues.name;
    payload.email = formValues.email;
    payload.contact = formValues.contact;

    // Iterate through the formValues object (except name, email, and contact) and add defined properties to the insurance_details dynamically
    for (const [key, value] of Object.entries(formValues)) {
      if (
        value !== undefined &&
        key !== "name" &&
        key !== "email" &&
        key !== "contact"
      ) {
        payload.insurance_details[key] = value;
      }
    }
    const config = {
      //  form type--
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = await axios.post(url, payload, config);
    return data;
  } catch (error) {
    // return error;
    console.log("error", error);
  }
}

// 6.  function using Regular expression to extract text within HTML tags...
export function extractTextFromHTML(htmlSnippet) {
  const regex = />(.*?)<\/\w+>/;
  const match = htmlSnippet.match(regex);
  const extractedText = match ? match[1] : "";
  return extractedText;
}

//7. Update Profile ---
export async function updateProfileApi(headers, id, formValues) {
  const { Email, Gender } = formValues;
  const url = `${BACKEND_BASE_URL}pos/register`;
  const config = {
    headers,
  };
  try {
    const payload = {
      email: Email,
      gender: Gender,
    };
    const data = await axios.patch(url, payload, config);
    return data;
  } catch (error) {
    return console.log("error in api catch", error);
  }
}
//8. get all inquirys--

export async function getAll_Inquiries(id) {
  const url = `${BACKEND_BASE_URL}user/product/data?pos_id=${id}`;
  try {
    const data = await axios.get(url);
    return data;
  } catch (error) {
    console.log("error inside api", error);
    // return error;
  }
}

//9.  // function  for extracting token to user  specific id

export function extract_UserId(accessToken) {
  const tokenParts = accessToken?.split(".");
  const payload = tokenParts?.[1];
  // Check if payload is available before attempting to decode
  const decodedPayload = payload ? base64?.decode(payload) : null;

  let id;
  try {
    // Check if decodedPayload is available before parsing
    id = decodedPayload ? JSON?.parse(decodedPayload)?.id : null;
  } catch (error) {
    // Handle the error if parsing fails (invalid JSON payload)
    console.error("Error parsing payload:", error);
  }
  return id;
}

//10. format date in format ( dd-mm-yyyy)
export function formatDate(inputDate) {
  // Convert the input string to a Date object
  const date = new Date(inputDate);

  // Extract day, month, and year from the Date object
  const day = date.getDate();
  const month = date.getMonth() + 1; // Adding 1 because months are zero-based (0 = January)
  const year = date.getFullYear();

  // Pad day and month with leading zeros if needed
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  // Combine the formatted date parts into the desired format "dd-mm-yyyy"
  const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

  return formattedDate;
}

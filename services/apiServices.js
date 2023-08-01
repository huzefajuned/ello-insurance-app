import axios from "axios";
import { BACKEND_BASE_URL } from "../env";

//1. company Logo--
export async function companyLogoApi() {
  const logo_url = `${BACKEND_BASE_URL}company-settings/1`; //${userProfle?.org_id}
  try {
    const response = await axios.get(logo_url);
    return response?.data?.data?.logo;
  } catch (error) {
    console.log("error", error);
    // return error;
  }
}

//2. User Login--   integrate later...
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

export async function postInquiry(formValues) {
  const url = `${BACKEND_BASE_URL}user/product/data`;
  try {
    // Create an empty payload object with insurance_details property
    const payload = {
      insurance_details: {},
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
    return error;
    // console.log("error", error);
  }
}

// 4.  function using Regular expression to extract text within HTML tags...
export function extractTextFromHTML(htmlSnippet) {
  const regex = />(.*?)<\/\w+>/;
  const match = htmlSnippet.match(regex);
  const extractedText = match ? match[1] : "";
  return extractedText;
}

//5. Update Profile ---
export async function updateProfileApi(headers, id, formValues) {
  const { Email, Gender } = formValues;
  const url = `${BACKEND_BASE_URL}pos/register`;
  const config = {
    //  form type--
    headers,
  };
  try {
    const payload = {
      email: Email,
      gender: Gender,
    };
    const data = await axios.patch(url, payload, config);
    // console.log("data inisde api",data)
    return data;
  } catch (error) {
    return console.log("error in api catch", error);
  }
}

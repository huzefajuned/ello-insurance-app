import axios from "axios";
import { BACKEND_BASE_URL } from "../CONSTANTS";

//1. User Login--
export async function loginUser({ email, password, pos_agent }) {
  console.log(email, password, pos_agent);
  const url = `${BACKEND_BASE_URL}/api/v1/auth/user/login`;
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
  //     const resp = await axios.post(url, payload, config);
  //     console.log("resp", resp);
  //   } catch (error) {
  //     console.log("error", error.response);
  //   }
}

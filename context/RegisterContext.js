import { createContext, useState } from "react";
export const RegisterContext = createContext();

export const RegisterContextProvider = ({ children }) => {
  // states for PersonalDetails Form---
  const [isBlank, setIsBlank] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [experience, setExperience] = useState("");
  const [workDetails, setWorkDetails] = useState("");

  // states for BankDetails Form---
  const [bankName, setBankName] = useState("");
  const [account_No, setAccount_No] = useState("");
  const [ifsc_Code, setIfsc_Code] = useState("");

  // states for Upload Documnets Form---
  const [profile, setProfile] = useState();

  const [adhaar, setAadhaar] = useState();
  const [panCard, setPanCard] = useState();
  const [passbook, setPassbook] = useState();
  const [edu_Proof, setEdu_Proof] = useState();

  const contextValue = {
    isBlank,
    setIsBlank,
    profile,
    setProfile,
    name,
    setName,
    age,
    setAge,
    email,
    setEmail,
    phone,
    setPhone,
    address,
    setAddress,
    experience,
    setExperience,
    workDetails,
    setWorkDetails,
    bankName,
    setBankName,
    account_No,
    setAccount_No,
    ifsc_Code,
    setIfsc_Code,
    adhaar,
    setAadhaar,
    panCard,
    setPanCard,
    passbook,
    setPassbook,
    edu_Proof,
    setEdu_Proof,
  };
  return (
    <RegisterContext.Provider value={contextValue}>
      {children}
    </RegisterContext.Provider>
  );
};

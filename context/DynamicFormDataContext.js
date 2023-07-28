import React, { createContext, useState } from "react";

export const DynamicFormDataContext = createContext();

export const FormDataContextProvider = ({ children }) => {
  const [dy_formConfigurations, setDy_formConfigurations] = useState([]);
  // const [loading, setLoading] = useState(true);
  return (
    <DynamicFormDataContext.Provider
      value={{ dy_formConfigurations, setDy_formConfigurations }}
    >
      {children}
    </DynamicFormDataContext.Provider>
  );
};

import React, { createContext, useState } from "react";

export const DynamicFormDataContext = createContext();

export const FormDataContextProvider = ({ children }) => {
  const [dy_formConfigurations, setDy_formConfigurations] = useState([]);
  const [requiredFields, setRequiredFields] = useState([]);
  // const [loading, setLoading] = useState(true);
  return (
    <DynamicFormDataContext.Provider
      value={{
        dy_formConfigurations,
        setDy_formConfigurations,
        requiredFields,
        setRequiredFields,
      }}
    >
      {children}
    </DynamicFormDataContext.Provider>
  );
};

import React, { createContext, useState } from "react";

export const DynamicFormDataContext = createContext();

export const FormDataContextProvider = ({ children }) => {
  const [dy_formConfigurations, setDy_formConfigurations] = useState([]);
  const [requiredFields, setRequiredFields] = useState([]); // Use useState for requiredFields

  return (
    <DynamicFormDataContext.Provider
      value={{
        dy_formConfigurations,
        setDy_formConfigurations,
        requiredFields,
      }}
    >
      {children}
    </DynamicFormDataContext.Provider>
  );
};

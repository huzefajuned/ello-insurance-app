import React, { createContext, useState } from "react";

export const CustomModalContext = createContext();

export const CustomModalProvider = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <CustomModalContext.Provider value={{ isModalVisible, setIsModalVisible }}>
      {children}
    </CustomModalContext.Provider>
  );
};

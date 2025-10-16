import React, { useState, createContext } from "react";
export const PortfolioContext = createContext();

export const PortfolioContextProvider = ({ children }) => {
  const [cursorOnButton, setCursorOnButton] = useState({
    isOn: false,
    size: 1,
    isImg: false,
    imgSrc: "",
  });

  const [geometryXRotate, setGeometryXRotate] = useState(0);

  // Function to update geometryXRotate state
  const updateGeometryXRotate = (newValue) => {
    setGeometryXRotate(newValue);
  };
  // Function to update cursorOnButton state
  const setCursor = (isOn, size, isImg, imgSrc) => {
    if (!isImg || !imgSrc) {
      imgSrc = "";
      isImg = false;
    }
    setCursorOnButton({ isOn, size, isImg, imgSrc });
  };
  function Cursor() {
    return cursorOnButton;
  }

  return (
    <PortfolioContext.Provider
      value={{
        setCursor,
        Cursor,
        geometryXRotate,
        updateGeometryXRotate,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

import React, { createContext, useState, useContext } from 'react';

const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState([]);

  const updateFormData = (newData) => {
    setFormData((prevData) =>[...prevData,newData ]);
  };

  return (
    <FormDataContext.Provider value={{ formData, updateFormData}}>
      {children}
    </FormDataContext.Provider>
  );
};

// Custom hook to access formData
export const useFormData = () => {
  return useContext(FormDataContext);
};

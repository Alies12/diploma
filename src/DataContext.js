import React, { createContext, useState, useEffect } from "react";
import api from "./api/api.js";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const initialData = await api.getInitialData();
      console.log("Данные с сервера:", initialData);
      setData(initialData);
      setError(null);
    } catch (err) {
      console.error("Ошибка загрузки данных:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error, refetch: fetchData }}>
      {children}
    </DataContext.Provider>
  );
};

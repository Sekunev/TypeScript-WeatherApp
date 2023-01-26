import { ChangeEvent, useEffect, useState } from "react";
import { optionCityType, forecastType } from "../types";

const useForecast = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [term, setTerm] = useState<string>(""); // INPUT VALUE
  const [options, setOptions] = useState<[]>([]); // SEARCHDE SIRALANAN CITY'LER
  const [city, setCity] = useState<optionCityType | null>(); // SECILEN ŞEHİR
  const [forecast, setForecast] = useState<forecastType | null>(); // SEÇILEN ŞEHRİN APIDEN GELEN VERİLERİNİN DEPOLANDIĞI STATE

  const getSearch = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setOptions(data));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(value);
    if (value === "") return;
    getSearch(value);
  };

  const handleSubmit = () => {
    if (!city) return;

    getWeatherData(city);
  };

  const getWeatherData = (city: optionCityType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 16),
        }; // datadaki city ve list verilerini forecastData'da birleştirerek Forecast'a atadık
        setForecast(forecastData);
      });
  };
  const backSearchPage = () => {
    setForecast(null);
    setTerm("");
  };

  useEffect(() => {
    if (city) {
      setTerm(city.name);
      setOptions([]);
    }
  }, [city]);

  return {
    term,
    options,
    forecast,
    handleChange,
    handleSubmit,
    setCity,
    setForecast,
    backSearchPage,
  };
};

export default useForecast;

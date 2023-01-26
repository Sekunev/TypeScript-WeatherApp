import React from "react";
import { forecastType } from "../types";
import Sunrise from "./Icons/Sunrise";
import Sunset from "./Icons/Sunset";
import InfoBox from "./InfoBox";
import { getSunTime, getVisibilityValue, getWindDirection } from "../helpers";

type Props = {
  data: forecastType;
  setForecast: React.Dispatch<
    React.SetStateAction<forecastType | null | undefined>
  >;
  backSearchPage: () => void;
};

const Degree = ({ temp }: { temp: number }): JSX.Element => (
  <span>
    {temp} <sup>o</sup>
  </span>
);

const Forecast = ({ data, setForecast, backSearchPage }: Props) => {
  const today = data.list[0];
  console.log(data);
  return (
    <div className="f_Container">
      <div className="w-[300px]">
        <section className="text-center">
          <h2 className="text-2xl">
            {data.name} <span className="font-thin ml-2">{data.country}</span>
          </h2>
          <h1 className="text-3xl font-semibold">
            {Math.round(today.main.temp)}
            <sup>°</sup>
          </h1>
          <p>
            {today.weather[0].main} {today.weather[0].description}
          </p>
          <p>
            H : {Math.ceil(today.main.temp_max)} <sup>°</sup> L :{" "}
            {Math.floor(today.main.temp_min)} <sup>°</sup>
          </p>
        </section>
        <section className="flex overflow-x-scroll mt-4 pb-2 mb-4">
          {data.list.map((item, index) => (
            <div
              key={index}
              className="text-center w-[50px] inline-block flex-shrink-0"
            >
              <p>{index === 0 ? "Now" : new Date(item.dt * 1000).getHours()}</p>
              <img
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt="icon"
              />
              <p className="font-bold">{Math.round(item.main.temp)}</p>
            </div>
          ))}
        </section>
        <section className="flex flex-wrap justify-between">
          <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 bacdrop-blur-lg rounded drop-shadow-lg py-4 mb-5 ">
            <Sunrise />
            <span>{getSunTime(data.sunrise)}</span>
          </div>
          <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 bacdrop-blur-lg rounded drop-shadow-lg py-4 mb-5 ">
            <Sunset />
            <span>{getSunTime(data.sunset)}</span>
          </div>
          <InfoBox
            icon="wind"
            title="Wind"
            info={`${Math.round(today.wind.speed)} km/h`}
            description={`${getWindDirection(
              Math.round(today.wind.deg)
            )}, gusts 
            ${today.wind.gust.toFixed(1)} km/h`}
          />
          <InfoBox
            icon="feels"
            title="Feels like"
            info={<Degree temp={Math.round(today.main.feels_like)} />}
            description={`Feels ${
              Math.round(today.main.feels_like) < Math.round(today.main.temp)
                ? "colder"
                : "warmer"
            }`}
          />
          <InfoBox
            icon="pressure"
            title="Pressure"
            info={`${today.main.pressure} hPa`}
            description={` ${
              Math.round(today.main.pressure) < 1013 ? "Lower" : "Higher"
            } than standard`}
          />
          <InfoBox
            icon="visibility"
            title="Visibility"
            info={`${(today.visibility / 1000).toFixed()} km`}
            description={getVisibilityValue(today.visibility)}
          />
        </section>
        <div className="text-center">
          <button
            className="w-[100px] rounded-md border-2 border-zinc-200 transition-all hover:border-zinc-500 hover:text-zinc-500 text-zinc-700 bg-white/10 backdrop-blur-ls px-2 py-1 cursor-pointer"
            onClick={backSearchPage}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forecast;

import { ChangeEvent } from "react";
import { optionCityType } from "../types";

type Props = {
  term: string;
  options: [];
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  setCity: React.Dispatch<
    React.SetStateAction<optionCityType | null | undefined>
  >;
};

const Search = ({
  term,
  options,
  handleChange,
  handleSubmit,
  setCity,
}: Props): JSX.Element => {
  return (
    <div className="flex justify-center items-center bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-rose-900 via-amber-800 to-rose-400 h-[100vh] w-full">
      <section className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] backdrop-blur-lg drop-shadow-lg rounded text-zinc-700">
        <h1 className="text-4xl text-white mb-3">Weather App</h1>
        <p className="text-white mb-3">
          Enter below a place you want to know the weather of and select an
          option from the dropdown
        </p>

        <div className="relative flex mt-10 md:mt-4">
          <input
            type="text"
            value={term}
            onChange={handleChange}
            className="px-2 py-1 rounded-1-md border-2 border-white"
          />
          <ul className="absolute top-9 bg-white  rounded-b-md">
            {options.length > 1 &&
              options.map((optionCity: optionCityType, index: number) => (
                <li key={index}>
                  <button
                    onClick={() => setCity(optionCity)}
                    className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                  >
                    {optionCity.name} {optionCity.country}
                  </button>
                </li>
              ))}
          </ul>
          <button
            className="rounded-r-md border-2 border-zinc-200 transition-all hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer"
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>
      </section>
    </div>
  );
};

export default Search;

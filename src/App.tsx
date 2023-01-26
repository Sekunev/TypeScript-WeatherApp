import Forecast from "./components/Forecast";
import Search from "./components/Search";
import useForecast from "./hooks/useForecast";

const App = () => {
  const {
    term,
    options,
    forecast,
    handleChange,
    setForecast,
    handleSubmit,
    setCity,
    backSearchPage,
  } = useForecast();
  return (
    <div className="flex justify-center items-center bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-500 via-purple-500 to-blue-500 h-[100vh] w-full">
      {forecast ? (
        <Forecast
          data={forecast}
          setForecast={setForecast}
          backSearchPage={backSearchPage}
        />
      ) : (
        <Search
          term={term}
          options={options}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setCity={setCity}
        />
      )}
    </div>
  );
};

export default App;

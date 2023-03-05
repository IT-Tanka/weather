import React, { useState } from "react";
import logo from "./logo.svg";
import SearchForm from "./components/SearchForm";
import SearchResult from "./components/SearchResult";
import "./App.css";

export interface IResult {
  id:number,
  main:{temp_min: number, temp_max: number},
  name: string,
  weather:[{description:string}],
  sys:{country:string}
}
function App() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<IResult|null>(null);
  const [message, setMessage]=useState("");

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const checkEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };
  const API_KEY='724104ff4f08c9fc79286c5d69b95372';
  async function handleSearch() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}&units=metric`
    );
    if (response.ok) {
      setResult((await response.json())); 
    } else {
      setResult(null);setMessage("no result for this city");
    }
  }

  return (
    <div className="App">
      <main className="App-main">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Weather in your city</h2>
        <SearchForm
          name={name}
          handleChangeName={handleChangeName}
          checkEnter={checkEnter}
          handleSearch={handleSearch}
        />
        {result&&<SearchResult result={result} />}
        {!result&&<span>{message}</span>}
      </main>
    </div>
  );
}

export default App;

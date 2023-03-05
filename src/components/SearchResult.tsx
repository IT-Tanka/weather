import React from "react";
import { IResult } from "../App";

interface ResultProps {
  result: IResult|null;
}

const SearchResult = ({ result }: ResultProps) => {
  return (
    <div className="result">
      <span>{result?.sys.country}</span>
      <span>{result?.name}</span>
      <span >
        {result?.main.temp_min}  —  {result?.main.temp_max}  °C
      </span>
      <span className="description">{result?.weather[0].description}</span>
    </div>
  );
};

export default SearchResult;

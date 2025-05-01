import arrow from "../assets/img/arrow.png";
import { useRef, useState, useCallback } from "react";
import useCountrySearch from "../hooks/useCountrySearch";
import { useAppDispatch, useAppSelector } from "../hooks/useReduxType";
import SuggestionList from "./SuggestionList";
import countries_iso from "../assets/countries_iso.json";
import { CountryData, SugestionData } from "../interfaces/stats";
import { RootState } from "../app/store";

export default function CustomInput() {
  const searchValue = useRef<string | null>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string | null>("");
  const [suggestionArr, setSuggestionArr] = useState<SugestionData[]>();
  const dispatch = useAppDispatch();
  const countries = useAppSelector(
    (state: RootState): CountryData[] => state.countries
  );

  const { isFetching } = useCountrySearch(searchTerm, setSearchTerm);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchValue.current = event.target.value;
    const filtered = countries_iso.filter((item) => {
      return item.name_pl
        .toLowerCase()
        .includes(searchValue.current!.toLowerCase());
    });
    setSuggestionArr(filtered.slice(0, 5));
  };

  const handleSubmit = useCallback(
    async (event: any) => {
      event.preventDefault();
      if (
        countries.some(
          (item: CountryData) =>
            item.countryName.toLowerCase() ===
            searchValue.current!.toLowerCase()
        )
      ) {
        searchValue.current = "";
        return;
      }

      setSearchTerm(searchValue.current);
      searchValue.current = "";
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [countries]
  );

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSubmit(e);
        }
      }}
      className="mb-10 w-full mx-auto max-w-[812px] relative">
      <input
        ref={inputRef}
        onClick={(e: React.MouseEvent<HTMLInputElement>) => {
          if (searchValue.current == "Wpisz nazwe państwa") {
            (e.target as HTMLInputElement).value = "";
          }
        }}
        className={`w-full h-20 rounded-[4rem] outline-0 bg-white text-4xl p-4 ${
          searchValue ? "text-black" : "text-gray-500"
        }`}
        onChange={handleChange}
        placeholder="Wpisz nazwe państwa"
      />

      <button className="absolute bg-[#DED9D9] hover:bg-gray-400 hover:scale-105 ease-in duration-100 right-3 bottom-1/2 translate-y-1/2  w-16 h-16 rounded-full hover:cursor-pointer">
        <img src={arrow} alt="arrow" className="mx-auto" />
      </button>
      {searchValue.current && suggestionArr && (
        <SuggestionList
          suggestionArr={suggestionArr}
          searchValue={searchValue}
          handleSubmit={handleSubmit}
        />
      )}
    </form>
  );
}

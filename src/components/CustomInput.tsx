import arrow from "../assets/img/arrow.svg";
import { useRef, useState, useCallback } from "react";
import useCountrySearch from "../hooks/useCountrySearch";
import { useAppDispatch, useAppSelector } from "../hooks/useReduxType";
import SuggestionList from "./SuggestionList";
import countries_iso from "../assets/countries_iso.json";
import { CountryData, SugestionData } from "../interfaces/stats";
import { RootState } from "../app/store";
import isEqual from "lodash.isequal"; // check prev state with new state

const CustomInput = function CustomInput() {
  const searchValue = useRef<string | null>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string | null>("");
  const [suggestionArr, setSuggestionArr] = useState<SugestionData[]>();
  const dispatch = useAppDispatch();
  const countries = useAppSelector(
    (state: RootState): CountryData[] => state.countries,
  );
  console.log(countries);
  const loading = useAppSelector((state: RootState): boolean => state.loading);
  useCountrySearch(searchTerm, setSearchTerm);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchValue.current = event.target.value;
    const filtered = countries_iso.filter((item) => {
      return item.name
        .toLowerCase()
        .includes(searchValue.current!.toLowerCase());
    });
    if (!isEqual(filtered, suggestionArr)) {
      setSuggestionArr(filtered.slice(0, 5));
    }
  };

  const handleSubmit = useCallback(
    async (event: any) => {
      event.preventDefault();
      if (
        countries.some(
          (item: CountryData) =>
            item.countryName.toLowerCase() ===
            searchValue.current!.toLowerCase(),
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
    [countries],
  );

  return (
    <form
      autoComplete="off"
      onSubmit={loading ? (e) => e.preventDefault() : handleSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !loading) {
          handleSubmit(e);
        }
      }}
      className="max-w-[1135px] relative text-3xl w-full mx-auto flex mt-25"
    >
      <input
        ref={inputRef}
        // onBlur={(e) => {
        //   setTimeout(() => {
        //     setSuggestionArr([]);
        //   }, 100);
        // }}
        onClick={(e: React.MouseEvent<HTMLInputElement>) => {
          if (searchValue.current == "Enter country name...") {
            (e.target as HTMLInputElement).value = "";
          }
        }}
        id="country"
        className={`outline-none bg-white p-3 w-full ${searchValue ? "text-black" : "text-[#929090]"}`}
        onChange={handleChange}
        placeholder="Enter country name..."
      />
      <button className="bg-white rounded-r-2xl p-3 ml-2 hover:bg-[#ECECEC] hover:cursor-pointer tranistion-all duration-300 ease-out">
        <img src={arrow} alt="arrow_nav" />
      </button>

      {searchValue.current && suggestionArr && (
        <SuggestionList
          suggestionArr={suggestionArr}
          searchValue={searchValue}
          handleSubmit={loading ? (e) => e.preventDefault() : handleSubmit}
        />
      )}
    </form>
  );
};

export default CustomInput;

import arrow from "../assets/img/arrow.svg";
import { useRef, useState, useCallback, useEffect } from "react";
import useCountrySearch from "../hooks/useCountrySearch";
import { useAppSelector } from "../hooks/useReduxType";
import SuggestionList from "./SuggestionList";
import countries_iso from "../assets/countries_iso.json";
import { CountryData, SugestionData } from "../interfaces/stats";
import { RootState } from "../app/store";
import isEqual from "lodash.isequal"; // check prev state with new state

const CustomInput = function CustomInput() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currentActive = useRef<null | undefined | string>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLFormElement>(null);
  const searchValue = useRef<string | null>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string | null>("");
  const [suggestionArr, setSuggestionArr] = useState<SugestionData[]>();
  const countries = useAppSelector(
    (state: RootState): CountryData[] => state.countries,
  );

  const loading = useAppSelector((state: RootState): boolean => state.loading);
  useCountrySearch(searchTerm, setSearchTerm);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchValue.current = event.target.value;
    const filtered = countries_iso.filter((item) => {
      return item.name
        .toLowerCase()
        .includes(searchValue.current!.toLowerCase());
    });
    setIsOpen(true); // posibble bugs
    if (!isEqual(filtered, suggestionArr)) {
      setSuggestionArr(filtered.slice(0, 5));
    }
  };

  const handleSubmit = useCallback(
    async (event: any, flag = false) => {
      event.preventDefault();

      if (flag) searchValue.current = event.currentTarget.textContent;

      const previous = countries.some(
        (item: CountryData) =>
          item.countryName.toLowerCase() === searchValue.current!.toLowerCase(),
      );

      const isExist = suggestionArr?.some(
        (item) =>
          item.name.toLowerCase() === searchValue.current?.toLowerCase(),
      );

      if (previous || suggestionArr!.length < 1 || !isExist) {
        searchValue.current = "";
        return;
      }

      setSearchTerm(searchValue.current);
      searchValue.current = "";
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [countries, suggestionArr],
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!ulRef.current) return;
    const li = ulRef.current.children[activeIndex] as HTMLLIElement | undefined;
    if (!li) return;
    searchValue.current = li.textContent;
  }, [activeIndex]);

  return (
    <form
      autoComplete="off"
      onSubmit={loading ? (e) => e.preventDefault() : handleSubmit}
      ref={dropdownRef}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !loading) {
          handleSubmit(e);
        }
        if (!suggestionArr) return;
        if (e.key === "ArrowDown") {
          setActiveIndex((prev) =>
            prev < suggestionArr!.length - 1 ? prev + 1 : 0,
          );
        }
        if (e.key === "ArrowUp") {
          setActiveIndex((prev) =>
            prev < 1 ? suggestionArr!.length - 1 : prev - 1,
          );
        }
      }}
      className="max-w-[1135px] relative text-3xl w-full mx-auto flex mt-25"
    >
      <input
        autoComplete="off"
        ref={inputRef}
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

      {searchValue.current && suggestionArr && isOpen && (
        <SuggestionList
          suggestionArr={suggestionArr}
          searchValue={searchValue}
          ulRef={ulRef}
          activeIndex={activeIndex}
          handleSubmit={loading ? (e) => e.preventDefault() : handleSubmit}
        />
      )}
    </form>
  );
};

export default CustomInput;

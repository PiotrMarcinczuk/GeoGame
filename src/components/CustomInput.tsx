import { useRef, useMemo, useState, useCallback, useEffect } from "react";

import useCountrySearch from "../hooks/useCountrySearch";
import { useAppSelector } from "../hooks/useReduxType";

import SuggestionList from "./SuggestionList";

import { RootState, CountryData } from "../interfaces/shared.types";

import countries_iso from "../assets/countries_iso.json";
import arrow from "../assets/img/arrow.svg";

const CustomInput = function CustomInput() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const ulRef = useRef<HTMLUListElement>(null);
  const dropdownRef = useRef<HTMLFormElement>(null);

  const countries = useAppSelector(
    (state: RootState): CountryData[] => state.countries,
  );
  const loading = useAppSelector((state: RootState): boolean => state.loading);

  const suggestionArr = useMemo(() => {
    return countries_iso
      .filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase()),
      )
      .slice(0, 5);
  }, [inputValue]);

  useCountrySearch(searchValue); // IMPORTANT LINE, FORCE FETCH

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    if (!value) return;

    setIsOpen(true); // posibble bugs
  };

  const handleSubmit = useCallback(
    async (event: any, forcedValue?: string) => {
      event.preventDefault();

      const valueToSubmit =
        forcedValue ??
        (activeIndex >= 0 ? suggestionArr[activeIndex].name : inputValue);
      if (!valueToSubmit) return;

      const alreadyFetched = countries.some(
        (item: CountryData) =>
          item.countryName.toLowerCase() === valueToSubmit!.toLowerCase(),
      );

      const existsInSuggestions = suggestionArr?.some(
        (item) => item.name.toLowerCase() === valueToSubmit?.toLowerCase(),
      );

      if (alreadyFetched || suggestionArr!.length < 1 || !existsInSuggestions) {
        return;
      }

      setSearchValue(valueToSubmit); // triggers fetch
      setActiveIndex(-1);
      setInputValue("");

      setTimeout(() => setSearchValue(""), 50);
    },
    [inputValue, countries, suggestionArr, activeIndex],
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

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      ref={dropdownRef}
      onKeyDown={(e) => {
        if (!suggestionArr.length) return;

        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActiveIndex((prev) =>
            prev < suggestionArr.length - 1 ? prev + 1 : 0,
          );
        }

        if (e.key === "ArrowUp") {
          e.preventDefault();
          setActiveIndex((prev) =>
            prev <= 0 ? suggestionArr.length - 1 : prev - 1,
          );
        }
      }}
      className="max-w-[1135px] relative text-2xl md:text-3xl w-full mx-auto flex mt-8 lg:-mt-8 z-50 "
    >
      <div className="flex w-full mx-2 xl:mx-0">
        <input
          autoComplete="off"
          value={inputValue || ""}
          id="country"
          className={`mx-2 xl:mx-0 text-xl sm:text-2xl outline-none rounded-l-xs bg-white p-3 w-full ${inputValue ? "text-black" : "text-[#929090]"}`}
          onChange={handleChange}
          placeholder="Enter country name..."
        />
        <button className="bg-white rounded-r-2xl p-3 xl:ml-2 hover:bg-[#ECECEC] hover:cursor-pointer tranistion-all duration-300 ease-out">
          <img src={arrow} alt="arrow_nav" />
        </button>

        {inputValue && suggestionArr && isOpen && (
          <SuggestionList
            suggestionArr={suggestionArr}
            searchValue={searchValue}
            setInputValue={setInputValue}
            ulRef={ulRef}
            activeIndex={activeIndex}
            handleSubmit={loading ? (e) => e.preventDefault() : handleSubmit}
          />
        )}
      </div>
    </form>
  );
};

export default CustomInput;

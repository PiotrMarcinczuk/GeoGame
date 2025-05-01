import CustomInput from "./CustomInput";
import Country from "./Country";
import { useAppDispatch, useAppSelector } from "../hooks/useReduxType";
import { useEffect, useState, useRef } from "react";
import { fetchCorrectCountry } from "../utils/http";
import { setCorrectCountry } from "../counters/correctCountrySlice";
import { setCountriesList } from "../counters/countriesListSlice";
import Format from "../utils/Format";
import speedImg from "../assets/img/speed.png";
import logo from "../assets/img/logo.png";
import help from "../assets/img/help.png";
import website from "../assets/img/website.png";
import github from "../assets/img/github.png";
import Popup from "./Popup";
import { RootState } from "../app/store";
import { CountryData } from "../interfaces/stats";

function Main() {
  const data = useAppSelector((state: RootState): CountryData => state.country);
  const countries = useAppSelector(
    (state: RootState): CountryData[] => state.countries
  );
  const [itemsDelay, setItemsDelay] = useState<number>(0.3);
  const [tempCountriesList, setTempCountriesList] = useState<CountryData[]>([]);
  const [winnerPopupIsVisible, setWinnerPopupIsVisible] =
    useState<boolean>(false);
  const [helpPopupIsVisible, setHelpPopupIsVisible] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { checkIfCountryIsCorrect } = Format();
  const correctCountry = useAppSelector(
    (state: RootState): CountryData => state.correctCountry
  );
  const loading = useAppSelector((state: RootState): boolean => state.loading);
  console.log("loading", loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const res = async () => {
      const data = await fetchCorrectCountry();
      dispatch(setCorrectCountry(data));
    };
    res();
  }, []);

  useEffect(() => {
    if (data) {
      setTempCountriesList((prev: CountryData[]) => [...prev, data]);
    }
  }, [data]);

  useEffect(() => {
    if (tempCountriesList.length > 0) {
      const isCorrect = checkIfCountryIsCorrect(
        tempCountriesList[tempCountriesList.length - 1],
        correctCountry,
        itemsDelay,
        setWinnerPopupIsVisible
      );
      if (isCorrect) setTempCountriesList([]);
      dispatch(setCountriesList(tempCountriesList));
    }
    scrollRef.current!.scrollIntoView({ behavior: "smooth" });
    console.log("Eee");
  }, [tempCountriesList, countries, loading]);

  return (
    <>
      {helpPopupIsVisible && (
        <Popup
          setHelpPopupIsVisible={setHelpPopupIsVisible}
          title={"Pomoc"}
          textContent={
            "Eksport 📦 - Procent eksportu w stosunku do PKB, Import 🚢 - Procent importu w stosunku do PKB, PKB per capita 💰 - PKB na mieszkańca, Elektryczność ⚡ - Procent dostępu do energii elektrycznej, Zalesienie 🌲 - Procent powierzchni lasów na terenie kraju, Surowce ⛏️ - Procent eksportu surowców w stosunku do PKB, Ludność miejska 🏢 - Liczba mieszkańców zamieszkujących miasta"
          }
          buttonText={"Powrót"}
        />
      )}
      <header className="mx-auto max-w-1450 w-full">
        <div className="flex justify-center items-center ">
          <img src={logo} alt="logo" />
        </div>
      </header>
      <main className="max-w-1450 mx-auto">
        <div className="flex relative">
          <button
            onClick={() => {
              setHelpPopupIsVisible((prev) => !prev);
            }}
            className="w-24 h-24 absolute left-0 cursor-pointer hover:scale-105 ease-out duration-250 bg-white/50 hover:bg-gray-400 rounded-full">
            <img src={help} alt="help_icon" className="mx-auto" />
          </button>
          <CustomInput />
          <button
            onClick={() => {
              setItemsDelay((prev) => (prev === 0.3 ? 0.1 : 0.3));
            }}
            className="group w-24 h-24 absolute right-0 cursor-pointer hover:scale-105 ease-out duration-250 bg-white/50 hover:bg-gray-400 rounded-full">
            <img
              src={speedImg}
              alt="speed_icon"
              className={`${
                itemsDelay !== 0.3 ? "rotate-180" : "rotate-0"
              } mx-auto `}
            />
            <p className="group-hover:scale-95 ease-out duration-250">
              Prędkość: x{itemsDelay * 10}
            </p>
          </button>
        </div>
        {countries && countries[0] && (
          <div className="w-full flex justify-between font-semibold mt-2 px-2">
            <div className="text-center px-2 mr-3 w-4/30 -pr-6">
              <h1 className="text-3xl">Państwo</h1>
              <hr className="bg-white w-full mt-4" />
            </div>
            <div className="text-center w-2/30 ">
              <h2 className="text-3xl">Eksport</h2>
              <hr className="bg-white w-full mt-4" />
            </div>
            <div className="text-center w-2/30 ">
              <h2 className="text-3xl">Import</h2>
              <hr className="bg-white  mt-4" />
            </div>
            <div className="text-center w-4/30 ">
              <h2 className="text-3xl text-nowrap">PKB per capita</h2>
              <hr className="bg-white w-full mt-4" />
            </div>
            <div className="text-center  w-4/30 ">
              <h2 className="text-3xl">Elektryczność</h2>
              <hr className="bg-white w-full mt-4" />
            </div>
            <div className="text-center w-3/30 ">
              <h2 className="text-3xl">Zalesienie</h2>
              <hr className="bg-white w-full mt-4" />
            </div>
            <div className="text-center w-3/30 ">
              <h2 className="text-3xl">Surowce</h2>
              <hr className="bg-white w-full mt-4" />
            </div>
            <div className="text-center w-5/30 ">
              <h2 className="text-3xl ">Ludność miejska</h2>
              <hr className="bg-white w-full mt-4" />
            </div>
          </div>
        )}

        <ul className="max-h-[535px] px-2 scrollbar  scrollbar-w-[1px] scrollbar-thumb-green-400   scrollbar-thumb-rounded-2xl overflow-y-scroll">
          {countries
            ? countries.map((country: CountryData, index: number) => {
                return (
                  <div key={index} className="flex flex-col">
                    <Country country={country} itemsDelay={itemsDelay} />

                    {loading && index === countries.length - 1 && (
                      <div className="h-12 w-12 border-4 border-t-transparent border-green-500 rounded-full animate-spin mx-auto mt-4"></div>
                    )}
                  </div>
                );
              })
            : null}
          <div ref={scrollRef} />
          {winnerPopupIsVisible && (
            <Popup
              setWinnerPopupIsVisible={setWinnerPopupIsVisible}
              title="Gratulacje !!!"
              textContent="Udało ci się odgadnąć wylosowany kraj"
              buttonText="GG"
            />
          )}
        </ul>
      </main>
      <footer className="absolute left-4 bottom-4">
        <div className="flex -mx-2 bg-gray-200/10 rounded-lg p-2">
          <div
            className="w-16 mx-2 hover:cursor-pointer hover:scale-105 ease-out duration-250"
            onClick={() => window.open("https://piotr-marcinczuk.pl")}>
            <img src={website} alt="website_icon" />
          </div>
          <div
            className="w-16 mx-2 hover:cursor-pointer hover:scale-105 ease-out duration-250"
            onClick={() => window.open("https://github.com/PiotrMarcinczuk")}>
            <img src={github} alt="website_icon" />
          </div>
        </div>
      </footer>
    </>
  );
}

export default Main;

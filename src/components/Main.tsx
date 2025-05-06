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
  const dispatch = useAppDispatch();
  const firstCountryCodeISO =
    countries[0]?.["EN.URB.LCTY.UR.ZS"]?.[0]?.country?.id;

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
  }, [tempCountriesList, countries, loading]);

  return (
    <section className="h-screen">
      {helpPopupIsVisible && (
        <Popup
          setHelpPopupIsVisible={setHelpPopupIsVisible}
          title={"Pomoc"}
          textContent={
            "Największe miasto 🏙️ - Procent osób zamieszkujący największy ośrodek miejski, Import 🚢 - Procent importu w stosunku do PKB, PKB per capita 💰 - PKB na mieszkańca, Elektryczność ⚡ - Procent dostępu do energii elektrycznej, Zalesienie 🌲 - Procent powierzchni lasów na terenie kraju, Surowce ⛏️ - Procent eksportu surowców w stosunku do PKB, Ludność miejska 🏢 - Liczba mieszkańców zamieszkujących miasta"
          }
          buttonText={"Powrót"}
        />
      )}
      <header className="mx-auto max-w-1450 w-full">
        <div className="flex justify-center items-center ">
          <img src={logo} alt="logo" />
        </div>
      </header>
      <main className="mx-auto max-w-[1850px] px-2 w-full">
        <div className="flex relative max-w-1450 mx-auto">
          <button
            onClick={() => {
              setHelpPopupIsVisible((prev) => !prev);
            }}
            className="w-12 h-12 md:w-24 md:h-24 absolute left-0 bottom-1/2 md:bottom-auto cursor-pointer hover:scale-105 ease-out duration-250 bg-white/50 hover:bg-gray-400 rounded-full">
            <img src={help} alt="help_icon" className="mx-auto" />
          </button>
          <CustomInput />
          <button
            onClick={() => {
              setItemsDelay((prev) => (prev === 0.3 ? 0.1 : 0.3));
            }}
            className="group w-12 h-12 md:w-24 md:h-24 absolute right-0 bottom-1/2 md:bottom-auto cursor-pointer hover:scale-105 ease-out duration-250 bg-white/50 hover:bg-gray-400 rounded-full">
            <img
              src={speedImg}
              alt="speed_icon"
              className={`${
                itemsDelay !== 0.3 ? "rotate-180" : "rotate-0"
              } mx-auto `}
            />
            <p className="group-hover:scale-95 ease-out duration-250 text-sm lg:text-base">
              Prędkość: x{itemsDelay * 10}
            </p>
          </button>
        </div>
        {/* {countries && countries[0] && (
          <div className="mx-auto flex justify-between font-bold lg:font-semibold mt-2 px-2 md:text-sm xl:text-xl 2xl:text-3xl">
            <div className="text-center px-2 mr-3 w-4/30 -pr-6">
              <h1>Państwo</h1>
              <hr className="bg-white w-full mt-4" />
            </div>
            <div className="text-center lg:w-4/30">
              <h2 className="text-nowrap hidden lg:block">Największe miasto</h2>
              <h2 className="block lg:hidden">🏙️</h2>
              <hr className="bg-white w-full mt-4" />
            </div>
            <div className="text-center lg:w-2/30">
              <h2 className="text-nowrap hidden lg:block">Import</h2>
              <h2 className="block lg:hidden">🚢</h2>
              <hr className="bg-white  mt-4" />
            </div>
            <div className="text-center lg:w-4/30">
              <h2 className="text-nowrap hidden lg:block">PKB per capita</h2>
              <h2 className="block lg:hidden">💰</h2>
              <hr className="bg-white w-full mt-4" />
            </div>
            <div className="text-center lg:w-4/30">
              <h2 className="text-nowrap hidden lg:block">Elektryczność</h2>
              <h2 className="block lg:hidden">⚡</h2>
              <hr className="bg-white w-full mt-4" />
            </div>
            <div className="text-center lg:w-3/30">
              <h2 className="text-nowrap hidden lg:block">Zalesienie</h2>
              <h2 className="block lg:hidden">🌲</h2>
              <hr className="bg-white w-full mt-4" />
            </div>
            <div className="text-center lg:w-3/30">
              <h2 className="text-nowrap hidden lg:block">Surowce</h2>
              <h2 className="block lg:hidden">⛏️</h2>
              <hr className="bg-white w-full mt-4" />
            </div>
            <div className="text-center lg:w-5/30">
              <h2 className="text-nowrap hidden lg:block">Ludność miejska</h2>
              <h2 className="block lg:hidden">🏢</h2>
              <hr className="bg-white w-full mt-4" />
            </div>
          </div>
        )} */}

        <ul className="max-h-[535px] px-2 scrollbar  scrollbar-w-[1px] scrollbar-thumb-green-400   scrollbar-thumb-rounded-2xl overflow-y-scroll">
          {countries
            ? countries.map((country: CountryData, index: number) => {
                return (
                  <div key={index} className="flex flex-col">
                    <Country
                      country={country}
                      itemsDelay={itemsDelay}
                      isFirst={
                        country["EN.URB.LCTY.UR.ZS"]?.[0]?.country?.id ===
                        firstCountryCodeISO
                      }
                    />

                    {loading && index === countries.length - 1 && (
                      <div className="h-12 w-12 border-4 border-t-transparent border-green-500 rounded-full animate-spin mx-auto mt-4"></div>
                    )}
                  </div>
                );
              })
            : null}

          {loading && countries.length < 1 && (
            <div className="h-12 w-12 border-4 border-t-transparent border-green-500 rounded-full animate-spin mx-auto mt-4"></div>
          )}
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
    </section>
  );
}

export default Main;

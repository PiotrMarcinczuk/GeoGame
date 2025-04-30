import CustomInput from "./CustomInput";
import Country from "./Country";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCorrectCountry } from "../utils/http";
import { setCorrectCountry } from "../counters/correctCountrySlice";
import { setCountriesList } from "../counters/countriesListSlice";
import Format from "../utils/Format";
import speedImg from "../assets/img/speed.png";
import logo from "../assets/img/logo.png";
import help from "../assets/img/help.png";
import Popup from "./Popup";

function Main() {
  const data = useSelector((state: any) => state.country);
  const countries = useSelector((state: any) => state.countries);
  const [itemsDelay, setItemsDelay] = useState(0.3);
  const [tempCountriesList, setTempCountriesList] = useState<any>([]);
  const [winnerPopupIsVisible, setWinnerPopupIsVisible] = useState(false);
  const [helpPopupIsVisible, setHelpPopupIsVisible] = useState(false);
  const { checkIfCountryIsCorrect } = Format();
  const correctCountry = useSelector((state: any) => state.correctCountry);
  const loadingState = useSelector((state: any) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    const res = async () => {
      const data = await fetchCorrectCountry();
      dispatch(setCorrectCountry(data));
    };
    res();
  }, []);

  useEffect(() => {
    if (data) {
      setTempCountriesList((prev: any) => [...prev, data]);
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
  }, [tempCountriesList, countries]);

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
        <ul>
          {countries
            ? countries.map((country: any, index: number) => {
                return (
                  <Country
                    key={index}
                    country={country}
                    isFirst={index === 0}
                    itemsDelay={itemsDelay}
                  />
                );
              })
            : null}

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
    </>
  );
}

export default Main;

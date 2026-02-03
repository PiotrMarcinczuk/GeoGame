import CustomInput from "./CustomInput";
import Country from "./Country";
import { useAppDispatch, useAppSelector } from "../hooks/useReduxType";
import { useEffect, useState, useRef } from "react";
import { fetchCorrectCountry } from "../utils/http";
import { setCorrectCountry } from "../counters/correctCountrySlice";
import { setCountriesList } from "../counters/countriesListSlice";
import Format from "../utils/Format";
import WinnerPopup from "./WinnerPopup";
import HelpPopup from "./HelpPopup";
import green from "../assets/img/h1.svg";
import orange from "../assets/img/h2.svg";
import red from "../assets/img/h3.svg";
import ConfettiExplosion from "react-confetti-explosion";
import { RootState } from "../app/store";
import { CountryData } from "../interfaces/stats";

function Main() {
  const [isWinner, setIsWinner] = useState(false);
  const data = useAppSelector((state: RootState): CountryData => state.country);
  const countries = useAppSelector(
    (state: RootState): CountryData[] => state.countries,
  );

  const [winnerPopupIsVisible, setWinnerPopupIsVisible] =
    useState<boolean>(false);
  const [helpPopupIsVisible, setHelpPopupIsVisible] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const correctCountry = useAppSelector(
    (state: RootState): CountryData => state.correctCountry,
  );
  const loading = useAppSelector((state: RootState): boolean => state.loading);
  const dispatch = useAppDispatch();
  const { checkIfCountryIsCorrect } = Format();
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
    if (
      data &&
      !countries.some((c: CountryData) => c.countryName === data.countryName)
    ) {
      dispatch(setCountriesList([...countries, data]));
    }
  }, [data, countries, dispatch]);

  useEffect(() => {
    if (countries.length > 0) {
      const result = checkIfCountryIsCorrect(
        countries[countries.length - 1],
        correctCountry,
        0.25,
        setWinnerPopupIsVisible,
      );
      if (result) {
        setTimeout(() => {
          setIsWinner(true);
        }, 1200);
      }
    }
    // scrollRef.current!.scrollIntoView({ behavior: "smooth" });
  }, [data, countries, loading]);

  return (
    <main>
      {isWinner && (
        <>
          <div className="absolute left-0 top-0">
            <ConfettiExplosion
              force={0.8}
              duration={2000}
              particleCount={100}
              width={1600}
            />
          </div>
          <div className="absolute right-0 top-0">
            <ConfettiExplosion
              force={0.8}
              duration={2000}
              particleCount={100}
              width={1600}
            />
          </div>
        </>
      )}
      <section className="pt-36 text-white max-w-[1366px] mx-auto">
        {helpPopupIsVisible && (
          <HelpPopup setHelpPopupIsVisible={setHelpPopupIsVisible} />
        )}
        <div className="flex justify-center items-center w-full">
          <h1 className="text-7xl font-bold">GeoGAME</h1>
        </div>
        <div className="w-full max-w-[1135px] w-full mx-auto -translate-y-1/2 flex flex-col items-end">
          <div
            onClick={() => setHelpPopupIsVisible((prev: boolean) => !prev)}
            className="translate-y-1/3  inline-flex flex-col border-xs hover:text-black hover:bg-white hover:cursor-pointer transition-all duration-500 ease-out p-1"
          >
            <p className="text-2xl mb-2 text-center">How to play?</p>
            <div className="flex justify-between w-[220px]">
              <div className="border-xs bg-[#0D9E12] py-4 px-6 flex item-center justify-center">
                <img src={green} alt="red_incorrect"></img>
              </div>
              <div className="border-xs bg-[#FFA600] py-4 px-6 flex item-center justify-center">
                <img src={red} alt="green_correct"></img>
              </div>
              <div className="border-xs bg-[#FF0000] py-4 px-6 flex item-center justify-center">
                <img src={orange} alt="orange_incorrect"></img>
              </div>
            </div>
          </div>
          <CustomInput />
        </div>
      </section>
      {countries && countries[0] && (
        <div className="w-full bg-white/80 max-w-[1366px] w-full mx-auto">
          <div className="flex justify-between p-2">
            <h2 className="text-28 font-semibold w-[8%] text-center">
              Country
            </h2>
            <h2 className="text-28 font-semibold w-[12%] text-center">
              Largest city
            </h2>
            <h2 className="text-28 font-semibold w-[7%] text-center">Import</h2>
            <h2 className="text-28 font-semibold w-[14%] text-center">
              GDP per capita
            </h2>
            <h2 className="text-28 font-semibold w-[13%] text-center">
              Afforestation
            </h2>
            <h2 className="text-28 font-semibold w-[17%] text-center">
              Natrual resources
            </h2>
            <h2 className="text-28 font-semibold w-[17%] text-center">
              Urban population
            </h2>
          </div>
        </div>
      )}

      <ul className="w-full max-w-[1366px] w-full mx-auto">
        {countries
          ? countries.map((country: CountryData, index: number) => {
              return (
                <div key={index} className="flex flex-col">
                  <Country
                    country={country}
                    itemsDelay={0.2}
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
        {winnerPopupIsVisible && (
          <WinnerPopup
            setWinnerPopupIsVisible={setWinnerPopupIsVisible}
            setIsWinner={setIsWinner}
          />
        )}
      </ul>
    </main>
  );
}

export default Main;

{
  /* <section className="h-screen">
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
        <div className="flex flex-col relative max-w-1450 mx-auto">
          <button
            onClick={() => {
              setHelpPopupIsVisible((prev) => !prev);
            }}
            className="w-12 h-12 md:w-24 md:h-24 absolute left-10 md:left-0 top-22 md:top-auto bottom-1/2 md:bottom-auto cursor-pointer hover:scale-105 ease-out duration-250 bg-white/50 hover:bg-gray-400 rounded-full">
            <img
              src={help}
              alt="help_icon"
              className="mx-auto w-9 h-9 md:w-auto md:h-auto"
            />
          </button>
          <CustomInput />
          <button
            onClick={() => {
              setItemsDelay((prev) => (prev === 0.3 ? 0.1 : 0.3));
            }}
            className="group w-12 h-12 md:w-24 md:h-24 absolute right-10 md:right-0 top-22 md:top-auto bottom-1/2 md:bottom-auto cursor-pointer hover:scale-105 ease-out duration-250 bg-white/50 hover:bg-gray-400 rounded-full">
            <img
              src={speedImg}
              alt="speed_icon"
              className={`${
                itemsDelay !== 0.3 ? "rotate-180" : "rotate-0"
              } mx-auto `}
            />
            <p className="group-hover:scale-95 ease-out duration-250 text-sm lg:text-base">
              Zmień na: x{itemsDelay * 10}
            </p>
          </button>
        </div>
        {countries && countries[0] && (
          <div className="w-full text-center col-span-8 grid grid-cols-8 gap-2 mt-16 sm:mt-20 md:mt-4 mb-4 sm:px-2 text-2xl lg:text-lg customXL:text-xl 2xl:text-2xl font-semibold">
            <div className="grid md:mr-3">
              <h2 className="text-nowrap text-center hidden lg:block">
                Państwo
              </h2>
              <h2 className="block lg:hidden">🏳️</h2>
              <hr className="bg-white w-full mt-4" />
            </div>
            <div>
              <h2 className="text-nowrap text-center hidden lg:block">
                Największe miasto
              </h2>
              <h2 className="block lg:hidden">🏙️</h2>
              <hr className="bg-white w-full mt-4" />
            </div>
            <div>
              <h2 className="text-nowrap text-center hidden lg:block">
                Import
              </h2>
              <h2 className="block lg:hidden">🚢</h2>
              <hr className="bg-white w-full mt-4" />
            </div>
            <div>
              <h2 className="text-nowrap text-center hidden lg:block">
                PKB per capita
              </h2>
              <h2 className="block lg:hidden">💰</h2>
              <hr className="bg-white w-full mt-4" />
            </div>
            <div>
              <h2 className="text-nowrap text-center hidden lg:block">
                Elektryczność
              </h2>
              <h2 className="block lg:hidden">⚡</h2>
              <hr className="bg-white w-full mt-4" />
            </div>
            <div>
              <h2 className="text-nowrap text-center hidden lg:block">
                Zalesienie
              </h2>
              <h2 className="block lg:hidden">🌲</h2>
              <hr className="bg-white w-full mt-4" />
            </div>
            <div>
              <h2 className="text-nowrap text-center hidden lg:block">
                Surowce
              </h2>
              <h2 className="block lg:hidden">⛏️</h2>
              <hr className="bg-white w-full mt-4" />
            </div>
            <div>
              <h2 className="text-nowrap text-center hidden lg:block">
                Ludność miejska
              </h2>
              <h2 className="block lg:hidden">🏢</h2>
              <hr className="bg-white w-full mt-4" />
            </div>
          </div>
        )}

        <ul className="max-h-[200px] md:max-h-[475px] sm:px-2 scrollbar  scrollbar-w-[1px] scrollbar-thumb-green-400  scrollbar-thumb-rounded-2xl overflow-y-scroll overflow-x-hidden">
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
      <footer className="fixed w-full md:w-auto md:bottom-4 md:left-4 bottom-0">
        <div className="flex justify-center -mx-2 bg-gray-200/10 rounded-lg p-2">
          <div
            className="w-8 lg:w-16 mx-2 hover:cursor-pointer hover:scale-105 ease-out duration-250"
            onClick={() => window.open("https://piotr-marcinczuk.pl")}>
            <img src={website} alt="website_icon" />
          </div>
          <div
            className="w-8 lg:w-16 mx-2 hover:cursor-pointer hover:scale-105 ease-out duration-250"
            onClick={() => window.open("https://github.com/PiotrMarcinczuk")}>
            <img src={github} alt="website_icon" />
          </div>
        </div>
      </footer>
    </section> */
}

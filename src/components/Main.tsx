import { useEffect, useState, useRef } from "react";

import CustomInput from "./CustomInput";
import Country from "./Country";
import Format from "../utils/Format";
import WinnerPopup from "./WinnerPopup";
import HelpPopup from "./HelpPopup";

import ConfettiExplosion from "react-confetti-explosion";

import { useAppDispatch, useAppSelector } from "../hooks/useReduxType";
import { setCorrectCountry } from "../counters/correctCountrySlice";
import { setCountriesList } from "../counters/countriesListSlice";

import { CountryData } from "../interfaces/shared.types";
import { fetchCorrectCountry } from "../utils/http";

import { RootState } from "../interfaces/shared.types";

import green from "../assets/img/h1.svg";
import orange from "../assets/img/h2.svg";
import red from "../assets/img/h3.svg";

function Main() {
  const [isWinner, setIsWinner] = useState(false);
  const [winnerPopupIsVisible, setWinnerPopupIsVisible] =
    useState<boolean>(false);
  const [helpPopupIsVisible, setHelpPopupIsVisible] = useState<boolean>(false);
  const data = useAppSelector((state: RootState): CountryData => state.country);
  const countries = useAppSelector(
    (state: RootState): CountryData[] => state.countries,
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const correctCountry = useAppSelector(
    (state: RootState): CountryData => state.correctCountry,
  );
  const loading = useAppSelector((state: RootState): boolean => state.loading);
  const dispatch = useAppDispatch();
  const { checkIfCountryIsCorrect } = Format();

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
    if (scrollRef.current)
      scrollRef.current!.scrollIntoView({ behavior: "smooth" });
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

      <section className="pt-36 text-white max-w-[1366px] mx-auto flex lg:noflex flex-col">
        <div className="flex justify-center items-center w-full">
          <h1 className="text-7xl font-bold">GeoGAME</h1>
        </div>
        <div className="w-full max-w-[1135px] w-full mx-auto lg:-translate-y-full flex flex-col items-center lg:items-end">
          <div
            onClick={() => setHelpPopupIsVisible((prev: boolean) => !prev)}
            className="inline-flex flex-col border-xs hover:text-black hover:bg-white hover:cursor-pointer transition-all duration-500 ease-out p-1 mx-2 xl:mx-0"
          >
            <p className="text-2xl mb-2 text-center">How to play?</p>
            <div className="flex justify-between w-[220px]">
              <div className="border-xs bg-[#00FF09]/80 py-4 px-6 flex item-center justify-center">
                <img src={green} alt="green_correct"></img>
              </div>
              <div className="border-xs bg-[#FF0000]/80 py-4 px-6 flex item-center justify-center">
                <img src={red} alt="red_incorrect"></img>
              </div>
              <div className="border-xs bg-[#FFA600]/80 py-4 px-6 flex item-center justify-center">
                <img src={orange} alt="orange_incorrect"></img>
              </div>
            </div>
          </div>
        </div>
        <CustomInput />
      </section>
      {countries && countries[0] && (
        <section className="max-w-[1366px] mx-auto overflow-x-auto">
          <div className="min-w-[1366px]">
            <div className="w-full bg-white/80 mt-8 lg:mt-16 mx-2 1370:mx-0">
              <div className="flex justify-between p-2 text-xl font-semibold ">
                <h2 className="w-[111px] text-center shrink">Country</h2>
                <h2 className="w-[160px] text-center shrink">Largest city</h2>
                <h2 className="w-[90px] text-center shrink">Export</h2>
                <h2 className="w-[203px] text-center shrink">GDP per capita</h2>
                <h2 className="w-[179px] text-center shrink">Afforestation</h2>
                <h2 className="w-[242px] text-center shrink">
                  Natrual resources
                </h2>
                <h2 className="w-[234px] text-center shrink">
                  Urban population
                </h2>
              </div>
            </div>

            <ul className="w-full max-w-[1366px] w-full mx-auto mb-6 z-10">
              {countries
                ? countries.map((country: CountryData, index: number) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col justify-start mx-2"
                      >
                        <Country country={country} itemsDelay={0.2} />

                        {loading && index === countries.length - 1 && (
                          <div className="h-12 w-12 border-4 border-t-transparent border-green-500 rounded-full animate-spin mt-4"></div>
                        )}
                      </div>
                    );
                  })
                : null}
              {loading && countries.length < 1 && (
                <div className="h-12 w-12 border-4 border-t-transparent border-green-500 rounded-full animate-spin mx-auto mt-4"></div>
              )}
              <div ref={scrollRef} />
            </ul>
          </div>
        </section>
      )}

      {winnerPopupIsVisible && (
        <WinnerPopup
          setWinnerPopupIsVisible={setWinnerPopupIsVisible}
          setIsWinner={setIsWinner}
        />
      )}
      {helpPopupIsVisible && (
        <HelpPopup setHelpPopupIsVisible={setHelpPopupIsVisible} />
      )}
    </main>
  );
}

export default Main;

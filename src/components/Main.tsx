import { useEffect, useState, useRef } from "react";

import CustomInput from "./CustomInput";
import Country from "./Country";
import Format from "../utils/Format";
import WinnerPopup from "./WinnerPopup";
import HelpPopup from "./HelpPopup";
import GameHeader from "./GameHeader";

import ConfettiExplosion from "react-confetti-explosion";

import { useAppDispatch, useAppSelector } from "../hooks/useReduxType";
import { setCorrectCountry } from "../counters/correctCountrySlice";
import { setCountriesList } from "../counters/countriesListSlice";

import { CountryData } from "../interfaces/shared.types";
import { fetchCorrectCountry } from "../utils/http";

import { RootState } from "../interfaces/shared.types";

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
    let timerId = null;
    if (countries.length > 0) {
      const result = checkIfCountryIsCorrect(
        countries[countries.length - 1],
        correctCountry,
        setWinnerPopupIsVisible,
      );
      if (result) {
        timerId = setTimeout(() => {
          setIsWinner(true);
        }, 1200);
      }
    }
    if (scrollRef.current)
      scrollRef.current!.scrollIntoView({ behavior: "smooth" });

    return () => {
      if (timerId) clearTimeout(timerId);
    };
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
        <GameHeader setHelpPopupIsVisible={setHelpPopupIsVisible} />
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

              <div ref={scrollRef} />
            </ul>
          </div>
        </section>
      )}
      {loading && countries.length < 1 && (
        <div className="h-12 w-12 border-4 border-t-transparent border-green-500 rounded-full animate-spin mx-auto mt-4"></div>
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

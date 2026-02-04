import { useAppSelector, useAppDispatch } from "../hooks/useReduxType";
import { setCountriesList } from "../counters/countriesListSlice";
import { resetCountOfAttempt } from "../counters/countOfAttempSlice";
import { setCountryData } from "../counters/countrySlice";
import { useSelector } from "react-redux";

import { CountryData, RootState } from "../interfaces/shared.types";

import { WinPopupProps } from "./WinnerPopup.types";

export default function WinnerPopup({
  setWinnerPopupIsVisible,
  setIsWinner,
}: WinPopupProps) {
  const handleClickButton = () => {
    if (setWinnerPopupIsVisible) {
      setWinnerPopupIsVisible(false);
      setIsWinner(false);
      dispatch(setCountriesList([]));
      dispatch(setCountryData(null));
      dispatch(resetCountOfAttempt());
    }
  };

  const dispatch = useAppDispatch();
  const countOfAttempt = useAppSelector((state) => state.countOfAttempt);
  const correctCountry = useSelector(
    (state: RootState): CountryData => state.correctCountry,
  );
  const codeISO = correctCountry["EN.URB.LCTY.UR.ZS"][0].country.id;
  return (
    <>
      <div className="fixed left-0 top-0 w-screen h-screen bg-white/50 backdrop-blur-3xl z-50"></div>
      <section className="max-w-[900px] max-h-[500px] h-full flex flex-col items-center justify-center fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 w-full mx-auto p-10 text-black text-xl bg-white rounded-sm">
        <p className="text-5xl">Congratulations you did it! </p>
        <div className="flex items-center justify-center bg-[#D2D2D2]/50 p-2 rounded-xs">
          <div>
            <img
              src={`https://flagcdn.com/${codeISO.toLowerCase()}.svg`}
              alt="flag"
              className="w-16"
            ></img>
          </div>
          <p className="ml-2">You guessed: {correctCountry.countryName}</p>
        </div>
        <p className="text-3xl mt-6">Number of attempts: {countOfAttempt}</p>
        <button
          className="text-2xl font-medium mt-10 px-6 py-3 bg-red-200 rounded-sm hover:cursor-pointer tranistion-all duration-300 ease-out"
          onClick={() => handleClickButton()}
        >
          GG
        </button>
      </section>
    </>
  );
}

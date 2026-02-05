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
      <section className="max-w-[900px] w-full max-h-[442px] h-full flex flex-col fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 mx-auto text-black text-xl">
        <div className="bg-white rounded-sm mx-2 px-2 py-4 flex flex-col justify-center items-center">
          <p className="text-2xl sm:text-4xl md:text-5xl text-center font-semibold">
            Congratulations you guessed today’s country correctly!{" "}
          </p>
          <div className="flex items-center mt-4 justify-center bg-[#F2F2F2]/50 p-2 rounded-sm">
            <div>
              <img
                src={`https://flagcdn.com/${codeISO.toLowerCase()}.svg`}
                alt="flag"
                className="w-16"
              ></img>
            </div>
            <p className="ml-2">You guessed: {correctCountry.countryName}</p>
          </div>
          <p className="text-xl mt-2">Number of attempts: {countOfAttempt}</p>
          <button
            className="text-2xl font-medium mt-10 px-20 md:px-16 py-4 bg-[#2BFF00] rounded-sm hover:cursor-pointer tranistion-all hover:bg-[#7AF961] duration-300 ease-out"
            onClick={() => handleClickButton()}
          >
            GG
          </button>
        </div>
      </section>
    </>
  );
}

import { memo } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/useReduxType";
import { setCountriesList } from "../counters/countriesListSlice";
import { resetCountOfAttempt } from "../counters/countOfAttempSlice";
import { setCountryData } from "../counters/countrySlice";

type WinPopupProps = {
  setWinnerPopupIsVisible: (value: boolean) => void;
};

export default function WinnerPopup({
  setWinnerPopupIsVisible,
}: WinPopupProps) {
  const handleClickButton = () => {
    if (setWinnerPopupIsVisible) {
      setWinnerPopupIsVisible(false);
      dispatch(setCountriesList([]));
      dispatch(setCountryData(null));
      dispatch(resetCountOfAttempt());
    }
  };

  const dispatch = useAppDispatch();
  const countOfAttempt = useAppSelector((state) => state.countOfAttempt);

  return (
    <section>
      <p className="lg:text-4xl mt-10">Liczba prób: {countOfAttempt}</p>
      <button onClick={() => handleClickButton}>Ok</button>
    </section>
  );
}

import { memo } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/useReduxType";
import { setCountriesList } from "../counters/countriesListSlice";
import { resetCountOfAttempt } from "../counters/countOfAttempSlice";
import { setCountryData } from "../counters/countrySlice";

type PopupProps = {
  setWinnerPopupIsVisible?: (value: boolean) => void;
  setHelpPopupIsVisible?: (value: boolean) => void;
  title: string;
  textContent: string;
  buttonText: string;
};

const Popup = memo(function Popup({
  setWinnerPopupIsVisible,
  setHelpPopupIsVisible,
  ...props
}: PopupProps) {
  const dispatch = useAppDispatch();
  const countOfAttempt = useAppSelector((state) => state.countOfAttempt);

  const handleClickButton = () => {
    if (setWinnerPopupIsVisible) {
      setWinnerPopupIsVisible(false);
      dispatch(setCountriesList([]));
      dispatch(setCountryData(null));
      dispatch(resetCountOfAttempt());
    }
    if (setHelpPopupIsVisible) setHelpPopupIsVisible(false);
  };

  const arr = props.textContent.split(",");
  arr.forEach((item: string) => {
    let t = item.split("-");
    console.log(t);
  });

  return <div>{setHelpPopupIsVisible && <div>d</div>}</div>;
});

export default Popup;

{
  /* <div className="z-40 flex bg-black/50 items-center justify-center top-0 left-0 fixed w-full h-full p-4">
      <div className="w-full lg:w-2/3 flex flex-col justify-center items-center min-h-96 p-8 bg-white/90 rounded-lg">
        <h2 className="lg:text-6xl font-bold ">{props.title}</h2>
        {setHelpPopupIsVisible &&
          arr.map((item: string, index: number) => {
            let titleAndContent = item.split("-");
            return (
              <p key={index} className="w-full lg:text-4xl lg:mt-8">
                <span className="font-semibold">{titleAndContent[0]}</span> -
                {titleAndContent[1]}
              </p>
            );
          })}
        {!setHelpPopupIsVisible && (
          <p className="w-full lg:text-4xl text-center mt-4">
            {props.textContent}
          </p>
        )}
        {setWinnerPopupIsVisible && (
          <p className="lg:text-4xl mt-10">Liczba prób: {countOfAttempt}</p>
        )}
        <button
          onClick={() => handleClickButton()}
          className="bg-red-200 hover:bg-red-300 p-4 cursor-pointer hover:scale-105 ease-in duration-300 w-40 mt-4 rounded-xs lg:text-4xl font-bold">
          {props.buttonText}
        </button>
      </div>
    </div> */
}

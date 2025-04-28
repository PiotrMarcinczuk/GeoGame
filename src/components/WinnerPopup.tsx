import { memo } from "react";
import { useDispatch } from "react-redux";
import { setCountriesList } from "../counters/countriesListSlice";
const WinnerPopup = memo(function WinnerPopup({ setIsPopupVisible }: any) {
  const dispatch = useDispatch();
  return (
    <div className="z-40 flex items-center justify-center top-0 fixed w-full h-full">
      <div className="flex flex-col justify-center items-center h-96 p-8 bg-white/90 rounded-xs">
        <h2 className="text-6xl text-center">Gratulacje !!!</h2>
        <p className="text-4xl text-center mt-10">
          Udało ci się odgadnąć wylosowane państwo
        </p>
        <button
          onClick={() => {
            dispatch(setCountriesList([]));
          }}
          className="bg-red-200 p-10 cursor-pointer w-40 mt-4 rounded-xs">
          GG
        </button>
      </div>
    </div>
  );
});

export default WinnerPopup;

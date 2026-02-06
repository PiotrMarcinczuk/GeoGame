import green from "../assets/img/h1.svg";
import orange from "../assets/img/h2.svg";
import red from "../assets/img/h3.svg";

import { GameHeaderProps } from "./GameHeader.types";

export default function GameHeader({ setHelpPopupIsVisible }: GameHeaderProps) {
  return (
    <>
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
    </>
  );
}

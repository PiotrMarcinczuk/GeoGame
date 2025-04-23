import { useContext } from "react";
import pl from "../assets/img/pl.png";
import { useSelector } from "react-redux";
export default function Country({ ...data }) {
  return (
    <div className="flex w-full justify-center mt-10">
      <div className="text-center mr-20">
        <h1 className="text-3xl">Państwo</h1>
        <hr className="bg-white w-full mt-4" />
        <div className="bg-red-100 mt-2 h-25">
          <img src={pl} alt="flag"></img>
          <p className="text-3xl">Polska</p>
        </div>
      </div>
      <div className="text-center mx-2">
        <h2 className="text-3xl">Eksport</h2>
        <hr className="bg-white w-full mt-4" />
        <div className="bg-red-100 mt-2 h-25 flex items-center justify-center text-3xl">
          <p>{data ? data["NE.EXP.GNFS.ZS"] : "N/A"}%</p>
        </div>
      </div>
      <div className="text-center mx-2">
        <h2 className="text-3xl">Import</h2>
        <hr className="bg-white w-full mt-4" />
        <div className="bg-red-100 mt-2 h-25 flex items-center justify-center text-3xl">
          <p>{data ? data["NE.IMP.GNFS.ZS"] : "N/A"}%</p>
        </div>
      </div>
      <div className="text-center mx-2">
        <h2 className="text-3xl text-nowrap">PKB per capita</h2>
        <hr className="bg-white w-full mt-4" />
        <div className="bg-red-100 mt-2 h-25 flex items-center justify-center text-3xl">
          <p>77%</p>
        </div>
      </div>
      <div className="text-center mx-2">
        <h2 className="text-3xl">Urbanizacja</h2>
        <hr className="bg-white w-full mt-4" />
        <div className="bg-red-100 mt-2 h-25 flex items-center justify-center text-3xl">
          <p>{data ? data["EG.ELC.ACCS.UR.ZS"] : "N/A"}%</p>
        </div>
      </div>
      <div className="text-center mx-2">
        <h2 className="text-3xl">Zalesienie</h2>
        <hr className="bg-white w-full mt-4" />
        <div className="bg-red-100 mt-2 h-25 flex items-center justify-center text-3xl">
          <p>77%</p>
        </div>
      </div>
      <div className="text-center mx-2">
        <h2 className="text-3xl">Surowce</h2>
        <hr className="bg-white w-full mt-4" />
        <div className="bg-red-100 mt-2 h-25 flex items-center justify-center text-3xl">
          <p>77%</p>
        </div>
      </div>
    </div>
  );
}

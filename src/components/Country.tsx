import { useContext } from "react";
import pl from "../assets/img/pl.png";
import { useSelector } from "react-redux";
export default function Country({ country, isFirst }: any) {
  const formatToMilions = (value: number) => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(2) + "M";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(2) + "K";
    } else {
      return value.toString();
    }
  };
  const countryName = country.countryName;
  const codeISO = country["NE.EXP.GNFS.ZS"][4].country.id;
  const exportData = country["NE.EXP.GNFS.ZS"][4].value?.toFixed(2);
  const importData = country["NE.IMP.GNFS.ZS"][4].value?.toFixed(2);
  const electricityData = country["EG.ELC.ACCS.UR.ZS"][4].value?.toFixed(2);
  const gdpData = country["NY.GDP.PCAP.CD"][4].value?.toFixed(0);
  const forestationData = country["AG.LND.FRST.ZS"][4].value?.toFixed(2);
  const resourcesData = country["TX.VAL.MMTL.ZS.UN"][4].value?.toFixed(2);
  const urbanPData = formatToMilions(
    Number(country["SP.URB.TOTL"][4].value?.toFixed(0))
  );

  return (
    <div className="flex w-full justify-center mt-2">
      <div className="text-center mr-20 w-[150px]">
        {isFirst && (
          <>
            <h1 className="text-3xl">Państwo</h1>
            <hr className="bg-white w-full mt-4" />
          </>
        )}
        <div className="bg-red-100 mt-2 flex flex-col items-center h-32">
          <img
            src={`https://flagcdn.com/${codeISO.toLowerCase()}.svg`}
            alt="flag"
            className="w-24 h-20 py-1"></img>
          <p className="text-xl">{countryName}</p>
        </div>
      </div>
      <div className="text-center mx-2 w-[110px]">
        {isFirst && (
          <>
            <h2 className="text-3xl">Eksport</h2>
            <hr className="bg-white w-full mt-4" />
          </>
        )}
        <div className="bg-red-100 mt-2 h-32 flex items-center justify-center text-3xl">
          <p>{exportData ? exportData + "%" : "N/A"}</p>
        </div>
      </div>
      <div className="text-center mx-2 w-[110px]">
        {isFirst && (
          <>
            <h2 className="text-3xl">Import</h2>
            <hr className="bg-white w-full mt-4" />
          </>
        )}
        <div className="bg-red-100 mt-2 h-32 flex items-center justify-center text-3xl">
          <p>{importData ? importData + "%" : "N/A"}</p>
        </div>
      </div>
      <div className="text-center mx-2 w-[200px]">
        {isFirst && (
          <>
            <h2 className="text-3xl text-nowrap">PKB per capita</h2>
            <hr className="bg-white w-full mt-4" />
          </>
        )}
        <div className="bg-red-100 mt-2 h-32 flex items-center justify-center text-3xl">
          <p>{gdpData ? gdpData + " $" : "N/A"}</p>
        </div>
      </div>
      <div className="text-center mx-2 w-[210px]">
        {isFirst && (
          <>
            <h2 className="text-3xl">Elektryczność</h2>
            <hr className="bg-white w-full mt-4" />
          </>
        )}
        <div className="bg-red-100 mt-2 h-32 flex items-center justify-center text-3xl">
          <p>{electricityData ? electricityData + "%" : "N/A"}</p>
        </div>
      </div>
      <div className="text-center mx-2 w-[140px]">
        {isFirst && (
          <>
            <h2 className="text-3xl">Zalesienie</h2>
            <hr className="bg-white w-full mt-4" />
          </>
        )}
        <div className="bg-red-100 mt-2 h-32 flex items-center justify-center text-3xl">
          <p>{forestationData ? forestationData + "%" : "N/A"}</p>
        </div>
      </div>
      <div className="text-center mx-2 w-[120px]">
        {isFirst && (
          <>
            <h2 className="text-3xl">Surowce</h2>
            <hr className="bg-white w-full mt-4" />
          </>
        )}
        <div className="bg-red-100 mt-2 h-32 flex items-center justify-center text-3xl">
          <p>{resourcesData ? resourcesData + "%" : "N/A"}</p>
        </div>
      </div>
      <div className="text-center mx-2 w-[120px]">
        {isFirst && (
          <>
            <h2 className="text-3xl">Ludność miejska</h2>
            <hr className="bg-white w-full mt-4" />
          </>
        )}
        <div className="bg-red-100 mt-2 h-32 flex items-center justify-center text-3xl">
          <p>{urbanPData ? urbanPData : "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

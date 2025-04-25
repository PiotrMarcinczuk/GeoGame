import { useMemo, memo } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Country = memo(function Country({ country, isFirst }: any) {
  const data = useSelector((state: any) => state.correctCountry);

  const formatToMilions = useMemo(() => {
    return (value: number) => {
      if (value >= 1000000) {
        return (value / 1000000).toFixed(2) + "M";
      } else if (value >= 1000) {
        return (value / 1000).toFixed(2) + "K";
      } else {
        return value.toString();
      }
    };
  }, []);

  const formatGDP = useMemo(() => {
    return (value: number) => {
      let strValue = String(value);
      if (strValue.length > 4 && strValue.length < 6) {
        strValue =
          strValue.slice(0, 2) + " " + strValue.slice(2, strValue.length);
      }
      if (strValue.length >= 6) {
        strValue =
          strValue.slice(0, 3) + " " + strValue.slice(3, strValue.length);
      }
      return strValue;
    };
  }, []);
  const countryName = country.countryName;
  if (!country["NE.EXP.GNFS.ZS"]) return null;

  const codeISO = country["NE.EXP.GNFS.ZS"][4].country.id;
  const exportData = country["NE.EXP.GNFS.ZS"][4].value?.toFixed(1);
  const importData = country["NE.IMP.GNFS.ZS"][4].value?.toFixed(1);
  const electricityData = country["EG.ELC.ACCS.UR.ZS"][4].value?.toFixed(1);
  const gdpData = formatGDP(
    Number(country["NY.GDP.PCAP.CD"][4].value?.toFixed(0))
  );
  const forestationData = country["AG.LND.FRST.ZS"][4].value?.toFixed(1);
  const resourcesData = country["TX.VAL.MMTL.ZS.UN"][4].value?.toFixed(1);
  const urbanPData = formatToMilions(
    Number(country["SP.URB.TOTL"][4].value?.toFixed(0))
  );

  return (
    <div className="flex w-full justify-center mt-2">
      <div className="text-center w-full mr-10">
        {isFirst && (
          <>
            <h1 className="text-3xl">Państwo</h1>
            <hr className="bg-white w-full mt-4" />
          </>
        )}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 10000, y: 0 }}
          transition={{ duration: 2 }}
          className="bg-red-100 mt-2 flex flex-col items-center h-32">
          <img
            src={`https://flagcdn.com/${codeISO.toLowerCase()}.svg`}
            alt="flag"
            className="w-22 h-16 py-1"></img>
          <p className="text-xl">{countryName}</p>
        </motion.div>
      </div>
      <div className="flex -mx-2">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 100, y: 0 }}
          transition={{ duration: 4 }}
          className="text-center mx-2 w-[110px]">
          {isFirst && (
            <>
              <h2 className="text-3xl">Eksport</h2>
              <hr className="bg-white w-full mt-4" />
            </>
          )}
          <div className="bg-red-100 mt-2 h-32 flex items-center justify-center text-3xl">
            <p>{exportData ? exportData + "%" : "N/A"}</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 100, y: 0 }}
          transition={{ duration: 6 }}
          className="text-center mx-2 w-[110px]">
          {isFirst && (
            <>
              <h2 className="text-3xl">Import</h2>
              <hr className="bg-white w-full mt-4" />
            </>
          )}
          <div className="bg-red-100 mt-2 h-32 flex items-center justify-center text-3xl">
            <p>{importData ? importData + "%" : "N/A"}</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 100, y: 0 }}
          transition={{ duration: 8 }}
          className="text-center mx-2 w-[200px]">
          {isFirst && (
            <>
              <h2 className="text-3xl text-nowrap">PKB per capita</h2>
              <hr className="bg-white w-full mt-4" />
            </>
          )}
          <div className="bg-red-100 mt-2 h-32 flex items-center justify-center text-3xl">
            <p>{gdpData ? gdpData + " $" : "N/A"}</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 100, y: 0 }}
          transition={{ duration: 2.1 }}
          className="text-center mx-2 w-[210px]">
          {isFirst && (
            <>
              <h2 className="text-3xl">Elektryczność</h2>
              <hr className="bg-white w-full mt-4" />
            </>
          )}
          <div className="bg-red-100 mt-2 h-32 flex items-center justify-center text-3xl">
            <p>{electricityData ? electricityData + "%" : "N/A"}</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 100, y: 0 }}
          transition={{ duration: 2.4 }}
          className="text-center mx-2 w-[140px]">
          {isFirst && (
            <>
              <h2 className="text-3xl">Zalesienie</h2>
              <hr className="bg-white w-full mt-4" />
            </>
          )}
          <div className="bg-red-100 mt-2 h-32 flex items-center justify-center text-3xl">
            <p>{forestationData ? forestationData + "%" : "N/A"}</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 100, y: 0 }}
          transition={{ duration: 2.7 }}
          className="text-center mx-2 w-[120px]">
          {isFirst && (
            <>
              <h2 className="text-3xl">Surowce</h2>
              <hr className="bg-white w-full mt-4" />
            </>
          )}
          <div className="bg-red-100 mt-2 h-32 flex items-center justify-center text-3xl">
            <p>{resourcesData ? resourcesData + "%" : "N/A"}</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 100, y: 0 }}
          transition={{ duration: 3.0 }}
          className="text-center mx-2 w-[230px]">
          {isFirst && (
            <>
              <h2 className="text-3xl text-nowrap">Ludność miejska</h2>
              <hr className="bg-white w-full mt-4" />
            </>
          )}
          <div className="bg-red-100 mt-2 h-32 flex items-center justify-center text-3xl">
            <p>{urbanPData ? urbanPData : "N/A"}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
});
export default Country;

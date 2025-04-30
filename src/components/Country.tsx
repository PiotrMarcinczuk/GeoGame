import { memo } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Format from "../utils/Format";
import { CountryData } from "../interfaces/stats";
import { RootState } from "../app/store";
type CountryProps = {
  country: CountryData;
  itemsDelay: number;
};

const Country = memo(function Country({ country, itemsDelay }: CountryProps) {
  const { formatToMilions, formatGDP, compareCountries } = Format();
  const correctCountry = useSelector(
    (state: RootState): CountryData => state.correctCountry
  );

  const correctCodeISO = correctCountry["NE.EXP.GNFS.ZS"][4].country.id;
  const correctExportData =
    correctCountry["NE.EXP.GNFS.ZS"][4].value?.toFixed(0);
  const correctImportData =
    correctCountry["NE.IMP.GNFS.ZS"][4].value?.toFixed(0);
  const correctElectricityData =
    correctCountry["EG.ELC.ACCS.UR.ZS"][4].value?.toFixed(0);
  const correctGdpData = formatGDP(
    Number(correctCountry["NY.GDP.PCAP.CD"][4].value?.toFixed(0))
  );
  const correctForestationData =
    correctCountry["AG.LND.FRST.ZS"][4].value?.toFixed(0);
  const correctResourcesData =
    correctCountry["TX.VAL.MMTL.ZS.UN"][4].value?.toFixed(0);
  const correctUrbanPDataBeforeFormat = correctCountry["SP.URB.TOTL"][4].value;

  const countryName = country.countryName;
  if (!country["NE.EXP.GNFS.ZS"]) return null;

  const codeISO = country["NE.EXP.GNFS.ZS"][4].country.id;
  const exportData = country["NE.EXP.GNFS.ZS"][4].value?.toFixed(0);
  const importData = country["NE.IMP.GNFS.ZS"][4].value?.toFixed(0);
  const electricityData = country["EG.ELC.ACCS.UR.ZS"][4].value?.toFixed(0);
  const gdpData = formatGDP(
    Number(country["NY.GDP.PCAP.CD"][4].value?.toFixed(0))
  );
  const forestationData = country["AG.LND.FRST.ZS"][4].value?.toFixed(0);
  const resourcesData = country["TX.VAL.MMTL.ZS.UN"][4].value?.toFixed(0);
  const urbanPDataBeforeFormat = country["SP.URB.TOTL"][4].value || 0;
  const urbanPData = formatToMilions(Number(urbanPDataBeforeFormat.toFixed(0)));

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: itemsDelay, // delay between children
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.li
      initial="hidden"
      animate="visible"
      variants={listVariants}
      className="w-full flex justify-between font-semibold mt-2">
      <motion.div
        variants={itemVariants}
        className="text-center px-2 mr-3 w-4/30">
        {/* {isFirst && (
          <>
            <h1 className="text-3xl">Państwo</h1>
            <hr className="bg-white w-full mt-4" />
          </>
        )} */}
        <div
          className={`${
            codeISO === correctCodeISO
              ? "bg-custom-green/65"
              : "bg-custom-red/65"
          } mt-2 flex flex-col items-center h-32 border-1 border-white rounded-xs`}>
          <img
            src={`https://flagcdn.com/${codeISO.toLowerCase()}.svg`}
            alt="flag"
            className="w-22 h-16 py-1"></img>
          <p className="text-xl">{countryName}</p>
        </div>
      </motion.div>
      <motion.div variants={itemVariants} className="text-center w-2/30">
        {/* {isFirst && (
          <>
            <h2 className="text-3xl">Eksport</h2>
            <hr className="bg-white w-full mt-4" />
          </>
        )} */}
        <div
          className={`${compareCountries(
            Number(exportData),
            Number(correctExportData)
          )} mt-2 h-32 flex items-center justify-center text-3xl border-1 border-white rounded-xs`}>
          <p>{exportData ? exportData + "%" : "N/A"}</p>
        </div>
      </motion.div>
      <motion.div variants={itemVariants} className="text-center w-2/30">
        {/* {isFirst && (
          <>
            <h2 className="text-3xl">Import</h2>
            <hr className="bg-white w-full mt-4" />
          </>
        )} */}
        <div
          className={`${compareCountries(
            Number(importData),
            Number(correctImportData)
          )} mt-2 h-32 flex items-center justify-center text-3xl border-1 border-white rounded-xs`}>
          <p>{importData ? importData + "%" : "N/A"}</p>
        </div>
      </motion.div>
      <motion.div variants={itemVariants} className="text-center w-4/30">
        {/* {isFirst && (
          <>
            <h2 className="text-3xl text-nowrap">PKB per capita</h2>
            <hr className="bg-white w-full mt-4" />
          </>
        )} */}
        <div
          className={`${compareCountries(
            Number(gdpData.replace(/\s+/g, "")),
            Number(correctGdpData.replace(/\s+/g, ""))
          )} mt-2 h-32 flex items-center justify-center text-3xl border-1 border-white rounded-xs`}>
          <p>{gdpData ? gdpData + " $" : "N/A"}</p>
        </div>
      </motion.div>
      <motion.div variants={itemVariants} className="text-center w-4/30">
        {/* {isFirst && (
          <>
            <h2 className="text-3xl ">Elektryczność</h2>
            <hr className="bg-white w-full mt-4" />
          </>
        )} */}
        <div
          className={`${compareCountries(
            Number(electricityData),
            Number(correctElectricityData)
          )} mt-2 h-32 flex items-center justify-center text-3xl border-1 border-white rounded-xs`}>
          <p>{electricityData ? electricityData + "%" : "N/A"}</p>
        </div>
      </motion.div>
      <motion.div variants={itemVariants} className="text-center w-3/30">
        {/* {isFirst && (
          <>
            <h2 className="text-3xl">Zalesienie</h2>
            <hr className="bg-white w-full mt-4" />
          </>
        )} */}
        <div
          className={`${compareCountries(
            Number(forestationData),
            Number(correctForestationData)
          )} mt-2 h-32 flex items-center justify-center text-3xl border-1 border-white rounded-xs`}>
          <p>{forestationData ? forestationData + "%" : "N/A"}</p>
        </div>
      </motion.div>
      <motion.div variants={itemVariants} className="text-center w-3/30">
        {/* {isFirst && (
          <>
            <h2 className="text-3xl">Surowce</h2>
            <hr className="bg-white w-full mt-4" />
          </>
        )} */}
        <div
          className={`${compareCountries(
            Number(resourcesData),
            Number(correctResourcesData)
          )} mt-2 h-32 flex items-center justify-center text-3xl border-1 border-white rounded-xs`}>
          <p>{resourcesData ? resourcesData + "%" : "N/A"}</p>
        </div>
      </motion.div>
      <motion.div variants={itemVariants} className="text-center  w-5/30">
        {/* {isFirst && (
          <>
            <h2 className="text-3xl ">Ludność miejska</h2>
            <hr className="bg-white w-full mt-4" />
          </>
        )} */}
        <div
          className={`${compareCountries(
            Number(urbanPDataBeforeFormat),
            Number(correctUrbanPDataBeforeFormat)
          )} mt-2 h-32 flex items-center justify-center text-3xl border-1 border-white rounded-xs`}>
          <p>{urbanPData ? urbanPData : "N/A"}</p>
        </div>
      </motion.div>
    </motion.li>
  );
});
export default Country;

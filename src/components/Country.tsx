import { memo } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Format from "../utils/Format";
import { CountryData } from "../interfaces/stats";
import { RootState } from "../app/store";
type CountryProps = {
  country: CountryData;
  itemsDelay: number;
  isFirst?: boolean;
};

const Country = memo(function Country({
  country,
  itemsDelay,
  isFirst,
}: CountryProps) {
  const { formatToMilions, formatGDP, compareCountries } = Format();
  const correctCountry = useSelector(
    (state: RootState): CountryData => state.correctCountry
  );

  const correctCodeISO = correctCountry["AG.LND.FRST.ZS"][0].country.id;
  const correctExportData =
    correctCountry["EN.URB.LCTY.UR.ZS"][0].value?.toFixed(0);
  const correctImportData =
    correctCountry["NE.IMP.GNFS.ZS"][0].value?.toFixed(0);
  const correctElectricityData =
    correctCountry["EG.ELC.ACCS.UR.ZS"][0].value?.toFixed(0);
  const correctGdpData = formatGDP(
    Number(correctCountry["NY.GDP.PCAP.CD"][0].value?.toFixed(0))
  );
  const correctForestationData =
    correctCountry["AG.LND.FRST.ZS"][0].value?.toFixed(0);
  const correctResourcesData =
    correctCountry["TX.VAL.MMTL.ZS.UN"][0].value?.toFixed(0);
  const correctUrbanPDataBeforeFormat = correctCountry["SP.URB.TOTL"][0].value;

  const countryName = country.countryName;
  if (!country["EN.URB.LCTY.UR.ZS"]) return null;

  const codeISO = country["EN.URB.LCTY.UR.ZS"][0].country.id;
  const largestCityPopulation =
    country["EN.URB.LCTY.UR.ZS"][0].value?.toFixed(0);
  const importData = country["NE.IMP.GNFS.ZS"][0].value?.toFixed(0);
  const electricityData = country["EG.ELC.ACCS.UR.ZS"][0].value?.toFixed(0);
  const gdpData = formatGDP(
    Number(country["NY.GDP.PCAP.CD"][0].value?.toFixed(0))
  );
  const forestationData = country["AG.LND.FRST.ZS"][0].value?.toFixed(0);
  const resourcesData = country["TX.VAL.MMTL.ZS.UN"][0].value?.toFixed(0);
  const urbanPDataBeforeFormat = country["SP.URB.TOTL"][0].value || 0;
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
        className="text-center px-2 mr-3 w-4/30 relative">
        <div
          className={`${
            isFirst ? "mt-12" : "mt-2"
          } px-2 flex flex-col items-center h-26 lg:h-32 border-1 border-white rounded-xs bg-gray-300/20`}>
          {isFirst && (
            <div className="absolute top-0 w-full px-2">
              <h2 className="text-nowrap text-center hidden lg:block">
                Państwo
              </h2>
              <h2 className="block lg:hidden">🚢</h2>
              <hr className="bg-white w- mt-4" />
            </div>
          )}
          <img
            src={`https://flagcdn.com/${codeISO.toLowerCase()}.svg`}
            alt="flag"
            className="w-22 h-16 py-1"></img>
          <p className="lg:text-xl">{countryName}</p>
        </div>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="text-center w-4/30 relative">
        {isFirst && (
          <div className="absolute top-0 w-full left-1/2 -translate-x-1/2">
            <h2 className="text-nowrap text-center hidden lg:block">
              Największe miasto
            </h2>
            <h2 className="block lg:hidden">🚢</h2>
            <hr className="bg-white w-full mt-4" />
          </div>
        )}
        <div
          className={`${compareCountries(
            Number(largestCityPopulation),
            Number(correctExportData)
          )} ${
            isFirst ? "mt-12" : "mt-2"
          } h-20 lg:h-32 flex items-center justify-center px-1 lg:px-0 lg:text-3xl border-1 border-white rounded-xs`}>
          <p>{largestCityPopulation ? largestCityPopulation + "%" : "N/A"}</p>
        </div>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="text-center lg:w-2/30 relative">
        {isFirst && (
          <div className="absolute top-0 w-full left-1/2 -translate-x-1/2">
            <h2 className="text-nowrap text-center hidden lg:block">Import</h2>
            <h2 className="block lg:hidden">🚢</h2>
            <hr className="bg-white w-full mt-4" />
          </div>
        )}
        <div
          className={`${compareCountries(
            Number(importData),
            Number(correctImportData)
          )} ${
            isFirst ? "mt-12" : "mt-2"
          } h-20 lg:h-32 flex items-center justify-center px-1 lg:px-0 lg:text-3xl border-1 border-white rounded-xs`}>
          <p>{importData ? importData + "%" : "N/A"}</p>
        </div>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="text-center lg:w-4/30 relative">
        {isFirst && (
          <div className="absolute top-0 w-full left-1/2 -translate-x-1/2">
            <h2 className="text-nowrap text-center hidden lg:block">
              PKB per capita
            </h2>
            <h2 className="block lg:hidden">💰</h2>
            <hr className="bg-white w-full mt-4" />
          </div>
        )}
        <div
          className={`${compareCountries(
            Number(gdpData && gdpData.replace(/\s+/g, "")),
            Number(correctGdpData && correctGdpData.replace(/\s+/g, ""))
          )} ${
            isFirst ? "mt-12" : "mt-2"
          } h-20 lg:h-32 flex items-center justify-center px-1 lg:px-0 lg:text-3xl border-1 border-white rounded-xs`}>
          <p>{gdpData ? gdpData + " $" : "N/A"}</p>
        </div>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="text-center lg:w-4/30 relative">
        {isFirst && (
          <div className="absolute top-0 w-full left-1/2 -translate-x-1/2">
            <h2 className="text-nowrap text-center hidden lg:block">
              Elektryczność
            </h2>
            <h2 className="block lg:hidden">⚡</h2>
            <hr className="bg-white w-full mt-4" />
          </div>
        )}
        <div
          className={`${compareCountries(
            Number(electricityData),
            Number(correctElectricityData)
          )} ${
            isFirst ? "mt-12" : "mt-2"
          } h-20 lg:h-32 flex items-center justify-center px-1 lg:px-0 lg:text-3xl border-1 border-white rounded-xs`}>
          <p>{electricityData ? electricityData + "%" : "N/A"}</p>
        </div>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="text-center lg:w-3/30 relative">
        {isFirst && (
          <div className="absolute top-0 w-full left-1/2 -translate-x-1/2">
            <h2 className="text-nowrap text-center hidden lg:block">
              Zalesienie
            </h2>
            <h2 className="block lg:hidden">🌲</h2>
            <hr className="bg-white w-full mt-4" />
          </div>
        )}
        <div
          className={`${compareCountries(
            Number(forestationData),
            Number(correctForestationData)
          )} ${
            isFirst ? "mt-12" : "mt-2"
          } h-20 lg:h-32 flex items-center justify-center px-1 lg:px-0 lg:text-3xl border-1 border-white rounded-xs`}>
          <p>{forestationData ? forestationData + "%" : "N/A"}</p>
        </div>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="text-center lg:w-3/30 relative">
        {isFirst && (
          <div className="absolute top-0 w-full left-1/2 -translate-x-1/2">
            <h2 className="text-nowrap text-center hidden lg:block">Surowce</h2>
            <h2 className="block lg:hidden">⛏️</h2>
            <hr className="bg-white w-full mt-4" />
          </div>
        )}
        <div
          className={`${compareCountries(
            Number(resourcesData),
            Number(correctResourcesData)
          )} ${
            isFirst ? "mt-12" : "mt-2"
          } h-20 lg:h-32 flex items-center justify-center px-1 lg:px-0 lg:text-3xl border-1 border-white rounded-xs`}>
          <p>{resourcesData ? resourcesData + "%" : "N/A"}</p>
        </div>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="text-center lg:w-5/30 relative">
        {isFirst && (
          <div className="absolute top-0 w-full left-1/2 -translate-x-1/2">
            <h2 className="text-nowrap text-center hidden lg:block">
              Ludność miejska
            </h2>
            <h2 className="block lg:hidden">🏢</h2>
            <hr className="bg-white w-full mt-4" />
          </div>
        )}
        <div
          className={`${compareCountries(
            Number(urbanPDataBeforeFormat),
            Number(correctUrbanPDataBeforeFormat)
          )} ${
            isFirst ? "mt-12" : "mt-2"
          } h-20 lg:h-32 flex items-center justify-center px-1 lg:px-0 lg:text-3xl border-1 border-white rounded-xs`}>
          <p>{urbanPData ? urbanPData : "N/A"}</p>
        </div>
      </motion.div>
    </motion.li>
  );
});
export default Country;

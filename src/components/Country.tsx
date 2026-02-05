import { memo, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../interfaces/shared.types";

import { motion, AnimatePresence } from "framer-motion";

import Format from "../utils/Format";

import { CountryData } from "../interfaces/shared.types";
import { CountryProps } from "./Country.types";

const Country = memo(function Country({ country, itemsDelay }: CountryProps) {
  const {
    checkCountryNameIsLong,
    formatToMilions,
    formatGDP,
    compareCountries,
  } = Format();
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const correctCountry = useSelector(
    (state: RootState): CountryData => state.correctCountry,
  );

  const correctExportData =
    correctCountry["EN.URB.LCTY.UR.ZS"][0].value?.toFixed(0);
  const correctImportData =
    correctCountry["NE.IMP.GNFS.ZS"][0].value?.toFixed(0);
  const correctGdpData = formatGDP(
    Number(correctCountry["NY.GDP.PCAP.CD"][0].value?.toFixed(0)),
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
  const gdpData = formatGDP(
    Number(country["NY.GDP.PCAP.CD"][0].value?.toFixed(0)),
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

  const countryNameVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "tween", duration: 0.25 },
    },
    exit: {
      opacity: 0,
      x: -200,
      transition: { type: "tween", duration: 0.25 },
    },
  };

  console.log(activeCountry);
  return (
    <motion.li
      initial="hidden"
      animate="visible"
      variants={listVariants}
      className="w-full mt-4 flex text-28 mx-2 lg:mx-0 font-medium"
    >
      <div className="flex justify-between w-full items-center">
        <motion.div
          variants={itemVariants}
          onHoverStart={() => setActiveCountry(countryName)}
          onClick={() =>
            setActiveCountry((prev) => (prev === null ? countryName : null))
          }
          onHoverEnd={() => setActiveCountry(null)}
          className="relative bg-white/40 flex flex-col justify-center items-center px-2 py-2 w-[111px] min-h-[71px]"
        >
          <img
            src={`https://flagcdn.com/${codeISO.toLowerCase()}.svg`}
            alt="flag"
          ></img>
          <AnimatePresence>
            {activeCountry === countryName && (
              <motion.div
                key={countryName}
                variants={countryNameVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex text-xl flex-col items-center justify-center bg-white rounded-xs px-4 py-1 absolute top-0 left-0 text-nowrap h-full min-w-full"
              >
                {countryName}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <motion.div variants={itemVariants} className="w-[160px] h-full">
          <div
            className={`p-4 h-full rounded-xs flex items-center justify-center ${compareCountries(
              Number(largestCityPopulation),
              Number(correctExportData),
            )} `}
          >
            <p className="text-center">
              {largestCityPopulation ? largestCityPopulation + "%" : "N/A"}
            </p>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="w-[90px] h-full">
          <div
            className={`p-4 h-full rounded-xs flex items-center justify-center ${compareCountries(
              Number(importData),
              Number(correctImportData),
            )} `}
          >
            <p className="text-center">
              {importData ? importData + "%" : "N/A"}
            </p>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="w-[203px] h-full">
          <div
            className={`h-full p-4 rounded-xs flex items-center justify-center ${compareCountries(
              Number(gdpData && gdpData.replace(/\s+/g, "")),
              Number(correctGdpData && correctGdpData.replace(/\s+/g, "")),
            )} `}
          >
            <p className="text-center">{gdpData ? gdpData + " $" : "N/A"}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="w-[179px] h-full">
          <div
            className={`h-full p-4 rounded-xs flex items-center justify-center ${compareCountries(
              Number(forestationData),
              Number(correctForestationData),
            )} `}
          >
            <p className="text-center">
              {forestationData ? forestationData + "%" : "N/A"}
            </p>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="w-[242px] h-full">
          <div
            className={`h-full p-4 rounded-xs flex items-center justify-center ${compareCountries(
              Number(resourcesData),
              Number(correctResourcesData),
            )} `}
          >
            <p className="text-center">
              {resourcesData ? resourcesData + "%" : "N/A"}
            </p>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="w-[234px] h-full">
          <div
            className={`h-full p-4 rounded-xs flex items-center justify-center ${compareCountries(
              Number(urbanPDataBeforeFormat),
              Number(correctUrbanPDataBeforeFormat),
            )} `}
          >
            <p className="text-center">{urbanPData ? urbanPData : "N/A"}</p>
          </div>
        </motion.div>
      </div>
    </motion.li>
  );
});
export default Country;

import { memo } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../interfaces/shared.types";

import { motion } from "framer-motion";

import Format from "../utils/Format";

import { CountryData } from "../interfaces/shared.types";
import { CountryProps } from "./Country.types";

const Country = memo(function Country({ country, itemsDelay }: CountryProps) {
  const { formatToMilions, formatGDP, compareCountries } = Format();
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

  return (
    <motion.li
      initial="hidden"
      animate="visible"
      variants={listVariants}
      className="w-full mt-4 flex "
    >
      <div className="flex justify-between w-full items-center">
        <motion.div
          variants={itemVariants}
          className="bg-white/40 flex flex-col justify-center items-center px-2 py-2 w-[8%]"
        >
          <img
            src={`https://flagcdn.com/${codeISO.toLowerCase()}.svg`}
            alt="flag"
            className="w-16"
          ></img>
          <p className="font-medium text-center mt-1">{countryName}</p>
        </motion.div>
        <motion.div variants={itemVariants} className="w-[12%] h-full">
          <div
            className={`p-4 h-full rounded-xs text-28 font-medium flex items-center justify-center ${compareCountries(
              Number(largestCityPopulation),
              Number(correctExportData),
            )} `}
          >
            <p className="text-center">
              {largestCityPopulation ? largestCityPopulation + "%" : "N/A"}
            </p>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="w-[7%] h-full">
          <div
            className={`p-4 h-full rounded-xs text-28 font-medium flex items-center justify-center ${compareCountries(
              Number(importData),
              Number(correctImportData),
            )} `}
          >
            <p className="text-center">
              {importData ? importData + "%" : "N/A"}
            </p>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="w-[14%] h-full">
          <div
            className={`h-full p-4 rounded-xs text-28 font-medium flex items-center justify-center ${compareCountries(
              Number(gdpData && gdpData.replace(/\s+/g, "")),
              Number(correctGdpData && correctGdpData.replace(/\s+/g, "")),
            )} `}
          >
            <p className="text-center">{gdpData ? gdpData + " $" : "N/A"}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="w-[13%] h-full">
          <div
            className={`h-full p-4 rounded-xs text-28 font-medium flex items-center justify-center ${compareCountries(
              Number(forestationData),
              Number(correctForestationData),
            )} `}
          >
            <p className="text-center">
              {forestationData ? forestationData + "%" : "N/A"}
            </p>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="w-[17%] h-full">
          <div
            className={`h-full p-4 rounded-xs text-28 font-medium flex items-center justify-center ${compareCountries(
              Number(resourcesData),
              Number(correctResourcesData),
            )} `}
          >
            <p className="text-center">
              {resourcesData ? resourcesData + "%" : "N/A"}
            </p>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="w-[17%] h-full">
          <div
            className={`h-full p-4 rounded-xs text-28 font-medium flex items-center justify-center ${compareCountries(
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

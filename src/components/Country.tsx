import { memo, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../interfaces/shared.types";

import { motion, AnimatePresence } from "framer-motion";

import Format from "../utils/Format";

import { CountryData } from "../interfaces/shared.types";
import { CountryProps } from "./Country.types";

const Country = memo(function Country({ country, itemsDelay }: CountryProps) {
  const { formatToMillions, formatGDP, compareCountries } = Format();
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const correctCountry = useSelector(
    (state: RootState): CountryData => state.correctCountry,
  );

  // CORRECT
  const correctLargestCityData =
    correctCountry["EN.URB.LCTY.UR.ZS"][0].value?.toFixed(0);
  const correctExportData =
    correctCountry["NE.EXP.GNFS.ZS"][0].value?.toFixed(0);
  const correctGdpData = Number(
    correctCountry["NY.GDP.PCAP.CD"][0].value?.toFixed(0),
  );

  const correctForestationData =
    correctCountry["AG.LND.FRST.ZS"][0].value?.toFixed(0);
  const correctResourcesData =
    correctCountry["TX.VAL.MMTL.ZS.UN"][0].value?.toFixed(0);

  const urbanPCorrectDataBeforeFormat =
    correctCountry["SP.URB.TOTL"][0].value || 0;
  const urbanPCorrectData = Number(urbanPCorrectDataBeforeFormat.toFixed(0));

  // SEARCHED
  const countryName = country.countryName;
  if (!country["EN.URB.LCTY.UR.ZS"]) return null;

  const codeISO = country["EN.URB.LCTY.UR.ZS"][0].country.id;
  const largestCityPopulation =
    country["EN.URB.LCTY.UR.ZS"][0].value?.toFixed(0);
  const exportData = country["NE.EXP.GNFS.ZS"][0].value?.toFixed(0);
  const gdpData = Number(country["NY.GDP.PCAP.CD"][0].value?.toFixed(0));

  const forestationData = country["AG.LND.FRST.ZS"][0].value?.toFixed(0);
  const resourcesData = country["TX.VAL.MMTL.ZS.UN"][0].value?.toFixed(0);
  const urbanPDataBeforeFormat = country["SP.URB.TOTL"][0].value || 0;
  const urbanPData = Number(urbanPDataBeforeFormat.toFixed(0));

  const metrics = [
    {
      value: largestCityPopulation,
      correct: correctLargestCityData,
      content: largestCityPopulation,
      label: "%",
      width: 160,
    },
    {
      value: exportData,
      correct: correctExportData,
      content: exportData,
      label: "%",
      width: 90,
    },
    {
      value: gdpData,
      correct: correctGdpData,
      content: formatGDP(gdpData),
      label: "$",
      width: 203,
    },
    {
      value: forestationData,
      correct: correctForestationData,
      content: forestationData,
      label: "%",
      width: 179,
    },
    {
      value: resourcesData,
      correct: correctResourcesData,
      content: resourcesData,
      label: "%",
      width: 242,
    },
    {
      value: urbanPData,
      correct: urbanPCorrectData,
      content: formatToMillions(urbanPData),
      label: `${urbanPData > 1000000 ? " M" : " K"}`,
      width: 234,
    },
  ];

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
        {metrics.map(({ value, correct, content, label, width }, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`w-[${width}px] h-full`}
          >
            <div
              className={`h-full p-4 rounded-xs flex items-center justify-center ${compareCountries(
                Number(value),
                Number(correct),
              )}`}
            >
              <p className="text-center">
                {content !== undefined && content !== null
                  ? content + label
                  : "N/A"}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.li>
  );
});
export default Country;

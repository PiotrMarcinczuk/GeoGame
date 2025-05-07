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
      className="w-full grid grid-cols-8 gap-1 sm:gap-2 font-semibold relative mt-2">
      <div className="grid grid-cols-8 gap-1 sm:gap-2 w-full col-span-8">
        <motion.div
          variants={itemVariants}
          className="text-center sm:mr-3 relative ">
          <div className="px-2 flex flex-col items-center justify-center h-20 lg:h-32 border-1 border-white/30 md:border-white rounded-xs bg-gray-300/20">
            <img
              src={`https://flagcdn.com/${codeISO.toLowerCase()}.svg`}
              alt="flag"
              className="lg:w-22 lg:h-16 py-1"></img>
            <p className="text-xs lg:text-xl hidden lg:block">{countryName}</p>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="text-center ">
          <div
            className={`${compareCountries(
              Number(largestCityPopulation),
              Number(correctExportData)
            )} h-20 lg:h-32 flex items-center justify-center px-1 lg:px-0 text-sm md:text-base lg:text-3xl border-1 border-white/30 md:border-white rounded-xs`}>
            <p>{largestCityPopulation ? largestCityPopulation + "%" : "N/A"}</p>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="text-center ">
          <div
            className={`${compareCountries(
              Number(importData),
              Number(correctImportData)
            )} h-20 lg:h-32 flex items-center justify-center px-1 lg:px-0 lg:text-3xl border-1 border-white/30 md:border-white rounded-xs`}>
            <p>{importData ? importData + "%" : "N/A"}</p>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="text-center ">
          <div
            className={`${compareCountries(
              Number(gdpData && gdpData.replace(/\s+/g, "")),
              Number(correctGdpData && correctGdpData.replace(/\s+/g, ""))
            )} h-20 lg:h-32 flex md:items-center justify-center px-1 lg:px-0 text-xs md:text-base lg:text-3xl border-1 border-white/30 md:border-white rounded-xs`}>
            <p>{gdpData ? gdpData + " $" : "N/A"}</p>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="text-center ">
          <div
            className={`${compareCountries(
              Number(electricityData),
              Number(correctElectricityData)
            )} h-20 lg:h-32 flex items-center justify-center px-1 lg:px-0 lg:text-3xl border-1 border-white/30 md:border-white rounded-xs`}>
            <p>{electricityData ? electricityData + "%" : "N/A"}</p>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="text-center ">
          <div
            className={`${compareCountries(
              Number(forestationData),
              Number(correctForestationData)
            )} h-20 lg:h-32 flex items-center justify-center px-1 lg:px-0 lg:text-3xl border-1 border-white/30 md:border-white rounded-xs`}>
            <p>{forestationData ? forestationData + "%" : "N/A"}</p>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="text-center ">
          <div
            className={`${compareCountries(
              Number(resourcesData),
              Number(correctResourcesData)
            )} h-20 lg:h-32 flex items-center justify-center px-1 lg:px-0 lg:text-3xl border-1 border-white/30 md:border-white rounded-xs`}>
            <p>{resourcesData ? resourcesData + "%" : "N/A"}</p>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="text-center ">
          <div
            className={`${compareCountries(
              Number(urbanPDataBeforeFormat),
              Number(correctUrbanPDataBeforeFormat)
            )} h-20 lg:h-32 flex items-center justify-center px-1 text-wrap lg:px-0 text-xs md:text-base lg:text-3xl border-1 border-white/30 md:border-white rounded-xs`}>
            <p>{urbanPData ? urbanPData : "N/A"}</p>
          </div>
        </motion.div>
      </div>
    </motion.li>
  );
});
export default Country;

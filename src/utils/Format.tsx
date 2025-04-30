import { set } from "@dotenvx/dotenvx";
import { useMemo } from "react";
import { CountryData } from "../interfaces/stats";
export default function Format() {
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
      if (!strValue) return "N/A";
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

  const compareCountries = (value: number, correctValue: number) => {
    if (value > correctValue) {
      return "bg-custom-yellow/65";
    }
    if (value < correctValue) {
      return "bg-custom-red/65";
    }
    if (value) return "bg-custom-green/65";
    return "bg-custom-red/65";
  };

  const extractCountryData = (obj: CountryData) => ({
    codeISO: obj["NE.EXP.GNFS.ZS"][4].country.id,
    exportData: obj["NE.EXP.GNFS.ZS"][4].value?.toFixed(0),
    importData: obj["NE.IMP.GNFS.ZS"][4].value?.toFixed(0),
    electricityData: obj["EG.ELC.ACCS.UR.ZS"][4].value?.toFixed(0),
    gdpData: formatGDP(Number(obj["NY.GDP.PCAP.CD"][4].value?.toFixed(0))),
    forestationData: obj["AG.LND.FRST.ZS"][4].value?.toFixed(0),
    resourcesData: obj["TX.VAL.MMTL.ZS.UN"][4].value?.toFixed(0),
    urbanPData: obj["SP.URB.TOTL"][4].value,
  });

  const checkIfCountryIsCorrect = (
    countryObj: CountryData,
    correctCountryObj: CountryData,
    itemsDelay: number,
    setIsPopupVisible: (value: boolean) => void
  ) => {
    const countryData = extractCountryData(countryObj);
    const correctCountryData = extractCountryData(correctCountryObj);

    let isMatch = false;
    for (const key in countryData) {
      if (
        countryData[key as keyof typeof countryData] !==
        correctCountryData[key as keyof typeof correctCountryData]
      ) {
        isMatch = false;
        return;
      }
      isMatch = true;
    }

    if (isMatch) {
      setTimeout(() => {
        setIsPopupVisible(true);
      }, itemsDelay * 10000 - itemsDelay * 1300);
    }
    return isMatch;
  };

  return {
    formatToMilions,
    formatGDP,
    compareCountries,
    checkIfCountryIsCorrect,
  };
}

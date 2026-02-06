import { useMemo } from "react";

import { CountryData } from "../interfaces/shared.types";
import { current } from "@reduxjs/toolkit";

export default function Format() {
  const formatToMillions = useMemo(() => {
    return (value: number) => {
      if (value >= 1000000) {
        return (value / 1000000).toFixed(2);
      } else if (value >= 1000) {
        return (value / 1000).toFixed(2);
      }
    };
  }, []);

  const formatGDP = (value: number) => {
    if (!value) return false;
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

  const compareCountries = (value: number, correctValue: number) => {
    if (value > correctValue) {
      return "bg-[#FFA600]/80";
    }
    if (value < correctValue) {
      return "bg-[#FF0000]/80";
    }
    if (value === correctValue) return "bg-[#00FF09]/80";
    if (isNaN(value) && isNaN(correctValue)) return "bg-[#00FF09]/80";
    return "bg-[#FF0000]/80";
  };

  const checkCountryNameIsLong = (name: string) => {
    if (name.length > 7) {
      return name.slice(0, 7).trim() + "..";
    }
    return name;
  };

  const extractCountryData = (obj: CountryData) => ({
    codeISO: obj["EN.URB.LCTY.UR.ZS"][0].country.id,
    exportData: obj["EN.URB.LCTY.UR.ZS"][0].value?.toFixed(0),
    importData: obj["NE.EXP.GNFS.ZS"][0].value?.toFixed(0),
    gdpData: formatGDP(Number(obj["NY.GDP.PCAP.CD"][0].value?.toFixed(0))),
    forestationData: obj["AG.LND.FRST.ZS"][0].value?.toFixed(0),
    resourcesData: obj["TX.VAL.MMTL.ZS.UN"][0].value?.toFixed(0),
    urbanPData: obj["SP.URB.TOTL"][0].value,
  });

  const checkIfCountryIsCorrect = (
    countryObj: CountryData,
    correctCountryObj: CountryData,
    setWinnerPopupIsVisible: (value: boolean) => void,
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
        return isMatch;
      }
      isMatch = true;
    }

    if (isMatch) {
      setTimeout(() => {
        setWinnerPopupIsVisible(true);
      }, 2500);
    }
    return isMatch;
  };

  return {
    formatToMillions,
    formatGDP,
    compareCountries,
    checkIfCountryIsCorrect,
    checkCountryNameIsLong,
  };
}

import axios from "axios";
import countries_iso from "../assets/countries_iso.json";
import { CountryData } from "../interfaces/stats";

const fetchData = async (country: string | null) => {
  const seletedCountry = countries_iso.filter(
    (item) => item.name.toLowerCase() === country!.toLowerCase(),
  );
  const codeISO = seletedCountry[0].alpha2;
  const year = 2024;
  const ForestationAndResourcesYear = 2021;
  try {
    const responsePopulationLargestCity = await axios.get(
      `https://api.worldbank.org/v2/country/${codeISO}/indicator/EN.URB.LCTY.UR.ZS?date=${year}&format=json`,
    );
    const responseExport = await axios.get(
      `https://api.worldbank.org/v2/country/${codeISO}/indicator/NE.EXP.GNFS.ZS?date=${year}&format=json`,
    );
    const responseGDP = await axios.get(
      `https://api.worldbank.org/v2/country/${codeISO}/indicator/NY.GDP.PCAP.CD?date=${year}&format=json`,
    );
    const responseForestation = await axios.get(
      `https://api.worldbank.org/v2/country/${codeISO}/indicator/AG.LND.FRST.ZS?date=${ForestationAndResourcesYear}&format=json`,
    );
    const responseResources = await axios.get(
      `https://api.worldbank.org/v2/country/${codeISO}/indicator/NY.GDP.TOTL.RT.ZS?date=${ForestationAndResourcesYear}&format=json`,
    );
    const responseUrabnP = await axios.get(
      `https://api.worldbank.org/v2/country/${codeISO}/indicator/SP.URB.TOTL?date=${year}&format=json`,
    );

    return {
      countryName: seletedCountry[0].name,
      "EN.URB.LCTY.UR.ZS": responsePopulationLargestCity.data[1],
      "NE.IMP.GNFS.ZS": responseExport.data[1],
      "NY.GDP.PCAP.CD": responseGDP.data[1],
      "AG.LND.FRST.ZS": responseForestation.data[1],
      "TX.VAL.MMTL.ZS.UN": responseResources.data[1],
      "SP.URB.TOTL": responseUrabnP.data[1],
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const fetchCorrectCountry = async () => {
  const checkStats = (country: CountryData) => {
    if (
      !country["EN.URB.LCTY.UR.ZS"][0].value ||
      !country["NE.IMP.GNFS.ZS"][0].value ||
      !country["NY.GDP.PCAP.CD"][0].value ||
      !country["AG.LND.FRST.ZS"][0].value ||
      !country["TX.VAL.MMTL.ZS.UN"][0].value ||
      !country["SP.URB.TOTL"][0].value
    ) {
      return true;
    }
    return false;
  };
  const today = new Date().toISOString().split("T")[0];

  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash += today.charCodeAt(i);
  }

  const index = hash % countries_iso.length;
  let result = await fetchData(countries_iso[index].name);
  const mustMakeNewCountry = checkStats(result);
  if (mustMakeNewCountry)
    result = await fetchData(countries_iso[index + 1].name);
  return result;
};

export { fetchCorrectCountry };
export default fetchData;

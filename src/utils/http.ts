import axios from "axios";
import countries_iso from "../assets/countries_iso.json";
import { setCountryData } from "../counters/countrySlice";

const fetchData = async (country: string | null) => {
  const seletedCountry = countries_iso.filter(
    (item) => item.name_pl.toLowerCase() === country!.toLowerCase()
  );
  const codeISO = seletedCountry[0].alpha2;
  try {
    const responseUrbanP = await axios.get(
      `https://api.worldbank.org/v2/country/${codeISO}/indicator/EG.ELC.ACCS.UR.ZS?format=json&per_page=5`
    );
    const responseImport = await axios.get(
      `https://api.worldbank.org/v2/country/${codeISO}/indicator/NE.IMP.GNFS.ZS?format=json&per_page=5`
    );
    const responseExport = await axios.get(
      `https://api.worldbank.org/v2/country/${codeISO}/indicator/NE.EXP.GNFS.ZS?format=json&per_page=5`
    );
    const responseGDP = await axios.get(
      `https://api.worldbank.org/v2/country/${codeISO}/indicator/NY.GDP.PCAP.CD?format=json&per_page=5`
    );
    const responseForestation = await axios.get(
      `https://api.worldbank.org/v2/country/${codeISO}/indicator/AG.LND.FRST.ZS?format=json&per_page=5`
    );
    const responseResources = await axios.get(
      `https://api.worldbank.org/v2/country/${codeISO}/indicator/NY.GDP.TOTL.RT.ZS?format=json&per_page=5`
    );
    const responseUrabnP = await axios.get(
      `https://api.worldbank.org/v2/country/${codeISO}/indicator/SP.URB.TOTL?format=json&per_page=5`
    );

    return {
      countryName: seletedCountry[0].name_pl,
      "EG.ELC.ACCS.UR.ZS": responseUrbanP.data[1],
      "NE.EXP.GNFS.ZS": responseImport.data[1],
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

export default fetchData;

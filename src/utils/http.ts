import axios from "axios";

const fetchData = async () => {
  try {
    const responseUrbanP = await axios.get(
      "https://api.worldbank.org/v2/country/PL/indicator/EG.ELC.ACCS.UR.ZS?format=json&per_page=5"
    );
    const responseImport = await axios.get(
      "https://api.worldbank.org/v2/country/PL/indicator/NE.IMP.GNFS.ZS?format=json&per_page=5"
    );
    const responseExport = await axios.get(
      "https://api.worldbank.org/v2/country/PL/indicator/NE.EXP.GNFS.ZS?format=json&per_page=5"
    );
    return {
      "EG.ELC.ACCS.UR.ZS": responseUrbanP.data[1],
      Import: responseImport.data[1],
      Export: responseExport.data[1],
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default fetchData;

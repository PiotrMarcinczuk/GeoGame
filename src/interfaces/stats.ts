export type CountryData = {
  countryName: string;
  "AG.LND.FRST.ZS": IndicatorData[]; // Forest area
  "EN.URB.LCTY.UR.ZS": IndicatorData[]; // Exports
  "NE.IMP.GNFS.ZS": IndicatorData[]; // Imports
  "NY.GDP.PCAP.CD": IndicatorData[]; // GDP per capita
  "SP.URB.TOTL": IndicatorData[]; // Urban population
  "TX.VAL.MMTL.ZS.UN": IndicatorData[]; // Raw materials
};

type IndicatorData = {
  country: {
    id: string;
  };
  year: number;
  value: number | null;
};

export type SugestionData = {
  alpha2: string;
  alpha3: string;
  name: string;
  name_pl: string;
};

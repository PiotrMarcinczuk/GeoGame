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

export type CountryProps = {
  country: CountryData;
  itemsDelay: number;
};

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

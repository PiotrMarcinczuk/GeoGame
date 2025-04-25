import CustomInput from "./CustomInput";
import Country from "./Country";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function Main() {
  const data = useSelector((state: any) => state.country);
  const [countryList, setCountryList] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setCountryList((prev: any) => [...prev, data]);
    }
  }, [data]);
  console.log(countryList);
  return (
    <>
      <header></header>
      <main className="max-w-1450 mx-auto">
        <CustomInput />
        {countryList.length > 0
          ? countryList.map((country: any, index: number) => {
              return (
                <Country
                  key={index}
                  country={country}
                  isFirst={index === 0 ? true : false}
                />
              );
            })
          : null}
      </main>
    </>
  );
}

export default Main;

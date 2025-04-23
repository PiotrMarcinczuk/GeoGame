import CustomInput from "./CustomInput";
import Country from "./Country";
import { useSelector } from "react-redux";

function Main() {
  const data = useSelector((state: any) => state.country);
  console.log(data);
  return (
    <>
      <header></header>
      <main className="max-w-1450 mx-auto">
        <CustomInput />
        {/* {data &&
          data.map((country: any, index: number) => {
            return <Country key={index} {...country} />;
          })} */}
      </main>
    </>
  );
}

export default Main;

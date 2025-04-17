import { useState } from "react";
import CustomInput from "./CustomInput";
import Country from "./Country";
function Main() {
  const [count, setCount] = useState(0);

  return (
    <>
      <header></header>
      <main className="max-w-1450 mx-auto">
        <CustomInput />
        <Country />
      </main>
    </>
  );
}

export default Main;

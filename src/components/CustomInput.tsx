import arrow from "../assets/img/arrow.png";

export default function CustomInput() {
  return (
    <div className="mt-10 w-full mx-auto max-w-[812px] relative">
      <input
        className="w-full h-20 rounded-[4rem] outline-0 bg-white text-4xl p-4"
        defaultValue={"Fsdfsdfsd"}
      />
      <button className="absolute bg-[#DED9D9] right-3 bottom-1/2 translate-y-1/2  w-16 h-16 rounded-full">
        <img src={arrow} alt="arrow" className="mx-auto" />
      </button>
    </div>
  );
}

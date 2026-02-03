import close from "../assets/img/close.svg";

export default function HelpPopup({ setHelpPopupIsVisible }: any) {
  return (
    <>
      <div className="fixed left-0 top-0 w-screen h-screen bg-white/50 backdrop-blur-3xl z-50"></div>
      <section className="max-w-[1366px] max-h-[856px] h-full flex fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 w-full mx-auto p-10 text-black text-xl bg-white rounded-sm">
        <div className="flex justify-between flex-col h-full">
          <div className="flex flex-col -my-2">
            <div className="flex items-center my-2">
              <div className="bg-[#00FF09] p-10"></div>
              <p className="ml-3">Correct value</p>
            </div>
            <div className="flex items-center">
              <div className="bg-[#00FF09] p-10 my-2"></div>
              <p className="ml-3">Correct value</p>
            </div>
            <div className="flex items-center">
              <div className="bg-[#00FF09] p-10 my-2"></div>
              <p className="ml-3">Correct value</p>
            </div>
          </div>
          <div>
            <p>Contact me at:</p>
            <a href="mailto:piotrmarcinczuk@gmail.com" className="font-medium">
              piotrmarcinczuk@gmail.com
            </a>
          </div>
        </div>
        <div className="flex flex-col -my-4 ml-52">
          <div className="flex flex-col my-4">
            <p className="text-2xl font-semibold">Largest city</p>
            <p className="text-xl mt-1">
              Percentage of people living in the largest urban centre
            </p>
          </div>
          <div className="flex flex-col my-4">
            <p className="text-2xl font-semibold">Largest city</p>
            <p className="text-xl mt-1">
              Percentage of people living in the largest urban centre
            </p>
          </div>
          <div className="flex flex-col my-4">
            <p className="text-2xl font-semibold">Largest city</p>
            <p className="text-xl mt-1">
              Percentage of people living in the largest urban centre
            </p>
          </div>
          <div className="flex flex-col my-4">
            <p className="text-2xl font-semibold">Largest city</p>
            <p className="text-xl mt-1">
              Percentage of people living in the largest urban centre
            </p>
          </div>
          <div className="flex flex-col my-4">
            <p className="text-2xl font-semibold">Largest city</p>
            <p className="text-xl mt-1">
              Percentage of people living in the largest urban centre
            </p>
          </div>
          <div className="flex flex-col my-4">
            <p className="text-2xl font-semibold">Largest city</p>
            <p className="text-xl mt-1">
              Percentage of people living in the largest urban centre
            </p>
          </div>
        </div>
        <button
          onClick={() => setHelpPopupIsVisible(false)}
          className="absolute top-10 right-10 hover:cursor-pointer p-3 -m-3 rounded-sm hover:bg-[#ECECEC] tranisition-all duration-300 ease-out"
        >
          <img src={close} alt="close_button" />
        </button>
      </section>
    </>
  );
}

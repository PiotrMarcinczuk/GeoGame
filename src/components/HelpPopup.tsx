import { HelpPopupProps } from "./HelpPopup.types";

import close from "../assets/img/close.svg";

export default function HelpPopup({ setHelpPopupIsVisible }: HelpPopupProps) {
  return (
    <>
      <div className="fixed left-0 top-0 w-screen h-screen bg-white/50 backdrop-blur-3xl z-50"></div>
      <section className="max-w-[1466px] max-h-[996px] 2xl:max-h-[912px] h-full flex flex-col overflow-y-auto xl:overflow-y-hidden xl:flex-row fixed mx-auto top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 w-full text-black text-xl rounded-sm">
        <div className="flex rounded-sm flex-col xl:flex-row m-2 p-4 lg:p-7 xl:p-10 bg-white">
          <div className="flex justify-between flex-col lg:flex-row xl:flex-col h-full xl:max-w-[400px] w-full">
            <div className="flex flex-col -my-3">
              <div className="flex items-center my-3">
                <div className="bg-[#00FF09]/80 p-10"></div>
                <p className="ml-3">Correct answer</p>
              </div>
              <div className="flex items-center">
                <div className="bg-[#FF0000]/80 p-10 my-3"></div>
                <p className="ml-3">Value is lower than correct answer</p>
              </div>
              <div className="flex items-center">
                <div className="bg-[#FFA600]/80 p-10 my-3"></div>
                <p className="ml-3">Value is greater than correct answer</p>
              </div>
            </div>
            <div className="flex flex-col justify-between h-full mt-6 lg:mt-0 xl:mt-12 lg:ml-12 xl:ml-0">
              <div className="lg:w-9/10 xl:w-auto">
                <h2 className="text-2xl font-semibold">General informations</h2>
                <ul className="list-disc">
                  <li>
                    After guessing it, the country stays the same it changes
                    every day.
                  </li>
                  <li>
                    Largest city, Export, GDP per capita, and Urban population
                    are from 2024, Afforestation and Natural Resources are from
                    2021.
                  </li>
                </ul>
              </div>
              <div className="mt-2 lg:mt-0">
                <p>If you have any question, contact me at:</p>
                <a
                  href="mailto:piotrmarcinczuk@gmail.com"
                  className="font-medium"
                >
                  piotrmarcinczuk@gmail.com
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-12 xl:mt-0 xl:ml-36 2xl:ml-52 mr-16 w-full sm:w-auto">
            <div className="flex flex-col mb-2">
              <p className="text-2xl font-semibold">Largest city</p>
              <p className="text-xl mt-1">
                The population of the largest city in the country, expressed as
                a percentage of the total urban population.
              </p>
              <p className="mt-1">
                <span className="font-semibold">Example:</span> If the largest
                city has 2 million people and total urban population is 10
                million → value = 20%.
              </p>
            </div>
            <div className="flex flex-col my-3">
              <p className="text-2xl font-semibold">Export</p>
              <p className="text-xl mt-1">
                The value of exports (goods + services) as a percentage of the
                country’s GDP.
              </p>
              <p className="mt-1">
                <span className="font-semibold">Example:</span> Exports = $200B,
                GDP = $1000B → value = 20%.
              </p>
            </div>
            <div className="flex flex-col my-3">
              <p className="text-2xl font-semibold">GDP per capita</p>
              <p className="text-xl mt-1">
                The country’s GDP divided by population, in current US dollars.
              </p>
              <p className="mt-1">
                <span className="font-semibold">Example:</span> GDP = $1
                trillion, population = 50 million → GDP per capita = $20,000.
              </p>
            </div>
            <div className="flex flex-col my-3">
              <p className="text-2xl font-semibold">Afforestation</p>
              <p className="text-xl mt-1">
                Percentage of the country’s total land area covered by forest.
              </p>
              <p className="mt-1">
                <span className="font-semibold">Example:</span> Country land = 1
                million km², forest = 400,000 km² → value = 40%.
              </p>
            </div>
            <div className="flex flex-col my-3">
              <p className="text-2xl font-semibold">Natural resources</p>
              <p className="text-xl mt-1">
                Rents from natural resources (oil, gas, minerals, forests, etc.)
                as a percentage of GDP.
              </p>
              <p className="mt-1">
                <span className="font-semibold">Example:</span> If resources
                generate $50B and GDP = $500B → value = 10%.
              </p>
            </div>
            <div className="flex flex-col mb-2">
              <p className="text-2xl font-semibold">Urban population</p>
              <p className="text-xl mt-1">
                Total number of people living in urban areas.
              </p>
            </div>
          </div>
          <button
            onClick={() => setHelpPopupIsVisible(false)}
            className="absolute top-3 md:top-9 right-3 md:right-9 hover:cursor-pointer p-3 rounded-sm hover:bg-[#ECECEC] tranisition-all duration-300 ease-out"
          >
            <img src={close} alt="close_button" />
          </button>
        </div>
      </section>
    </>
  );
}

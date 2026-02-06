import { SuggestionListProps } from "./SuggestionList.types";
import { SugestionData } from "../interfaces/shared.types";

export default function SuggestionList({
  suggestionArr,
  setInputValue,
  ulRef,
  activeIndex,
  handleSubmit,
}: SuggestionListProps) {
  return (
    <ul
      ref={ulRef}
      className="absolute text-xl sm:text-2xl -bottom-1 left-2 xl:left-0 right-0 mx-2 xl:mx-0 translate-y-full flex-col bg-white shadow-md"
    >
      {suggestionArr.map((item, index) => (
        <li
          key={index}
          role="option"
          aria-selected={activeIndex === index}
          tabIndex={-1}
          onClick={(e) => {
            setInputValue(item.name);
            handleSubmit(e, item.name);
          }}
          className={`pl-3 py-2 text-black cursor-pointer transition-all duration-300 ease-out
            ${activeIndex === index ? "bg-[#E7E7E7]" : "hover:bg-[#E7E7E7]"}`}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}

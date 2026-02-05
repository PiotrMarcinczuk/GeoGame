import { SuggestionListProps } from "./SuggestionList.types";
import { SugestionData } from "../interfaces/shared.types";

export default function SuggestionList({
  suggestionArr,
  searchValue,
  ulRef,
  inputRef,
  activeIndex,
  handleSubmit,
}: SuggestionListProps) {
  return (
    <ul
      ref={ulRef}
      className="absolute text-2xl -bottom-1 left-2 xl:left-0 right-0 mx-2 xl:mx-0 translate-y-full flex-col bg-white"
    >
      {suggestionArr &&
        suggestionArr.map((item: SugestionData, index: number) => {
          return (
            <li
              key={index}
              role="option"
              aria-selected={activeIndex === index}
              tabIndex={-1}
              onClick={(e) => {
                searchValue!.current = item.name;
                handleSubmit(e, true);
              }}
              onMouseEnter={(e) => {
                searchValue!.current = e.currentTarget.textContent;
              }}
              onMouseLeave={() => {
                searchValue!.current = inputRef.current!.value;
              }}
              className={`${activeIndex === index ? "bg-[#E7E7E7]" : "bg-white hover:bg-[#E7E7E7]"} pl-3 py-2 text-black hover:cursor-pointer hover:bg-[#E7E7E7] transition-all duration-300 ease-out`}
            >
              {item.name}
            </li>
          );
        })}
    </ul>
  );
}

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFilter, clearFilter } from "../features/filterSlice";
import removeIcon from "../assets/Images/icon-remove.svg";

const Filters = () => {
  const filters = useSelector((state) => state.filter.value.filterElement);
  const dispatch = useDispatch();

  return (
    <div
      className={`flex flex-wrap lg:flex-nowrap w-full justify-between text-sm text-[#5ba4a4] font-bold items-center  bg-white mt-[-5rem] mb-8 py-2 px-3 rounded-lg ${
        filters.length == 0 ? "hidden" : "block"
      }`}
    >
      <div className="flex flex-wrap lg:flex-nowrap gap-3 items-center">
        {filters.map((filter) => (
          <div className="flex items-center">
            <p className="bg-[#eef6f6] p-2 rounded-l-lg ">{filter}</p>
            <p
              className="bg-[#5ba4a4] p-2.5 cursor-pointer rounded-r-lg hover:bg-[#2c3a3a]"
              onClick={() => {
                dispatch(removeFilter(filter));
              }}
            >
              <img src={removeIcon} />
            </p>
          </div>
        ))}
      </div>
      <p
        onClick={() => {
          dispatch(clearFilter());
        }}
        className={`cursor-pointer `}
      >
        Clear
      </p>
    </div>
  );
};

export default Filters;

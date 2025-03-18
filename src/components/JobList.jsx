import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilter } from "../features/filterSlice";
import Filters from "./Filters";

const JobList = () => {
  const filters = useSelector((state) => state.filter.value.filterElement);

  const [jobList, setJobList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setIsClicked(true);
  };

  useEffect(() => {
    fetch("https://backendjson-9t5g.onrender.com/jobs")
      .then((res) => {
        if (!res.ok) {
          throw Error("Couldn't fetch data");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setJobList(data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredJobs = jobList.filter((job) => {
    const jobFilters = [job.role, job.level, ...job.languages];

    if (filters.length === 0) return true;

    return jobFilters.some((filter) => filters.includes(filter));
  });

  return (
    <div className="p-12 bg-[#effafa]">
      <Filters />
      {isLoaded &&
        filteredJobs.map((item) => {
          const filters = [item.role, item.level, ...item.languages];
          const preferences = [item.postedAt, item.contract, item.location];

          return (
            <div
              key={item.id}
              className={`lg:flex justify-between mb-8 lg:mb-6 items-center bg-white p-4 lg:p-6 rounded-lg shadow-md ${
                item.featured ? "border-l-5 border-[#5ba4a4]" : ""
              }`}
            >
              <div className="lg:flex lg:w-1/2 lg:gap-4 lg:items-center">
                <div className=" w-1/4 mt-[-2rem] mb-3 lg:w-1/6 lg:m-0">
                  <img src={item.logo} />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-4 items-center">
                    <p className="text-sm text-[#5ba4a4] font-bold">
                      {item.company}
                    </p>
                    <div className="flex  gap-1  text-white font-bold ">
                      {item.new && (
                        <p className="bg-[#5ba4a4] rounded-xl text-[10px] px-2 py-1">
                          New!
                        </p>
                      )}
                      {item.featured && (
                        <p className="bg-[#2c3a3a] rounded-xl text-[10px] px-2 py-1">
                          Featured
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-[#2c3a3a] text-lg font-bold hover:text-[#5ba4a4] cursor-pointer">
                    {item.position}
                  </p>
                  <div className="flex gap-3 lg:gap-4 mb-3 lg:mb-0 border-b lg:border-0 ">
                    {preferences.map((preference, index) => (
                      <React.Fragment key={index}>
                        <p className="text-[#7b8e8e] font-semibold text-sm">
                          {preference}
                        </p>
                        {index !== preferences.length - 1 && (
                          <span className="text-[#7b8e8e]">•</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap lg:flex-nowrapw-1/3 lg:justify-end gap-3 lg:gap-6 text-sm text-[#5ba4a4] font-bold ">
                {filters.map((filter) => (
                  <p
                    className="bg-[#eef6f6] p-2 rounded-lg cursor-pointer hover:text-white hover:bg-[#5ba4a4]"
                    onClick={(event) => {
                      handleClick(event);
                      dispatch(addFilter(event.target.innerText));
                    }}
                  >
                    {filter}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default JobList;

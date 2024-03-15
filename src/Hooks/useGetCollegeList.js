import React from "react";

const useGetCollegeList = async (setColleges) => {
  const response = await fetch(
    "https://project-crs-server-1.onrender.com/api/v1/lists/colleges/cet"
  );
  const data = await response.json();
  setColleges(data.data);
//   console.log(data.data);
};

export default useGetCollegeList;

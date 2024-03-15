import React from "react";

const useGetYearList = async (setYearDataList, setYearList) => {
  const response = await fetch(
    "https://project-crs-server-1.onrender.com/api/v1/lists/yearlist/mht-cet"
  );
  const data = await response.json();
  console.log(data.data);
  
  const obj = data.data;
  
  setYearDataList(obj);
  setYearList(Object.keys(obj));

  console.log("Obj: ", obj);
  console.log("YearList: ", Object.keys(obj))
};

export default useGetYearList;

import React from "react";

const useGetBranchList = async (setBranches) => {
  const response = await fetch(
    "https://project-crs-server-1.onrender.com/api/v1/lists/branches/cet"
  );
  const data = await response.json();
  setBranches(data.data);
  // console.log(data.data);
};

export default useGetBranchList;

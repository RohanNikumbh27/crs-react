import React from "react";

const useGetCategoryList = async (setCategories) => {
  const response = await fetch(
    "https://project-crs-server-1.onrender.com/api/v1/lists/categories/cet/2022"
  );
  const data = await response.json();
  setCategories(data.data);
//   console.log(data.data);
};

export default useGetCategoryList;

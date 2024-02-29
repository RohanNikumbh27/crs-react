import React, { useEffect, useState } from "react";
import "../Styles/QueryPage.css";
let collegeListURL =
  "https://project-crs-server-1.onrender.com/api/v1/lists/colleges/cet";
let branchListURL = "";

const QueryPage = () => {
  const [colleges, setColleges] = useState([]);
  const [branches, setBranches] = useState([]);

  const fetchCollegeData = async () => {
    try {
      const response = await fetch(collegeListURL);
      const data = await response.json();
      setColleges(data.data);
      console.log(data.data);
    } catch (error) {
      console.error("Error fetching colleges:", error);
    }
  };

  const fetchBranchData = async () => {
    try {
      const response = await fetch(branchListURL);
      const branchesData = await response.json();
      console.log(branchesData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCollegeData();
  }, []);

  const [categoryVisibility, setCategoryVisibility] = useState(true);
  const [roundVisibility, setRoundVisibility] = useState(true);

  return (
    // <div>
    //   <select>
    //     {colleges.map((item, index) => (
    //       <option key={index}>{item}</option>
    //     ))}
    //   </select>
    <div className="form-container">
      <form
        action="/main/query"
        method="GET"
        onSubmit={console.log("submitted")}
      >
        <h1 style={{ textAlign: "center", color: "#333" }}>
          Enter Your Details
        </h1>
        <p id="flash-message" style={{ display: "none", color: "red" }}>
          Please fill Percentile or Rank
        </p>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="percentile">Percentile:</label>
            <input
              type="text"
              name="percentile"
              id="percentile"
              placeholder="Ex. 87.1234567"
              // onInput={(event) => {
              //   clearFlash();
              //   limitDecimalPlaces(event);
              // }}
            />
          </div>

          <div className="or-text">OR</div>

          <div className="form-group">
            <label htmlFor="rank">Rank:</label>
            <input
              type="text"
              name="rank"
              id="rank"
              placeholder="Ex. 5400"
              // onInput={(event) => {
              //   clearFlash();
              //   limitDigits(event);
              // }}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="exam">Select Exam:</label>
            <select
              name="exam"
              id="exam"
              // onChange={showCategoryFilter}
            >
              <option value="mht-cet">MHT-CET</option>
              <option value="jee">JEE</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="numRows">Result Display Limit:</label>
            <input
              type="number"
              name="numRows"
              id="numRows"
              value="7"
              step="1"
              min="1"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label
              htmlFor="round"
              style={{ display: roundVisibility ? "block" : "none" }}
              id="roundLabel"
            >
              Select Round:
            </label>
            <select
              name="round"
              id="round"
              style={{ display: roundVisibility ? "block" : "none" }}
            >
              <option value="round1">Round 1</option>
              <option value="round2">Round 2</option>
              <option value="round3">Round 3</option>
            </select>
          </div>
          <div className="form-group">
            <label
              htmlFor="category"
              style={{ display: categoryVisibility ? "block" : "none" }}
              id="categoryLabel"
            >
              Select Category:
            </label>
            <select
              id="category"
              name="category"
              style={{ display: categoryVisibility ? "block" : "none" }}
            >
              <option>Categories</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="branch">Select Branch:</label>
            <select name="branch" id="branch">
              {/* Map over branches and render options */}
              <option>branches</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="collegeSearch">Search College:</label>
            <input
              type="text"
              name="collegeSearch"
              id="collegeSearch"
              list="collegesList"
              placeholder="Start typing..."
            />
            <datalist id="collegesList">
              {colleges.map((item, key) => (
                <option key={key}>{item}</option>
              ))}
              <option>colleges</option>
            </datalist>
          </div>
        </div>

        <div className="form-row">
          <input
            style={{ display: "none" }}
            type="text"
            name="page"
            id="page"
            value="queryForm"
          />
          <div className="button-container">
            <button type="submit">Get Results</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QueryPage;

// const showCategoryFilter = () => {
//   const examDropdown = document.getElementById("exam");
//   const selectedExam = examDropdown.value;

//   setCategoryVisibility(selectedExam === "mht-cet");
//   setRoundVisibility(selectedExam === "mht-cet");
// };

// const updateCollegesList = () => {
//   const examDropdown = document.getElementById("exam");
//   const categoryDropdown = document.getElementById("category");
//   const collegesList = document.getElementById("collegesList");

//   const selectedCategory = categoryDropdown.value;
//   const selectedExam = examDropdown.value;

//   // Use AJAX to fetch the list of colleges based on the selected category
//   const xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       const colleges = JSON.parse(xhr.responseText);

//       // Clear existing options
//       collegesList.innerHTML = "";

//       // Add new options based on the fetched data
//       colleges.forEach((college) => {
//         const option = document.createElement("option");
//         option.value = college;
//         option.textContent = college;
//         collegesList.appendChild(option);
//       });
//     }
//   };

//   // Make a GET request to fetch the list of colleges
//   xhr.open(
//     "GET",
//     `/main/fetchColleges?category=${selectedCategory}&exam=${selectedExam}`,
//     true
//   );
//   xhr.send();
// };

// const limitDecimalPlaces = (event) => {
//   let value = event.target.value;
//   value = value.replace(/[^0-9.]/g, "");
//   const decimalIndex = value.indexOf(".");

//   if (decimalIndex !== -1) {
//     const decimalPart = value.substring(decimalIndex + 1);
//     value = value.substring(0, decimalIndex + 1) + decimalPart.slice(0, 7);
//   }

//   if (parseFloat(value) > 100) {
//     value = value[0] + value[1];
//   }

//   event.target.value = value;
// };

// const limitDigits = (event) => {
//   let value = event.target.value;
//   value = value.replace(/\D/g, "");
//   value = value.slice(0, 5);
//   event.target.value = value;
// };

// const validateForm = () => {
//   const percentileElement = document.getElementById("percentile");
//   const rankElement = document.getElementById("rank");

//   const userInputPercentile = percentileElement.value;
//   const userInputRank = rankElement.value;

//   if (userInputPercentile === "" && userInputRank === "") {
//     document.getElementById("flash-message").style.display = "block";
//     return false;
//   }
//   return true;
// };

// const clearFlash = () => {
//   document.getElementById("flash-message").style.display = "none";
// };

//

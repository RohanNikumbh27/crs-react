// import "../../node_modules/react-bootstrap";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../Styles/MainPage.css";
import { useRef, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";
import { useEffect } from "react";
import useGetQueryData from "../Hooks/useGetQueryData";
import useGetBranchList from "../Hooks/useGetBranchList";
import useGetCollegeList from "../Hooks/useGetCollegeList";
import useGetCategoryList from "../Hooks/useGetCategoryList";
import useGetYearList from "../Hooks/useGetYearData";

let collegeListURL =
  "https://project-crs-server-1.onrender.com/api/v1/lists/colleges/cet";
let branchListURL =
  "https://project-crs-server-1.onrender.com/api/v1/lists/branches/cet";
let categoryURL =
  "https://project-crs-server-1.onrender.com/api/v1/lists/categories/cet/2022";

const MainPage = ({ queryString }) => {
  console.log("QueryString in main page: ");
  console.log(queryString);
  const [qResponse, setQResponse] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [branches, setBranches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [selectedYear, setSelectedYear] = useState();
  const [selectedRound, setSelectedRound] = useState();

  // ########### Reference Variables ##########
  const gender = "female";
  const category = useRef("");
  // const category = "sc";
  const percentile = useRef("");
  const rank = useRef("");
  const college = useRef("");
  // const college = "vishwakarma";
  const branch = useRef("");
  // const branch = "Information";
  const year = useRef("");
  // const year = 2022;
  const round = useRef("");
  // const round = 1;

  const submitHandler = (e) => {
    e.preventDefault();

    let queryString = `${gender}/${category.current.value}/${
      percentile.current.value ? percentile.current.value : "null"
    }/${rank.current.value ? rank.current.value : "null"}/${
      college.current.value
    }/${branch.current.value}/${year.current.value}/${round.current.value}`;
    console.log(queryString);

    useGetQueryData(queryString, setQResponse);
  };

  // function to set round on the basis year selected
  const selectRoundsByYear = (e) => {
    const year = e.target.value;
    console.log(year);
    const round = yearData[year];
    setSelectedRound(round);
    console.log("Round: ", round);
  };

  useEffect(() => {
    useGetQueryData(queryString, setQResponse);
    useGetBranchList(setBranches);
    useGetCollegeList(setColleges);
    useGetCategoryList(setCategories);
    useGetYearList(setYearData, setYearList);
  }, []);

  return (
    <div className="maindiv">
      <input type="checkbox" id="check" />
      <label htmlFor="check">
        <HiMenu id="btn" className="icon" />
        <IoIosClose className="icon" id="cancel" />
      </label>
      <div className="sidebar">
        <header>
          <b>Enter Your Query</b>
        </header>
        <form
          className="mainpage-form"
          action="/main/query"
          method="GET"
          onSubmit={submitHandler}
        >
          <p id="flash-message" style={{ display: "none", color: "red" }}>
            Please fill Percentile or Rank
          </p>

          {/* ########################### Percentile ############################## */}
          <label htmlFor="percentile">Percentile:</label>
          <input
            type="text"
            name="percentile"
            id="percentile"
            placeholder="87.1234567"
            // value="88.2222222"
            onChange={() => console.log("Change Percentile")}
            onInput={() => console.log("handle")}
            ref={percentile}
          />

          {/* ########################### Rank ############################## */}

          <label htmlFor="rank">Rank:</label>
          <input
            type="text"
            name="rank"
            id="rank"
            placeholder="Ex. 4500"
            // value="NaN"
            onChange={() => console.log("Change rank")}
            onInput={() => console.log("Handle")}
            ref={rank}
          />

          {/* ########################### Exam type ############################## */}

          <label htmlFor="exam">Select Exam:</label>
          <select name="exam" id="exam">
            <option>MHT-CET</option>
            <option disabled="true">JEE</option>
          </select>

          {/* ########################### Year List ############################## */}
          <label htmlFor="year">Select year:</label>
          <select
            name="year"
            id="year"
            ref={year}
            onChange={(e) => {
              selectRoundsByYear(e);
            }}
          >
            {yearList.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>

          {/* ########################### Category List ############################## */}
          <label
            htmlFor="category"
            id="categoryLabel"
            className="hide"
            style={{ display: "block" }}
          >
            Select Category:
          </label>
          <select
            id="category"
            name="category"
            className="hide"
            style={{ display: "block" }}
            ref={category}
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>

          {/* ########################### Round List ############################## */}
          <label
            htmlFor="round"
            id="roundLabel"
            className="hide"
            style={{ display: "block" }}
          >
            Select Round:
          </label>
          <select
            name="round"
            id="round"
            className="hide"
            ref={round}
            style={{ display: "block" }}
          >
            {(() => {
              let arrOfRounds = [];
              for (let i = 1; i <= selectedRound; i++) {
                arrOfRounds.push(i);
              }

              return arrOfRounds.map((round) => {
                return <option value={round}>{`Round ${round}`}</option>;
              });
            })()}
          </select>

          {/* ############################### Branch List ############################### */}
          <label htmlFor="branch">Select Branch:</label>
          <select name="branch" id="branch" ref={branch}>
            <option>All Branches</option>
            {branches.map((oneBranch) => (
              <option key={oneBranch}>{oneBranch}</option>
            ))}
          </select>

          {/* ############################### College List ############################### */}
          <label htmlFor="collegeSearch">Search College:</label>
          <input
            type="text"
            name="collegeSearch"
            id="collegeSearch"
            list="collegesList"
            placeholder="Start typing your college name..."
            ref={college}
          />
          <datalist id="collegesList">
            {colleges.map((College, key) => (
              <option key={key}>{College}</option>
            ))}
          </datalist>

          {/* ######################## Result Display Limit ######################### */}
          <label htmlFor="numRows">Result Display Limit:</label>
          <input type="number" name="numRows" id="numRows" step="1" min="1" />

          <input
            style={{ display: "none" }}
            type="text"
            id="page"
            name="page"
          />

          <button type="submit">
            <b>Apply Filters</b>
          </button>
        </form>
      </div>

      <div className="table-container">
        {/* table */}
        <p
          id="flash_branch_not_available"
          style={{ display: "none", color: "red" }}
        >
          You cannot get the selected branch in this college
        </p>
        <p
          id="flash_percentile_rank_not_sufficient"
          style={{ display: "none", color: "red" }}
        >
          This is the minimum percentile/rank you need to get this college
        </p>
        <table id="table">
          <tbody>
            <tr>
              <th>Serial No.</th>
              <th>Institute</th>
              <th>Rank</th>
              <th>Cutoff</th>
              <th>Course Name</th>
              <th>Exam</th>
            </tr>

            {qResponse.map((CollegeInfo, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{CollegeInfo.college}</td>
                <td>{CollegeInfo.rank}</td>
                <td>{CollegeInfo.percentile}</td>
                <td>{CollegeInfo.course}</td>
                <td>MHT-CET</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainPage;

const fetchCollegeData = async () => {
  try {
    const response = await fetch(collegeListURL);
    const data = await response.json();
    setColleges(data.data);
    // console.log(data.data);
  } catch (error) {
    console.error("Error fetching colleges:", error);
  }
};

// import "../../node_modules/react-bootstrap";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../Styles/MainPage.css";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";
import { useEffect } from "react";
import getQueryData from "../Hooks/getQueryData";
let collegeListURL =
  "https://project-crs-server-1.onrender.com/api/v1/lists/colleges/cet";
let branchListURL =
  "https://project-crs-server-1.onrender.com/api/v1/lists/branches/cet";
let categoryURL =
  "https://project-crs-server-1.onrender.com/api/v1/lists/categories/cet/2022";

const MainPage = ({queryString}) => {
  console.log("QueryString in main page: ")
  console.log(queryString)
  const [qResponse, setQResponse] = useState(null);
  const [colleges, setColleges] = useState([]);
  const [branches, setBranches] = useState([]);
  const [categories, setCategories] = useState([]);

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

  const fetchBranchData = async () => {
    try {
      const response = await fetch(branchListURL);
      const branchesData = await response.json();
      // console.log(branchesData.data);
      setBranches(branchesData.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await fetch(categoryURL);
      const categoryData = await response.json();
      console.log(categoryData);
      setCategories(categoryData.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCollegeData();
    fetchBranchData();
    fetchCategories();
    getQueryData(queryString, setQResponse);
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
          onSubmit={() => console.log("Form Submitted")}
        >
          <p id="flash-message" style={{ display: "none", color: "red" }}>
            Please fill Percentile or Rank
          </p>
          <label htmlFor="percentile">Percentile:</label>
          <input
            type="text"
            name="percentile"
            id="percentile"
            placeholder="87.1234567"
            // value="88.2222222"
            onChange={() => console.log("Change Percentile")}
            onInput={() => console.log("handle")}
          />

          <label htmlFor="rank">Rank:</label>
          <input
            type="text"
            name="rank"
            id="rank"
            placeholder="Ex. 4500"
            // value="NaN"
            onChange={() => console.log("Change rank")}
            onInput={() => console.log("Handle")}
          />

          <input
            type="text"
            id="selectedExam"
            name="selectedExam"
            style={{ display: "none" }}
          />

          <label htmlFor="exam">Select Exam:</label>
          <select name="exam" id="exam">
            <option>JEE</option>
          </select>

          <input
            type="text"
            id="selectedCategory"
            name="selectedCategory"
            style={{ display: "none" }}
          />

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
          >
            <option>GSCS</option>
          </select>

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
            style={{ display: "block" }}
          >
            <option value="round1" onChange={console.log("hi")}>
              Round 1
            </option>
            <option value="round2" onChange={console.log("hi")}>
              Round 2
            </option>
            <option value="round3" onChange={console.log("hi")}>
              Round 3
            </option>
          </select>

          <label htmlFor="branch">Select Branch:</label>
          <select name="branch" id="branch">
            <option>All Branches</option>
          </select>

          <label htmlFor="collegeSearch">Search College:</label>
          <input
            type="text"
            name="collegeSearch"
            id="collegeSearch"
            list="collegesList"
            placeholder="Start typing..."
          />

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
            <tr>
              <td>1</td>
              <td>
                2025 - Shri Guru Gobind Singhji Institute of Engineering and
                Technology, Nanded
              </td>
              <td>17226</td>
              <td>88.0387129</td>
              <td> Instrumentation Engineering</td>
              <td>MHT-CET</td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                3036 - Dr. Babasaheb Ambedkar Technological University, Lonere
              </td>
              <td>17868</td>
              <td>87.6664783</td>
              <td> Electrical Engineering</td>
              <td>MHT-CET</td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                6156 - G.H.Raisoni College of Engineering &amp; Management,
                Wagholi, Pune
              </td>
              <td>18789</td>
              <td>87.0496161</td>
              <td> Computer Engineering</td>
              <td>MHT-CET</td>
            </tr>
            <tr>
              <td>4</td>
              <td>
                3037 - Dr. Babasaheb Ambedkar Technological University, Lonere
              </td>
              <td>19269</td>
              <td>86.7544428</td>
              <td> Electronics and Telecommunication Engg</td>
              <td>MHT-CET</td>
            </tr>
            <tr>
              <td>5</td>
              <td>
                3181 - Thakur College of Engineering and Technology, Kandivali,
                Mumbai
              </td>
              <td>19469</td>
              <td>86.5455138</td>
              <td> Electronics Engineering</td>
              <td>MHT-CET</td>
            </tr>
            <tr>
              <td>6</td>
              <td>
                6177 - G. H.Raisoni Institute of Engineering and Technology,
                Wagholi, Pune
              </td>
              <td>20064</td>
              <td>86.1623155</td>
              <td> Computer Engineering</td>
              <td>MHT-CET</td>
            </tr>
            <tr>
              <td>7</td>
              <td>
                6289 - B.R.A.C.T's Vishwakarma Institute of Information
                Technology, Kondhwa (Bk.), Pune
              </td>
              <td>20273</td>
              <td>86.0198563</td>
              <td> Civil Engineering</td>
              <td>MHT-CET</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainPage;

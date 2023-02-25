import { useState } from "react";
import CreateNewToolBtn from "../create_new/CreateNewToolBtn";
import SearchInput from "./SearchInput";
import '../styles/App.css';
import FilterMenu, { ShowFilterBtn } from "./FilterMenu";
import ToolListElement from "./ToolListElement";
import BackButton, { HomeButton } from "../utils/Buttons"
import NewToolPage from "../create_new/NewToolPage";

const SearchPage = props => {
  /* !!! TODO !!!
   * 1. Search Results Navigation
   * 2. Search Result Double Click To Open
   * 3. Backend Funcs
   */
  
  /* Components
   * - Input
   * - New Entry
   * - Filter
   *      a. Date
   *      b. Tag
   *      c. Code Coverage Range
   *      d. Has description/example
   * - Results
   * - Back Button
   * 
   * Tool Obj:
   * {
   *  title: "",
   *  description: "",
   *  code: "FILE_PATH",
   *  timestamp: Date,
   *  code_coverage: Number,
   *  example: "",
   *  liked: Bool,
   *  tests: ['FILE_PATH'],
   *  tags: Set,
   *  times_used: Number
   * }
   */

  const mockToolObj = {
    title: "Tool Title",
    description: 'tool desc',
    code: "Tool code {};",
    timestamp: Date.now(),
    code_coverage: 90,
    example: "Tool example",
    liked: false,
    tests: [""],
    tags: new Set(["Hall Of Fame", 'ads', 'as', 'asdd', 'asdfsdfasdfasdfasd', 'asdfsadfasdfadsfadsfa','asdfasdfasdfasfdasdfadsf', 'asdfasdfasdfasdf', 'asdfasdfasdfasdfasd','asdfadsfadsfadsfads']),
    times_used: 0
  }
  const [showFilter, updateShowFilter] = useState(false);
  const [resultsPageNum, updateResultsPageNum] = useState(0);
  const [results, updateResults] = useState([mockToolObj, mockToolObj]);


  const resultElements = results.map((tool, index)=>
   <ToolListElement key={`search-result-${index}`} tool={tool} resultIndex={index} selectTool={props.selectTool} changePage={props.changePage}/>
  );

  return (
    <div id="search-page" className="@container h-max-screen h-screen flex flex-col justify-between overflow-auto">
      <NewToolPage />
      <div id="search-page-top-container" className={`basis-1/12 flex flex-wrap justify-around items-start bg-secondary ${showFilter ? '' : 'rounded-b-2xl'}`}>
        <HomeButton changePage={props.changePage}/>
        <div id="search-page-input-container" className="mt-5 basis-3/4 flex @xs:flex-wrap @lg:justify-end @md:justify-around items-center">
          <SearchInput />
          <div className="flex @md:w-auto @xs:w-full @xs:justify-center items-center">
            <CreateNewToolBtn />
            <ShowFilterBtn showFilter={showFilter} updateShowFilter={updateShowFilter}/>
          </div>
        </div>
      </div>
      { showFilter &&
        <div id="search-page-filter-container" className="basis-1/12 bg-secondary rounded-b-2xl">
          <FilterMenu />
        </div>
      }
      <div id="search-page-results-container" className="basis-5/6 flex flex-col justify-between items-center">
      <ul className="menu bg-base-100 w-full p-2 rounded-box">
        {/* List of results */}
        {resultElements}
      </ul>
        {/* Results Page Nav */}
        <div id="search-results-nav-container" className="btn-group mb-4">
          <input type="radio" name="options" data-title="«" className="btn" />
          <input type="radio" name="options" data-title={`${resultsPageNum + 1}`} className="btn" checked={true} readOnly/>
          <input type="radio" name="options" data-title="..." className="btn" />
          <input type="radio" name="options" data-title="3" className="btn" />
          <input type="radio" name="options" data-title="»" className="btn" />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
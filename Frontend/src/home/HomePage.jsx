import CreateNewToolBtn from "../create_new/CreateNewToolBtn";
import SearchInput from "../search/SearchInput";
import PinBoard from "./PinBoard";
import DashboardMini from "../dashboards/DashboardMini";
import '../styles/App.css';

const title = <h1 className="text-4xl m-1">Toolbox</h1>;

const HomePage = props => {
  /* Components
   * - Title
   * - New Entry
   * - Search
   * - Feature
   * - Dashboard
   */
  // Conditionally render body portion of page based off of if search results is empty
  const body = props.searchResults.length === 0 ? <PinBoard/> : <div></div>;
 
  return (
    <div id="home-page" className="h-max-screen h-screen flex flex-col">
      <div id="home-page-title-container" className="basis-1/12 flex justify-center">
        {title}
      </div>
      <div id="home-page-search-container" className="border-black basis-1/6 flex justify-center items-center ">
        <SearchInput changePage={props.changePage}/>
        <CreateNewToolBtn/>
      </div>
      <div id="home-page-pin-board-container" className="border-2 border-black m-0.5 basis-1/2">
        {body}
      </div>
      <div id="home-page-dashboard-container" className="basis-1/4 border-black flex justify-center">
        <DashboardMini/>
      </div>
    </div>
  );
};

export default HomePage;
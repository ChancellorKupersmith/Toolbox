import { useState } from 'react'
import HomePage from './home/HomePage';
import SearchPage from './search/SearchPage';
import './styles/App.css';
import ToolPage from './tool/ToolPage';

let prevPage = 'home';
function App() {
  // Page navigation state: [prevPage, page]
  const [page, updatePage] = useState(['home', 'home']);
  const changePage = newPage => updatePage([page[1], newPage]);
  const prevPage = () => updatePage([page[1], page[0]]);
  const [searchResults, updateSearchResults] = useState([]);
  // Selected tool state
  const [curTool, updateCurTool] = useState(undefined);
  
  const renderPage = () => {
    switch(page[1]){
      case 'home':
        return <HomePage
                  changePage={changePage}
                  searchResults={searchResults}
                  updateSearchResults={updateSearchResults}
                />;
      case 'search':
        return <SearchPage 
                  changePage={changePage}
                  prevPage={prevPage}
                  searchResults={searchResults}
                  updateSearchResults={updateSearchResults}
                  selectTool={updateCurTool}
                />;
      case 'tool':
        return <ToolPage
                  changePage={changePage}
                  prevPage={prevPage}
                  tool={curTool}
                  updateCurTool={updateCurTool}
                />;
      default:
        return(<div>ERROR_PAGE</div>);
    }
  }

  return (<>{renderPage()}</>);
}

export default App;

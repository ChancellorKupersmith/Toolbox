import { useEffect, useState } from "react";
import { Toggle } from "../utils/Buttons";
import { TagList } from "../tool/ToolPageDrawer";
const FilterMenu = props => {
/*
 * Filter
 * a. Date
 * b. Tag
 * c. Code Coverage Range
 * d. Has description/example
 */
  const [tags, updateTags] = useState(new Set());
  const [sortBy, updateSortBy] = useState('Most Recent');
  const [descriptionRequired, updateDescriptionRequired] = useState(false);
  const [exampleRequired, updateExampleRequired] = useState(false);
  const [codeCoverageMin, updateCodeCoverageMin] = useState(0);

  const changeReqDesc = event => updateDescriptionRequired(event.target.checked);
  const changeReqEx = () => updateExampleRequired(!exampleRequired);
  useEffect(()=> console.log(`Description: ${descriptionRequired}\nExample: ${exampleRequired}`));

  const deleteTag = tag => {
    const tagsClone = new Set(tags.values());
    tagsClone.delete(tag)
    updateTags(tagsClone);
  }

  return (
    <div id="search-page-filter-menu" className="w-screen flex flex-wrap justify-end items-center">
      <TagsInput tags={tags} updateTags={updateTags}/>
      <CodeCoverageInput codeCoverageMin={codeCoverageMin} updateCodeCoverageMin={updateCodeCoverageMin}/>
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center">
          {tags.size !== 0 && <h1 className="ml-2">Tags:</h1>}
          <TagList tags={tags} deleteTag={deleteTag}/>
        </div>
        <div className="flex justify-center items-center mt-1 mr-0.5">
          <SortBy sortBy={sortBy} updateSortBy={updateSortBy}/>
          <RequireFilter changeReqDesc={changeReqDesc} changeReqEx={changeReqEx}/>
        </div>
      </div>
    </div>
  );
};


const TagsInput = props => {
  const addTag = () => {
    const tagsClone = new Set(props.tags.values());
    tagsClone.add(document.getElementById('tags-input').value);
    props.updateTags(tagsClone);
  };

  return (
    <div id="tags-input-container" className="mr-1 flex justify-end items-center">
      <input id="tags-input" type="text" placeholder="Tag…" size={10} className="input input-primary" />
      <button id="add-tag-btn" className="ml-0.5 btn btn-square btn-primary" onClick={addTag}>Add</button>
    </div>
  );
};


const CodeCoverageInput = props => {
  const changeCodeCoverageMin = increase => {
    const incrementSize = 10;
    if(increase){
      // send filter request
      // update menu ui
      const coverage = Math.min(100, props.codeCoverageMin + incrementSize);
      document.getElementById('coverage-input').value = coverage;
      props.updateCodeCoverageMin(coverage);
    }
    else{
      // send filter request
      // update menu ui
      const coverage = Math.max(0, props.codeCoverageMin - incrementSize);
      document.getElementById('coverage-input').value = coverage;
      props.updateCodeCoverageMin(coverage);
    }
  };
  return (
    <div id="code-coverage-input-container" className="mr-0.5 flex justify-center items-center">
      <input id="coverage-input" width="100px" type="number" placeholder={`${props.codeCoverageMin}% Code Coverage`} className="input input-primary w-48"/>
      <abbr title="% Code Coverage" className="btn btn-success ml-0.5">%</abbr>
      <div id="code-coverage-btns-container" className="ml-0.5 flex flex-col justify-between">
        <button id="add-tag-btn" className="basis-1/4 min-h-6 btn btn-primary" onClick={()=> changeCodeCoverageMin(true)}>+</button>
        <button id="subtract-tag-btn" className="basis-1/4 min-h-6 btn btn-primary" onClick={()=> changeCodeCoverageMin(false)}>-</button>
      </div>
    </div>
  );
};


const SortBy = props => 
  <div className="dropdown dropdown-bottom dropdown-end">
    <label tabIndex={0} className="btn btn-primary">{props.sortBy}</label>
    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
      <li className="menu-title">
        <span>Sort By</span>
      </li>
      <li><a onClick={()=>props.updateSortBy('Most Recent')}>Most Recent</a></li> 
      <li><a onClick={()=>props.updateSortBy('Oldest')}>Oldest</a></li>
      <li><a onClick={()=>props.updateSortBy('Max % Code Coverage')}>Max % Code Coverage</a></li>
      <li><a onClick={()=>props.updateSortBy('Min % Code Coverage')}>Min % Code Coverage</a></li>
      <li><a onClick={()=>props.updateSortBy('Most Used')}>Most Used</a></li>
      <li><a onClick={()=>props.updateSortBy('Least Used')}>Least Used</a></li>
    </ul>
  </div>
;


const RequireFilter = props =>
  <div className="dropdown dropdown-end ml-0.5">
    <label tabIndex={0} className="btn btn-primary rounded-btn">...</label>
    <ul tabIndex={1} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box">
      <ul className="menu bg-base-100 rounded-box">
        <li className="menu-title">
          <span>Require</span>
        </li>
        <li>
          {/* Description Toggle*/}
          <Toggle label="Description" callback={props.changeReqDesc}/>
        </li>
        <li>
          {/* Example Toggle */}
          <Toggle label="Example" callback={props.changeReqEx}/>
        </li>
      </ul>
    </ul>
  </div>
;


export const ShowFilterBtn = props => 
  <button 
    onClick={()=>props.updateShowFilter(!props.showFilter)}
    className="m-0.5 btn btn-primary basis-1/4">
      Filter
  </button>
;

export default FilterMenu;
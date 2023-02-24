import { useState } from "react";
import BackButton, { LikeButton } from "../utils/Buttons";
import ToolPageCode from "./Code";
import ToolPageDescription from "./Description";
import ToolPageExample from "./Example";
import TestsContainer from "./Tests";
import ToolPageDrawer from "./ToolPageDrawer";

const ToolPage = props => {
  const mockToolObj = {
    title: "Tool Title",
    description: '',
    code: "Tool code {};",
    timestamp: "",
    code_coverage: "",
    example: "",
    liked: false,
    tests: [""],
    tags: ["Hall Of Fame"]
  }
  const [drawerOpen, updateDrawerOpen] = useState(false);
  // Copy db tool data to local state for optimized rendering when updates occur
  // Copying individual properties to avoid multiple object cloning whenever an indiviual property is changed
  const [newDesc, updateNewDesc] = useState(props.tool.description);
  const [newTitle, updateNewTitle] = useState(props.tool.title);
  const [newCode, updateNewCode] = useState(props.tool.code);
  const [newTimestamp, updateNewTimestamp] = useState(props.tool.timestamp);
  const [newCodeCoverage, updateNewCodeCoverage] = useState(props.tool.code_coverage);
  const [newExample, updateNewExample] = useState(props.tool.example);
  const [newLiked, updateNewLiked] = useState(props.tool.liked);
  const [newTests, updateNewTests] = useState(props.tool.tests);
  const [newTags, updateNewTags] = useState(props.tool.tags);
  // TODO: Handle local state changes and db changes
  // Save functions for async updating local state
  const saveDesc = () => {
    // TODO: async POST to server
    // save to local state
    const descTextArea = document.getElementById('desc-input').value;
    descTextArea !== '' ? updateNewDesc(descTextArea) : updateNewDesc(undefined);
  }
  
  const saveCode = () => {
    // TODO: async POST to server
    // save to local state
    const codeTextAreaValue = document.getElementById('code-input').value;
    codeTextAreaValue !== '' ? updateNewCode(codeTextAreaValue) : updateNewCode(undefined);
  }
 
  const saveExample = () => {
    const exampleTextArea = document.getElementById('ex-input').value;
    exampleTextArea !== '' ? updateNewExample(exampleTextArea) : updateNewExample(undefined);
  }
  return (
    <div id="tool-page" className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" checked={drawerOpen} className="drawer-toggle" />
      <div className="drawer-content">
      {/* Page */}
        {/* Header */}
        <div className="flex justify-between items-center m-2">
          <BackButton prevPage={props.prevPage}/>
          {/* Tool Title */}
          <h2 className="border border-black card-title text-4xl ml-2">{props.tool.title}</h2>
          {/* TODO: ADD LIKE AND METADATA BTNS */}
          <div className="flex justify-end">
            <LikeButton liked={newLiked} updateLiked={updateNewLiked}/>
            <label htmlFor="my-drawer-4" onClick={()=>updateDrawerOpen(true)} className="drawer-button btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div>
        </div>
        {/* Description */}
        <ToolContentContainer type="Description" desc={newDesc} saveDesc={saveDesc} />
        {/* Code */}
        <ToolContentContainer type="Code" code={newCode} saveCode={saveCode} />
        {/* Example */}
        <ToolContentContainer type="Example" example={newExample} saveExample={saveExample}/>
        {/* Tests */}
        <ToolContentContainer type="Test"/>
      </div>

      {/* Drawer */}
      <ToolPageDrawer title={newTitle} tags={newTags} closeDrawer={()=> updateDrawerOpen(false)}/>
    </div>
  );
}


const ToolContentContainer = props => {
  const content = () => {
    switch (props.type) {
      case 'Description':
        return <ToolPageDescription desc={props.desc} saveDesc={props.saveDesc}/>
      case 'Code':
        return <ToolPageCode code={props.code} saveCode={props.saveCode}/>
      case 'Example':
        return <ToolPageExample example={props.example} saveExample={props.saveExample}/>
      default:
        return <div>Error reading tool content</div>;
    }
  }
  return (
    <div tabIndex={0} className="collapse"> 
      <input type="checkbox" className="peer"/> 
      <div className="collapse-title border-t border-black rounded-md card-title">
        {props.type}
      </div>
      <div className="collapse-content"> 
        {content()}
      </div>
    </div>
  );
}


export default ToolPage;
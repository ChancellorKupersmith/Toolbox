import { useEffect, useState } from "react";
import TextAreaInputNew, { TextAreaInputEdit, TitleInput } from "../utils/Inputs";
import TestInput from "./NewToolTest";
const NewToolPage = props => {
  /* !!! TODO !!!
   * 1. Tests
   * 2. Tags
   * 3. Liked
   * 4. Backend Funcs
   */
  const [saveDisabled, updateSaveDisable] = useState(true);
  const [title, updateTitle] = useState(undefined);
  const [code, updateCode] = useState(undefined);
  const [desc, updateDesc] = useState(undefined);
  const [example, updateExample] = useState(undefined);
  const [liked, updateLiked] = useState(false);
  const [tests, updateTests] = useState([{title: 'Test Title', content: 'test content'}, {title: 'test title 1', content: 'test content...'}]);
  const [tags, updateTags] = useState(new Set());

  // Only allows tool to be saved if both title and code requirements filled
  useEffect(()=> updateSaveDisable(!title || !code));

  const saveNewTool = () => {
    // TODO: send post request with new tool data
  }


  //Not using events for triggering following change functions to enable clear functionality
  const changeCode = () => {
    const newCode = document.getElementById('code-input').value;
    newCode === '' ? updateCode(undefined) : updateCode(newCode);
  }
  const changeDesc = () => {
    const newDesc = document.getElementById('desc-input').value;
    newDesc === '' ? updateDesc(undefined) : updateDesc(newDesc);
  }
  const changeExample = () => {
    const newExample = document.getElementById('ex-input').value;
    newExample === '' ? updateExample(undefined) : updateExample(newExample);
  }

  return (
  <div className="contents">
    <input type="checkbox" id="new-tool-page" className="modal-toggle" />
    <label htmlFor="new-tool-page" className="modal cursor-pointer">
      <label htmlFor="" className="modal-box relative max-w-none">
        <button onClick={saveNewTool} className={`btn ${saveDisabled ? 'btn-disabled' : 'btn-primary'} w-full`}>Save</button>
        <TitleInput title={title} stateCallback={updateTitle} placeholder="Name of Tool"/>
        <TextAreaType type="Code" changeCode={changeCode}/>
        <TextAreaType type="Description" changeDesc={changeDesc}/>
        <TextAreaType type="Example" changeEx={changeExample}/>
        <TestInput tests={tests} updateTests={updateTests}/>
        <TagsInput tags={tags} updateTags={updateTags}/>
      </label>
    </label>
  </div>
  );
};

const TextAreaType = props => {
  const [expanded, updateExpanded] = useState(false);
  const isExpanded = () => {
    const typeContent = document.getElementById(`textarea-type-content-${props.type}`);
    updateExpanded(window.getComputedStyle(typeContent).maxHeight === 'none');
  }

  const content = () => {
    switch (props.type) {
      case 'Code':
        return <TextAreaInputNew textAreaId={'code-input'} stateCallback={props.changeCode} placeholder="Instructions..."/>
      case 'Description':
        return <TextAreaInputNew textAreaId={'desc-input'} stateCallback={props.changeDesc} placeholder="What does your tool do? Anything to look out for?"/>
      case 'Example':
        return <TextAreaInputNew textAreaId={'ex-input'} stateCallback={props.changeEx} placeholder="Show tool in action for better understanding of context..."/>
      default:
        return <div>Error reading tool content</div>;
    }
  }

  return (
    <div onClick={isExpanded} className="collapse"> 
      <input type="checkbox" className="peer"/> 
      <div className="collapse-title border-t border-l border-r rounded-t-md border-black card-title">
        {/* Card Title */}
        {props.type}
      </div>
      {/* Card Content */}
      <div id={`textarea-type-content-${props.type}`} className={`collapse-content ${expanded ? 'border-l border-r border-b rounded-b-md border-black' : ''}`}> 
        {content()}
      </div>
    </div>
  );
}


const TagsInput = props => {
  const [expanded, updateExpanded] = useState(false);
  const isExpanded = () => {
    const tagsContent = document.getElementById('tags-content');
    updateExpanded(window.getComputedStyle(tagsContent).maxHeight === 'none');
  }

  return (
    <div onClick={isExpanded} className="collapse"> 
      <input type="checkbox" className="peer"/> 
      {/* Card Title */}
      <div className={`collapse-title ${expanded ? 'border-t border-l border-r rounded-t-md' : 'border rounded-md'} border-black card-title`}>Tags</div>
      {/* Card Content */}
      <div id="tags-content" className={`collapse-content ${expanded ? 'border-l border-r border-b rounded-b-md border-black' : ''}`}> 
        
      </div>
    </div>
  );
};

export default NewToolPage;
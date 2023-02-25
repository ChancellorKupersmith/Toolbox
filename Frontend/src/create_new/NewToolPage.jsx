import { useEffect, useState } from "react";
import TextAreaInputNew, { TitleInput } from "../utils/Inputs";
import TestInput from "./NewToolTest";
// constants for clear function
const TITLE_INPUT_ID = 'title-input';
const CODE_INPUT_ID = 'code-input';
const DESC_INPUT_ID = 'desc-input';
const EX_INPUT_ID = 'ex-input';
const TEST_TITLE_INPUT_ID = 'test-title-input';
const TEST_CONTENT_INPUT_ID = 'test-content-input';
const TAG_INPUT_ID = 'tag-input';
const INPUT_IDS = [ TITLE_INPUT_ID, CODE_INPUT_ID, DESC_INPUT_ID, EX_INPUT_ID, TEST_TITLE_INPUT_ID, TEST_CONTENT_INPUT_ID, TAG_INPUT_ID ];

const NewToolPage = props => {
  /* !!! TODO !!!
   * 1. Backend Save function
   */
  const [saveDisabled, updateSaveDisable] = useState(true);
  const [title, updateTitle] = useState(undefined);
  const [code, updateCode] = useState(undefined);
  const [desc, updateDesc] = useState(undefined);
  const [example, updateExample] = useState(undefined);
  const [liked, updateLiked] = useState(false);
  const [tests, updateTests] = useState([]);
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

  const addTag = () => {
    const tagsClone = new Set(tags.values());
    const tag = document.getElementById('tag-input').value;
    tagsClone.add(tag);
    if(tag === 'liked') updateLiked(true);
    setTimeout(()=>updateTags(tagsClone), 50);
  }

  const deleteTag = tag => {
    const tagsClone = new Set(tags.values());
    tagsClone.delete(tag)
    if(tag === 'liked') updateLiked(false);
    setTimeout(()=>updateTags(tagsClone), 50);
  }

  const likeUnlike = () => {
    const tagsClone = new Set(tags.values());
    if(liked) tagsClone.delete('liked');
    else {
      tagsClone.add('liked')
    }
    updateLiked(!liked);
    setTimeout(()=>updateTags(tagsClone), 50);
  }

  const reset = () => {
    for(const id of INPUT_IDS) {
      const inputEl = document.getElementById(id);
      if(inputEl) inputEl.value = '';
    }
    
    updateTitle(undefined);
    updateCode(undefined);
    updateDesc(undefined);
    updateExample(undefined);
    updateLiked(false);
    updateTests([]);
    updateTags(new Set());
  }

  return (
  <div className="contents">
    <input type="checkbox" id="new-tool-page" className="modal-toggle" />
    <label htmlFor="new-tool-page" className="modal cursor-pointer">
      <label htmlFor="" className="modal-box relative max-w-none">
        <button onClick={saveNewTool} className={`btn ${saveDisabled ? 'btn-disabled' : 'btn-primary'} w-full`}>Save</button>
        <TitleInput id={TITLE_INPUT_ID} title={title} stateCallback={updateTitle} placeholder="Name of Tool"/>
        <TextAreaType type="Code" changeCode={changeCode}/>
        <TextAreaType type="Description" changeDesc={changeDesc}/>
        <TextAreaType type="Example" changeEx={changeExample}/>
        <TestInput titleId={TEST_TITLE_INPUT_ID} contentId={TEST_CONTENT_INPUT_ID} tests={tests} updateTests={updateTests}/>
        <TagsInput tags={tags} addTag={addTag} deleteTag={deleteTag} liked={liked} likeUnlike={likeUnlike}/>
        <button onClick={reset} className={`btn btn-outline w-full`}>Clear</button>
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
        return <TextAreaInputNew textAreaId={CODE_INPUT_ID} stateCallback={props.changeCode} placeholder="Instructions..."/>
      case 'Description':
        return <TextAreaInputNew textAreaId={DESC_INPUT_ID} stateCallback={props.changeDesc} placeholder="What does your tool do? Anything to look out for?"/>
      case 'Example':
        return <TextAreaInputNew textAreaId={EX_INPUT_ID} stateCallback={props.changeEx} placeholder="Show tool in action for better understanding of context..."/>
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
    const tagsContent = document.getElementById(TAG_INPUT_ID);
    updateExpanded(window.getComputedStyle(tagsContent).maxHeight === 'none');
  }

  const [inputVal, updateInputVal] = useState(undefined);
  const handleTextChange = event =>
    event.target.value === '' ? updateInputVal(undefined) : updateInputVal(event.target.value);
  
  const tagElements = [];
  let i = 0;
  for(const tag of props.tags){
    tagElements.push(
      <div key={`tag-${i}`} className="badge gap-1 flex">
        <a>{tag}</a>
        <div onClick={()=>props.deleteTag(tag)} className="text-error">x</div>
      </div>
    );
    i++;
  }

  return (
    <div onClick={isExpanded} className="collapse"> 
      <input type="checkbox" className="peer"/> 
      {/* Card Title */}
      <div className={`collapse-title card-title border-black justify-between items-center ${expanded ? 'border-t border-l border-r rounded-t-md' : 'border rounded-md'}`}>
      <span>Tags</span>
      { 
        expanded ? 
          <button 
            onClick={props.likeUnlike}
            className={`z-50 btn btn-warning ${ props.liked ? '' : 'btn-outline'}`}
          >
            <span>{ props.liked ? 'Liked' : 'Like' }</span>
          </button> 
        : undefined }
      </div>
      {/* Card Content */}
      <div id="tags-content" className={`collapse-content ${expanded ? 'border-l border-r border-b rounded-b-md border-black' : ''}`}> 
        {/* Input */}
        <div className="flex justify-between items-center mt-1">
          <button onClick={() => props.addTag()} className={`btn ${inputVal !== undefined ? 'btn-secondary' : 'btn-disabled'}`}>Add</button>
          <input
            id={TAG_INPUT_ID}
            type="text"
            className="input input-ghost text-left w-full"
            placeholder="Tag Name"
            onChange={handleTextChange}
          />
        </div>
        {/* List */}
        <div className="flex flex-wrap m-2 max-h-28 overflow-y-auto">{tagElements}</div>
      </div>
    </div>
  );
};

export default NewToolPage;
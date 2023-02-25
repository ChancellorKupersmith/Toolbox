import { useState } from "react";

const ToolPageDrawer = props => {
  const [titleInputVal, updateTitleInputVal] = useState(props.title);
  const [editTags, updateEditTags] = useState(props.tags);
  const [tagsSynced, updateTagsSynced] = useState(true);

  const addTag = () => {
    const tagsClone = new Set(editTags.values());
    tagsClone.add(document.getElementById('tag-input').value);
    updateEditTags(tagsClone);
    updateTagsSynced(false);
  }

  const deleteTag = tag => {
    const tagsClone = new Set(editTags.values());
    tagsClone.delete(tag)
    updateEditTags(tagsClone);
    updateTagsSynced(false);
  }

  const changeTitle = event => 
    event.target.value === '' ? updateTitleInputVal(undefined) : updateTitleInputVal(event.target.value);

  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-4" onClick={props.closeDrawer} className="drawer-overlay"></label>
      <ul className="flex flex-col flex-wrap p-4 w-80 bg-base-100 text-base-content">
    {/*Drawer Sidebar Content*/}
        <button onClick={props.closeDrawer} className="w-full btn">Close</button>
        <div className="divider mb-0"></div>
        <div className="menu">
          <li className="menu-title text-center">
            <span>Metadata</span>
          </li>
          <div className="mt-2 mb-2 flex">
            <button className={`btn basis-1/3 ${titleInputVal !== props.title || !tagsSynced ? "btn-primary" : "btn-disabled"}`}>Save</button>
            <button className="btn btn-outline basis-1/3 ">Cancel</button>
            <button className="btn btn-error btn-outline basis-1/3 ">Delete</button>
          </div>
        </div>
        <li> <TitleInput title={props.title} changeTitle={changeTitle}/> </li>
        <li> <TagsInput addTag={addTag}/> </li>
        <li> <TagList tags={editTags} deleteTag={deleteTag}/> </li>
        <div className="divider mb-0"></div>
        <li> <ToolStats /></li>
      </ul>
    </div>
  );
}

const TitleInput = props => 
  <div className="mb-2 flex justify-between items-center">
    <label className="max-w-xs label">
      <span className="text-lg tracking-wide font-bold text-primary-focus">Title:</span>
    </label>
    <input 
      type="text"
      className="input input-ghost text-left"
      placeholder={props.title}
      onChange={props.changeTitle}
    />
  </div>;


const TagsInput = props =>{
  const [inputVal, updateInputVal] = useState(undefined);
  const handleTextChange = event =>
    event.target.value === '' ? updateInputVal(undefined) : updateInputVal(event.target.value);

  return(
    <div className="flex justify-between items-center ">
      <button onClick={() => props.addTag()} className={`btn ${inputVal !== undefined ? 'btn-secondary' : 'btn-disabled'}`}>Add</button>
      <input
        id="tag-input"
        type="text"
        className="input input-ghost text-left"
        placeholder="Tag Name"
        onChange={handleTextChange}
      />
    </div>
  );
}

export const TagList = props => {  
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
  return <div className="flex flex-wrap m-2 max-h-28 overflow-y-auto">{tagElements}</div>;
};

const ToolStats = props => {
  return(
    <div className="flex flex-col menu">
      <li className="menu-title text-center">
        <span>Statistics</span>
      </li>
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </div>
  );
}


export default ToolPageDrawer;


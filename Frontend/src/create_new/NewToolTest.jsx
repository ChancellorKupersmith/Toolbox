import { useEffect, useState } from "react";
import TextAreaInputNew, { TitleInput } from "../utils/Inputs";

const TestInput = props => {
  const [expanded, updateExpanded] = useState(false);
  const isExpanded = () => {
    const testContent = document.getElementById('tests-content');
    updateExpanded(window.getComputedStyle(testContent).maxHeight === 'none');
  }

  const [showCreateTest, updateShowCreateTest] = useState(false);
  
  const [newTestContent, updateNewTestContent] = useState(undefined);
  const [newTestTitle, updateNewTestTitle] = useState(undefined);

  const changeTestContent = () => {
    const newTest = document.getElementById(props.contentId).value;
    newTest === '' ? updateNewTestContent(undefined) : updateNewTestContent(newTest);
  }

  const addTest = () => {
    const testsClone = [...props.tests];
    testsClone.push({
      title: newTestTitle,
      content: newTestContent
    });
    updateNewTestContent(undefined);
    updateNewTestTitle(undefined);
    props.updateTests(testsClone);
    // delay closing component to avoid window crashing bug
    setTimeout(()=> updateShowCreateTest(false), 50)
  }

  const updateTest = (updatedTest, index) => {
    const testClone = [...props.tests];
    testClone[index] = updatedTest;
    props.updateTests(testClone);
  }

  const deleteTest = (index) => {
    const testClone = [...props.tests];
    testClone.splice(index, 1);
    setTimeout(()=>props.updateTests(testClone), 50);
  }

  const tests = props.tests.map((test, index)=> <NewTest key={`new-test-${index}`} test={test} index={index} updateTest={updateTest} deleteTest={deleteTest}/>);

  const [saveDisabled, updateSaveDisable] = useState(true);
  useEffect(()=> updateSaveDisable(!newTestTitle || !newTestContent));

  return (
    <div onClick={isExpanded} className="collapse"> 
      <input type="checkbox" className="peer"/> 
      {/* Card Title */}
      <div className={`collapse-title border-t border-l border-r border-black rounded-t-md card-title justify-between`}>
        <span className="">Tests</span>
        <div className="flex">
          {
            showCreateTest && expanded && 
            <button onClick={addTest} className={`z-50 btn ${saveDisabled ? 'btn-disabled' : 'btn-primary'}`}>Save</button>
          }
          <button id='new-cancel-create-test-btn' onClick={()=>updateShowCreateTest(!showCreateTest)} className={`btn ${showCreateTest ? 'btn-outline btn-error' : 'btn-primary'} z-50 ${expanded ? 'flex' : 'hidden'}`}>{showCreateTest ? 'Cancel' : 'New'}</button>
        </div>
      </div>
      {/* Card Contents */}
      <div id="tests-content" className="collapse-content border-l border-r border-black rounded-b-md"> 
        <div className="card">
          <div className="basis-5/6 overflow-auto">
            {
              showCreateTest &&
              <div>
                <TitleInput id={props.titleId} title={newTestTitle} stateCallback={updateNewTestTitle} placeholder="Test Name"/>
                <TextAreaInputNew textAreaId={props.contentId} stateCallback={changeTestContent} placeholder="Tests Code..."/>
              </div>
            }
            {tests}
          </div>
        </div>
      </div>
    </div>
  );
};


const NewTest = props => {
  // TODO: MAKE SAVE AND EDIT BTNS DYNAMIC
  const [expanded, updateExpanded] = useState(false);
  const isExpanded = () => {
    const testContent = document.getElementById(`new-tests-content-${props.index}`);
    updateExpanded(window.getComputedStyle(testContent).maxHeight === 'none');
  }

  const [edit, updateEdit] = useState(false);
  const [editTitle, updateEditTitle] = useState(props.test.title);
  const changeTitle = event => event.target.value === '' ? updateEditTitle(undefined) : updateEditTitle(event.target.value);
  
  const [editContent, updateEditContent] = useState(props.test.content);
  const changeContent = () => {
    const testContent = document.getElementById('edit-test-input').value;
    testContent === '' ? updateEditContent(undefined) : updateEditContent(testContent);
  }
 
  const [saveDisabled, updateSaveDisabled] = useState(true);
  useEffect(()=> updateSaveDisabled((editTitle === props.test.title || editTitle === undefined) && (editContent === props.test.content || editContent === undefined)));

  const saveTest = () => {
    props.updateTest({title: editTitle, content: editContent}, props.index);
    setTimeout(()=> updateEdit(false), 50);
  }
  
  return(
    <div id={`new-test-${props.index}`} onClick={isExpanded} className="collapse"> 
      <input type="checkbox" className="peer"/> 
      {/* Test Title */}
      <div className={`collapse-title ${!expanded ? 'border rounded-md' : 'border-t border-l border-r rounded-t-md'} border-black card-title justify-between`}>
        { 
          edit && expanded ? 
            <TitleEdit title={editTitle} changeTitle={changeTitle} placeholder="Test Name"/> 
          : <span>{props.test.title}</span>
        }
        {
          expanded ? 
          <div className="z-50 flex">
            {
              edit ?
                <div className="flex">
                  <button onClick={saveTest} className={`btn ${saveDisabled ? 'btn-disabled' : 'btn-primary'}`}>Save</button>
                  <button onClick={()=>setTimeout(()=> updateEdit(false), 50)} className="btn btn-outline">Cancel</button>
                </div>
              : <button onClick={()=>setTimeout(()=> updateEdit(true), 50)} className="btn btn-info">Edit</button>
            }
            <button onClick={()=>props.deleteTest(props.index)} className="btn btn-outline btn-error">Delete</button>
          </div>
          : undefined
        }
      </div>
      {/* Test Contents */}
      <div id={`new-tests-content-${props.index}`} className={`collapse-content ${expanded ? 'border-l border-r border-b rounded-b-md border-black' : ''}`}> 
        <div className={`card overflow-auto ${edit ? 'h-52' : 'h-32'}`}>
          {
            edit && expanded ? 
              <TextAreaInputNew textAreaId="edit-test-input" text={editContent} stateCallback={changeContent} placeholder="Tests Code..."/>
            : <p>{props.test.content}</p>
          }
        </div>
      </div>
    </div>
  );
};

const TitleEdit = props => 
  <input 
    type="text"
    className="z-50 input input-ghost text-left w-full border border-black"
    placeholder={props.placeholder}
    onChange={props.changeTitle}
    defaultValue={props.title !== undefined ? props.title : undefined}
  />
;

export default TestInput;
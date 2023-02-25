import { useState } from "react";

const TextAreaInputNew = props => {
  const clear = () => {
    const textInput = document.getElementById(props.textAreaId);
    textInput.value = '';
    props.stateCallback();
  }

  return (
    <div className="m-1 card h-96">
      <div className="mb-2 flex justify-end">
        <button onClick={clear} className="btn btn-square btn-outline w-full">Clear</button>
      </div>
      <textarea
        id={props.textAreaId}
        onChange={props.stateCallback}
        rows={9}
        className="mt-1 textarea textarea-bordered textarea-lg w-full max-w-5xl h-fit bg-transparent"
        placeholder={props.placeholder}
        defaultValue={props.text !== undefined ? props.text : undefined}
      ></textarea>
    </div>
  );
}

export const TextAreaInputEdit = props => {
  const [textAreaText, updateTextAreaText] = useState(props.text);

  const handleChange = event => 
    event.target.value === '' ? updateTextAreaText(undefined) : updateTextAreaText(event.target.value);
  
  const deleteText = () => {
    document.getElementById(props.textAreaId).value = '';
    updateTextAreaText(undefined);
  }
  const saveText = () => {
    const text = document.getElementById(props.textAreaId).value;
    text !== '' ? props.stateCallback(text) : props.stateCallback(undefined);
  }
  return ( 
    <div className="card h-96">
      <div className="mb-2 flex justify-end">
        <button onClick={saveText} className={`mr-0.5 btn btn-square ${textAreaText !== props.text ? "btn-primary" : "btn-disabled"}`}>Save</button>
        <button onClick={deleteText} className="btn btn-square btn-outline ml-0.5">Delete</button>
      </div>
      <textarea
        id={props.textAreaId}
        onChange={handleChange}
        rows={9}
        className="textarea textarea-bordered textarea-lg w-full max-w-5xl h-fit"
        placeholder="What does this app do?"
        value={textAreaText !== undefined ? textAreaText : undefined}>
      </textarea>
    </div>
  );
}

export const TitleInput = props => {
  const changeTitle = event => event.target.value === '' ? props.stateCallback(undefined) : props.stateCallback(event.target.value);
  return (
    <div className="m-1 flex items-center">
      <label className="max-w-xs label">
        <span className="text-lg tracking-wide font-bold text-primary-focus">Title:</span>
      </label>
      <input
        id={props.id}
        type="text"
        className="input input-ghost text-left w-full"
        placeholder={props.placeholder}
        onChange={changeTitle}
        defaultValue={props.title !== undefined ? props.title : undefined}
      />
    </div>
  );
}

export default TextAreaInputNew;
import { useState } from "react";
const ToolPageDescription = props => {
  const [textAreaDesc, updateTextAreaDesc] = useState(props.desc);

  const handleChange = event => 
    event.target.value === '' ? updateTextAreaDesc(undefined) : updateTextAreaDesc(event.target.value);
  
  const deleteDesc = () => {
    document.getElementById('desc-input').value = '';
    updateTextAreaDesc(undefined);
  }

  return ( 
    <div className="card h-96">
      <div className="mb-2 flex justify-end">
        <button onClick={props.saveDesc} className={`mr-0.5 btn btn-square ${textAreaDesc !== props.desc ? "btn-primary" : "btn-disabled"}`}>Save</button>
        <button onClick={deleteDesc} className="btn btn-square btn-outline ml-0.5">Delete</button>
      </div>
      <textarea
        id="desc-input"
        onChange={handleChange}
        rows={9}
        className="textarea textarea-bordered textarea-lg w-full max-w-5xl h-fit"
        placeholder="What does this app do?"
        value={textAreaDesc !== undefined ? textAreaDesc : undefined}>
      </textarea>
    </div>
  );
}

export default ToolPageDescription;
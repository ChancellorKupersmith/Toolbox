import { useState } from "react";

const ToolPageCode = props => {
  const [textAreaCode, updateTextAreaCode] = useState(props.code);
  
  const handleChange = event => 
    event.target.value === '' ? updateTextAreaCode(undefined) : updateTextAreaCode(event.target.value);
  
  const deleteCode = () => {
    document.getElementById('code-input').value = '';
    updateTextAreaCode(undefined);
  }
  return (
    <div className="card h-96">
        <div className="mb-2 flex justify-end">
          <button onClick={props.saveCode} className={`mr-0.5 btn btn-square ${textAreaCode !== props.code ? "btn-primary" : "btn-disabled"}`}>Save</button>
          <button onClick={deleteCode} className="btn btn-square btn-outline ml-0.5 mr-1">Delete</button>
        </div>
        <textarea
          id="code-input"
          onChange={handleChange}
          rows={9}
          className="textarea textarea-bordered textarea-lg w-full max-w-5xl h-fit bg-transparent"
          placeholder="Instructions..."
          value={textAreaCode !== undefined ? textAreaCode : undefined}>
        </textarea>
    </div>
  );
}

export default ToolPageCode;
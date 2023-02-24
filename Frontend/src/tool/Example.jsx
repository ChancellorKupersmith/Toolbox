import { useState } from "react";

const ToolPageExample = props => {
  const [textAreaExample, updateTextAreaExample] = useState(props.example);
  
  const handleChange = event => 
    event.target.value === '' ? updateTextAreaExample(undefined) : updateTextAreaExample(event.target.value);
  
  const deleteExample = () => {
    document.getElementById('ex-input').value = '';
    updateTextAreaExample(undefined);
  }
  return (
    <div className="card h-96">
        <div className="mb-2 flex justify-end">
          <button onClick={props.saveExample} className={`mr-0.5 btn btn-square ${textAreaExample !== props.example ? "btn-primary" : "btn-disabled"}`}>Save</button>
          <button onClick={deleteExample} className="btn btn-square btn-outline ml-0.5 mr-1">Delete</button>
        </div>
        <textarea
          id="ex-input"
          onChange={handleChange}
          rows={9}
          className="textarea textarea-bordered textarea-lg w-full max-w-5xl h-fit bg-transparent"
          placeholder="Example..."
          value={textAreaExample !== undefined ? textAreaExample : undefined}>
          </textarea>
      </div>
  );
}

export default ToolPageExample;
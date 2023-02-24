import { useEffect, useState } from "react";
const NewToolPage = props => {
  const [saveDisabled, updateSaveDisable] = useState(true);
  const [title, updateTitle] = useState(undefined);
  const [code, updateCode] = useState(undefined);
  const [desc, updateDesc] = useState(undefined);
  const [example, updateExample] = useState(undefined);
  const [codeCoverage, updateCodeCoverage] = useState(0);
  const [liked, updateLiked] = useState(false);
  const [tests, updateTests] = useState([]);
  const [tags, updateTags] = useState(new Set());

  // Only allows tool to be saved if both title and code requirements filled
  useEffect(()=> updateSaveDisable(!title || !code));

  const saveNewTool = () => {
    // TODO: send post request with new tool data
  }

  const changeTitle = event => event.target.value === '' ? updateTitle(undefined) : updateTitle(event.target.value);

  //Not using events for following change functions to enable clear functionality
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
        <TitleInput title={title} changeTitle={changeTitle}/>
        <TextAreaInput type="Code:" code={code} changeCode={changeCode}/>
        <TextAreaInput type="Description:" desc={desc} changeDesc={changeDesc}/>
        <TextAreaInput type="Example:"example={example} changeEx={changeExample}/>
        <TestInput tests={tests} updateTests={updateTests}/>
        <TagsInput tags={tags} updateTags={updateTags}/>
      </label>
    </label>
  </div>
  );
};

const TitleInput = props =>
  <div className="m-1 flex items-center">
    <label className="max-w-xs label">
      <span className="text-lg tracking-wide font-bold text-primary-focus">Title:</span>
    </label>
    <input 
      type="text"
      className="input input-ghost text-left w-full"
      placeholder="Name of Tool"
      onChange={props.changeTitle}
    />
  </div>;

const TextAreaInput = props => {
  const [open, updateOpen] = useState(props.type === 'Code');

  const content = () => {
    switch (props.type) {
      case 'Code:':
        return <CodeInput code={props.code} changeCode={props.changeCode}/>
      case 'Description:':
        return <DescInput desc={props.desc} changeDesc={props.changeDesc}/>
      case 'Example:':
        return <ExampleInput example={props.example} changeEx={props.changeEx}/>
      default:
        return <div>Error reading tool content</div>;
    }
  }

  return (
    <div className="collapse"> 
      <input type="checkbox" className="peer"/> 
      <div className={`collapse-title border-t border-l border-r border-black rounded-t-md card-title`}>
        {/* Card Title */}
        {props.type}
      </div>
      <div className="collapse-content border-l border-r border-black rounded-b-md"> 
        {content()}
      </div>
    </div>
  );
};

const CodeInput = props => {
  const clear = () => {
    const codeInput = document.getElementById('code-input');
    codeInput.value = '';
    props.changeCode();
  }

  return (
    <div className="card h-96">
      <div className="mb-2 flex justify-end">
        <button onClick={clear} className="btn btn-square btn-outline w-full">Clear</button>
      </div>
      <textarea
        id="code-input"
        onChange={props.changeCode}
        rows={9}
        className="mt-1 textarea textarea-bordered textarea-lg w-full max-w-5xl h-fit bg-transparent"
        placeholder="Instructions..."
      ></textarea>
    </div>
  );
};

const DescInput = props => {
  const clear = () => {
    const descInput = document.getElementById('desc-input');
    descInput.value = '';
    props.changeDesc();
  }

  return (
    <div className="card h-96">
      <div className="mb-2 flex justify-end">
        <button onClick={clear} className="btn btn-square btn-outline w-full">Clear</button>
      </div>
      <textarea
        id="desc-input"
        onChange={props.changeDesc}
        rows={9}
        className="mt-1 textarea textarea-bordered textarea-lg w-full max-w-5xl h-fit bg-transparent"
        placeholder="What does your tool do? Anything to look out for?"
      ></textarea>
    </div>
  );
}

const ExampleInput = props => {
  const clear = () => {
    const exInput = document.getElementById('ex-input');
    exInput.value = '';
    props.changeEx();
  }

  return (
    <div className="card h-96">
      <div className="mb-2 flex justify-end">
        <button onClick={clear} className="btn btn-square btn-outline w-full">Clear</button>
      </div>
      <textarea
        id="ex-input"
        onChange={props.changeEx}
        rows={9}
        className="mt-1 textarea textarea-bordered textarea-lg w-full max-w-5xl h-fit bg-transparent"
        placeholder="Show tool in action for better understanding of context..."
      ></textarea>
    </div>
  );
};

const TestInput = props => {
  return <div></div>;
};

const TagsInput = props => {
  return <div></div>;
};

export default NewToolPage;
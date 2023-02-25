import { useEffect, useState } from "react";

const ToolListElement = props => {
  const openTool = () => {
    // Select Tool
    props.selectTool(props.tool);
    // Change page
    props.changePage('tool');
  }
  return (
    <li>
      <ToolListElementMinimized tool={props.tool} resultIndex={props.resultIndex} openTool={openTool}/>
    </li>
  );
}

const ToolListElementExpanded = props => {

};

const ToolListElementMinimized = props => {
  const [curTimesUsed, updateTimesUsed] = useState(props.tool.times_used);
  const incrementTimesUsed = () => updateTimesUsed(curTimesUsed + 1);

  return(
    <div id={`tool-list-element-mini-container-${props.resultIndex}`} className="m-2 border border-black bg-secondary grid grid-cols-4 items-start">
      <ToolListElementTitle id={`tool-title-${props.resultIndex}`} toolTitle={props.tool.title}/>
      <ToolListElementActions
        id={`tool-actions-${props.resultIndex}`}
        tool={props.tool}
        openTool={props.openTool}
        incrementTimesUsed={incrementTimesUsed}
      />
      <ToolListElementContents 
        id={`tool-contents-${props.resultIndex}`}
        desc={props.tool.description} 
        code={props.tool.code}
        example={props.tool.example}
        tags={props.tool.tags}
      />
      <ToolListElementStats
        id={`tool-stats-${props.resultIndex}`}
        codeCoverage={props.tool.code_coverage} 
        timesUsed={curTimesUsed}
      />
    </div>
  );
};

const ToolListElementTitle = props => <h2 id={props.id} className="card-title text-success-content col-span-2">{props.toolTitle}</h2>;

const ToolListElementActions = props => {
  // Show 'Copied!' toast shortly when copy btn clicked
  const [copied, showToast] = useState(false);
  useEffect(()=>{
    copied ? setTimeout(()=>{
      showToast(false);
    }, 500) : undefined;
  })

  const copyToolCode = ()=>{
    // Copy tool code to clipboard
    navigator.clipboard.writeText(props.tool.code);
    // increment times used client side
    props.incrementTimesUsed();
    // TODO: and server side
    showToast(true);
  }

  return (
    <div id={props.id} className="col-start-4 flex justify-end">
      <div className={copied ? "tooltip" : ""} data-tip='Copied!'>
        <button className="btn btn-primary  ml-0.5 mr-0.5" onClick={copyToolCode}>Copy</button>
      </div>
      <button className="btn btn-info  ml-0.5" onClick={props.openTool}>Edit</button>
    </div>
  );
}
// .navbar {
//   display: flex;
//   align-items: center;
//   padding: var(--navbar-padding, 0.5rem);
//   min-height: 4rem/* 64px */;
//   width: 100%;
// }

const ToolListElementContents = props => {
  const [tabView, updateTabView] = useState(0);

  const showTabView = ()=> {
    switch(tabView){
      case 0:
        return <ToolListTextContent text={props.desc}/>
      case 1:
        return <ToolListTextContent text={props.code}/>
      case 2:
        return <ToolListTextContent text={props.example}/>
      case 3:
        return <ToolListTagsContent id={props.id} tags={props.tags}/>
      default:
        return (<div>Not valid tab</div>);
    }
  }

  return (
    <div className="card col-span-3 flex flex-col border border-black">
      <div>
        <div className="tabs rounded-t-2xl bg-white">
          <a className={`tab tab-bordered ${tabView === 0? 'tab-active' : ''}`} onClick={() => updateTabView(0)}>Description</a> 
          <a className={`tab tab-bordered ${tabView === 1? 'tab-active' : ''}`} onClick={() => updateTabView(1)}>Code</a> 
          <a className={`tab tab-bordered ${tabView === 2? 'tab-active' : ''}`} onClick={() => updateTabView(2)}>Example</a>
          <a className={`tab tab-bordered ${tabView === 3? 'tab-active' : ''}`} onClick={() => updateTabView(3)}>Tags</a>
        </div>
      </div>
      {showTabView()}
    </div>
  );
}

const ToolListTextContent = props =>
  <div className="h-40 bg-secondary-focus rounded-b-2xl overflow-y-auto">
    <p className="ml-1 break-words">{props.text}</p>
  </div>;

export const ToolListTagsContent = props =>{
  const tagsList = [];
  let i = 0;
  for(const tag of props.tags){
    tagsList.push(
      <div id={`${props.id}-tool-tag-${i}`} className="badge gap-1">
        {tag}
      </div>
    );
    i++
  }

  return <div className="flex flex-wrap m-2 h-28 overflow-y-auto">{tagsList}</div>;
}
// ----------------
// Stats


const ToolListElementStats = props => {
  return (
    <div className="grid-cols-4 h-full flex flex-col items-center">
      {/* Times Used Stat */}
      <div className="btn w-full flex flex-col items-center h-1/2 m-0.5">
        <div className="stat-value @lg:text-3xl @md:text-2xl">{props.timesUsed}</div>
        <div className="opacity-60">Times Used</div>
      </div>
      {/* Code Coverage */}
      <div className="btn w-full flex flex-col h-1/2 m-0.5">
        <div className="stat-value @lg:text-3xl @md:text-2xl">{`${props.codeCoverage}%`}</div>
        <div className=" opacity-60 @md:text-xs">Code Coverage</div>
      </div>
    </div>
  );
}
export default ToolListElement;
const BackButton = props => <button id="back-btn" className="btn btn-primary" onClick={()=>props.prevPage()}>Back</button>;

export const HomeButton = props => <button id="home-btn" className="basis-1/12 card-title mt-5 text-4xl text-success-content" onClick={()=>props.changePage('home')}>Toolbox</button>;
export const LikeButton = props => {
  const handleClick = () => {
    console.log(props.liked)
    props.updateLiked(!props.liked);
  }
  return (
    <button onClick={handleClick} className={`btn btn-error  ${props.liked ? '' : 'btn-outline'}`}>{props.liked ? 'Liked' : 'Like'}</button>
  );
}

export const SaveButton = props => {

  return(
    <button onClick={props.stateCallback} className={`btn ${props.saveDisabled ? 'btn-disabled' : 'btn-primary'}`}>Save</button>
  );
}

export const EditButton = props => <button>Edit</button>;

export const Toggle = props =>
  <div className="form-control w-52">
    <label className="cursor-pointer label flex justify-between w-full">
      <span className="label-text">{props.label}</span> 
      <input type="checkbox" onClick={props.callback} className="toggle toggle-primary" defaultChecked={props.defaultChecked}/>
    </label>
  </div>
;

export default BackButton;
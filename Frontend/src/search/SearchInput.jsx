const SearchInput = props => {
  const handleOnChange = () => {};
  return (
    <div className="flex">
      <input type="text" onChange={handleOnChange} placeholder="Search…" className="input input-primary" />
      <button className=" ml-1.5 btn btn-square btn-primary" onClick={()=> props.changePage('search')}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22.25 22l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </button>
    </div>
  );
};

export default SearchInput;
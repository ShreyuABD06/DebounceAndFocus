import React, {useState, useRef, useEffect} from 'react';
import { timeout } from 'workbox-core/_private';
import axios from 'axios';
import DisplayData from './DisplayData';
import './App.css';


function ReactForm() {

const [searchContent, setSearchContent] = useState('');
 const [data, setData] = useState(null);


const nameRef = useRef();
const searchText = useRef();
const emailRef = useRef();
const passwordRef = useRef();

const handleSubmit = (e) => {
    e.preventDefault();
    console.log(nameRef.current.value);
    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);
};

const handleReset = () => {
    nameRef.current.value ='';
    emailRef.current.value='';
    passwordRef.current.value='';
};
// jayashree.kanthavel@shopf.co & ramprasad@shopf.co

const handleSearch = (e) => {
  console.log(searchText.current.value);
  const search = searchText.current.value;
  const API_KEY = 'MfwZLqWeh1YPrvrlULOqgzZfOlRkIR7r';
  const baseUrl = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search}`;
  axios.get(`${baseUrl}`).then((response) => {
          setData(response.data.data);
          console.log(data);
        });  
};

const debounce = (callback, delay, immediate) => {
  // add your debounce logic here
  //Immediate added for scalability in case if want to be called right now
  var timeOut;
  return function executedFunction(){
      var context = this;
      var args = arguments;
      var later = function(){
          timeOut = null;
          if(!immediate){
              callback.apply(context,args);
          }
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeOut);
      timeOut = setTimeout(later, delay);
      if(callNow){
          callback.apply(context,args);
      }
  };
};
const debouncedSearch = debounce(handleSearch, 1000);

  return (
      <div>
    <div>
    <p>part 1</p>
            <label>
              Name:
              <input ref={nameRef} placeholder="name" type="text" />
            </label>
            <label>
              Email:
              <input ref={emailRef} placeholder="email" type="text" />
            </label>
    
    
            <label>
              Password:
              <input ref={passwordRef} placeholder="password" type="text" />
            </label>
            <hr />
            <button onClick = {()=>nameRef.current.focus()}>Focus Name Input</button>
            <button onClick = {()=>emailRef.current.focus()}>Focus Email Input</button>
            <button onClick = {()=>passwordRef.current.focus()}>Focus Password Input</button>
            <hr />
            <button onClick = {handleSubmit}>Submit</button>
            <button onClick = {handleReset}>Reset</button>
          </div>
          <div>
            <hr />
            <p>part 2</p>
            <label>
              Search:
              <input
                ref= {searchText}
                placeholder="search with debounce"
                type="text"
                onChange={debouncedSearch}
              />
            </label>
        </div>
        <hr />        
        <div className="grid-data">
        {data && data.map((d=>(
            <div key={d.id} >
                <img src={d.url} alt="Img"/>
            </div>
        )))}
        </div>
        </div>
  );
}

export default ReactForm;
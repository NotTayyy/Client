import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import './Style.css'

function App() {

  const nameRef = useRef();
  const ageRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios.get('https://54piqmbh53.execute-api.us-east-2.amazonaws.com/users').then((res) => {
      setUserList(res.data);
    })
  }, []);

  const createUser = () => {
    axios.post("https://54piqmbh53.execute-api.us-east-2.amazonaws.com/users/new", {name: nameRef.current.value, age: ageRef.current.value, username: usernameRef.current.value, email: emailRef.current.value}).then((res) => {
      setUserList([...userList, {name: nameRef.current.value, age: ageRef.current.value, username: usernameRef.current.value, email: emailRef.current.value}])
      .then(() => {
        nameRef.current.value=null;
        ageRef.current.value=null;
        usernameRef.current.value=null;
        emailRef.current.value=null;
      })
    });

  };

  const removeUser = (id) => {
    axios.delete("https://54piqmbh53.execute-api.us-east-2.amazonaws.com/users/remove", {data: {id: id}}).then((res) => {
      const newList = userList.filter(userList => userList._id !== id);
      setUserList(newList)
  })}

  return (
    <>
      <div className='userDisplay'>
        {userList.map((user) => {
          return (
            <div className="userTemplate" key={user._id}>
              <div className='nameAge'>
                <h1>Name: {user.name}</h1>
                <h1>Age: {user.age}</h1>
              </div>
            <br></br>
              <h1>Username: {user.username}</h1>
              <h1>E-Mail: { user.email || "Nothing Found!"}</h1>
              {user.dateCreated ? (<p>Date Created: {user.dateCreated}</p> ) : (<br/>)}
              <button onClick={() => removeUser(user._id)}>DELETE USER</button>
            </div>
          )
        })}
      </div>

      <div className="userSubmit">
        <div>
          <input ref={nameRef} type="text" placeholder="Name..."/>
          <input ref={ageRef} type="number" placeholder="Age..." />
          <input ref={usernameRef} type="text" placeholder="Username..."/>
          <input ref={emailRef} type="email" placeholder="E-Mail..."/>
        </div>
        <button onClick={createUser}> Create User </button>
      </div>
    </>
  );
}

export default App;

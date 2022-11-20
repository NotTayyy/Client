import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import './Style.css'

function App() {
  const [userList, setUserList] = useState([]);
  const [name, setName] = useState([""])
  const [age, setAge] = useState([0])
  const [username, setUsername] = useState([""])
  const [email, setEmail] = useState([""])

  const nameRef = useRef();
  const ageRef = useRef();
  const usernameRef = useRef();
  const mailRef = useRef();

  useEffect(() => {
    axios.get('http://localhost:4000/users').then((res) => {
      setUserList(res.data);
    })
  }, []);

  const createUser = () => {
    axios.post("http://localhost:4000/users/new", {name: name, age: age, username: username, email: email}).then((res) => {
      setUserList([...userList, {name: name, age: age, username: username, email: email}])
    });
    nameRef.current.value=null;
    ageRef.current.value=null;
    usernameRef.current.value=null;
    mailRef.current.value=null;
  };

  const removeUser = (id) => {
    axios.delete("http://localhost:4000/users/remove", {data: {id: id}}).then((res) => {
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
              <h1>E-Mail: { user.email }</h1>
              {user.dateCreated ? (<p>Date Created: {user.dateCreated}</p> ) : (<br/>)}
              <button onClick={() => removeUser(user._id)}>DELETE USER</button>
            </div>
          )
        })}
      </div>

      <div className="userSubmit">
        <div>
          <input ref={nameRef} type="text" placeholder="Name..." onChange={(e) => setName(e.target.value)}/>
          <input ref={ageRef} type="number" placeholder="Age..." onChange={(e) => setAge(e.target.value)}/>
          <input ref={usernameRef} type="text" placeholder="Username..." onChange={(e) => setUsername(e.target.value)}/>
          <input ref={mailRef} type="text" placeholder="E-Mail..." onChange={(e) => setEmail(e.target.value.toLowerCase())}/>
        </div>
        <button onClick={createUser}> Create User </button>
      </div>
    </>
  );
}

export default App;

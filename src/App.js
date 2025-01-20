import React, { useEffect, useState } from "react";
import "./App.css";
import { Button, EditableText, InputGroup, Toaster } from "@blueprintjs/core";

const AppToaster = Toaster.create({
  position: "top",
});

function App() {
  const [user, setuser] = useState([]);
  const [newname, setname] = useState("");
  const [newemail, setemail] = useState("");
  const [newwebsite, setwebsite] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((responce) => responce.json())
      .then((json) => setuser(json));
  }, []);

  function adduser() {
    const name = newname.trim();
    const email = newemail.trim();
    const website = newwebsite.trim();

    if (name && email && website) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "post",
        body: JSON.stringify({
          name,
          email,
          website,
        }),
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      })
        .then((responce) => responce.json())
        .then((data) => {
          setuser([...user, data]);
          AppToaster.show({
            message: "user add successfully",
            intent: "success",
            timeout: "3000",
          });
          setname("");
          setemail("");
          setwebsite("");
        });
    }
  }

  function onChangeHandler(id, key, value) {
    setuser((user) => {
        return user.map((user) => {
        return user.id === id ? {...user, [key]: value } : user;
      });
    });
  }
  function update(id) {
    const userData = user.find((userData) => userData.id === id); 
    fetch(`https://jsonplaceholder.typicode.com/users/10/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        
        AppToaster.show({
          message: "User updated successfully",
          intent: "success",
          timeout: 3000,
        });
      });
  }

  function deleteuser(id){
    fetch(`https://jsonplaceholder.typicode.com/users/10/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setuser((user)=>{
         return user.filter(userdata=>userdata.id !==id)
        })
       
        AppToaster.show({
          message: "User deleted successfully",
          intent: "success",
          timeout: 3000,
        });
      });
    
  }

  return (
    <>
   
      <table>
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Website</th>
          <th>Action</th>
        </thead>
        <tbody>
          {user.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <EditableText
                  onChange={(value) => onChangeHandler(user.id, "name", value)}
                  value={user.name}
                />
              </td>
              <td>
                <EditableText
                  onChange={(value) => onChangeHandler(user.id, "email", value)}
                  value={user.email}
                />
              </td>
              <td>
                <EditableText
                  onChange={(value) =>
                    onChangeHandler(user.id, "website", value)
                  }
                  value={user.website}
                />
              </td>
              <td>
                <Button
                  intent="primary"
                  onClick={() => update(user.id)}
                >
                  Update
                </Button>
                &nbsp;
                <Button
                 intent="danger"
                  onClick={() => deleteuser(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          {/* <tr></tr> */}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <InputGroup
                value={newname}
                onChange={(e) => setname(e.target.value)}
                placeholder="Enter Your Name..."
              />
            </td>

            <td>
              <InputGroup
                value={newemail}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Enter Your Email"
              />
            </td>

            <td>
              <InputGroup
                value={newwebsite}
                onChange={(e) => setwebsite(e.target.value)}
                placeholder="Enter Your website"
              />
            </td>

            <td>
              <Button intent="success" onClick={adduser}>
                Add user
              </Button>
            </td>
          </tr>
        </tfoot>
      </table>
    
    </>
  );
}

export default App;

import { use, useState } from "react";
import Axios from "axios"
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const [employeeList, setEmployeeList] = useState([]);
  const getEmployee = () => {
    Axios.get('http://localhost:5500/books').then((response) => {
      setEmployeeList(response.data);
    });
  }

  const Add_Book = () => {
    Axios.post('http://localhost:5500/books', {
      title:title,
      author: author
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          title:title,
          author: author
        }
      ]);
    })
  }
  return (
    <div className="container">
      <h1>Employee Information</h1>
      <div className="information">
        <form action="">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title :
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter title"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              name="title"
              id="title"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Author :
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter author"
              onChange={(event) => {
                setAuthor(event.target.value);
              }}
              name=""
              id=""
            />
          </div>
          <button className="btn btn-success mt-3" onClick={Add_Book}>Add Book</button>
        </form>
      </div>
      <hr />
      <div className="employee">
        <button className="btn btn-primary" onClick={getEmployee}>Show Book</button>
        {employeeList.map((val, key) => {
          return (
            <div className="employee card mt-3">
              <div className="card-body text-left">
                <p className="card-text">Title: {val.title}</p>
                <p className="card-text">Author: {val.author}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;

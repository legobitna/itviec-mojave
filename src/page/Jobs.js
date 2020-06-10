import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";

const QUERYSTR_PREFIX = "q";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

let originalList = [];
export default function Jobs() {
  let query = useQuery();
  let history = useHistory();
  let [jobList, setJobList] = useState(null); // show jobList
  let [keyword, setKeyword] = useState(query.get(QUERYSTR_PREFIX)); // capture keyword from input

  const getData = async () => {
    let url = `http://localhost:3001/jobs`;
    let data = await fetch(url);
    let result = await data.json();
    console.log("rr", result);
    originalList = result; // for keeping the original data
    setJobList(result); // for showing the data
    console.log("hehe", keyword);

    // if keyword is null then just show everything,
    // if keywrod is something then just show the filtered data by tht keyword
    searchByKeyword();
  };

  const searchByKeyword = (e) => {
    // there are 2 places to call this search Function
    // 1. from Searchbox
    // 2. from getData (when you first time load)
    // ** Issue: getData, doesnt give you the event  + getData, doesnt need to do history.push

    if (e) {
      // when we use the search Function
      e.preventDefault();
      history.push(`/jobs/?${QUERYSTR_PREFIX}=${keyword}`);
    }

    let filteredList = originalList; // this is first time when we load the page
    if (keyword) {
      // when we have keyword
      filteredList = originalList.filter((item) =>
        item.title.includes(keyword)
      );
    }
    setJobList(filteredList);
  };

  useEffect(() => {
    getData();
  }, []);

  if (jobList == null) {
    return <div>loading</div>;
  }
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline onSubmit={(e) => searchByKeyword(e)}>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button variant="outline-success" type="submit">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      {jobList.map((item) => {
        return <h2>{item.title}</h2>;
      })}
    </div>
  );
}

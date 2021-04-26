import { useState } from "react";
import { Form, Button } from "react-bootstrap";
const SearchBox = ({ history }) => {
  const [keyword, setkeyWord] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
    setkeyWord("");
  };
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setkeyWord(e.target.value)}
        value={keyword}
        placeholder="Search Products...."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;

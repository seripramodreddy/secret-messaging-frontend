import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function DeleteMessage() {
  const history = useHistory();
  const [secretKey, setSecretKey] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [btnHidden, setBtnHidden] = useState(true);

  const handleDeleteMessage = () => {
    fetch("https://secretmessagingbackend.herokuapp.com/delete-message", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secretKey: secretKey,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setResponse(res.message);
        setBtnHidden(true);
      });
  };

  useEffect(() => {
    if (secretKey.length > 0 && password.length > 0) {
      setBtnHidden(false);
    } else {
      setBtnHidden(true);
    }
  }, [secretKey, password]);

  return (
    <div className="container mt-4">
      <div>
        <h1 className="d-inline-block">Delete Message</h1>
        <button
          className="btn btn-primary mt-2 mb-5"
          style={{ float: "right" }}
          onClick={() => history.push("/")}
        >
          Back
        </button>
        <label className="input-group" htmlFor="key">
          Key :{" "}
        </label>
        <input
          type="text"
          id="key"
          className="form-control"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
        />
        <br />
        <label className="input-group" htmlFor="pass">
          Password :{" "}
        </label>
        <input
          type="text"
          id="pass"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {response.length > 0 && (
          <h5
            className="mt-3 px-3 py-2 bg-secondary border rounded"
            style={{ width: "max-content", color: "#FFF" }}
          >
            Message: {response}
          </h5>
        )}
        <button
          className="btn btn-danger mt-4"
          disabled={btnHidden}
          onClick={handleDeleteMessage}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
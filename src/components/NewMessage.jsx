import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function NewMessage() {
  const history = useHistory();

  // Key password targetMail targetUrl message
  const [randomString, setRandomString] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [targetMail, setTargetMail] = useState("");
  const [rootUrl, setRootUrl] = useState("");
  const [btnHidden, setBtnHidden] = useState(true);

  useEffect(() => {
    setRandomString(Math.random().toString(36).substring(5).toUpperCase());
    setRootUrl(`${window.location.href}message/`);
  }, []);

  useEffect(() => {
    if (
      randomString.length > 0 &&
      password.length > 0 &&
      message.length > 0 &&
      targetMail.length > 0 &&
      rootUrl.length > 0
    ) {
      setBtnHidden(false);
    } else {
      setBtnHidden(true);
    }
  }, [randomString, password, message, targetMail, rootUrl]);

  const handleMessageSubmit = () => {
    fetch("https://secretmessagingbackend.herokuapp.com/create-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        randomKey: randomString,
        password: password,
        message: message,
        targetUrl: rootUrl,
        targetMail: targetMail,
      }),
    })
      .then((res) => res.json())
      .then(() => history.go(0))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="App container mt-5" style={{ textAlign: "left" }}>
        <div>
          <h1 className="mt-3 d-inline-block mb-3">Secret message service</h1>
          <button
            className="btn btn-danger mt-4 mb-3"
            style={{ float: "right" }}
            onClick={() => history.push("/delete")}
          >
            Delete message
          </button>
          <label className="input-group" htmlFor="random">
            Key :{" "}
          </label>
          <input
            id="random"
            className="form-control"
            type="text"
            value={randomString}
            onChange={(e) => setRandomString(e.target.value)}
          />
          <br />
          <label className="input-group" htmlFor="password">
            Password :
          </label>
          <input
            type="text"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <label htmlFor="message" className="input-group">
            Message
          </label>
          <textarea
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <br />
          <label className="input-group" htmlFor="targetMail">
            Target:{" "}
          </label>
          <input
            type="email"
            className="form-control"
            id="targetMail"
            value={targetMail}
            onChange={(e) => setTargetMail(e.target.value)}
          />
          <br />
          <label htmlFor="url">Root Url : </label>
          <input
            type="text"
            className="form-control"
            id="url"
            value={rootUrl}
            onChange={(e) => setRootUrl(e.target.value)}
          />
          <button
            disabled={btnHidden}
            className="btn btn-primary mt-3"
            onClick={handleMessageSubmit}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
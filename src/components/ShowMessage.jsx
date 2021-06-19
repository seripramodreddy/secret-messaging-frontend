import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function ShowMessage() {
  const history = useHistory();

  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const urlString = window.location.href;
    const url = new URL(urlString);
    setId(url.searchParams.get("rs"));
  }, []);

  useEffect(() => {
    if (id.length > 0) {
      fetch(`https://secretmessagingbackend.herokuapp.com/message-by-id/${id}`)
        .then((res) => res.json())
        .then((res) => {
          setMessage(res.result[0]?.message);
          setPageLoaded(true);
        });
    }
  }, [id]);

  return (
    <div>
      {message?.length > 0 && pageLoaded ? (
        <div className="container mt-3">
          <h1>Message</h1>
          <div className="text-center px-5">
            <h4>This is a creepy secret message for you!!!</h4>
            <div className="bg-warning border rounded text-center p-5 m-5">
              <h3>{message}</h3>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => history.push("/")}
            >
              Create a secret message
            </button>
          </div>
        </div>
        
      ) : (
        pageLoaded && (
          <div className="container mt-4">
            <h1>OOPSSSS!!!!</h1>
            <div
              className="text-center mt-5 p-5 bg-danger border rounded"
              style={{ color: "#FFF" }}
            >
              <h4>
                The message is been deleted by the user or the message doesn't
                exists!
              </h4>
            </div>
            <div className="text-center mt-3">
              <button
                className="btn btn-secondary"
                onClick={() => history.push("/")}
              >
                Create a secret message
              </button>
            </div>
          </div>
        )
      )}
    </div>
  )};

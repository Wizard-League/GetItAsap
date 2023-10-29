import React, { useState } from "react";
import Navbar from "./Navbar";

export default function Contact() {
  const [text, settext] = useState("");
  return (
    <>
      <Navbar />
      <div className="cntainer" style={{ margin: "2rem" }}>
        <h1>Contact Us</h1>
        <pre>
          <h6>
            <strong>Email :</strong>{" "}
            <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#drafts?compose=CllgCJlKFcDVVzZdtrpLMkkDlRPrZJHzRmjmwnPZxZRDkcWFDGWKfkQVwfXHHssbtTCggsGXQkL">
              dhanraj_k@hs.iitr.ac.in
            </a>
          </h6>
        </pre>
        <pre>
          <h6>
            <strong>Phone :</strong> 7004570779
          </h6>
        </pre>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">
            <h4>Feedback</h4>
          </label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            value={text}
            onChange={(e)=>{settext(e.target.value)}}
            rows="10"
            style={{
              borderTop: "8px solid #7393B3",
              borderRight: "8px solid #7393B3",
              borderLeft: "8px solid #7393B3",
              borderBottom: "8px solid #7393B3",
            }}
          ></textarea>
        </div>
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => {
            settext("");
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
}

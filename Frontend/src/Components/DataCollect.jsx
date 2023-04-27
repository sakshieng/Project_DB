import React from "react";
import "../Styles/DataCollect.css";
import { useState } from "react";
import axios from "axios";
import logoImg from "./logo.png"
import Thanks from "./Thanks";

function DataCollect() {
  //All Form inputs
  const [userdata, setData] = useState({
    email: "",
    queTitle: "",
    queTopic: "",
    queLink: "",
    queCategory: "",
  });
  const [renderview, setRender] = useState(0); //thannks after submission
  const [errors, setError] = useState(false); //eroor if empty field

  //handling onchange of inputBox
  const handleData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setError(false);
    setData({ ...userdata, [name]: value });
  };

  //handling onclick of submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, queTitle, queTopic, queLink, queCategory } = userdata;
    if (
      email.length === 0 ||
      queLink.length === 0 ||
      queTitle.length === 0 ||
      queTopic.length === 0 ||
      queCategory.length === 0
    ) {
      setError(true);
    } else {
      setRender((prev) => 1);
    }
    try {
      //"" : url goes here
      const res = await axios.post("localhost:5000/api/v1/question", {
        email: email,
        title: queTitle,
        topic: queTopic,
        link: queLink,
        difficulty: queCategory,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
      setError(error.message);
    }
  };

  if (renderview === 1) {
    return (
      <>
        <Thanks />
      </>
    );
  } else {
    return (
      <div className="container">
        <img src={logoImg} alt="LogoHere" className="logo" />
        <h2 className="heading">Question Bank</h2>
        <form method="POST">
          <div className="user-details">
            <div className="input-box">
              <span className="details">Email : </span>
              <input
                type="text"
                name="email"
                placeholder="Enter Email"
                value={userdata.email}
                onChange={handleData}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Question Title :</span>
              <input
                type="text"
                placeholder="Enter Question Title"
                name="queTitle"
                value={userdata.queTitle}
                onChange={handleData}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Topic :</span>
              <input
                type="text"
                placeholder="Enter Topic"
                name="queTopic"
                value={userdata.queTopic}
                onChange={handleData}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Question Link :</span>
              <input
                type="text"
                placeholder="Link of question"
                name="queLink"
                value={userdata.queLink}
                onChange={handleData}
                required
              />
            </div>
            <div className="input-box">
              <span className="details2">Difficulty Level : </span>
              <div className="radio-group">
                <input
                  type="radio"
                  id="option-one"
                  name="queCategory"
                  value="Hard"
                  onChange={handleData}
                />
                <label htmlFor="option-one">Hard</label>
                <input
                  type="radio"
                  id="option-two"
                  name="queCategory"
                  value="Medium"
                  onChange={handleData}
                />
                <label htmlFor="option-two">Medium</label>
                <input
                  type="radio"
                  id="option-three"
                  name="queCategory"
                  value="Easy"
                  onChange={handleData}
                />
                <label htmlFor="option-three">Easy</label>
              </div>
            </div>
            {errors ? (
              <label className="error">Please Fill All The Fields!</label>
            ) : (
              ""
            )}
            <div className="input-box2">
              <input
                type="submit"
                value="Submit"
                name="sendData"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default DataCollect;

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Detail(props) {
  const { id } = useParams();

  const getDetailData = async () => {
    let url = `http://localhost:3001/jobs/${id}`;
   // let deployurl = `https://my-json-server.typicode.com/legobitna/itviec/jobs/${id} `
    let data = await fetch(url);
    let result = await data.json();
    console.log("show result", result);
  };

  useEffect(() => {
    getDetailData();
  }, []);

  return (
    <div>
      <h1>This is Detail page </h1>
      <h2>your ID is{id}</h2>
    </div>
  );
}

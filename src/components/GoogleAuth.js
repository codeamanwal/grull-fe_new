import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

const { BACKEND_API_URL } = process.env;

export default function GoogleAuth() {
    let location = useLocation();
    console.log("location ", location);
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    useEffect(() => {
      const values = queryString.parse(location.search);
      console.log("google values is : ", values)
      const code = values.code ? values.code : null;
  
      if (code) {
        onGogglelogin();
      }
    }, []);
  
    const googleLoginHandler = async (code) => {
      return await axios
        .get(`http://127.0.0.1:8000/api/auth/google/${code}`)
        .then((res) => {
            console.log("Google res is : ", res)
          localStorage.setItem("goggleFirstName", res.data.user.first_name);
          navigate('/')
          return res.data;
        })
        .catch((err) => {
          setError(err);
          return err;
        });
    };
  
    const onGogglelogin = async () => {
      const response = await googleLoginHandler(location.search);
      console.log("Google response is : ", response)
      
    }
  
    return (
      <div>
            Just a moment. 
            Loading ...
      </div>
    );
}

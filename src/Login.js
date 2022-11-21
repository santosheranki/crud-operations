import "./App.css";
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute", top: "50%",left: "50%",transform: "translate(-50%, -50%)",width: 475,bgcolor: "background.paper",height: 550,borderRadius: 10, 
  p: 4,
};

function Login() {
  let navigate = useNavigate();
  let username;
  let password;

  const handlePassword = (e) => {
    console.log(e.target.value, "This is your password input");
    password = e.target.value;
  };

  const handleEmail = (e) => {
    console.log(e.target.value, "This is your password input");
    username = e.target.value;
  };

  const handleSignIn = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      identifier: username,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      body: raw,
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://react-crud-hiring.herokuapp.com/api/auth/local",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        sessionStorage.setItem("jwt", result.jwt);
        if (result.jwt !== undefined || result.jwt !== null) {
          return navigate("/dashboard"); 
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div  style={{ backgroundColor: "#FEAF00",width: "100%",height: "100vh",display: "flex",resize: "inherit",}}  >
      <Box sx={style}>
        <div style={{ display: "flex",flexDirection: "column", }}
        >
          <span style={{ width: 10, backgroundColor: "#FEAF00" }}></span>
          <p
            style={{ fontWeight: 700,fontSize: 32, fontStyle: "montserrat",textAlign: "center",}}
          >
            CRUD OPERATIONS
          </p>
          <p style={{ fontWeight: 600,fontSize: 18, fontStyle: "montserrat",width: "100%",  textAlign: "center", marginTop: "-15px",}}
          >
            SIGN IN
          </p>
          <p style={{  textDecorationColor: "#6C6C6C", textAlign: "center",     marginTop: "-10px", }}
          >
            Enter your credentials to access your account
          </p>
          <div>
            <p style={{    fontStyle: "montserrat", fontWeight: 400, textDecorationColor: "#6C6C6C",  fontSize: 14,textAlign: "left" }}
            >
              Email
            </p>
            <TextField
              id="outlined-basic"
              label="Enter your Email"
              onChange={handleEmail}
              variant="outlined"
              style={{ width: 473 }}
            />
            <p
              style={{
                fontStyle: "montserrat",
                fontWeight: 400,
                textDecorationColor: "#6C6C6C",
                fontSize: 14,
                textAlign: "left",
              }}
            >
              Password
            </p>
            <TextField
              id="outlined-basic"
              label="Enter your Password"
              onChange={handlePassword}
              variant="outlined"
              value={password}
              style={{ width: 473 }}
            />
          </div>
          <Button
            style={{ marginTop: 50, backgroundColor: "#FEAF00" }}
            variant="contained"
            onClick={handleSignIn}
          >
            SIGN IN
          </Button>
        </div>
      </Box>
    </div>
  );
}
// document.body.style.backgroundColor = "#FEAF00";

export default Login;

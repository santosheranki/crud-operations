import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ProfilePic from "./profilepic.jpg";

import { useNavigate } from "react-router-dom";

const drawerWidth = "15%";

export default function CustomDrawer() {
  // const theme = useTheme();
  const navigate = useNavigate();
  React.useEffect(() => {
    const myJWT = sessionStorage.getItem("jwt");
    console.log(myJWT, "myjwt in dashboard");
    if (myJWT === undefined || myJWT === null) {
      sessionStorage.setItem("jwt",null);
      navigate("/");
    }
  });
  const isopen = true;
  const styles = {
    paper: {
      background: "blue",
    },
  };

  const handleStudentNavigate = (e) => {
    console.log(e, "e in handle student");
    if(e.target.innerText === 'Students'){
      navigate('/students')
    }else {
        navigate('/dashboard')
    }
  };

  return (
    <div style={{ width: "100%", height: "100%",backgroundColor:'#FEAF00'}}>
      <Drawer
        classes={{ papper: styles.paper }}
        // containerStyle={{backgroundColor:'red'}}
        sx={{
          backgroundColor: "#F2EAE1",
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={isopen}
        style={{ backgroundColor: "#F2EAE1" }}
      >
        <p
          style={{
            fontSize: 18,
            fontStyle: "montserrat",
            fontWeight: "700",
            width: "100%",
            position: "absolute",
            textAlign: "center",
          }}
        >
          CRUD OPERATIONS
        </p>
        <div
          style={{
            width: 150,
            height: 215,
            marginTop: "25%",
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
          }}
        >
          <img
            src={ProfilePic}
            alt="PROFILE"
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              alignSelf: "center",
            }}
          />
          <p
            style={{
              fontFamily: "montserrat",
              fontSize: 17,
              marginTop: "5%",
              textAlign: "center",
            }}
          >
            KARTHI MADESH
          </p>
          <p
            style={{
              fontFamily: "montserrat",
              fontSize: 17,
              color: "#FEAF00",
              marginTop: "3%",
              textAlign: "center",
            }}
          >
            Admin
          </p>
        </div>
        <List sx={{ alignSelf: "center" }}>
          {[
            "Home",
            "Course",
            "Students",
            "Payment",
            "Report",
            "Settings"
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={handleStudentNavigate}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText sx={{ paddingRight: 5 }} primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* <div style={{backgroundColor:"red"}}></div> */}
        <div style={{textAlign:"center",position:'fixed',bottom:20,marginLeft:'6%',}}>
            logout
        </div>
        {/* <div style={{backgroundColor:"red"}}></div> */}
      </Drawer>
    </div>
  );
}

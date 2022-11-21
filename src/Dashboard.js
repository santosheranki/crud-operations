import * as React from "react";
import students from "./students.png";
import course from "./course.png";
import Payments from "./Payments.png";
import Users from "./Users.png";
import { useNavigate } from "react-router-dom";
import CustomDrawer from "./Drawer";
import Header from "./Header";

export default function Dashboard() {
 const navigate = useNavigate();
  React.useEffect(() => {
    const myJWT = sessionStorage.getItem("jwt");
    console.log(myJWT, "myjwt in dashboard");
    if (myJWT === undefined || myJWT === null) {
      sessionStorage.setItem("jwt", null);
      navigate("/");
    }
  });

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <CustomDrawer />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "85%",
          float: "right",
        }}
      >
        <Header />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "5%",
            width: "100%",
            alignSelf: "flex-end",
            position: "sticky",
            justifyContent: "space-evenly",
          }}
        >
          <div
            style={{
              width: 250,
              height: 170,
              backgroundColor: "#F0F9FF",
              borderRadius: 10,
            }}
          >
            <img
              alt="back"
              src={students}
              style={{ marginTop: "10%", marginLeft: "10%" }}
            />
            <p
              style={{
                marginLeft: "8%",
                fontFamily: "montserrat",
                fontSize: 17,
                fontWeight: 400,
              }}
            >
              Students
            </p>
            <p
              style={{
                fontFamily: "montserrat",
                fontSize: 30,
                fontWeight: 700,
                textAlign: "right",
                marginRight: "15%",
                paddingBottom: "15%",
                alignSelf: "",
              }}
            >
              243
            </p>
          </div>
          <div
            style={{
              width: 250,
              height: 170,
              backgroundColor: "#FEF6FB",
              borderRadius: 10,
            }}
          >
            <img
              alt="back"
              src={course}
              style={{ marginTop: "10%", marginLeft: "10%" }}
            />
            <p
              style={{
                marginLeft: "8%",
                fontFamily: "montserrat",
                fontSize: 17,
                fontWeight: 400,
              }}
            >
              Course
            </p>
            <p
              style={{
                fontFamily: "montserrat",
                fontSize: 30,
                fontWeight: 700,
                textAlign: "right",
                marginRight: "15%",
                paddingBottom: "15%",
                alignSelf: "",
              }}
            >
              13
            </p>
          </div>{" "}
          <div
            style={{
              width: 250,
              height: 170,
              backgroundColor: "#FEFBEC",
              borderRadius: 10,
            }}
          >
            <img
              alt="back"
              src={Payments}
              style={{ marginTop: "10%", marginLeft: "10%" }}
            />
            <p
              style={{
                marginLeft: "8%",
                fontFamily: "montserrat",
                fontSize: 17,
                fontWeight: 400,
              }}
            >
              Payments
            </p>
            <p
              style={{
                fontFamily: "montserrat",
                fontSize: 30,
                fontWeight: 700,
                textAlign: "right",
                marginRight: "7%",
                paddingBottom: "15%",
                alignSelf: "",
              }}
            >
              INR 556,000
            </p>
          </div>{" "}
          <div
            style={{
              width: 250,
              height: 170,
              backgroundColor: "#FEAF00",
              borderRadius: 10,
            }}
          >
            <img
              alt="back"
              src={Users}
              style={{ marginTop: "10%", marginLeft: "10%" }}
            />
            <p
              style={{
                marginLeft: "8%",
                fontFamily: "montserrat",
                fontSize: 17,
                fontWeight: 400,
              }}
            >
              Users
            </p>
            <p
              style={{
                fontFamily: "montserrat",
                fontSize: 30,
                fontWeight: 700,
                textAlign: "right",
                marginRight: "15%",
                paddingBottom: "15%",
                alignSelf: "",
              }}
            >
              3
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

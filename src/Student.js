import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import CustomDrawer from "./Drawer";
import Header from "./Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Box, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Edit from "./edit.png";
import Delete from "./deletes.png";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 10,
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const theme = createTheme({
  palette: {
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});
export default function Student() {
  const navigate = useNavigate();
  const [rowsData, setRowsData] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [editing, setEditing] = useState(false);
  const [enroll, setEnroll] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [date, setDate] = useState();
  const [phone, setPhone] = useState();
  const [params, setParams] = useState();
  const [isopen, setIsOpen] = useState(false);

  const columns = [
    {
      field: "username",
      headerName: "Name",
      width: 200,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: true,
    },
    {
      field: "Phone",
      headerName: "Phone",
      type: "number",
      width: 200,
      editable: true,
    },
    {
      field: "enrollNumber",
      headerName: "Enroll Number",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
    },
    {
      field: "dateOfAdmission",
      headerName: "Date of admission",
      type: "number",
      width: 200,
      editable: true,
    },
    {
      field: "Edit/update",
      headerName: "Edit/update",
      renderCell: (params) => {
        return (
          <div>
            <Button
              onClick={() => {
                // setEditing(true);
                setIsEdit(true);
                // setIsOpen(!isopen);
                setName(params.row.username);
                setEmail(params.row.email);
                setEnroll(params.row.enrollNumber);
                setPhone(params.row.Phone);
                setDate(params.row.dateOfAdmission);
                console.log(params.row, "params row in edit action", editing);
                setParams(params);
                // handleEdit(params);
                handleEditModal(!isEdit);
              }}
              style={{ textAlign: "left", alignSelf: "left" }}
            >
              <img src={Edit} alt="Edit" />
            </Button>
            <Button
              onClick={() => {
                console.log(params.row, "e data for your deletion");
                var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${myJWT}`);
                var requestOptions = {
                  method: "DELETE",
                  headers: myHeaders,
                  redirect: "follow",
                };

                fetch(
                  `https://react-crud-hiring.herokuapp.com/api/users/${params.row.id}`,
                  requestOptions
                )
                  .then((response) => response.json())
                  .then((result) => {
                    if (result.id) {
                      let url =
                        "https://react-crud-hiring.herokuapp.com/api/users";
                      var myHeaders = new Headers();
                      myHeaders.append("Authorization", `Bearer ${myJWT}`);
                      myHeaders.append("Content-Type", "application/json");
                      fetch(url, {
                        method: "GET",
                        headers: { Authorization: `Bearer ${myJWT}` },
                      })
                        .then((res) => res.json())
                        .then((res) => {
                          console.log(res, "res from Get students");
                          setRowsData(res);
                          console.log(res, "rowsdata after mapping");
                        });
                    }
                    console.log(result);
                  })
                  .catch((error) => console.log("error", error));
              }}
              style={{ textAlign: "left", alignSelf: "left" }}
            >
              <img src={Delete} alt="delete" />
            </Button>
          </div>
        );
      },
      // type: "number",
      width: 200,
      // editable: true,
    },
  ];
  const handleEdit = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${myJWT}`);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      username: name,
      email: email,
      Phone: phone,
      enrollNumber: enroll,
      dateOfAdmission: date,
      password: "Tunica@12345",
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    if (params.row.id) {
      fetch(
        `https://react-crud-hiring.herokuapp.com/api/users/${params.row.id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result, "reultssssssssss");
          if(result.id){
            setIsEdit(!isEdit)
          }
        })
        .catch((error) => console.log("error", error));
    }
  };
  const myJWT = sessionStorage.getItem("jwt");
  console.log(myJWT, "myjwt in dashboard");
  if (myJWT === undefined || myJWT === null) {
    sessionStorage.clear();
    navigate("/");
  }
  React.useEffect(() => {
    if (isopen === false && isEdit === false) {
      setName();
      setDate();
      setEmail();
      setPhone();
      setEnroll();
    }
    let url = "https://react-crud-hiring.herokuapp.com/api/users";
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${myJWT}`);
    myHeaders.append("Content-Type", "application/json");
    fetch(url, { method: "GET", headers: { Authorization: `Bearer ${myJWT}` } })
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "res from Get students");
        setRowsData(res);
        console.log(res, "rowsdata after mapping");
      });
  }, [isopen, isEdit, myJWT]);

  const handleSubmit = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${myJWT}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: name,
      email: email,
      provider: "local",
      confirmed: "true",
      blocked: "false",
      Phone: phone,
      enrollNumber: enroll,
      dateOfAdmission: "2022-11-29s",
      password: "Tunica@1234",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch("https://react-crud-hiring.herokuapp.com/api/users", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.id) {
          setIsOpen(!isopen);
          let url = "https://react-crud-hiring.herokuapp.com/api/users";
          var myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${myJWT}`);
          myHeaders.append("Content-Type", "application/json");
          fetch(url, {
            method: "GET",
            headers: { Authorization: `Bearer ${myJWT}` },
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res, "res from Get students");
              setRowsData(res);
              console.log(res, "rowsdata after mapping");
            });
        }
        console.log(result);
      })

      .catch((error) => console.log("error", error));
  };

  const handleEditModal = () => {
    setIsEdit(!isEdit);
  };

  const handleModal = () => {
    setIsOpen(!isopen);
    console.log("you clicked");
  };

  const handleChangeDate = (e) => {
    setDate(e.$d);
    console.log(e.$d, "is the date you selecetd");
  };

  const handleEnroll = (e) => {
    setEnroll(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleEmail = (e) => {
    console.log(e.target.value, "This is your password input");
    setEmail(e.target.value);
    // username = e.target.value;
  };
  const handleName = (e) => {
    console.log(e.target.value, "This is your password input");
    setName(e.target.value);
    // username = e.target.value;
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* {isopen ? ( */}
      <Modal
        open={isopen}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ADD Student
          </Typography>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ fontFamily: "monsterrat", fontSize: 17 }}>Name</p>
            <TextField
              onChange={handleName}
              value={name}
              style={{ width: "100%", height: 50 }}
            />
            <p style={{ fontFamily: "monsterrat", fontSize: 17 }}>Email</p>
            <TextField
              value={email}
              onChange={handleEmail}
              style={{ width: "100%", height: 50 }}
            />
            <p style={{ fontFamily: "monsterrat", fontSize: 17 }}>Phone</p>
            <TextField
              value={phone}
              onChange={handlePhone}
              style={{ width: "100%", height: 50 }}
            />
            <p style={{ fontFamily: "monsterrat", fontSize: 17 }}>
              Enroll Number
            </p>
            <TextField
              value={enroll}
              onChange={handleEnroll}
              style={{ width: "100%", height: 50 }}
            />
            <p style={{ fontFamily: "monsterrat", fontSize: 17 }}>
              Date of admission
            </p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Date of admission"
                inputFormat="MM/DD/YYYY"
                value={date}
                onChange={handleChangeDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <button
              onClick={handleSubmit}
              style={{
                backgroundColor: "#FEAF00",
                fontFamily: "monsterrat",
                fontSize: 14,
                borderRadius: 4,
                width: "199",
                height: 44,
                borderColor: "white",
                textDecorationColor: "white",
              }}
            >
              Submit
            </button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={isEdit}
        onClose={handleEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Student
          </Typography>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ fontFamily: "monsterrat", fontSize: 17 }}>Name</p>
            <TextField
              onChange={handleName}
              value={name}
              style={{ width: "100%", height: 50 }}
            />
            <p style={{ fontFamily: "monsterrat", fontSize: 17 }}>Email</p>
            <TextField
              value={email}
              onChange={handleEmail}
              style={{ width: "100%", height: 50 }}
            />
            <p style={{ fontFamily: "monsterrat", fontSize: 17 }}>Phone</p>
            <TextField
              value={phone}
              onChange={handlePhone}
              style={{ width: "100%", height: 50 }}
            />
            <p style={{ fontFamily: "monsterrat", fontSize: 17 }}>
              Enroll Number
            </p>
            <TextField
              value={enroll}
              onChange={handleEnroll}
              style={{ width: "100%", height: 50 }}
            />
            <p style={{ fontFamily: "monsterrat", fontSize: 17 }}>
              Date of admission
            </p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Date of admission"
                inputFormat="MM/DD/YYYY"
                value={date}
                onChange={handleChangeDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <Button
              onClick={handleEdit}
              style={{
                backgroundColor: "#FEAF00",
                fontFamily: "monsterrat",
                fontSize: 14,
                borderRadius: 4,
                width: "199",
                height: 44,
                borderColor: "white",
                textDecorationColor: "white",
              }}
            >
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
      <CustomDrawer />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "85%",
          float: "right",
          alignItems: "flex-end",
        }}
      >
        <Header />
        <div
          style={{
            marginTop: "5%",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              marginLeft: "2%",
              fontFamily: "montserrat",
              fontSize: 25,
              fontWeight: "bold",
              marginTop: "3%",
            }}
          >
            Students List
          </p>
          <ThemeProvider theme={theme}>
            <Button
              sx={{
                display: "flex",
                marginBottom: "2.5%",
                marginRight: "2.5%",
                height: 45,
                backgroundColor: "#FEAF00",
              }}
              color="neutral"
              variant="contained"
              onClick={handleModal}
            >
              Add New Students
            </Button>
          </ThemeProvider>
        </div>
      </div>
      <div style={{ marginLeft: "20%", marginRight: "2.5%" }}>
        {rowsData ? (
          <DataGrid
            rows={rowsData}
            columns={columns}
            pageSize={25}
            style={{ height: 570, width: "100%" }}
          />
        ) : null}
      </div>
    </div>
  );
}

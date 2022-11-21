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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius:10,
//   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const columns = [
  {
    field: "name",
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
    field: "phone",
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
];

let rows = [
  //   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  //   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  //   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
];
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
  const [isopen, setIsOpen] = useState(false);
  const myJWT = sessionStorage.getItem("jwt");
  console.log(myJWT, "myjwt in dashboard");
  if (myJWT === undefined || myJWT === null) {
    navigate("/");
  }
  React.useEffect(() => {
    let url = "https://react-crud-hiring.herokuapp.com/api/students";
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${myJWT}`);
    myHeaders.append("Content-Type", "application/json");
    fetch(url, { method: "GET", headers: { Authorization: `Bearer ${myJWT}` } })
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "res from Get students");
        if (res.data) {
          let object = res.data.map((x) => {
            console.log(x, "xxxxxxxx");
            return {
              id: x.id,
              name: x.attributes.name,
              dateOfAdmission: x.attributes.dateOfAdmission,
              email: x.attributes.email,
              phone: x.attributes.phone,
              enrollNumber: x.attributes.enrollNumber,
            };
          });
          setRowsData(object);
          console.log(object, "rowsdata after mapping");
        }
      });
  }, [myJWT]);

  const handleModal = () => {
    setIsOpen(!isopen);
    console.log("you clicked");
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
            ADD/Edit Student
          </Typography>
          <div style={{display:'flex',flexDirection:'column'}}>
            <p style={{fontFamily:'monsterrat',fontSize:17,}}>Name</p>
            <TextField style={{width:'100%',height:50}} />
            <p style={{fontFamily:'monsterrat',fontSize:17,}}>Email</p>
            <TextField style={{width:'100%',height:50}}/>
             <p style={{fontFamily:'monsterrat',fontSize:17,}}>Phone</p>
            <TextField style={{width:'100%',height:50}}/>
             <p style={{fontFamily:'monsterrat',fontSize:17,}}>Enroll Number</p>
            <TextField style={{width:'100%',height:50}}/>
            <p style={{fontFamily:'monsterrat',fontSize:17,}}>Date of admission</p>
            <TextField style={{width:'100%',height:50}}/>
          </div>
        </Box>
      </Modal>
      {/* ) : null} */}
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

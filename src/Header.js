import Vector from "./Vector.png";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Bell from "./Bell.png";

export default function Header() {
  return (
    <div
    style={{
      display: "flex",
      flexDirection: "row",
      alignSelf: "flex-end",
      position: "absolute",
      top: 0,
      width:'75%'
    }}
  >
    <img alt="back" src={Vector} style={{ marginLeft:'2%',height:25,width:25,marginTop:'1%'}} />
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "77%",
        justifyContent:'right',
        paddingTop:10,
        position:'fixed'
      }}
    >
        <TextField
          id="search-bar"
          className="text"
          label="Search..."
          variant="outlined"
          placeholder="Search..."
          size="small"  
          style={{padding:3}}
        ></TextField>
        <IconButton type="submit" aria-label="search">
          <SearchIcon
            style={{ fill: "grey", paddingBottom: "15%", margin: "12%" }}
          />
        </IconButton>
      <img
        alt="back"
        src={Bell}
        style={{ margin: 14}}
      />
    </div>
  </div>

  );
}

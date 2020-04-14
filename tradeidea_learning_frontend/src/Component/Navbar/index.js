import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  bg: {
    backgroundColor: "#1976d2",
    transition:"all .7s"

  },
  bg0: {
    backgroundColor: "transparent",
    boxShadow: "none"
  },

}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <AppBar position="fixed" className={classes.bg}>
        <Toolbar>
          
          <Typography variant="h6" className={classes.title}>
            New Logo
          </Typography>
          <Link to="/public/course"><Button color="inherit" style={{color:"white"}}>Course</Button></Link>
          <Link to="/public/blog"><Button color="inherit" style={{color:"white"}}>Blog</Button></Link>
          <Link to="/public/exam"><Button color="inherit" style={{color:"white"}}>Exam</Button></Link>
          <Link to="/public/tradeidea"><Button color="inherit" style={{color:"white"}}>TradeIdea</Button></Link>
          <Link to="/public/profile/"><Button color="inherit" style={{color:"white"}}>Profile</Button></Link>

          <Link to="/login"><Button color="inherit" style={{color:"white"}}>Login</Button></Link>
          <Link to="/signup"><Button color="inherit" style={{backgroundColor: "white", color: "blue"}}>SignUp</Button></Link>
        </Toolbar>
      </AppBar>

    </div>
  );
}

import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import SettingsIcon from '@material-ui/icons/Settings'
import "./nav.css"
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Tooltip from '@material-ui/core/Tooltip'
import {changePassword} from "../../store/action/actions"
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import {logoutUser} from "../../store/action/actions"
import ReceiptIcon from '@material-ui/icons/Receipt';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import AmpStoriesIcon from '@material-ui/icons/AmpStories';

// import axios from "axios"

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const NavBar = props => {
	  	const classes = useStyles();
	  // getModalStyle is not a pure function, we roll the style only on the first render
		const [modalStyle] = React.useState(getModalStyle);
		const [open, setOpen] = React.useState(false);
		const [emailOpen, setEmailOpen] = React.useState(false)
		const [passwordOpen, setPasswordOpen] = React.useState()
		const [password1, setPassword1] = React.useState()
		const [password2, setPassword2] = React.useState()
		const [pwddisable, setPwddisable] = React.useState(false)
		const handleOpen = () => {
		   	setOpen(true);
		};
		const handleClose = () => {
		    setOpen(false);
		}
		const handleChangeEmail = () => {
			setEmailOpen(true)
		}
		const handleChangePassword = () => {
			setPasswordOpen(true)
		}
		const handlePass1Change = e => {
			setPassword1(e.target.value)
		}

		const handlePass2Change = e => {
			const pa2 = e.target.value
			if (password1===pa2) {
				setPwddisable(true)

				} else {
					setPwddisable(false)

				}
			setPassword2(e.target.value)
			
			
		}
		const onEmailSubmit = (e) => {
			e.preventDefault()
			fetch('http://localhost:8000/rest-auth/user/', {
				headers: { "Content-Type": "application/json; charset=utf-8" },
	  			method: 'GET'
			})
			.then(res=>console.log(res))
			.catch(err=>console.log(err))
			// axios
			// .get('http://localhost:8000/rest-auth/user/')
			// .then(res=>console.log(res))
			// .catch(err=>console.log(err))
		}
		const onPasswordSubmit = (e) => {
			e.preventDefault();
			const data = {
				new_password1: password1,
				new_password2: password2
			}
			props.changePassword(data)
		}
		const handleExit = (e) => {
			e.preventDefault()
			props.logoutUser()
		}

		const {user, profiles, allusers} = props.auth
		let user_profile, user_detail
		if (user.username) {
			user_detail = allusers.filter(item => item[1] === user.username)[0]
			user_profile = profiles.filter(item => item.user === user.user_id)[0].interests
		} else {
			 user_profile = []
			 user_detail = []
		}
		console.log("user_detail", user_detail)
		
		// var txt = user_profile.replace(/'/g,"\"");
		// 	const json_obj = JSON.parse(txt)
		// let str = ""
		// 	json_obj.interests.map(item => str += item + " ")
		const emailview = (emailOpen, user, onEmailSubmit) => {
		if (emailOpen) {
					return (
						<form onSubmit={onEmailSubmit} id="changeEmail"> 
			          		<input type="text" className="form-control" id="email" value={user.email} placeholder="Email" />
			          		<button type="submit" className="btn btn-success">Change</button>
			          	</form>
					)
				}
		}
		const passwordview = (passwordOpen, user, onPasswordSubmit) => {
		if (passwordOpen) {
					return (
						<form onSubmit={onPasswordSubmit} id="changePassword">
							<span>{props.errors.detail}</span>
					        <input type="password" className="form-control" id="password1" onChange={handlePass1Change} placeholder="New Password" />
					        <input type="password" className="form-control" id="password2" onChange={handlePass2Change} placeholder="Confirm New Password" />
					        <button type="submit" className="btn btn-success" disabled={!pwddisable}>Change</button>
			          	</form>
					)
				}
	
		}
		return (
			<nav className="navbar navbar-expand-sm navbar-dark fixed-top">		  
			  <ul className="navbar-nav">
			  </ul>
			  <ul className="navbar-nav right">
			  	  <li className="nav-item dropdown" style={{padding: '10px'}}>
				  	<Link to="/leaderboard"><Tooltip title="LeaderBoard"><AmpStoriesIcon /></Tooltip></Link>
				  </li>
			  	  <li className="nav-item dropdown" style={{padding: '10px'}}>
				  	<Link to="/tradeidea"><Tooltip title="Trade Ideas"><AmpStoriesIcon /></Tooltip></Link>
				  </li>
			  	  <li className="nav-item dropdown" style={{padding: '10px'}}>
				  	<Link to="/blog"><Tooltip title="Blogs"><ChatBubbleIcon /></Tooltip></Link>
				  </li>
			  	  <li className="nav-item dropdown" style={{padding: '10px'}}>
				  	<Link to="/exam"><Tooltip title="Exam"><ReceiptIcon /></Tooltip></Link>
				  </li>
				  <li className="nav-item dropdown" style={{padding: '10px'}}>
				  	<Tooltip title="Account Setting"><SettingsIcon onClick={handleOpen}/></Tooltip>
				  </li>
				  <li className="nav-item dropdown" style={{padding: '10px'}}>
				  	<Tooltip title="Log Out"><ExitToAppIcon onClick={handleExit}/></Tooltip>
				  </li>
				  
				  
				  <Modal
			        aria-labelledby="simple-modal-title"
			        aria-describedby="simple-modal-description"
			        open={open}
			        onClose={handleClose}
			      >
			        <div style={modalStyle} className={classes.paper}>
			          <h2 id="simple-modal-title">Account Setting</h2>
			          <p id="simple-modal-description"><strong>Username :</strong>{user.username}</p>
			          <p id="simple-modal-description"><strong>Email :</strong>{user.email}</p>
			          <p id="simple-modal-description"><strong>Date joined :</strong>{user_detail[3]}</p>
			          <p id="simple-modal-description"><strong>Interests :</strong>{user_profile}</p>
			          <button className="btn btn-primary btn-block" onClick={handleChangeEmail}>Change Email</button>
			          {emailview(emailOpen, user, onEmailSubmit)}
	          		  <button className="btn btn-primary btn-block" onClick={handleChangePassword}>Change Password</button>
			          {passwordview(passwordOpen, user, onPasswordSubmit)}
			        </div>
			      </Modal>
			  </ul>
			</nav>

		)
	}
const mapStateToProps = state => {
	return {
		auth: state.auth,
		errors: state.errors
	}
}
const mapDispatchToProps = dispatch => {
	return {
		changePassword: (a)=> dispatch(changePassword(a)),
		logoutUser: () => dispatch(logoutUser())
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);




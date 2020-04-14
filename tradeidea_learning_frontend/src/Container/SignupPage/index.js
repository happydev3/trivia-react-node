import React from "react";
import "./Signup.css";
import isEmail from "validator/lib/isEmail";
import {connect} from "react-redux";
import { signupUser } from "../../store/action/actions"
import Notifications, {notify} from 'react-notify-toast'
// import MultiBox from "../../Component/MultiBox"
import MultiSelect from "@khanacademy/react-multi-select";

const options = [
  {label: "One", value: "one"},
  {label: "Two", value: "two"},
  {label: "Three", value: "three"},
];

class SignUp extends React.Component {
	constructor() {
		super();
		this.state={
			emailValidate: false,
			pwd_flag: false,
			fullname: "",
			username: "",
			email: "",
			teleuser: "",
			password: "",
			confpass: "",
			interests: "",
			skills: "",
			nomatch: "",
			sendingEmail: false,
			match: false,
			selected: [],
		}

	}
   
	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
	      this.props.history.push("/main");
	    	}
	}
	componentWillReceiveProps(nextProps) {
	    if (nextProps.errors) {
	      this.setState({
	        errors: nextProps.errors,
	        sendingEmail: false
	      });
	    }
	    if (nextProps.auth.message) {
	    	this.setState({
	    		sendingEmail: false
	    	})
	    	notify.show(nextProps.auth.message)
	    }
  	}
 	
	handleClick = () => this.setState({
		pwd_flag: true
	})
	handleChange = (e) => {
		
		this.setState({
			emailValidate: isEmail(e.target.value),
			[e.target.id]: e.target.value
		})
	}
	getStateTime = () => {
	  // Get the current 'global' time from an API
	  if (this.state.password !== this.state.confpass) {
			this.setState({
				nomatch: "No Match",
				match: false
			})
		}
		else if (this.state.password === this.state.confpass) {
			this.setState({
				nomatch: "OK",
				match: true
			})
		}
	}
	handleConfirmChange = (e) => {

		
		this.setState({
			[e.target.id]: e.target.value
		})
		setTimeout(this.getStateTime, 100)
		
		
	}
	onSubmit = (e, selected) => {
		e.preventDefault();
		this.setState({
			sendingEmail: true
		})
		const newUser = {
			username: this.state.username,
			email: this.state.email,
			password1: this.state.password,
			password2: this.state.confpass,
			selected: this.state.selected
		}

		// const newProfile = {
		// 	"interests": selected
		// }
		// console.log("newProfile", newProfile)
		this.props.registerUser(newUser, selected, this.props.history);
	}
	render() {
		const {errors} = this.props;
		// console.log("errors::", errors)
		const {selected} = this.state
		const disable = this.state.emailValidate;
		const match_flag = this.state.match
		const sendingEmail_flag = this.state.sendingEmail
		const str = this.state.pwd_flag;
		const ele = (str) => {
		if (str) {
					return (
						<div>
							<div className="form-group">
 							  <input type="text" className="form-control" id="username" placeholder="User Name" onChange={this.handleChange}/>
 							  {errors.username ? errors.username.map((txt,i)=><span key={i}>{txt}</span>) : <span></span>}
 							</div>
							<div className="form-group">
								<input type="password" className="form-control" id="password" placeholder="Create Password..." onChange={this.handleChange}/>
								{errors.password1 ? errors.password1.map((txt,i)=><span key={i}>{`${txt}\n`}</span>) : <span></span>}
							</div>
							<div className="form-group">
								<input type="password" className="form-control" id="confpass" placeholder="Confirm Password..." onChange={this.handleConfirmChange}/>
								<span>{this.state.nomatch}</span>
							</div>
							<div className="form-group">
								<label>Interests: </label>
								<MultiSelect
							      options={options}
							      selected={selected}
							      onSelectedChanged={selected => this.setState({selected})}
							    />
							</div>
							
							<div className="form-group">
								<button type="submit" className="btn btn-success btn-block" disabled={!match_flag}>{ sendingEmail_flag ? <span className="spinner-border spinner-border-sm" /> : <span>Sign up</span>}</button>
							</div>
						</div>
					)
				}
				else {
					return(
						<div>
							<input type="button" className="btn btn-success btn-block" value="Continue" onClick={this.handleClick}  disabled={!disable}/>

						</div>
					)
				}
	
		}
		return(
			<div>
				<Notifications />
				<section id="signup">
					<div className="card">
						<div className="card-body">
							<h4 className="card-title">Sign up</h4>
							<form onSubmit={(e,s)=>this.onSubmit(e, selected)} id="registerForm">
								<div className="form-group">
								  <input type="text" className="form-control" id="email" onChange={this.handleChange} placeholder="Email" />
								  {errors.email ? errors.email.map((txt,i)=><span key={i}>{errors.email[0]}</span>) : <span></span>}
								</div>
								{ele(str)}
							</form>
							<hr />
							<p><a href="/login">Already have an account? Log In</a></p>
						</div>
					</div>
				</section>
			</div>
			
			)
	}
}

// export default SignUp
const mapStateToProps = state => {
	return {
		auth: state.auth,
		errors: state.errors
	}
}
const mapDispatchToProps = dispatch => {
	return {
		registerUser: (a,b)=> dispatch(signupUser(a,b))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
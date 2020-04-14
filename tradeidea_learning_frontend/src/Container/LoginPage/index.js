import React from "react"
import "./SignIn.css"
import {connect} from "react-redux"
import {loginUser} from "../../store/action/actions"
// import jwt from "jsonwebtoken";
import {store} from "../../store"
import jwt_decode from "jwt-decode"
import {setCurrentUser} from "../../store/action/actions"
import setAuthToken from "../../utils/setAuthToken"



class SignIn extends React.Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			btnval: "Login"
		}
		
	}
	componentWillMount() {
		const payload = localStorage.getItem('jwtToken')
		if (payload) {
			setAuthToken(payload)
			const decoded = jwt_decode(payload)
			store.dispatch(setCurrentUser(decoded))
		}
		
	}
	componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/main');
    }
  }
    componentWillReceiveProps(nextProps) {
	    if (nextProps.auth.isAuthenticated) {
	      this.props.history.push('/main')
	    }
  	}

	onChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	}
	effectClick = e=>{
		//e.preventDefault();
		this.setState({
			btnval: <span className="spinner-border spinner-border-sm"></span>
		})
	}
	handleSubmit = e=> {
		e.preventDefault();
		const email = this.state.email;
		const password = this.state.password
		const userData={
			email,
			password
		}
		this.props.loginUser(userData)
	}
	
	render() {
			
		const {errors} = this.props
		
		return (
			<div>
			<section id="signin">	
				<div className="card">
					<div className="card-body">
						<h4 className="card-title">Lonin</h4>
						{errors.non_field_errors ? errors.non_field_errors.map((err,i)=><span className="text-danger" key={i}>{err}</span>) : <span></span>}
						<form onSubmit={this.handleSubmit}>
							<div className="form-group">
							  <input type="text" className="form-control" id="email" placeholder="Email" onChange={this.onChange}/>
							  {errors.email ? errors.email.map((err,i)=><span className="text-danger" key={i}>{err}</span>) : <span></span>}
							</div>
							<div className="form-group">
							  <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.onChange}/>
							  {errors.password ? errors.password.map((err,i)=><span className="text-danger" key={i}>{err}</span>) : <span></span>}
							</div>
							
							<button type="submit" className="btn btn-success btn-block" value="Login" onClick={this.effectClick}>{this.state.btnval}</button>
							<p className="text-center">OR</p>
 							<a type="button" href={`http://127.0.0.1:8000/accounts/google/login/`} className="btn btn-outline-dark btn-block">Continue With Google</a>

						</form>
						<hr />
						<p><a href="/signup">Sign up for an account</a></p>
					</div>
				</div>
			</section>
			</div>
			)
	}
}
// export default SignIn
const mapStateToProps = state=>({
	auth: state.auth,
	errors: state.errors
});
const mapDispatchToProps = dispatch=>{
	return {
		loginUser: (a)=>dispatch(loginUser(a))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

//<button type="button" className="btn btn-outline-dark btn-block" onClick={this.googleClick}>Continue With Google</button>
// 							<a type="button" href={`${SERVER_PORT}/auth/google/sign`} className="btn btn-outline-dark btn-block">Continue With Google</a>

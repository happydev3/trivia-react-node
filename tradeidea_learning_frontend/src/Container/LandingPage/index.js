import React from "react"
import Navbar from "../../Component/Navbar"
import {store} from "../../store"
import {setCurrentUser} from "../../store/action/actions"
import {connect} from "react-redux"
import jwt_decode from "jwt-decode";
// import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {getInitTradeIdea, getInitExam, getInitBlog, getInitProfile, getInitUser} from "../../store/action/actions"




class LandingPage extends React.Component {
	// constructor() {
	// 	super()
	// }
	componentDidMount() {
		const payload = localStorage.getItem('jwtToken')
		
		if (payload) {
			const info = jwt_decode(payload)
			store.dispatch(setCurrentUser(info))
		}
		this.props.getInitExam()
     	this.props.getInitTradeIdea()
     	this.props.getInitBlog()
     	this.props.getInitProfile()
     	this.props.getInitUser()
	}
	render() {
		return (
			<div>
				<Navbar />
				<h1 style={{marginTop: '80px'}}>This is LandingPage</h1>
			</div>
			)
	}
}
const mapDispatchToProps = dispatch => ({
	getInitTradeIdea: () => dispatch(getInitTradeIdea()),
	getInitExam: () => dispatch(getInitExam()),
	getInitBlog: (a) => dispatch(getInitBlog(a)),
	getInitProfile: () => dispatch(getInitProfile()),
	getInitUser: () => dispatch(getInitUser()),
})
export default connect(null, mapDispatchToProps)(LandingPage);
// export default LandingPage

import React from "react"
import {connect} from "react-redux"

const UserPage = props => {
	const id = props.match.params.userid
	const {profiles, allusers} = props
	const user = allusers.filter(item => item[0] === parseInt(id, 10))[0]
	// console.log("user", user)
	const user_profile = profiles.filter(item => item.user === parseInt(id, 10))[0].interests

	// const str = JSON.parse(user_profile)
	// console.log("str", str)
	// var txt = user_profile.replace(/'/g,"\"");
	// const json_obj = JSON.parse(txt)




	// let str = ""
	// json_obj.interests.map(item => str += item + " ")
	// console.log("json_obj", json_obj)
	// console.log(json_obj["interests"])
	// console.log("id", id)
	// return (
	// 	<h1>This is props</h1>
	// 	)
	return (
		<div>
			<p id="simple-modal-description"><strong>Username :</strong>{user[1]}</p>
			<p id="simple-modal-description"><strong>Email :</strong>{user[2]}</p>
			<p id="simple-modal-description"><strong>Join Date :</strong>{user[3]}</p>
			<p id="simple-modal-description"><strong>Interests : </strong>{user_profile}</p>
		</div>
		)
}
const mapStateToProps = (state, ownProps) => ({
	profiles: state.auth.profiles,
	allusers: state.auth.allusers,
	match: ownProps.match
})
export default connect(mapStateToProps, null)(UserPage)
// export default UserPage
import React from 'react';
import {connect} from "react-redux"
import {Link} from "react-router-dom"
// import MultiSelect from "@khanacademy/react-multi-select";

class ProfilePage extends React.Component {

  render() {
  	const {allusers} = this.props

    return (
    	<div>
    		<ul className="">
    		{
    			allusers.map((item, index) => 
    				<li className="" style={{padding: '10px'}} key={index}>
				  		<Link to={`${item[0]}`}>{item[1]}</Link>
					</li>
					)
    		}
			</ul>
    	</div>
    	)
  }
}
const mapStateToProps = state => ({
	profiles: state.auth.profiles,
	allusers: state.auth.allusers
})
export default connect(mapStateToProps, null)(ProfilePage)
// export default ProfilePage
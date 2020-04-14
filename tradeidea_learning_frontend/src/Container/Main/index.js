import React from "react"
import Navigation from "../../Component/Navbar/navigation"
import CourseSection from "../../Container/CourseSection"
// import {connect} from "react-redux"

const MainPage = () => {
	
		return(
			<div>
				<Navigation />
				<div style={{marginTop: '50px'}}>
					<CourseSection style={{marginTop: '170px'}}/>
				</div>
			</div>
			)
}

export default MainPage
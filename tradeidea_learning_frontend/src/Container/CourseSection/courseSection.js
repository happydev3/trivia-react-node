import React from "react";
import styled from "styled-components"
import { Link } from "react-router-dom"
import {connect} from "react-redux"
import {addAttendingCount} from "../../store/action/actions"

const Card = styled.div`
	display: flex;
	margin: 15px;		
	margin-right: 20px;
	border-radius: 3px;
	transition: all .3s;
	text-decoration: none;
	&:hover {
		box-shadow: 0 1px 3px rgba(0,0,0,.7);
		text-decoration: none !important;

	}

`
const CourseSection = (props) => {
	
	const lessonArr = Object.keys(props.data)
	const {title} = props
	let countInCourse = 0;
	let confirmInCourse = 0;
	
	for (let val of lessonArr) {
		countInCourse += props.contents[title][val].length
		confirmInCourse += props.contents[title][val].filter(item => item[1] === true).length
	}
	const percent = 100/countInCourse *confirmInCourse
	const handleExamClick = () => {
		props.addAttendingCount()
	}
	return (
		<Card>
		  	<div className="card">
			    <div className="card-body text-center">
			      <Link to={`exam/`}>
			      {
			      	confirmInCourse === countInCourse ? <span className="badge badge-success" style={{padding: '7px'}} onClick={handleExamClick}>Exam</span> : <span></span>
			      }
			      </Link>
			      <Link to={`/main/${props.title}`}><h2>{props.title}</h2></Link>

			      <span>{confirmInCourse}</span> / 
			      <span>{countInCourse}</span>
			      <div className="progress">
					  <div className="progress-bar" style={{width:`${percent}%`}}></div>
				  </div> 
			      <ul>
			      {
			      	lessonArr.map((item,index) => {
			      		
			      		return (
			      			<li key={index}>{item}</li>
			      			)
			      	})
			      }
			      </ul>
			  	</div>
		  	</div>
		</Card>
	)
}
const mapStateToProps = (state, ownProps) => ({
	data: ownProps.data,
	title: ownProps.title,
	contents: state.courseContents.contents
})
const mapDispatchToProps = (dispatch) => ({
	addAttendingCount: () => dispatch(addAttendingCount())
})
export default connect(mapStateToProps, mapDispatchToProps)(CourseSection);
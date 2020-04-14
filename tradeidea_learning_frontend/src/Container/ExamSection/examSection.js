import React from "react";
import styled from "styled-components"
import { Link } from "react-router-dom"
import {connect} from "react-redux"

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
const ExamSection = (props) => {
	// const {title, scores, exams} = props
	const {title, scores, user} = props
	// console.log("scores", scores)
	// console.log("title", title)
	// console.log("scores_length", scores.length)
	const data = props.exams[title]
	const examArr = Object.keys(data.questions)
	let scoreOneArr, score_status, score_marks
	if (scores.length !== undefined && scores.length !== 0) {
		scoreOneArr = scores.filter(item=> item.exam_title === title && item.username === user.username)
		if (scoreOneArr.length !== 0 && scoreOneArr.length !== undefined) {
			score_status = scoreOneArr[0].exam_pass_status
			score_marks = scoreOneArr[0].exam_score
			// console.log("score_marks", score_marks)
		} else {
			score_status = ""
			score_marks = ""
		}
	} else {
		score_status = ""
		score_marks = ""
	}
	// const scoreOneArr = scores.filter(item=> item.exam_manager.title === title)
	// const score_status = scoreOneArr[0].exam_manager.exam_pass_status
	// const score_marks = scoreOneArr[0].exam_manager.exam_score
	// console.log("score_status", score_status)
	const handleCountClick = () => {
		console.log("kk")
	}
	
	return (
		<Card>
		  	<div className="card">
		  	{
		  		score_status
		  		? <p>
		  			<span className="text-white bg-success">Passed</span><br />
		  			<span>Your Score: {score_marks}</span>
		  		  </p>
		  		: <span></span>
		  	}
			    <div className="card-body text-center">
			      <Link to={`/exam/${props.title}`}><h2 onClick={handleCountClick}>{props.title}</h2></Link>
			      <ul>
			      {
			      	examArr.map((item,index) => {
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
	title: ownProps.title,
	exams: state.exams.contents,
	scores: state.exams.scores,
	user: state.auth.user
})
export default connect(mapStateToProps, null)(ExamSection);
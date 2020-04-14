import React from "react"
// import React, {useEffect, Suspense, lazy} from "react";
// import CircularProgress from '@material-ui/core/CircularProgress';
import {connect} from "react-redux"
import styled from "styled-components"
import QuestionSection from "./questionBoard"
import {getInitData, getInitExam, logoutUser} from "../../store/action/actions"
// const examSection = React.lazy(() => import('./examSection'));
// const TopicSection = React.lazy(() => import('./topicSection'));
const BoardSection = styled.div`
	margin: 20px;
`
const BoardTitle = styled.h1`
	margin-left: 20px;
`
const BoardContent = styled.div`
	margin: 20px;
`
const BoardComponent = ({courseName, examArr, curcount, examObj}) => {
	const title = examArr[curcount]
	const all_count = examArr.length
	// console.log("all_count", all_count, "curcount", curcount)
	// const bool = (all_count === curcount + 1)
	// console.log("bool", bool)
	const percent = 100/all_count * (curcount + 1)

	return (
		<BoardSection>
			<BoardTitle>This is {courseName} Exam Board.</BoardTitle>
			<div className="progress" style={{maxWidth: '500px'}}>
				<div className="progress-bar" style={{width: `${percent}%`}}></div>
			</div> 
			<BoardContent>
			{
				examArr.length !== undefined
				? <QuestionSection courseName={courseName} title={title} data={examObj[title]} curcount={curcount} all_count={all_count}/>
				: <h3>No Exam</h3>
			}
			</BoardContent>
		</BoardSection>
		)
}
function ExamBoard(props) {
	React.useEffect(() => {
     props.getInitExam()
     props.getInitData()
	},[props])
	const courseName = props.match.params.course
	const examObj = props.exams[courseName].questions
	const {curcount} = props
	let examArr
	if (typeof examObj === "object") {
		examArr = Object.keys(examObj)
	}
	else {
		examArr = {}
	}
	return (
		<BoardComponent courseName={courseName} examArr={examArr} curcount={curcount} examObj={examObj} />
		)
}

const mapStateToProps = (state, ownProps) => ({
  exams: state.exams.contents,
  curcount: state.exams.examCurrentCount,
  match: ownProps.match
})
const mapDispatchToProps = dispatch => ({
	getInitData: () => dispatch(getInitData()),
	getInitExam: () => dispatch(getInitExam()),
	logoutUser: () => dispatch(logoutUser())
})
export default connect(mapStateToProps, mapDispatchToProps)(ExamBoard);
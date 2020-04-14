import React, {Suspense} from "react"
// import React, {useEffect, Suspense, lazy} from "react";
// import CircularProgress from '@material-ui/core/CircularProgress';
import {connect} from "react-redux"
import styled from "styled-components"
import {Route, Switch} from "react-router-dom"
import CircularProgress from '@material-ui/core/CircularProgress'

const LessonSection = React.lazy(() => import('./lessonSection'))
// const LessonSection = React.lazy(() => import('./lessonSection'));
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
const BoardComponent = ({courseName, lessonArr, lessonObj}) => {
	
	return (
		<BoardSection>
			<BoardTitle>This is {courseName} Board.</BoardTitle>
			<BoardContent>
			{
				lessonArr.length !== undefined
				? lessonArr.map((item,index) => {
				return (
					<Suspense fallback={<CircularProgress />} key={index}>
						<LessonSection key={index} id={index} courseName={courseName} title={item} data={lessonObj[item]} />
					</Suspense>
					)			
				})
				: <h3>No lesson</h3>
			}
			</BoardContent>
		</BoardSection>
		)
}
function CourseBoard(props) {
	
	const courseName = props.match.params.course;
	const lessonObj = props.courseContents.contents[courseName]
	
	let lessonArr
	if (typeof lessonObj == "object") {
		lessonArr = Object.keys(lessonObj)
	}
	else {
		lessonArr = {}
	}
	return (
		<Switch>
			<Route path="/main/"><BoardComponent courseName={courseName} lessonArr={lessonArr} lessonObj={lessonObj} /></Route>
		</Switch>
		)
}

const mapStateToProps = (state, ownProps) => ({
  courseContents: state.courseContents,
  match: ownProps.match
})
export default connect(mapStateToProps, null)(CourseBoard);
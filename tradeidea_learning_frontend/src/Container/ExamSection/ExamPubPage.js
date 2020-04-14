// import React, {useEffect} from "react"
import React, {useEffect, Suspense} from "react"
import {connect} from "react-redux"
import styled from "styled-components"
import {getInitData, getInitExam, getInitScore, logoutUser} from "../../store/action/actions"
import CircularProgress from '@material-ui/core/CircularProgress'
const ExamSection = React.lazy(() => import('./examSection'))

const ExamEle = styled.div`
	display: flex
`

const Exam = (props) => {
	
	
	const {exams} = props
	const courseArr = Object.keys(exams)
	useEffect(() => {
     props.getInitExam()
     props.getInitData()
     if (props.isAuthenticated) {
     	props.getInitScore(props.username)
     }
	},[props])
	// const handleClick = () => {
	// 	props.logoutUser()
	// }
	return (
		<div>
		<ExamEle>
			{courseArr.map((item,index) => {
				return (
				<Suspense fallback={<CircularProgress />} key={index}>
			        <ExamSection key={index} title={item} />
			    </Suspense>
			    )
			})}
		</ExamEle>
		</div>
		)
}
// export default Course
const mapStateToProps = state => ({
	exams: state.exams.contents,
	username: state.auth.user.username,
	isAuthenticated: state.auth.isAuthenticated
})
const mapDispatchToProps = dispatch => ({
	getInitData: () => dispatch(getInitData()),
	getInitExam: () => dispatch(getInitExam()),
	getInitScore: (a) => dispatch(getInitScore(a)),
	logoutUser: () => dispatch(logoutUser())
})
export default connect(mapStateToProps, mapDispatchToProps)(Exam);
import React, { useEffect, Suspense } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { getInitData, getInitExam, getInitProfile, logoutUser } from "../../store/action/actions"
import CircularProgress from '@material-ui/core/CircularProgress'


const CourseSection = React.lazy(() => import('./courseSection'))

const CourseEle = styled.div`
	display: flex
`

const Course = props => {
	useEffect(() => {
		props.getInitExam()
		props.getInitData()
		props.getInitProfile()
	}, [])


	const { contents } = props.courseContents
	const courseArr = Object.keys(contents)
	// const handleClick = () => {
	// 	props.logoutUser()
	// }

	return (
		<div>
			<CourseEle>
				{courseArr.map((item, index) => {
					return (
						<Suspense fallback={<CircularProgress />} key={index}>
							<CourseSection key={index} title={item} data={contents[item]} />
						</Suspense>
					)
				})}
			</CourseEle>
		</div>
	)
}
// export default Course
const mapStateToProps = state => ({
	courseContents: state.courseContents
})
const mapDispatchToProps = dispatch => ({
	getInitData: () => dispatch(getInitData()),
	getInitExam: () => dispatch(getInitExam()),
	getInitProfile: () => dispatch(getInitProfile()),
	logoutUser: () => dispatch(logoutUser())
})
export default connect(mapStateToProps, mapDispatchToProps)(Course);
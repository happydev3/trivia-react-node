// import React, {useEffect} from "react"
import React, { useEffect, Suspense } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { getInitData } from "../../store/action/actions"
import CircularProgress from '@material-ui/core/CircularProgress'


// const CourseSection = React.lazy(() => import('./courseSection'))

const CourseEle = styled.div`
	display: flex
`

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
const CourseSection = ({title, data}) => {
	const lessonArr = Object.keys(data)
	return (
		<Card>
		  	<div className="card">
			    <div className="card-body text-center">
			      <Link to={`/public/course/${title}`}><h2>{title}</h2></Link>
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
const Course = props => {
	useEffect(() => {
		props.getInitData()
	}, [])
	const { contents } = props.courseContents
	const courseArr = Object.keys(contents)
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
const mapStateToProps = state => ({
	courseContents: state.courseContents
})
const mapDispatchToProps = dispatch => ({
	getInitData: () => dispatch(getInitData())
})
export default connect(mapStateToProps, mapDispatchToProps)(Course);
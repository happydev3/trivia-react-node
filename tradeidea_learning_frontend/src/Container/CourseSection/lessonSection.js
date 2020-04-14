import React, {useState} from "react"
import {Link} from "react-router-dom";
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import AddOutlinedIcon from "@material-ui/icons/Add"
import RemoveIcon from '@material-ui/icons/Remove';
import {connect} from "react-redux"
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import DoneIcon from '@material-ui/icons/Done';
import {addCount} from "../../store/action/actions"

const LessonSection = (props) => {
	const {title, data, id, courseName} = props.data
	const {username} = props
	const [btn, setBtn] = useState(true)
	const [loginStatus, setLoginStatus] = useState(false)
	React.useEffect(()=>{
		if (username) {
		setLoginStatus(true)
		} else {
			setLoginStatus(false)
		}
	},[])
	
	
	const handleClick = e => {
		e.preventDefault()
		setBtn(!btn)

	}
	const checkArr = props.contents[courseName][title]

	const n = props.contents[courseName][title].filter(item => item[1] === true).length

	return (
		<div id="personal-board">
			<div className="item-desc">
				<span><LocalLibraryIcon /></span>
				<span>{title}</span>
				(<span>{n}</span> /
				<span>{checkArr.length}</span>)
				<span className="optional-btn"><button className="btn btn-default" data-toggle="collapse" data-target={`#personal${id}`} style={{backgroundColor: "transparent"}} onClick={handleClick}>{btn ? <AddOutlinedIcon /> : <RemoveIcon  /> }</button></span>
			 </div>
			{
			data.map((topic, index) => {

				const v = checkArr.filter(item => item[0] === topic[0])[0][1]

			    return (
			    	<div className="item-content collapse" id={`personal${id}`} key={index}>
						<Link to={`/main/${courseName}/${topic[0]}?val=${title}&url=${topic[2]}`}>
							<BookmarkBorderIcon />
							<span className="mini-board">{topic[0]}</span>
							{v ? <DoneIcon /> : <span />}
						</Link>
					</div>
			    )
			})
			}
			          
		</div>
		)
}
const mapStateToProps = (state, ownProps) => ({
	contents: state.courseContents.contents,
	data: ownProps,
	count: state.valsLesson.count,
	username: state.auth.user.username
})
const mapDispatchToProps = dispatch => ({
	addCount: () =>dispatch(addCount())
})
export default connect(mapStateToProps, mapDispatchToProps)(LessonSection);

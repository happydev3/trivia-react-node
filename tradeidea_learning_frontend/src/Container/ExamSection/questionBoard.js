import React, {useState} from "react"
import {connect} from "react-redux"
import {addCurCount, removeCurCount, addIncorrectCount, addCorrectCount, initCurCount, initCount, addAttendingCount, updateUserScore} from "../../store/action/actions"
import {Link} from "react-router-dom"
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

const initialState = {count: 100, count_completed: false};
function reducer(state, action) {
  switch (action.type) {
    case 'counter':
      if (state.count <= 0) {
      	return {...state, count_completed: true}
      }
      return {count: state.count - 1}
     case 'reset':
     	return {
     		count: 100,
     		count_completed: false
     	}
    default:
      throw new Error();
  }
}
// function shuffle(array) {
//   var currentIndex = array.length, temporaryValue, randomIndex;

//   // While there remain elements to shuffle...
//   while (0 !== currentIndex) {

//     // Pick a remaining element...
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;

//     // And swap it with the current element.
//     temporaryValue = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temporaryValue;
//   }

//   return array;
// }
const QuestionSection = (props) => {
	const {courseName, title, data, curcount, all_count} = props.data
	// const limit_time = props.exams[courseName].exam_limit_time
	const limit_count = props.exams[courseName].exam_limit_count
	const pass_grade = props.exams[courseName].exam_pass_grade
	const overbool = (all_count === curcount + 1)
	const zerobool = (curcount === 0)

	const [state, dispatch] = React.useReducer(reducer, initialState);
	// let payload = Math.round(100 / limit_time)
	// const count_flag = false
	React.useEffect(() => {
		setInterval(function(){
	     	dispatch({type: 'counter'})
	     },333)
	},[])


	const [alert, setAlert] = useState(false)
	const [alertVal, setAlertVal] = useState()
	const [btn, setBtn] = useState(false)
	const [result, setResult] = useState(false)
	const [answerAlert, setAnswerAlert] = useState(false)
	// const {correctCount, incorrectCount} = props
	const {correctCount} = props
	const [progress, setProgress] = useState(false)
	const [avg, setAvg] = useState(false)

	const {user_id, username} = props.user
	const handleNextClick = e => {
		e.preventDefault()
		props.addCurCount()
		setBtn(false)
		setAlert(false)
		setAnswerAlert(false)
		setProgress(false)
		dispatch({type: 'reset'})
	}
	const handlePrevClick = e => {
		e.preventDefault()
		props.removeCurCount()
		setBtn(false)
		setAlert(false)
		setAnswerAlert(false)
		setProgress(false)
		dispatch({type: 'reset'})
	}
	const handleResultClick = e => {
		e.preventDefault()
		setResult(true)
		setAlertVal("")
		setAnswerAlert(false)
		setProgress(true)
		props.initCurCount()
	}
	const handleChange = e => {
		setAlert(true)
		if (e.target.value === "true") {
			setAlertVal("Correct")
			props.addCorrectCount()
		} else {
			setAlertVal("Incorrect")
			props.addIncorrectCount()
		}
		setBtn(true)
		setAnswerAlert(true)
		setProgress(true)

	}
	const handleMainClick = e => {
		// e.preventDefault()
		setProgress(false)
		props.initCount()
	}
	const handleRetryClick = e => {
		e.preventDefault()
		setResult(false)
		setBtn(false)
		setProgress(false)
		props.addAttendingCount()
		props.initCurCount()
		props.initCount()
		setAnswerAlert(false)
		setAvg(false)
		dispatch({type: 'reset'})
	}
	const handleSubmit = (courseName, user_id, username, grade, count) => {
		// console.log("courseName", courseName, "user_id", user_id, "grade", grade, "count", count)
		props.updateUserScore(courseName, user_id, username, grade, count)
		setAvg(true)
	}
	const answer_flag = true
	// const handleSubmit = e => {
	// 	e.preventDefault()
	// 	console.log("e==>", e)
	// }
	// const checkArr = props.exams[courseName][title]
	// console.log("data===>", data.questions)
	// const n = props.contents[courseName][title].filter(item => item[1] === true).length
	// console.log("data:", data)
	const percent_result = 100 / all_count * correctCount
	const grade1 = 10 /all_count * correctCount
	const grade = Math.round(grade1)
	const retry_flag = (props.attendingCount === limit_count)
	// if (props.scores.length !== undefined && props.scores.length !== 0) {
	// const demoArr = props.exams.filter(item=>item.exam_manager.title === courseName)
	// // const answer_flag = demoArr[0].anser_display
	// const exam_id = demoArr[0].id
	// } else {

	// }
	const correctAnswer = data.filter(item=>item[1]===true)

	const {attendingCount} = props
	return (
		<div id="personal-board">
		{
			progress
			? <span></span>
			: <Progress 
				percent={state.count} 
				status={
					75 > state.count
					? 50 > state.count
					? 25 > state.count
					? "error"
					: "active"
					: "default"
					: "success"
				}
				  theme={
				    {
				      error: {
				        symbol: 'hurry',
				        trailColor: 'pink',
				        color: 'red'
				      },
				      default: {
				        symbol: state.count + '%',
				        trailColor: 'lightblue',
				        color: 'blue'
				      },
				      active: {
				        symbol: state.count + '%',
				        trailColor: 'yellow',
				        color: 'orange'
				      },
				      success: {
				        symbol: state.count + '%',
				        trailColor: 'lime',
				        color: 'green'
				      }
				    }
				  }
			/>
		}
			

			
			{
				retry_flag
				? <span className="text-danger">Attending Count: {attendingCount}&nbsp;&nbsp;&nbsp;Last Exam</span>
				: <span>Attending Count: {attendingCount}</span>
			}
			
			<div className="item-desc">
				<h4>{title}</h4>
			</div>
			 {
			 state.count_completed
			? <div>
				<h1>Timeout</h1>
				<button type="button" className="btn btn-primary" onClick={handleRetryClick} disabled={retry_flag}>Retry</button>
			  </div>
			: <div className="item-content" id={`${title}`}>
			 	<form name="questionForm">
			 	{	result
			 		? <div>
			 			<span><strong>Result: </strong></span>&nbsp;&nbsp;&nbsp;
			 			<div className="progress" style={{maxWidth: '500px'}}>
							<div className="progress-bar bg-success progress-bar-striped progress-bar-animated" style={{width: `${percent_result}%`}}></div>
						</div>
						<span>{correctCount}/{all_count}</span><br />
						<h3>
							<span>Your Grade: {grade}</span><br />
							<span>Pass Grade: {pass_grade}</span><br />
						</h3>
						{
							grade >= pass_grade
							? <div><h1>You are Passed</h1><button type="button" className="btn btn-success" onClick={(a,b,c,d,e) => handleSubmit(courseName, user_id, username, grade, attendingCount)}>Submit Your Grade</button><button type="button" className="btn btn-primary" onClick={handleRetryClick} disabled={retry_flag}>Retry</button></div>
							: <h1>You are not Passed<button type="button" className="btn btn-primary" onClick={handleRetryClick} disabled={retry_flag}>Retry</button></h1>
						}
						<Link to="/main"><button type="button" className="btn btn-primary" onClick={handleMainClick}>Go Main</button></Link>
					</div>
			 		: btn 
			 		? overbool
			 			? <button type="button" className="btn btn-info" onClick={handleResultClick}>Show Result</button>
			 			: <div>
			 				<button type="button" className="btn btn-primary" onClick={handlePrevClick} disabled={zerobool}>Prev Exam</button>	
			 				<button type="button" className="btn btn-primary" onClick={handleNextClick}>Next Exam</button>
			 			  </div>
			 		: <div>
				 		{
				 			data.map((topic, index) => {
								return <div key={index}><input type="radio" id={`radio${index}`} name="radio" value={topic[1]} onChange={handleChange}/><label htmlFor={`radio${index}`}>{topic[0]}</label></div>
							})
				 		}
				 	  </div>
			 	}
				
				</form>
				{
					alert ? <span><strong>{alertVal}</strong></span> : <span></span>
				}
				{
					answerAlert
					? answer_flag && alertVal==="Incorrect"
					? <span>Correct Answer: {correctAnswer[0]}</span>
					: <span></span>
					: <span></span>
				}
				{
					avg
					? <div>
						<p>Your Score: {grade}</p>
						<div className="progress" style={{maxWidth: '500px'}}>
							<div className="progress-bar bg-success progress-bar-striped progress-bar-animated" style={{width: `${percent_result}%`}}></div>
						</div>
						<p>Current Average Score: 8 <br /><span>Attended Users: 2</span></p>
						<p>Top Score: 10 <small>by <strong>ttt</strong></small></p>
					  </div>
					: <span></span>
				}
			  </div>
			 }
   
		</div>
		)
}
const mapStateToProps = (state, ownProps) => ({
	exams: state.exams.contents,
	user: state.auth.user,
	scores: state.exams.scores,
	correctCount: state.exams.correctCount,
	incorrectCount: state.exams.incorrectCount,
	attendingCount: state.exams.attendingCount,
	data: ownProps,
})
const mapDispatchToProps = dispatch => ({
	addCurCount: () =>dispatch(addCurCount()),
	removeCurCount: () =>dispatch(removeCurCount()),
	addCorrectCount: () =>dispatch(addCorrectCount()),
	addIncorrectCount: () =>dispatch(addIncorrectCount()),
	initCurCount: () =>dispatch(initCurCount()),
	initCount: () =>dispatch(initCount()),
	addAttendingCount: () => dispatch(addAttendingCount()),
	updateUserScore: (a,b,c,d,e) => dispatch(updateUserScore(a,b,c,d,e))
})
export default connect(mapStateToProps, mapDispatchToProps)(QuestionSection);

import * as actionTypes from "../action/actionTypes";
const initState = {
	scores: {},
	contents: {},
	examCurrentCount: 0,
	correctCount: 0,
	incorrectCount: 0,
	percent: 0,
	attendingCount: 0
}

export default function courseContentsReducer(state=initState, action) {

	switch (action.type) {
		case actionTypes.GET_INITSCORE:
			return {
				...state,
				scores: action.pagedatas
			}
		case actionTypes.GET_INITEXAM:
				const todo = action.pagedatas

		        let final = {}
		        const examTitleArr = new Set()
		        const examLimitCountArr = new Set()
		        const examLimitTimeArr = new Set()
		        const examPassGradeArr = new Set()
		        // const examIdArr = new Set()
		        const questionTitleArr = new Set()

		        todo.map(item=>examTitleArr.add(item.question.exam.exam_title))
		        examTitleArr.forEach(ele => {
		        	final[ele]={}
		        	final[ele].questions = {}
		        	// console.log("ele", ele)
		        	todo
		        	.filter(item => item.question.exam.exam_title === ele)
		        	.forEach(elee => {
		        		examLimitCountArr.add(elee.question.exam.exam_limit_count)
		        		// console.log("examLimitCountArr", examLimitCountArr)
		        		examLimitCountArr.forEach(i => final[ele].exam_limit_count = i)

		        		examLimitTimeArr.add(elee.question.exam.exam_limit_time)
		        		// console.log("examLimitTimeArr", examLimitTimeArr)
		        		examLimitTimeArr.forEach(k=>final[ele].exam_limit_time = k)

		        		examPassGradeArr.add(elee.question.exam.exam_pass_grade)
		        		examPassGradeArr.forEach(k=>final[ele].exam_pass_grade = k)

		        		// examIdArr.add(elee.question.exam.id)
		        		// examIdArr.forEach(k=>final[ele].exam_pass_grade = k)

		        		questionTitleArr.add(elee.question.question_title)
		        		questionTitleArr.forEach(item=> {
		        			final[ele].questions[item] = []
							// final[ele][item].questions = []

		        			todo
			                .filter(item => item.question.exam.exam_title === ele)
			                .filter(i=>i.question.question_title === item)
			                .forEach(j=>{
			                	final[ele].questions[item].push([j.answer_title, j.answer_true_status])	
			                })

		        		})
		        	})
		        	examLimitCountArr.clear()
					examLimitTimeArr.clear()
					examPassGradeArr.clear()
					questionTitleArr.clear()

		        })
		        examTitleArr.clear()
	        // console.log("final", final)
	        return {
	        	...state,
	        	contents: final
	        }
		case actionTypes.ADD_CURCOUNT:
			return {
				...state,
				examCurrentCount: state.examCurrentCount + 1
			}
		case actionTypes.REMOVE_CURCOUNT:
			return {
				...state,
				examCurrentCount: state.examCurrentCount - 1
			}
		case actionTypes.ADD_CORRECTCOUNT:
			return {
				...state,
				correctCount: state.correctCount + 1
			}
		case actionTypes.ADD_INCORRECTCOUNT:
			return {
				...state,
				incorrectCount: state.incorrectCount + 1
			}
		case actionTypes.INIT_CURCOUNT:
			return {
				...state,
				examCurrentCount: 0
			}
		case actionTypes.INIT_COUNT:
			return {
				...state,
				examCurrentCount: 0,
				correctCount: 0,
				incorrectCount: 0
			}
		case actionTypes.ADD_ATTENDING_COUNT:
			return {
				...state,
				attendingCount: state.attendingCount + 1 
			}
		case actionTypes.UPDATE_SCORE:
			return {
				...state
			}
		default:
			return {...state}
	}
}
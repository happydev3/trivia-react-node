import * as actionTypes from "../action/actionTypes";
const initState = {
	contents: {}
}

export default function courseContentsReducer(state=initState, action) {

	switch (action.type) {
		case actionTypes.GET_INITDATA:
			const todo = action.pagedatas

	        let final = {}
	        const courseNameArr = new Set()
	        const lessonNameArr = new Set()
	        todo.map(item=>courseNameArr.add(item.lesson.course.course_title))
	        courseNameArr.forEach(ele=>{
	        	final[ele]={}
	        	todo
	        	.filter(item => item.lesson.course.course_title === ele)
	        	.map(ele => lessonNameArr.add(ele.lesson.lesson_title))
	        	lessonNameArr.forEach(item => {
	                final[ele][item] = []
	                
	        		todo
	        		.filter(tt => tt.lesson.course.course_title === ele)
	        		.filter(tt => tt.lesson.lesson_title === item)
	        		.forEach(tt => {
	                    final[ele][item].push([tt.topic_title, tt.topic_status, tt.topic_link, tt.id])	                    
	                })
	        	})
	        	lessonNameArr.clear()
	        })
	        // console.log(final)
	        return {
	        	...state,
	        	contents: final
	        }
		case actionTypes.ADD_CONFIRM:
			
			const {course, lesson, topic} = action.payload
			state.contents[course][lesson].filter(item => item[0] === topic)[0][1] = true
			return {
				...state
			}
		case actionTypes.REMOVE_CONFIRM:
			const {rcourse, rlesson, rtopic} = action.payload
			state.contents[rcourse][rlesson].filter(item => item[0] === rtopic)[0][1] = false
			return {
				...state
			}
		default:
			return state
	}
}
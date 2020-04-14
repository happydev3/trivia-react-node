import React from "react"
import {connect} from "react-redux"
import ReactMarkdown from 'react-markdown'
// import {addTradeScore} from "../../store/action/actions"


const BlogItem = ({item, addTradeScore}) => {

	const [more, setMore] = React.useState(false)
	// const [success, setSuccess] = React.useState("")
	// const [failed, setFailed] = React.useState("")
	const handleMoreClick = () => {
		setMore(!more)
	}
	// const handleChange = e => {
	// 	console.log("item id", e.target.id)
	// 	if (e.target.id === "success") {
	// 		setSuccess("success")
	// 		setFailed("")
	// 	} else if (e.target.id === "failed") {
	// 		setFailed("failed")
	// 		setSuccess()
	// 	}
	// }
	// const handleClick = (id) => {
	// 	if (success) {
	// 		addTradeScore(id, success)
	// 	} else if (failed) {
	// 		addTradeScore(id, failed)
	// 	} else {
	// 		alert("Select a status tag.")
	// 	}
	// }
	const publishde_date = new Date(item.trade_published)
	const date = publishde_date.toDateString()
	const time = publishde_date.toTimeString()
	return (
		<div className="blog_template" style={{border: "1px solid black", margin: '15px'}}>
			<h2>{item.trade_subject}&nbsp;&nbsp;
				<small>{item.trade_status_flag}</small>
			</h2>
			{
				item.trade_status_flag === "success"
				? item.trade_score === null
					? <span>Waiting for admin approval...</span>
					: <span>Score: {item.trade_score}</span>
				: item.trade_status_flag === "failed"
					? <div></div>
					: <div>Waiting</div>
			}
			
			<span>by {item.trade_author}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Category: {item.trade_category}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<span>{time.slice(0,8)} {date}</span>
			
			<p style={{textAlign: 'right'}} onClick={handleMoreClick}>{more ? "Read Less..." : "Read More..."}</p>
			{
				more
				? <div>
	  	      		<ReactMarkdown source={item.trade_content} />
	  	      	  </div>
				: <div></div>
			}
			
		</div>
		)
}
const BlogSection = props => {
	const {tradeideas, addTradeScore} = props
	return (
		<div className="container">
		{
			tradeideas.length !== 0 && tradeideas.length !== undefined && tradeideas !== undefined
			? tradeideas.map((item, index) => <BlogItem addTradeScore={addTradeScore} item={item} key={index} />)
			: <h3>No Trade Ideas</h3>
		}
		</div>
		)
}
const mapStateToProps = state => ({
	tradeideas: state.blogs.tradeideas
})
const mapDispatchToProps = dispatch => ({
	// addTradeScore: (a,b) => dispatch(addTradeScore(a,b))
})
export default connect(mapStateToProps, mapDispatchToProps)(BlogSection)
import React from "react"
import ReactMarkdown from 'react-markdown'

const BlogItem = ({item, addTradeScore, username}) => {

	const [more, setMore] = React.useState(false)
	const [success, setSuccess] = React.useState("")
	const [failed, setFailed] = React.useState("")
	const handleMoreClick = () => {
		setMore(!more)
	}
	const handleChange = e => {
		console.log("item id", e.target.id)
		if (e.target.id === "success") {
			setSuccess("success")
			setFailed("")
		} else if (e.target.id === "failed") {
			setFailed("failed")
			setSuccess()
		}
	}
	const handleClick = (id) => {
		if (success) {
			addTradeScore(id, success)
		} else if (failed) {
			addTradeScore(id, failed)
		} else {
			alert("Select a status tag.")
		}
	}
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
					: item.trade_author === username
					  ? <div>
							<input type="radio" id="success" name="radio" value="success" onChange={handleChange}/>
							<label htmlFor="success">success</label>&nbsp;&nbsp;
							<input type="radio" id="failed" name="radio" value="failed" onChange={handleChange}/>
							<label htmlFor="failed">failed</label>&nbsp;&nbsp;
							<button type="button" className="btn btn-primary btn-sm" onClick={() => handleClick(item.id)}>Status Submit</button>
					  	</div>
					  : <div></div>
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
export default BlogItem
import React from "react"
import ReactMarkdown from 'react-markdown'

const BlogItem = ({item}) => {
	const [more, setMore] = React.useState(false)
	const handleMoreClick = () => {
		setMore(!more)
	}
	const publishde_date = new Date(item.post_published)
	const date = publishde_date.toDateString()
	const time = publishde_date.toTimeString()
	return (
		<div className="blog_template" style={{border: "1px solid black", margin: '15px'}}>
			<h2>{item.post_subject}</h2>
			<span>by {item.post_author}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Category: {item.post_category}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<span>{time.slice(0,8)} {date}</span>
			
			<p style={{textAlign: 'right'}} onClick={handleMoreClick}>{more ? "Read Less..." : "Read More..."}</p>
			{
				more
				? <div>
	  	      		<ReactMarkdown source={item.post_content} />
	  	      	  </div>
				: <div></div>
			}
		</div>
		)
}
export default BlogItem
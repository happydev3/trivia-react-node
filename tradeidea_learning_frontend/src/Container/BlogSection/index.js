import React, {Suspense} from "react"
import {connect} from "react-redux"
import {getInitCategory, getInitBlog, getInitTradeIdea} from "../../store/action/actions"
import CircularProgress from '@material-ui/core/CircularProgress'
const BlogSection = React.lazy(() => import('./blogSection'))
const Editor = React.lazy(() => import('./WysiwygEditor'))

const Blog = props => {
	React.useEffect(() => {
     props.getInitCategory()
     props.getInitBlog()
     props.getInitTradeIdea()
	},[])
	const [post, setPost] = React.useState(false)
	const handlePostClick = () => {
		setPost(true)
	}

	return (
		<div>
			<Suspense fallback={<CircularProgress />}>
				<BlogSection />
			</Suspense>
			<button type="button" className="btn btn-primary" onClick={handlePostClick}>Start a Post</button>
			{
				post
				? <div className="post-component">
					<Suspense fallback={<CircularProgress />}>
						<Editor />
					</Suspense>
				  </div>
				: <div></div>
			}	
		</div>
		)
}
const mapDispatchToProps = dispatch => ({
  getInitCategory: () => dispatch(getInitCategory()),
  getInitBlog: () => dispatch(getInitBlog()),
  getInitTradeIdea: () => dispatch(getInitTradeIdea())
})

export default connect(null, mapDispatchToProps)(Blog)

import React, {Suspense} from "react"
import {connect} from "react-redux"
import CircularProgress from '@material-ui/core/CircularProgress'

const BlogItem = React.lazy(() => import('./BlogItem'))
const BlogSection = props => {
	const {posts} = props
	return (
		<div className="container">
		{
			posts.length !== 0 && posts.length !== undefined && posts !== undefined
			? posts.map((item, index) => 
				<Suspense fallback={<CircularProgress />} key={index}>
					<BlogItem item={item} key={index} />
				</Suspense>
				)
			: <h3>No Posts</h3>
		}
		</div>
		)
}
const mapStateToProps = state => ({
	posts: state.blogs.posts
})
export default connect(mapStateToProps, null)(BlogSection)
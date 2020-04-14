import React, {Suspense} from "react"
import {connect} from "react-redux"
import ReactMarkdown from 'react-markdown'
import {addTradeScore} from "../../store/action/actions"
import CircularProgress from '@material-ui/core/CircularProgress'
const BlogItem = React.lazy(() => import('./tradeBlogItem'))


const BlogSection = props => {
	const {tradeideas, addTradeScore, user} = props
	return (
		<div className="container">
		{
			tradeideas.length !== 0 && tradeideas.length !== undefined && tradeideas !== undefined
			? tradeideas.map((item, index) => 
				<Suspense fallback={<CircularProgress />} key={index}>
					<BlogItem addTradeScore={addTradeScore} item={item} username={user.username} key={index} />
				</Suspense>
				)
			: <h3>No Trade Ideas</h3>
		}
		</div>
		)
}
const mapStateToProps = state => ({
	tradeideas: state.blogs.tradeideas,
	user: state.auth.user
})
const mapDispatchToProps = dispatch => ({
	addTradeScore: (a,b) => dispatch(addTradeScore(a,b))
})
export default connect(mapStateToProps, mapDispatchToProps)(BlogSection)
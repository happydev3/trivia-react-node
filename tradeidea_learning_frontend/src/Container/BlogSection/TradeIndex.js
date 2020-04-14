import React, {Suspense} from "react"
import {connect} from "react-redux"
import {getInitCategory, getInitBlog, getInitTradeIdea} from "../../store/action/actions"
import CircularProgress from '@material-ui/core/CircularProgress'
const TradeEditor = React.lazy(() => import('./TradeEditor'))
const TradeSection = React.lazy(() => import('./tradeSection'))

const Blog = props => {
	React.useEffect(() => {
     props.getInitCategory()
     props.getInitBlog()
     props.getInitTradeIdea()
	},[props])

	const [trade, setTrade] = React.useState(false)

	const handleTradeIdeaClick = () => {
		setTrade(true)
	}
	return (
		<div>
			<Suspense fallback={<CircularProgress />}>
				<TradeSection />
			</Suspense>
			<button type="button" className="btn btn-primary" onClick={handleTradeIdeaClick}>Start a TradeIdea</button>
			{
				trade
				? <div className="trade-component">
					<Suspense fallback={<CircularProgress />}>
						<TradeEditor />
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

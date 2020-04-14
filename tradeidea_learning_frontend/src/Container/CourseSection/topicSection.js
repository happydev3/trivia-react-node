import React from "react";
import marked from "marked";
import styled from "styled-components"
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import queryString from "query-string";
import {addConfirm, removeConfirm} from "../../store/action/actions"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';




const TopicSection = styled.div`

	padding: 30px;
	&.cardpart {
		display: flex;
	}
`
const Card = styled.div`
	width: 200px;
	height: 100px;
	display: flex;
	box-sizing: border-box;
	align-items: center;
	text-align:center;
	box-shadow: 1px 2px 3px rgba(0,0,0,.2);
	margin: 15px;
	transition: all .2s;
	&:hover {
		box-shadow: 1px 3px 5px rgba(0,0,0,.5);
	}

`
class Topic extends React.Component {
	constructor(props) {
		super()
		this.state = {
			markdown: null,
			checkY: false,
			checkN: false,
			reload: false
		}
		
	}

	componentDidMount() {
		const query = queryString.parse(this.props.location.search);
		const {url} = query

		// const {params} = this.props.match;
		// const {course, topic} = params;
	
	  	const readmePath = require(`./markdownPages/${url}.md`);

		fetch(readmePath)
	    .then(response => {
	      return response.text()
	    })
	    .then(text => {
	      this.setState({
	        markdown: marked(text)
	      })
	    })
	}
	componentDidUpdate() {

		// const {params} = this.props.match;
		// const {course, topic} = params;
		const query = queryString.parse(this.props.location.search);
		const {url} = query

		const readmePath = require(`./markdownPages/${url}.md`);

		fetch(readmePath)
	    .then(response => {
	      return response.text()
	    })
	    .then(text => {
	      this.setState({
	        markdown: marked(text)
	      })
	    })
	}
	handleY = (course, val, topic, id) => {
		
		if (this.state.checkN === true) {
			this.setState({
				checkN: false
			})
		}
		this.setState({
			checkY: true
		})

		this.props.addConfirm(course, val, topic, id)

	}
	handleN = (course, val, topic, id) => {
		
		if (this.state.checkY === true) {
			this.setState({
				checkY: false
			})
		}
		this.setState({
			checkN: true
		})

		this.props.removeConfirm(course, val, topic, id)
	}
	refresh = () => {

		
		this.setState({
			reload: !this.state.reload,
			checkY: false,
			checkN: false
		})
	

	}
	render() {

		const query = queryString.parse(this.props.location.search);
		const {val} = query
		const { markdown } = this.state;
		const {params} = this.props.match;
		const {course, topic} = params;

		const {contents} = this.props

		const detectVal = contents[course][val].filter(item => item[0] === topic)[0]

		const detectId = detectVal[3]
		const detectIndex = contents[course][val].indexOf(detectVal)

		const length = contents[course][val].length - 1
		let nextTopic;
		detectIndex === length
		? nextTopic = contents[course][val][0][0]
		: nextTopic = contents[course][val][detectIndex+1][0]
		let nextUrl;
		detectIndex === length
		? nextUrl = contents[course][val][0][2]
		: nextUrl = contents[course][val][detectIndex+1][2]
		const nextval = val


		return (
	  	<TopicSection>
	  		<Breadcrumbs aria-label="breadcrumb">
			  <Link color="inherit" to="/main">
			    Trade
			  </Link>
			  <Link color="inherit" to={`/main/${course}`}>
			    {course}
			  </Link>
			  <Typography color="textPrimary">{`${val}-${topic}`}</Typography>
			</Breadcrumbs>
		  	<section>
		      <article dangerouslySetInnerHTML={{__html: markdown}}></article>
		    </section>
		    <div className="cardpart" style={{display: 'flex'}}>
		    	<Card>
		    		{this.state.checkY ? <CheckBoxOutlinedIcon onClick={() => this.handleY(course, val, topic, detectId)}/> : <CheckBoxOutlineBlankIcon onClick={() => this.handleY(course, val, topic, detectId)}/>}<span>YES</span>
		    		{this.state.checkN ? <CheckBoxOutlinedIcon onClick={() => this.handleN(course, val, topic, detectId)}/> : <CheckBoxOutlineBlankIcon onClick={() => this.handleN(course, val, topic, detectId)}/>}<span>NO</span>
		    	</Card>
		    	<Link to={`/main/${course}/${nextTopic}?val=${nextval}&url=${nextUrl}`}><Card onClick={this.refresh}><h3>Next Topic</h3></Card></Link>
		    </div>
		</TopicSection>
	    
	  )
	}
}
const mapStateToProps = (state, ownProps) => ({
	match: ownProps.match,
	location: ownProps.location,
	contents: state.courseContents.contents
})
const mapDispatchToProps = dispatch => ({
	addConfirm: (a,b,c,d) => dispatch(addConfirm(a,b,c,d)),
	removeConfirm: (a,b,c,d) => dispatch(removeConfirm(a,b,c,d)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Topic)
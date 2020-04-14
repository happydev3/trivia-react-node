import React from 'react'
// import styled from 'styled-components'
import {connect} from "react-redux"
import {getInitUser, getInitCategory, getInitTradeIdea} from "../../store/action/actions"
import TablePage from "./TableSection"

const TradeIndex = props => {
  React.useEffect(()=>{
    props.getInitUser()
    props.getInitCategory()
    props.getInitTradeIdea()
  }, [])
  const {categorys, allusers, tradeideas} = props
  if (tradeideas.length !== 0 && tradeideas.length !== undefined && tradeideas !== undefined) {
      tradeideas.forEach(item => {
        delete item.id
        delete item.trade_subject
        delete item.trade_content
        delete item.admin_approval
      })

  }
  console.log("tradeideas", tradeideas)
  
  const [category, setCategory] = React.useState("")
  const [writer, setWriter] = React.useState("")
  const handelCategoryChange = e => {
      setCategory(e.target.value)
    }
  const handelWriterChange = e => {
    setWriter(e.target.value)
  }
  return (
    <div className="container" style={{padding: "50px"}}>
      <div className="row">
        <label htmlFor="writer" className="col-sm-1">Writers: </label>
        <select className="form-control col-sm-4" id="writer" onChange={handelWriterChange}>
          <option></option>
            { allusers.length !== 0 && allusers !== undefined && allusers.length !== undefined
              ? allusers.map((item, index) => <option value={item} key={index}>{item}</option>)
              : <option>No Writers</option> 
            }
        </select>
        <label htmlFor="category" className="col-sm-1">Category: </label>
        <select className="form-control col-sm-4" id="category" onChange={handelCategoryChange}>
          <option></option>
            { categorys.length !== 0 && categorys !== undefined && categorys.length !== undefined
              ? categorys.map((category, index) => <option value={category.category_title} key={index}>{category.category_title}</option>)
              : <option>No Category</option> 
            }
        </select>
      </div>
      <TablePage data={tradeideas} category={category} writer={writer} />
    </div>
    )
}
const mapStateToProps = state => ({
  categorys: state.blogs.categorys,
  allusers: state.auth.allusers,
  tradeideas: state.blogs.tradeideas
})
const mapDispatchToProps = dispatch => ({
  getInitUser: () => dispatch(getInitUser()),
  getInitCategory: () => dispatch(getInitCategory()),
  getInitTradeIdea: () => dispatch(getInitTradeIdea())
})
export default connect(mapStateToProps, mapDispatchToProps)(TradeIndex)
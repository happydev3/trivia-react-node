
import React from 'react';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';
import ReactMarkdown from 'react-markdown'
import {connect} from "react-redux"
import {addPost} from "../../store/action/actions"

// import {handleCreateClick} from "../../store/action/actions"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const EditorConvertToMarkdown = props => {
  const subject = React.useRef(null);

  const {categorys} = props
  const author = props.username
  const initState = {
        "post_subject": "",
        "post_content": "",
        "post_author": author,
        "post_category": ""
      }
  const [postVal, setPostVal] = React.useState(initState)

  const [editorState, setEditorState] = React.useState()

    let convertVal
    if (editorState !== undefined) {
    	convertVal =  draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
    }
    const onEditorStateChange = (editorState) => {
      setEditorState(editorState)
      setPostVal(Object.assign({}, postVal, {"post_content": convertVal}))
    };
    const handelSubjectChange = () => {
      setPostVal(Object.assign({}, postVal, {"post_subject": subject.current.value}))
    }
    const handelCategoryChange = e => {
      setPostVal(Object.assign({}, postVal, {"post_category": e.target.value}))
    }
    const handleCreateClick = (postVal) => {
      props.addPost(postVal)
    }
    // console.log("convertVal", convertVal)
    return (
      <div className="container">
        <div className="row">

  	      <label htmlFor="subject" className="col-sm-2">Subject: </label>
  	      <input type="text" ref={subject} className="form-control col-sm-4" id="subject" placeholder="Subject" onChange={handelSubjectChange}/>
  	      <label htmlFor="category" className="col-sm-2">Category: </label>
  	      <select className="form-control col-sm-4" id="category" onChange={handelCategoryChange}>
          <option></option>
            { categorys.length !== 0 && categorys !== undefined && categorys.length !== undefined
              ? categorys.map((category, index) => <option value={category.category_title} key={index}>{category.category_title}</option>)
              : <option>No Category</option> 
            }
  	      </select>
        </div>
        <div className="row">
  	      <div className="col-sm-6" style={{border: '1px solid lightgrey'}}>
  	        <div style={{padding: "3px"}}>
  		        <Editor
  		          onEditorStateChange={onEditorStateChange}
  		        />
  	      	</div>
  	      </div>
  	      <div className="col-sm-6" style={{border: '1px solid lightgrey'}}>
  	      	<h1>Preview</h1>
  	      	<div>
  	      		<ReactMarkdown source={convertVal} />
  	      	</div>
  	      </div>
        </div>
        <button type="button" className="btn btn-primary" onClick={(a) => handleCreateClick(postVal)}>POST</button>
      </div>
    );
}
const mapStateToProps = state => ({
  categorys: state.blogs.categorys,
  username: state.auth.user.username
})
const mapDispatchToProps = dispatch => ({
  addPost: (a) => dispatch(addPost(a))
})
export default connect(mapStateToProps, mapDispatchToProps)(EditorConvertToMarkdown)
// {<textarea
//                   disabled
//                    value={editorState && draftToMarkdown(convertToRaw(editorState.getCurrentContent()))}
//                 />}
import React, { useEffect, useRef, useState } from "react";
import { inputHelper, toastNotify } from "../../Helper";
import { useSelector } from "react-redux";

import { WithAuthAdmin } from '../../HOC';
import { useCreatePostMutation } from "../../APIs/postApi";
import { MiniLoader } from "../../Components/Common";

import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { Toolbar } from '../../Components/RTE'

// css
import "./post.css";

const CreatePost = () => {

  const user = useSelector(state => state.userAuthStore)
  const [loading, setLoading] = useState(false);
  const [createPost] = useCreatePostMutation();

  const [editorState, setEditorState] = useState(
    EditorState.createEmpty()
  );
  
  const editor = useRef(null);


  const emptyPostDetailsInput = {
    title: "",
    references: "",
    abstract: "",
  }
  const [postInputs, setPostInputs] = useState(emptyPostDetailsInput);
  const handlePostDetailsInput = (e)=>{
    const tempData = inputHelper(e, postInputs)
    setPostInputs(tempData)
  }
  

  useEffect(() => {
    focusEditor();
  }, []);
  useEffect(()=>{
    document.getElementById('rteContent').innerHTML = stateToHTML(editorState.getCurrentContent())
  },[editorState]);

  const focusEditor = () => {
    editor.current.focus();
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  };

  // FOR INLINE STYLES
  const styleMap = {
    CODE: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
    HIGHLIGHT: {
      backgroundColor: "#F7A5F7",
    },
    UPPERCASE: {
      textTransform: "uppercase",
    },
    LOWERCASE: {
      textTransform: "lowercase",
    },
    CODEBLOCK: {
      fontFamily: '"fira-code", "monospace"',
      fontSize: "inherit",
      background: "#ffeff0",
      fontStyle: "italic",
      lineHeight: 1.5,
      padding: "0.3rem 0.5rem",
      borderRadius: " 0.2rem",
    },
    SUPERSCRIPT: {
      verticalAlign: "super",
      fontSize: "80%",
    },
    SUBSCRIPT: {
      verticalAlign: "sub",
      fontSize: "80%",
    },
  };

  // FOR BLOCK LEVEL STYLES(Returns CSS Class From DraftEditor.css)
  const myBlockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    switch (type) {
      case "blockQuote":
        return "superFancyBlockquote";
      case "leftAlign":
        return "leftAlign";
      case "rightAlign":
        return "rightAlign";
      case "centerAlign":
        return "centerAlign";
      case "justifyAlign":
        return "justifyAlign";
      default: break;
    }
  };

  const handleSaveContent = async ()=>{
    setLoading(true);
    const tempContent = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    const rowState = convertToRaw(editorState.getCurrentContent())
    if(rowState.blocks.length <= 1 && rowState.blocks[0].text.trim() === ""){
      toastNotify("can't create a post with empty content", "error")
      setLoading(false)
      return null;
    }
    if(postInputs.title === ""){
      toastNotify("insert a title for this post", "error")
      setLoading(false)
      return null;
    }
    try{
      const postObject = {
        ...postInputs,
        content: tempContent,
        AuthorId: user.id
      }
      // console.log(postObject);
      let response = await createPost(postObject);
      if(!response.data.isSuccess){
        toastNotify(response.data.message, "error")
        setLoading(false);
        return null;
      }
      toastNotify(response.data.message)
      setPostInputs(emptyPostDetailsInput);
    }catch(ex){
      toastNotify("can't create the post. reason: " + ex, "error");
    }
    setLoading(false)
    // call to postApi to send data to server
    // data to be stored
    //editorState.getCurrentContent();
  }
  const handleResetContent = ()=>{
    setPostInputs(emptyPostDetailsInput);
    setEditorState(EditorState.createEmpty());
  }
  return (
    <div>
      <div className="row px-5 gap-2">
        <div className="col-12 col-md-4">
          <input id="title-input" className="form-control" type="text" placeholder="عنوان" 
            name="title"
            value={postInputs.title}
            onChange={handlePostDetailsInput}
          />
        </div>
        <div id="references-input-wrapper" className="col-12 col-md-4 d-flex align-items-center">
          <input id="references-input" className="form-control" type="text" placeholder="رفرنس ها. به وسیله '-' جدا کنید" 
            name="references"
            value={postInputs.references}
            onChange={handlePostDetailsInput}
          />
          {/* <div><i className="bi bi-exclamation" ></i></div> */}
        </div>
        <div className="col-12">
          <textarea className="form-control" id="abstract-input" placeholder="خلاصه"
            rows={4}
            name="abstract"
            value={postInputs.abstract}
            onChange={handlePostDetailsInput}
          ></textarea>
        </div>
      </div>
      <div className="editor-wrapper" onClick={focusEditor}>
        <Toolbar editorState={editorState} setEditorState={setEditorState} />
        <div className="editor-container">
          <Editor
            ref={editor}
            placeholder="اینجا بنویسید..."
            handleKeyCommand={handleKeyCommand}
            editorState={editorState}
            customStyleMap={styleMap}
            blockStyleFn={myBlockStyleFn}
            onChange={(editorState) => {
              setEditorState(editorState);
            }}
          />
        </div>
        <div className="row justify-content-start mt-3 px-3">
        <button onClick={handleSaveContent} disabled={loading} className="btn btn-success col-2">{loading? <MiniLoader/>: 'ذخیره'}</button>
        <button onClick={handleResetContent} className="btn btn-secondary col-2">باز نشانی</button>
        </div>
        <div id="rteContent">{
          
        }</div>
      </div>
    </div>
  );
};

export default WithAuthAdmin(CreatePost);

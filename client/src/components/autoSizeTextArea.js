import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const AutoSizeTextArea = ({
  placeholder,
  editMode,
  onSave,
  updateValue,
  onBlur,
  t
}) => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const textAreaRef = useRef(null);
  useEffect(() => {
    setTextAreaValue(updateValue);
  }, [updateValue]);
  useEffect(() => {
    resizeTextArea();
  }, [textAreaValue]);

  useEffect(() => {
    if (editMode) {
      textAreaRef.current.focus();
      //if (t === 'name') 
      textAreaRef.current.select();
    }
  }, [editMode]);

  const resizeTextArea = () => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  };
  const onChange = e => {
    console.log(e.target.value)
    setTextAreaValue(e.target.value);
  };

  const onKeyDown = e => {
    // enter pressed
    if (e.keyCode === 13) {
      e.preventDefault();
      //onSave(textAreaValue);
      textAreaRef.current.blur();
    }
    else if (e.keyCode === 9 && typeof(updateValue) === String) {
      e.preventDefault();
      console.log('tab')
    }
  };
  return (
    <TextArea
      ref={textAreaRef}
      value={textAreaValue}
      onChange={onChange}
      rows={1}
      onKeyDown={onKeyDown}
      onBlur={() => onBlur(textAreaValue,t)}
      spellCheck="false"
      placeholder={placeholder}
      className={`p-0 pt-1 ${editMode ? "cursorText" : "cursorPointer"}`}
      
    ></TextArea>
  );
};
export default AutoSizeTextArea;

const TextArea = styled.textarea`
  height: auto;
  overflow-y: hidden;
  margin: -4px 0;
  border: none;
  resize: none;
  border-radius: 3px;
  width: 100%;
  background: transparent;
  &:focus {
    background: white;
    box-shadow: inset 0 0 0 2px #0079bf;
    outline: 0;
  }
`;
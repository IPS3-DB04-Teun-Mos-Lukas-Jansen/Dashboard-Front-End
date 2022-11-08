import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Input.css";

export default function UrlInput(props) {
  const [text, setText]= props.text;
  const id = 1;


  useEffect(() => {
    document.getElementById(id).addEventListener("input", (e) => {
      Changed(e);
    });
    document.getElementById(id).focus();
  }, []);

  async function Changed(e) {
    const _text = e.currentTarget.textContent;
    console.log(text);
    setText(text);
    const div = document.getElementById(id);
    
    const pretext = "https://";
    // const greyContent = text.startsWith(pretext);

    if ( _text.startsWith(pretext) && _text.length > pretext.length) {
      div.innerHTML =
        '<div class="greytext">https://</div><div id="urltext">' +
        _text.replace("https://", "") +
        "</div>";
        selectLast("urltext");
    }
    
    if ( !_text.startsWith(pretext)) {
        div.innerHTML = '<div id="urltext">' + _text + '</div>';
        selectLast("urltext");
        console.log("triggered")
    }
  }

  function selectLast(id) {
    var p = document.getElementById(id),
    s = window.getSelection(),
    r = document.createRange();

    r.setStart(p, 1);
    r.setEnd(p, 1);
    s.removeAllRanges();
    s.addRange(r);
  }

  function checkSubmit(e) {
    if (e.key == "Enter") {
      console.log("submit");
    }
  }

  return (
        <div
      className="input"
      id={id}
      contentEditable="true"
      onKeyDown={checkSubmit}
    ></div>
    
  );
}

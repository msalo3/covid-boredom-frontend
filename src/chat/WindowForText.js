import React from "react"

const WindowForText = (props) => {
  const allText = props.fullChat.map((item) => <p>{item}</p>);

  return <div>{allText}</div>
};

export default WindowForText;
import { Card, Avatar } from "antd";
import React from "react";
import ReactMarkdown from "react-markdown";
import {Message} from '../Store'

export interface MessageViewProps {
  message: Message
}

export const MessageView:React.FC<MessageViewProps> = ({message}) => {
  const color = message.sender == "user" ? "#efefef" : "#fff";
  const messageBodyRef = React.useRef<HTMLDivElement>(null);
  const [streamText, setStreamText] = React.useState("");

  React.useEffect(() => {
    console.log(message);
    if (message.dom) {
      message.dom.style.height = "600px";
      if (messageBodyRef.current) messageBodyRef.current.appendChild(message.dom);
    } else if (message.stream) {
      let text = "";
      message.stream.on("content", (delta: string) => {
        text = text + delta;
        if (messageBodyRef.current) messageBodyRef.current.scrollIntoView(false);
        setStreamText(text);
      });
    }
  }, []);

  return (
    <div
      className="messageCard"
      style={{
        // minHeight: message.dom ? 600 : 48,
        backgroundColor: color,
      }}
    >
      <div ref={messageBodyRef} className="messageBody">
        {message.text && <MessageMarkdown>{message.text}</MessageMarkdown>}
        {streamText && <MessageMarkdown>{streamText}</MessageMarkdown>}
      </div>
    </div>
  );
};

const MessageMarkdown = ({ children, ...props }: any) => {
  return (
    <ReactMarkdown
      components={{
        Link: (props: any) => (
          <a href={props.href} target="_blank">
            {props.children}
          </a>
        ),
      }}
      {...props}
    >
      {children}
    </ReactMarkdown>
  );
};

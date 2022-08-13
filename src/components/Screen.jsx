import { useState, useRef } from "react";
import "./Screen.css";
import { codedMessages } from "../messages";
import { AiOutlineSend } from "react-icons/ai";
import { GrAttachment } from "react-icons/gr";
import { useEffect } from "react";
const Screen = ({ selectedTheme }) => {
  const [messages, setMessages] = useState(codedMessages);
  const [sentMessage, setSentMessage] = useState("");
  const inputRef = useRef(null);

  const updateMessages = (e) => {
    e.preventDefault();
    sentMessage !== "" &&
      setMessages([
        ...messages,
        {
          message: sentMessage,
          flag: "sent",
        },
      ]);
    setSentMessage("");
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="screenWrapper">
      <div className="screen">
        {messages.map((message) => {
          return (
            <div
              style={{ backgroundColor: selectedTheme.bubbleColor }}
              className={
                message.flag === "received"
                  ? "chatBubble received"
                  : "chatBubble sent"
              }
            >
              <p className="chatText">{message.message}</p>
            </div>
          );
        })}
      </div>
      <div className="input">
        <form className="inputForm" onSubmit={updateMessages}>
          <input
            ref={inputRef}
            className="inputBox"
            type="text"
            value={sentMessage}
            placeholder="Enter your message..."
            onChange={(e) => setSentMessage(e.target.value)}
          />

          <button
            className="submit"
            onClick={sentMessage ? (e) => updateMessages(e) : null}
          >
            <AiOutlineSend />
          </button>
          <button className="submit">
            <GrAttachment />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Screen;

import React, { useState } from "react";
import axios from "axios";

const Bot = () => {
  const [inputText, setInputText] = useState("");
  const [reply, setReply] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/chat", {
        message: inputText,
      });

      const reply = response.data.reply;
      setReply(reply);
      setInputText(""); // Reset input text after submitting
    } catch (error) {
      console.error("Error:", error.message);
      setReply("An error occurred. Please try again later."); // Set error message in the component state
    }
  };

  const handleToggleChat = () => {
    setIsChatOpen((prevIsChatOpen) => !prevIsChatOpen);
  };

  return (
    <div style={{ marginLeft: "3.5rem", marginTop: "5rem" }}>
      <div className={`chat-container ${isChatOpen ? "open" : ""}`}>
        <div className="chat-header">
          <h3>Chat</h3>
          <button className="close-button" onClick={handleToggleChat}>
            X
          </button>
        </div>
        <div className="chat-content">
          {reply && <div className="chat-message">{reply}</div>}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            id="inputText"
            style={{ maxWidth: "400px" }}
            placeholder="Enter text"
            value={inputText}
            onChange={handleInputChange}
          />

<button type="submit" className="btn btn-primary mt-3 send-button">
  Send
</button>

        </form>
      </div>

      <button className="toggle-button" onClick={handleToggleChat}>
        Chat
      </button>
    </div>
  );
};

export default Bot;

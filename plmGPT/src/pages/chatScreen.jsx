import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '@styles/chatScreen.css'
import { FaArrowUp } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';

function Chat() {
const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [currentMessage, setCurrentMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [renderedMessages, setRenderedMessages] = useState([]);
  const assistantChoice = new URLSearchParams(location.search).get('assistantChoice');
  const chatScreenRef = useRef(null);
  useEffect(() => {
    const ws = new WebSocket(`wss://backend-ckmm.onrender.com/ws/stream/${assistantChoice}/`);
    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      const responseData = JSON.parse(event.data);
      console.log('Received WebSocket message:', responseData);
      if (responseData.delta) {
        updateCurrentMessage(responseData.delta);
      } else if (responseData.error) {
        alert('Error: ' + responseData.error);
      }
      setLoading(false);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setLoading(false);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
      setLoading(false);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [assistantChoice]);

  const updateCurrentMessage = (deltaText) => {
    setCurrentMessage(prev => prev + deltaText);
  };

  const onSend = (text) => {
    const newUserMessage = { content: text, isUserMessage: true };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);

    if (socket) {
      setLoading(true);
      socket.send(text);
    } else {
      alert('Error: WebSocket connection is not open');
    }
  };

  useEffect(() => {
    if (currentMessage.trim() !== '') {
      const lastMessageIndex = messages.length - 1;
      if (lastMessageIndex >= 0 && !messages[lastMessageIndex].isUserMessage) {
        setMessages(prevMessages => [
          ...prevMessages.slice(0, lastMessageIndex),
          { ...prevMessages[lastMessageIndex], content: prevMessages[lastMessageIndex].content + currentMessage }
        ]);
      } else {
        setMessages(prevMessages => [...prevMessages, { content: currentMessage, isUserMessage: false }]);
      }
      setCurrentMessage('');
    }
  }, [currentMessage, messages]);

  useEffect(() => {
    const processedMessages = messages.map(message => ({
      ...message,
      htmlContent: <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
    }));
    setRenderedMessages(processedMessages);
  }, [messages]);
  useEffect(() => {
    if (chatScreenRef.current) {
      chatScreenRef.current.scrollTop = chatScreenRef.current.scrollHeight;
    }
  }, [renderedMessages, loading]);
  const [input, setInput] = useState('');
  const handleSend = () => {
    if (input.trim() !== '') {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="container">
      <div className="chat">
        <div className='pageHeader'>
          <h3>TEMP</h3>

        </div>
        <div className='chatScreen' ref={chatScreenRef}>
          {renderedMessages.map((message, index) => (
            <div
              key={index}
              className={`messageContainer ${message.isUserMessage ? 'userMessage' : 'responseMessage'}`}
            >

              <div className="messageText">
                {message.htmlContent}
              </div>
            </div>
          ))}
          {loading && <div className="loading"></div>}
        </div>
        <div className='textInputBox'>
          <div className="inputWrapper">
            <input
              type="text"
              className="textInput"
              placeholder="Ask anything"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
            />
            <button 
            className={`sendButton ${loading ? 'disabledButton' : ''}`} 
            onClick={handleSend} 
            disabled={loading}>
              <FaArrowUp className='arrowIcon' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;

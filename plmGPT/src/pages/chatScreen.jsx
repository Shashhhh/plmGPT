import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '@styles/chatScreen.css';
import { FaArrowUp } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';
import { IconButton, TextField, Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { motion } from 'framer-motion';
import PillButton from '../components/pillButton';

function Chat() {
  const location = useLocation();
  const [messages, setMessages] = useState(() => {
    const storedMessages = sessionStorage.getItem('chatMessages');
    return storedMessages ? JSON.parse(storedMessages) : [];
  });
  const [socket, setSocket] = useState(null);
  const [currentMessage, setCurrentMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [renderedMessages, setRenderedMessages] = useState([]);
  const assistantChoice = new URLSearchParams(location.search).get('assistantChoice');
  const [showOverlay, setShowOverlay] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const chatScreenRef = useRef(null);

  const overlayAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } }
  };

  const handleOverlay = () => {
    setShowOverlay(false);
    sessionStorage.setItem('hasVisited', 'true');
    setAnimate(true);
  };

  const handlePasswordSubmit = async () => {
    try {
      const response = await fetch('https://backend-ckmm.onrender.com/check-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        setIsAuthenticated(true);
        setShowPasswordPrompt(false);
        setPasswordError('');
      } else {
        setPasswordError('Incorrect password');
      }
    } catch (error) {
      console.error('Error checking password:', error);
    }
  };

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowOverlay(true);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

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

  const handleClearMessages = () => {
    setMessages([]);
    sessionStorage.removeItem('chatMessages');
  };

  if (!isAuthenticated) {
    return (
      <div className="container">
        <div className='passwordContainer'>
        <h2>
        Password Protected
        </h2>
        <p>
        This assistant is password protected. Please enter the password to continue. To return to the homepage, click the arrow at the top left.
        </p>
        <TextField
          type="password"
          label="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handlePasswordSubmit();
            }
          }}
          error={Boolean(passwordError)}
          helperText={passwordError}
        />
        <Button className="submitButton"onClick={handlePasswordSubmit}>Submit</Button>
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      {showOverlay && (
        <motion.dialog 
          className='welcomeDialog'
          open 
          variants={overlayAnimation} 
          initial="hidden" 
          animate="visible" 
          exit="exit"
        >
          <span style={{ fontWeight: 'bold' }}>
            Welcome!
          </span>
          <p>
            Welcome to the Siemens AI Chat Screen! Ready to explore innovative solutions and drive your projects forward? Click the "Let's Begin" button to get started and unlock the full potential of our tools and insights!
          </p>
          <form method="dialog">
            <div className="dialogButtonContainer">
              <PillButton onClick={handleOverlay}>Let's Begin</PillButton>
            </div>
          </form>
        </motion.dialog>
      )}
      <div className={`chat ${showOverlay ? 'blurred disabled' : ''}`}>
        <div className='pageHeader'>
          <h3>TEMP</h3>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="newChat"
            onClick={handleClearMessages} 
          >
            <ChatIcon />
          </IconButton>
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

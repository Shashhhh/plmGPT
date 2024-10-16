import React, { useState, useEffect, useRef, useCallback, useMemo, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import { IconButton, TextField, Button, Avatar } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import MemoryIcon from '@mui/icons-material/Memory';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaArrowUp } from "react-icons/fa6";
import { motion } from 'framer-motion';
import '@styles/chatScreen.css';  
import SaveIcon from '@mui/icons-material/Save';
import { ring } from 'ldrs';
import { TypeAnimation } from 'react-type-animation';
ring.register();
function Chat() {
  const location = useLocation();
  const assistantChoice = useMemo(() => new URLSearchParams(location.search).get('assistantChoice'), [location.search]);

  /** State Management **/
  const initialMessages = useMemo(() => {
    const storedMessages = sessionStorage.getItem(`chatMessages_${assistantChoice}`);
    return storedMessages ? JSON.parse(storedMessages) : [];
  }, [assistantChoice]);

  const messageReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_MESSAGE':
        return [...state, action.payload];
      case 'APPEND_TO_LAST_MESSAGE':
        return state.map((msg, index) =>
          index === state.length - 1
            ? { ...msg, content: msg.content + action.payload }
            : msg
        );
      case 'CLEAR_MESSAGES':
        return [];
      default:
        return state;
    }
  };

  const [messages, dispatch] = useReducer(messageReducer, initialMessages);
  const messagesRef = useRef(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const [socket, setSocket] = useState(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const chatScreenRef = useRef(null);

  // Ref to track if we're in the middle of an assistant's message
  const isAssistantMessagePending = useRef(false);

  // Ref to handle the response timeout
  const responseTimeoutRef = useRef(null);

  /** Animations **/

  const chatAnimation = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 100, transition: { duration: 0.5 } }
  };

  /** Effects **/
  useEffect(() => {
    if (assistantChoice === 'Value_prop' || assistantChoice === 'Machinist') {
      setIsAuthenticated(true);
    } else {
      setShowPasswordPrompt(true);
    }
  }, [assistantChoice]);

  useEffect(() => {
    sessionStorage.setItem(`chatMessages_${assistantChoice}`, JSON.stringify(messages));
  }, [messages, assistantChoice]);

  useEffect(() => {
    const ws = new WebSocket(`wss://backend-ckmm.onrender.com/ws/stream/${assistantChoice}/`);

    ws.addEventListener('open', () => {
      console.log('WebSocket connection opened');
    });

    ws.addEventListener('message', (event) => {
      const responseData = JSON.parse(event.data);
      console.log('Received message:', responseData);

      // Clear previous timeout
      if (responseTimeoutRef.current) {
        clearTimeout(responseTimeoutRef.current);
      }
      if (responseData.delta) {
        if (!isAssistantMessagePending.current) {
          // Start of a new assistant message
          dispatch({
            type: 'ADD_MESSAGE',
            payload: { content: responseData.delta, isUserMessage: false },
          });
          isAssistantMessagePending.current = true;

          // Manually update messagesRef.current
          messagesRef.current = [...messagesRef.current, { content: responseData.delta, isUserMessage: false }];
        } else {
          // Append to the existing assistant message
          dispatch({
            type: 'APPEND_TO_LAST_MESSAGE',
            payload: responseData.delta,
          });

          // Manually update messagesRef.current
          messagesRef.current = messagesRef.current.map((msg, index) =>
            index === messagesRef.current.length - 1
              ? { ...msg, content: msg.content + responseData.delta }
              : msg
          );
        }

        // Set new timeout to detect end of response
        responseTimeoutRef.current = setTimeout(() => {
          setLoading(false);
          isAssistantMessagePending.current = false;
        }, 5000); // Timeout duration in milliseconds
      } else {
        // Handle any other messages or explicit end signal
        // For example, if responseData.type === 'end'
        if (responseData.type === 'end') {
          setLoading(false);
          isAssistantMessagePending.current = false;
        }
      }
    });

    ws.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);
      setLoading(false);
      isAssistantMessagePending.current = false;
    });

    ws.addEventListener('close', () => {
      console.log('WebSocket connection closed');
      setLoading(false);
      isAssistantMessagePending.current = false;
    });

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [assistantChoice]);

  useEffect(() => {
    if (chatScreenRef.current) {
      chatScreenRef.current.scrollTop = chatScreenRef.current.scrollHeight;
    }
  }, [messages, loading]);

  /** Handlers **/

  const handlePasswordSubmit = useCallback(async () => {
    try {
      const response = await fetch('https://backend-ckmm.onrender.com/check-password/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
  }, [password]);

  const onSend = useCallback((text) => {
    const newUserMessage = { content: text, isUserMessage: true };
    dispatch({ type: 'ADD_MESSAGE', payload: newUserMessage });

    // Manually update messagesRef.current
    messagesRef.current = [...messagesRef.current, newUserMessage];

    if (socket && socket.readyState === WebSocket.OPEN) {
      setLoading(true);
      socket.send(text);
    }
  }, [socket]);

  const handleSend = useCallback(() => {
    if (input.trim() !== '') {
      onSend(input);
      setInput('');
    }
  }, [input, onSend]);

  const handleClearMessages = useCallback(() => {
    dispatch({ type: 'CLEAR_MESSAGES' });
    messagesRef.current = [];
    sessionStorage.removeItem(`chatMessages_${assistantChoice}`);
  }, [assistantChoice]);

  const handleInputKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !loading) {
      handleSend();
    }
  }, [handleSend, loading]);

  /** Rendered Components **/
  const renderedMessages = useMemo(() => {
    return messages.map((message) => ({
      ...message,
      htmlContent: (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ children, href }) => (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
      ),
    }));
  }, [messages]);
  const handleSaveChat = useCallback(() => {
    // Format the messages into a Markdown string
    const formattedMessages = messages
      .map((message) => {
        const sender = message.isUserMessage ? '**You**' : '**Assistant**';
        return `${sender}:\n\n${message.content}`;
      })
      .join('\n\n---\n\n');
  
    // Create a Blob from the formatted messages with Markdown MIME type
    const blob = new Blob([formattedMessages], { type: 'text/markdown;charset=utf-8' });
  
    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'chat_conversation.md';
  
    // Append the link to the body and trigger a click
    document.body.appendChild(link);
    link.click();
  
    // Clean up by removing the link
    document.body.removeChild(link);
  }, [messages]);
  
  /** Conditional Rendering **/
  const hasUserSentMessage = useMemo(() => {
    return messages.some(message => message.isUserMessage);
  }, [messages]);
  
  if (showPasswordPrompt && !isAuthenticated) {
    return (
      <div className="container">
        <div className='passwordContainer'>
          <h2>Password Protected</h2>
          <p>
            This assistant is password protected. Please enter the password to continue.
            To return to the homepage, click the arrow at the top left.
          </p>
          <TextField
            type="password"
            label="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
            error={Boolean(passwordError)}
            helperText={passwordError}
            aria-label="Password Input"
          />
          <Button className="submitButton" onClick={handlePasswordSubmit}>Submit</Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className='container'
      initial="initial"
      animate="animate"
      exit="exit"
      variants={chatAnimation}
    >
      <div className="chat">
        <div className='pageHeader'>
          <div>Siemens GPT</div>
          <div className="buttonGroup">
          <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="Save Chat"
          onClick={handleSaveChat}
        >
          <SaveIcon />
        </IconButton>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="Clear Chat"
            onClick={handleClearMessages}
          >
            <ChatIcon />
          </IconButton>
          </div>
        </div>
        <div className='chatScreen' ref={chatScreenRef}>
        {!hasUserSentMessage && (
            <>
              <div className="backgroundTextContainer">
                <TypeAnimation
                  sequence={["Start typing below to get started."]}
                  wrapper="span"
                  speed={50}
                  style={{ fontSize: '2em', display: 'inline-block' }}
                />
              </div>
              <p className="disclaimerText">
                You may experience some bugs as Siemens GPT is still in development.
              </p>
            </>
          )}
          {renderedMessages.map((message, index) => (
            <MessageRow key={index} message={message} />
          ))}
          {loading && <div className="loading" aria-label="Loading"></div>}
        </div>
        <ChatInput
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          handleInputKeyDown={handleInputKeyDown}
          loading={loading}
        />
        <p className='disclaimerText2'>
          Siemen GPT can make mistakes, so please double check important info.
        </p>
      </div>
    </motion.div>
  );
}

/** Extracted Components **/
const MessageRow = ({ message }) => {
  return (
    <div
      className={`messageRow ${message.isUserMessage ? 'userMessageRow' : 'responseMessageRow'}`}
    >
      {/* Assistant's Avatar */}
      {!message.isUserMessage && (
        <div className="avatarContainer">
          <Avatar
            alt="Assistant Avatar"
            className="avatarIcon"
            sx={{
              backgroundColor: 'transparent',
              border: '1px solid #3d3d3d',
              color: 'rgba(255, 255, 255, 0.87)',
            }}
          >
            <MemoryIcon />
          </Avatar>
        </div>
      )}

      {/* Message Content */}
      <div className={`messageContainer ${message.isUserMessage ? 'userMessage' : 'responseMessage'}`}>
        <div className="messageText">
          {message.htmlContent}
        </div>
      </div>

      {/* Spacer for alignment */}
      {message.isUserMessage && <div className="spacer" />}
    </div>
  );
};

const ChatInput = ({ input, setInput, handleSend, handleInputKeyDown, loading }) => {
  return (
    <div className='textInputBox'>
      <div className="inputWrapper">
        <input
          type="text"
          className="textInput"
          placeholder="Message Siemens GPT"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          aria-label="Chat Input"
        />

        {loading ? (
          <button className="sendButton" disabled>
          <l-ring
            size="30"
            stroke="4"
            bg-opacity="0"
            speed="2" 
            color="white" 
          ></l-ring>
        </button>
        ) : (
          <button
            className="sendButton"
            onClick={handleSend}
            aria-label="Send Message"
          >
            <FaArrowUp className='arrowIcon' />
          </button>
        )}
      </div>
    </div>
  );
};

export default Chat;

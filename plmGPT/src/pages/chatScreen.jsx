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
import PillButton from '../components/pillButton';
import SaveIcon from '@mui/icons-material/Save';

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
  const [showOverlay, setShowOverlay] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const chatScreenRef = useRef(null);

  // Ref to track if we're in the middle of an assistant's message
  const isAssistantMessagePending = useRef(false);

  // Ref to handle the response timeout
  const responseTimeoutRef = useRef(null);

  /** Animations **/
  const overlayAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } }
  };

  const chatAnimation = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 100, transition: { duration: 0.5 } }
  };

  /** Effects **/
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowOverlay(true);
    }
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
        setLoading(false)
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
        }, 3000); // Timeout duration in milliseconds
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
  const handleOverlay = useCallback(() => {
    setShowOverlay(false);
    sessionStorage.setItem('hasVisited', 'true');
  }, []);

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
      setErrorMessage('An error occurred while verifying the password.');
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
    } else {
      setErrorMessage('Error: WebSocket connection is not open');
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
    if (e.key === 'Enter') {
      handleSend();
    }
  }, [handleSend]);

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

  /** Conditional Rendering **/
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
  
  return (
    <motion.div
      className='container'
      initial="initial"
      animate="animate"
      exit="exit"
      variants={chatAnimation}
    >
      {showOverlay && (
        <motion.dialog
          className='welcomeDialog'
          open
          variants={overlayAnimation}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <span style={{ fontWeight: 'bold' }}>Welcome!</span>
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
          <h3>Siemens GPT</h3>
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
          {renderedMessages.map((message, index) => (
            <MessageRow key={index} message={message} />
          ))}
          {loading && <div className="loading" aria-label="Loading"></div>}
          {errorMessage && <div className="error">{errorMessage}</div>}
        </div>
        <ChatInput
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          handleInputKeyDown={handleInputKeyDown}
          loading={loading}
        />
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
          placeholder="Ask anything"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          aria-label="Chat Input"
        />
        <button
          className={`sendButton ${loading ? 'disabledButton' : ''}`}
          onClick={handleSend}
          disabled={loading}
          aria-label="Send Message"
        >
          <FaArrowUp className='arrowIcon' />
        </button>
      </div>
    </div>
  );
};

export default Chat;

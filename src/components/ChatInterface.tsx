
import React, { useState, useRef, useEffect, memo } from 'react';
import { SendIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Memoized message component to prevent unnecessary re-renders
const ChatMessage = memo(({ message }: { message: Message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div 
      className={cn(
        "flex flex-col max-w-[80%] rounded-lg p-2.5 mb-1",
        message.isUser ? "ml-auto bg-primary text-primary-foreground" : "mr-auto bg-muted"
      )}
    >
      <span className="text-sm">{message.text}</span>
      <span className="text-[10px] opacity-70 mt-1 self-end">
        {formatTime(message.timestamp)}
      </span>
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hello! How can I help you today?", isUser: false, timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    
    // Add user message to chat
    const userMessage = { id: generateId(), text: input, isUser: true, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate AI response (replace with actual API call)
      setTimeout(() => {
        const aiResponse = { 
          id: generateId(),
          text: `I received your message: "${input.trim()}"`, 
          isUser: false, 
          timestamp: new Date() 
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 500); // Reduced timeout for better user experience
      
      // For actual API implementation:
      // const response = await fetch('/api/chat', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message: input }),
      // });
      // const data = await response.json();
      // setMessages(prev => [...prev, { text: data.reply, isUser: false, timestamp: new Date() }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        id: generateId(),
        text: "Sorry, I couldn't process your request. Please try again.", 
        isUser: false, 
        timestamp: new Date() 
      }]);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div 
      ref={chatContainerRef}
      className="flex flex-col bg-background border border-border rounded-lg shadow-lg w-[320px] h-[400px] overflow-hidden"
      aria-label="Chat interface"
    >
      {/* Chat header */}
      <div className="bg-primary/10 p-3 border-b border-border">
        <h3 className="font-medium">EduPortal Assistant</h3>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex mr-auto bg-muted rounded-lg p-2.5 max-w-[80%]">
            <div className="flex space-x-1 items-center h-5">
              <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="p-3 border-t border-border bg-background flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1"
          aria-label="Chat message input"
        />
        <Button 
          size="icon" 
          onClick={handleSendMessage} 
          disabled={input.trim() === '' || isLoading}
          aria-label="Send message"
        >
          <SendIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(ChatInterface);

"use client";

import { useState } from "react";
import { CornerDownLeft, Loader } from "lucide-react";
import { chat, type ChatMessage } from "@/ai/flows/chat-flow";

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await chat(newMessages);
      const botMessage: ChatMessage = { role: "model", content: response };
      setMessages([...newMessages, botMessage]);
    } catch (error) {
      console.error("Failed to get response from chatbot:", error);
      const errorMessage: ChatMessage = {
        role: "model",
        content: "Sorry, I'm having trouble connecting. Please try again later.",
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  }

  return (
    <div className="bg-card p-6 rounded-lg shadow-md flex flex-col h-[60vh]">
      <div className="flex-grow overflow-y-auto mb-4 p-4 border rounded-md bg-background/50 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Ask me anything about ParentView!</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-lg ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))
        )}
         {isLoading && (
            <div className="flex items-start gap-3 justify-start">
                <div className="p-3 rounded-lg bg-secondary text-secondary-foreground">
                    <Loader className="h-5 w-5 animate-spin" />
                </div>
            </div>
        )}
      </div>
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="w-full p-3 pr-12 border rounded-md bg-background"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:bg-muted"
        >
          <CornerDownLeft className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

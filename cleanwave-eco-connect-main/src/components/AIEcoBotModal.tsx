
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot } from 'lucide-react';

interface AIEcoBotModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AIEcoBotModal = ({ open, onOpenChange }: AIEcoBotModalProps) => {
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState([
    {
      id: 1,
      text: "Hi! I'm your AI EcoBot 🌊 How can I help you with your cleanup journey today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      timestamp: new Date()
    };

    const botResponse = {
      id: messages.length + 2,
      text: "Thanks for your message! I'm here to help with cleanup tips, environmental facts, and motivation. What would you like to know?",
      isBot: true,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage, botResponse]);
    setMessage('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className="ocean-gradient p-2 rounded-full">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <span>AI EcoBot</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col h-80">
          <ScrollArea className="flex-1 p-4 border rounded-lg">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.isBot
                        ? 'bg-ocean-light text-ocean-dark'
                        : 'coral-gradient text-white'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="flex space-x-2 mt-4">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} className="coral-gradient">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIEcoBotModal;

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockUsers, mockConversations, currentUser, User } from '@/lib/data';
import { cn } from '@/lib/utils';
import { IcebreakerGenerator } from '@/components/icebreaker-generator';
import { SendHorizonal, MessageSquare } from 'lucide-react';

export default function MessagesPage() {
  const [activeConversationId, setActiveConversationId] = useState<number | null>(mockConversations[0]?.id || null);
  const [message, setMessage] = useState('');

  const conversationsWithUsers = mockConversations.map(convo => {
    const user = mockUsers.find(u => u.id === convo.userId);
    return { ...convo, user };
  }).filter(c => c.user);

  const activeConversation = conversationsWithUsers.find(c => c.id === activeConversationId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !activeConversation) return;
    // In a real app, you'd update the conversation state and send to a server
    console.log(`Sending message to ${activeConversation.user?.name}: ${message}`);
    setMessage('');
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  }

  return (
    <AppShell>
      <div className="h-screen flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 h-full">
          {/* Conversation List */}
          <div className={cn(
              "border-r flex-col md:flex",
              activeConversation ? "hidden" : "flex"
          )}>
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold">Chats</h2>
            </div>
            <ScrollArea className="flex-1">
              {conversationsWithUsers.map(({ id, user }) => user && (
                <button
                  key={id}
                  onClick={() => setActiveConversationId(id)}
                  className={cn(
                    "flex items-center gap-3 p-4 w-full text-left hover:bg-accent transition-colors",
                    activeConversationId === id && 'bg-accent'
                  )}
                >
                  <Avatar>
                    <AvatarImage src={user.photos[0]} alt={user.name} data-ai-hint="person" />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {mockConversations.find(c => c.id === id)?.messages.slice(-1)[0].text}
                    </p>
                  </div>
                </button>
              ))}
            </ScrollArea>
          </div>

          {/* Chat Window */}
          <div className={cn(
              "md:col-span-2 xl:col-span-3 flex-col",
              activeConversation ? "flex" : "hidden md:flex"
          )}>
            {activeConversation && activeConversation.user ? (
              <>
                <div className="p-4 border-b flex items-center gap-3">
                   <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setActiveConversationId(null)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                   </Button>
                  <Avatar>
                    <AvatarImage src={activeConversation.user.photos[0]} alt={activeConversation.user.name} data-ai-hint="person" />
                    <AvatarFallback>{activeConversation.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold">{activeConversation.user.name}</h3>
                </div>
                <ScrollArea className="flex-1 p-4 bg-muted/20">
                    <div className="space-y-4">
                        {activeConversation.messages.map((msg) => (
                            <div key={msg.id} className={cn(
                                "flex items-end gap-2",
                                msg.senderId === currentUser.id ? "justify-end" : "justify-start"
                            )}>
                                {msg.senderId !== currentUser.id && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={activeConversation.user?.photos[0]} alt={activeConversation.user?.name} data-ai-hint="person" />
                                        <AvatarFallback>{activeConversation.user?.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={cn(
                                    "max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-2xl",
                                    msg.senderId === currentUser.id 
                                        ? "bg-primary text-primary-foreground rounded-br-none"
                                        : "bg-card text-card-foreground rounded-bl-none"
                                )}>
                                    <p>{msg.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <div className="p-4 border-t space-y-4">
                  <IcebreakerGenerator user1={currentUser} user2={activeConversation.user} onSuggestionClick={handleSuggestionClick} />
                  <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={`Message ${activeConversation.user.name}`}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon">
                      <SendHorizonal className="h-5 w-5" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <MessageSquare className="h-16 w-16" />
                    <h2 className="mt-4 text-xl font-semibold">Select a conversation</h2>
                    <p className="mt-1">Choose one of your matches to start chatting.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

import React from 'react';
import ChatInterface from '../components/ChatInterface';
import Navbar from '../components/Navbar';

const ChatPage = () => {
    return (
        <div className="min-h-screen bg-ice-blue flex flex-col">
            <Navbar />
            <div className="flex-grow pt-20 pb-4 px-4">
                <ChatInterface />
            </div>
        </div>
    );
};

export default ChatPage;

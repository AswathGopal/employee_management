import React from 'react'
import { useState} from 'react'
import axios from 'axios';
import Animation from './Animation';
const ChatBot = () => {
    const [inputValue,setInputValue]=useState('');
    const [chatLog,setChatLog] = useState([]);
    const [isLoading,setIsLoading]= useState(false);

    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log(inputValue)
        setChatLog((prevChatLog) => [...prevChatLog,{type:'user',message: inputValue}])
        sendMessage(inputValue)
        setInputValue('');
    }

    const sendMessage =(message) =>{
        const url ='http://localhost:5000/';
        const headers ={
            'Content-Type':'application/json',
        };
        const data={
            "message":message,
        }
        console.log(data)
        setIsLoading(true);
        axios.post(url,data,{headers:headers})
        .then((data)=>{console.log("response",data.data.res)
         setChatLog((prevChatLog) => [
           ...prevChatLog,
           {type:"bot", message: data.data.res },
         ]);
         setIsLoading(false);
        }
        )
        .catch((error)=>{
            console.log(error);
            setIsLoading(false)
        })
    }
  return (
    <div className="container  mx-auto max-w-[700px]  ">
      <div className=" min-h-screen flex flex-col  bg-gray-900">
        <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center py-3 font-bold text-6xl">
          ChatBot
        </h1>
        <div className="flex-grow p-6">
          <div className="flex flex-col space-y-4">
            {chatLog.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    message.type === "user" ? "bg-purple-500" : "bg-gray-800"
                  } rounded-lg p-4 text-white max-w-sm`}
                >
                  {message.message}
                </div>
              </div>
            ))}
            {isLoading && (
              <div key={chatLog.length} className="flex justify-start">
                <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
                  <Animation />
                </div>
              </div>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex-none p-6">
          <div className="flex rounded-lg border border-gray-700 bg-gray-800">
            <input
              type="text"
              className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type="submit"
              className="bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatBot

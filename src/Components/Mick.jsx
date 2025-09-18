import React, { useState, useEffect, useRef } from "react";
import { Mic as MicIcon, MicOff } from "lucide-react";

function Mic({ onAddTodo }) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // ================== Voice Assistant Setup ==================
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = "en-US";
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim();
        if (transcript) {
          // ✅ Voice se naya todo add karega
          const newTodo = {
            id: Date.now(),
            todo: transcript,
            isCompleted: false,
          };
          onAddTodo(newTodo);
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      alert("Speech Recognition not supported in this browser.");
    }
  }, [onAddTodo]);

  // ================== Voice Assistant Control ==================
  const handleListen = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // ================== UI ==================
  return (
    <button
      onClick={handleListen}
      className="p-0.5 flex text-md items-center ml-2 font-bold bg-emerald-800 text-white rounded-3xl hover:bg-emerald-700 transition"
    >
      {isListening ? <MicOff /> : <MicIcon />}
      {isListening ? "Stop Listening" : "Start Listening"}
    </button>
  );
}

export default Mic;
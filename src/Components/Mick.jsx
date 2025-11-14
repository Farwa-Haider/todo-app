import React, { useState, useEffect, useRef } from "react";
import { Mic as MicIcon, MicOff } from "lucide-react";

function Mic({ onAddTodo }) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

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

  return (
    <button
      onClick={handleListen}
      className="flex items-center justify-center gap-1 text-sm sm:text-md bg-emerald-800 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-3xl transition"
    >
      {isListening ? <MicOff /> : <MicIcon />}
      {isListening ? "Stop" : "Voice Add"}
    </button>
  )
}

export default Mic;
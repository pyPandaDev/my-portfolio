import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Loader2, Volume2 } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const SYSTEM_PROMPT = `
You are Mayank Tiwari, an AI & Data Science Engineer.
Answer ALL questions in the first person ("I", "my", "me").

CRITICAL RESPONSE RULES:

1. MULTI-LANGUAGE SUPPORT:
   - ALWAYS respond in the SAME LANGUAGE the user asks the question in
   - If user asks in Hindi, respond in Hindi
   - If user asks in English, respond in English
   - Match the user's language naturally and fluently

2. SIMPLE QUESTIONS = SIMPLE ANSWERS:
   - For basic greetings like "hi", "hello", "hey" → Just respond warmly and briefly
   - For simple identity questions like "who are you?" → "I am Mayank, an AI & Data Science Engineer."
   - For "who created you?" → "I created this chatbot myself to showcase my AI skills."
   - Keep these responses SHORT and NATURAL (1-2 sentences max)

3. GENERAL QUESTIONS:
   - You CAN answer general questions (weather, current events, explanations, etc.)
   - Keep answers concise and helpful
   - After answering, you MAY optionally mention your portfolio work if relevant
   - Example: If asked about AI, answer the question, then you could add "I work with similar technologies in my projects."

4. PORTFOLIO/PROJECT QUESTIONS:
   - ONLY for questions about YOUR projects, skills, experience, or portfolio → Give DETAILED, FORMAL, and PROFESSIONAL answers
   - Structure information clearly with proper formatting
   - Highlight key achievements and technical details
   - Use storytelling to make it engaging
   - Present information in a polished, professional manner
   - Always in the SAME LANGUAGE as the question

PORTFOLIO KNOWLEDGE BASE:
(Use this ONLY when asked about portfolio/projects)

ABOUT ME:
- I'm Mayank Tiwari, an AI & Data Science Engineer
- Graduating with B.Tech in Computer Science (2025)
- Based in Thane, India
- Contact: mayankt1713@gmail.com | +91 93097 42643
- GitHub: pyPandaDev | LinkedIn | Kaggle: mayank1713

TECHNICAL SKILLS:
- Python (90%), Dart (60%)
- PyTorch (70%), Scikit-learn (80%), OpenCV (90%)
- Pandas (95%), NumPy (95%), Matplotlib (80%)
- MySQL (90%), MongoDB (90%)

MY PROJECTS:

1. Python Playground
   - Interactive browser-based Python IDE
   - Live at: https://python-playground-sepia.vercel.app/
   - Tech: React, WebAssembly, Monaco Editor
   - GitHub: https://github.com/pyPandaDev/python-playground

2. SpaceX Launch Success Prediction
   - ML project predicting Falcon 9 launch outcomes
   - Used XGBoost, RandomForest, SHAP for explainability
   - Streamlit dashboard for visualizations
   - GitHub: https://github.com/pyPandaDev/spacex_launch_prediction

3. AI-Buddy Chatbot
   - Cross-platform mobile app (Flutter)
   - Integrates Gemini API, OpenAI, Firebase
   - Supports text and voice conversations
   - GitHub: https://github.com/pyPandaDev/Chat_bot

CERTIFICATIONS:
1. Oracle AI Foundation Associate (Oct 2025)
2. Oracle Data Science Professional (2025)
3. Deloitte Data Analytics Job Simulation (Jul 2025)
4. British Airways Data Science Simulation (Oct 2025)

RESPONSE GUIDELINES:
- ALWAYS match the user's language
- Simple questions → Simple answers (1-2 sentences)
- General questions → Helpful concise answers
- Portfolio questions → Detailed formal professional answers
- Use Markdown formatting for clarity
- Be natural and conversational
`;

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! Myself Mayank. How can I assist you?", sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [playingAudio, setPlayingAudio] = useState(null);
    const [loadingTTS, setLoadingTTS] = useState(null);
    const messagesEndRef = useRef(null);
    const audioRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputText.trim() || isLoading) return;

        const userMessage = { id: Date.now(), text: inputText, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);

        // Add empty bot message that will be filled with typing effect
        const botMessageId = Date.now() + 1;
        setMessages(prev => [...prev, { id: botMessageId, text: '', sender: 'bot', isTyping: true }]);

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const chatHistory = messages.map(msg => ({
                role: msg.sender === 'bot' ? 'model' : 'user',
                parts: [{ text: msg.text }]
            }));

            const chat = model.startChat({
                history: [
                    { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
                    { role: "model", parts: [{ text: "Understood. I am Mayank Tiwari. I will answer questions ONLY about my portfolio, skills, and projects using first-person pronouns and Markdown formatting. I will politely redirect any off-topic questions." }] },
                    ...chatHistory
                ],
            });

            const result = await chat.sendMessage(inputText);
            const fullText = (await result.response).text();

            // Typing effect: reveal text character by character
            let currentText = '';
            const typingSpeed = 15; // milliseconds per character

            for (let i = 0; i < fullText.length; i++) {
                currentText += fullText[i];
                setMessages(prev => prev.map(msg =>
                    msg.id === botMessageId
                        ? { ...msg, text: currentText }
                        : msg
                ));
                await new Promise(resolve => setTimeout(resolve, typingSpeed));
            }

            // Mark as done typing
            setMessages(prev => prev.map(msg =>
                msg.id === botMessageId
                    ? { ...msg, isTyping: false }
                    : msg
            ));

        } catch (error) {
            console.error("Gemini API Error:", error);
            let errorMessage = "Sorry, I encountered an error. Please try again later.";
            if (error.message?.includes("API key not valid")) errorMessage = "Error: Invalid API Key.";
            else if (error.message?.includes("404")) errorMessage = "Error: Model not found.";
            setMessages(prev => prev.map(msg =>
                msg.id === botMessageId
                    ? { ...msg, text: errorMessage, isTyping: false }
                    : msg
            ));
        } finally {
            setIsLoading(false);
        }
    };

    const handleTextToSpeech = async (text, messageId) => {
        try {
            if (audioRef.current) audioRef.current.pause();
            setLoadingTTS(messageId);

            const cleanText = text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/`/g, '').replace(/#/g, '').replace(/\n+/g, '. ').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-tts" });
            const result = await model.generateContent({
                contents: [{ role: "user", parts: [{ text: cleanText }] }],
                generationConfig: {
                    responseModalities: ["AUDIO"],
                    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Puck" } } }
                }
            });

            const response = await result.response;
            if (response.candidates?.[0]?.content?.parts) {
                const audioPart = response.candidates[0].content.parts.find(p => p.inlineData?.mimeType?.includes('audio'));
                if (audioPart?.inlineData?.data) {
                    const pcmData = Uint8Array.from(atob(audioPart.inlineData.data), c => c.charCodeAt(0));
                    const wavData = pcmToWav(pcmData);
                    const audioUrl = URL.createObjectURL(new Blob([wavData], { type: 'audio/wav' }));
                    const audio = new Audio(audioUrl);
                    audio.playbackRate = 1.1;
                    audioRef.current = audio;

                    audio.onplay = () => {
                        setLoadingTTS(null);
                        setPlayingAudio(messageId);
                    };

                    audio.onended = () => {
                        setPlayingAudio(null);
                        URL.revokeObjectURL(audioUrl);
                    };

                    audio.onerror = () => {
                        setPlayingAudio(null);
                        setLoadingTTS(null);
                        URL.revokeObjectURL(audioUrl);
                    };

                    await audio.play();
                    return;
                }
            }

            setLoadingTTS(null);
            console.error('No audio generated from Gemini TTS');
        } catch (error) {
            console.error("Gemini TTS Error:", error);
            setLoadingTTS(null);
            setPlayingAudio(null);
        }
    };

    const pcmToWav = (pcmData) => {
        const buffer = new ArrayBuffer(44 + pcmData.length);
        const view = new DataView(buffer);
        const writeString = (offset, string) => { for (let i = 0; i < string.length; i++) view.setUint8(offset + i, string.charCodeAt(i)); };
        writeString(0, 'RIFF');
        view.setUint32(4, 36 + pcmData.length, true);
        writeString(8, 'WAVE');
        writeString(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 1, true);
        view.setUint32(24, 24000, true);
        view.setUint32(28, 48000, true);
        view.setUint16(32, 2, true);
        view.setUint16(34, 16, true);
        writeString(36, 'data');
        view.setUint32(40, pcmData.length, true);
        new Uint8Array(buffer, 44).set(pcmData);
        return buffer;
    };

    const stopAudio = () => {
        if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
        setPlayingAudio(null);
        setLoadingTTS(null);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Blurred Background Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-md z-[100]"
                        />

                        {/* Chat Window - Right Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed right-32 top-4 bottom-4 w-[36vw] bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl z-[101] flex flex-col overflow-hidden"
                        >
                            <div className="p-4 bg-gray-900 dark:bg-white flex items-center justify-between transition-colors duration-300">
                                <div className="flex items-center gap-2 text-white dark:text-black">
                                    <Sparkles size={20} />
                                    <span className="font-semibold">Chat with Mayank</span>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="text-white/80 dark:text-black/60 hover:text-white dark:hover:text-black transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((msg) => (
                                    <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm transition-colors duration-300 ${msg.sender === 'user' ? 'bg-gray-900 dark:bg-white text-white dark:text-black rounded-br-none' : 'bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                                            {msg.sender === 'user' ? msg.text : <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:list-disc [&>ul]:ml-4 [&>ul]:mb-2 [&>li]:mb-1 [&>strong]:font-bold"><ReactMarkdown>{msg.text}</ReactMarkdown></div>}
                                        </div>
                                        {msg.sender === 'bot' && (
                                            <button
                                                onClick={() => {
                                                    if (playingAudio === msg.id) {
                                                        stopAudio();
                                                    } else if (loadingTTS !== msg.id) {
                                                        handleTextToSpeech(msg.text, msg.id);
                                                    }
                                                }}
                                                disabled={loadingTTS === msg.id}
                                                className={`mt-1 p-1.5 rounded-full transition-colors ${loadingTTS === msg.id ? 'bg-gray-300 dark:bg-white/20 cursor-wait' : playingAudio === msg.id ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-white/20'}`}
                                                title={loadingTTS === msg.id ? "Generating..." : playingAudio === msg.id ? "Stop" : "Listen"}
                                            >
                                                {loadingTTS === msg.id ? <Loader2 size={14} className="animate-spin" /> : <Volume2 size={14} />}
                                            </button>
                                        )}
                                    </motion.div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/50">
                                <div className="flex gap-2">
                                    <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Ask me anything..." disabled={isLoading} className="flex-1 bg-transparent border border-gray-300 dark:border-white/20 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-gray-900 dark:focus:border-white text-gray-900 dark:text-white placeholder-gray-500 transition-colors duration-300 disabled:opacity-50" />
                                    <button type="submit" disabled={!inputText.trim() || isLoading} className="p-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300">
                                        <Send size={18} />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            <motion.button onClick={() => setIsOpen(!isOpen)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="fixed bottom-6 right-6 p-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full shadow-lg hover:shadow-xl z-[110] flex items-center justify-center transition-colors duration-300">
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.button>
        </>
    );
};

export default ChatBot;

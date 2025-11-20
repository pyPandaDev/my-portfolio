import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Loader2, Volume2 } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const SYSTEM_PROMPT = `
You are Mayank Tiwari. You are NOT an AI assistant. You ARE Mayank himself.
Answer ALL questions in the first person ("I", "my", "me").

CRITICAL RULES:
1. You ONLY answer questions about Mayank's portfolio, skills, projects, experience, and professional background.
2. If asked about ANYTHING outside this scope (e.g., "Who is Elon Musk?", "What is the weather?", general knowledge), respond EXACTLY with: "That's an interesting question, but my purpose here is to showcase my own portfolio, my skills, and my projects as an AI & Data Science Engineer. I'd love to tell you more about how I use tools like TensorFlow and PyTorch in my work, or perhaps the machine learning techniques I applied in my SpaceX Launch Success Prediction project. Feel free to ask me anything about my professional journey!"
3. If asked "Who created you?" or similar, respond: "I'm Mayank Tiwari, and I created this AI-powered chatbot as part of my portfolio to showcase my skills in AI, machine learning, and web development. This chatbot uses Google's Gemini API to provide interactive responses about my professional background."

COMPLETE PORTFOLIO CONTEXT:

PERSONAL INFORMATION:
- Name: Mayank Tiwari
- Title: AI & Data Science Engineer
- Tagline: Transforming data into intelligent solutions
- Education: Bachelor of Technology in Computer Science (Graduating 2025)
- Description: Computer Science graduate (2025) passionate about artificial intelligence, machine learning, and data science. I specialize in building intelligent systems that solve real-world problems using Python, advanced algorithms, and cutting-edge AI technologies.
- Email: mayankt1713@gmail.com
- Phone: +91 93097 42643
- Location: Thane, India
- Resume: https://drive.google.com/file/d/1NCSjP5eIyz5LVCqenoNkfIoQjgeglqOH/view?usp=sharing
- GitHub: https://github.com/pyPandaDev
- LinkedIn: https://linkedin.com/in/mayank-tiwari-458400389
- Kaggle: https://www.kaggle.com/mayank1713

SKILLS (with proficiency levels):

Programming Languages:
- Python (90% proficiency) - My primary language for AI/ML development
- Dart (60% proficiency) - Used for Flutter mobile app development

AI & Machine Learning:
- TensorFlow (60% proficiency)
- PyTorch (70% proficiency)
- Scikit-learn (80% proficiency)
- Keras (75% proficiency)
- OpenCV (90% proficiency) - Computer vision tasks

Data Science & Analytics:
- Pandas (95% proficiency) - Data manipulation and analysis
- NumPy (95% proficiency) - Numerical computing
- Matplotlib (80% proficiency) - Data visualization
- Seaborn (75% proficiency) - Statistical data visualization

Database:
- MySQL (90% proficiency)
-MongoDB (90% proficiency)

PROJECTS (Complete Details):

1. SpaceX Launch Success Prediction
   - Category: Machine Learning
   - Description: An end-to-end Machine Learning project that predicts the success of SpaceX Falcon 9 rocket launches using historical launch data. This project includes comprehensive EDA (Exploratory Data Analysis), feature engineering, model training, explainability analysis with SHAP, and an interactive Streamlit web application.
   - Technologies: Python, XGBoost, RandomForest, SHAP, Streamlit, Pandas, Scikit-learn, Jupyter
   - GitHub: https://github.com/pyPandaDev/spacex_launch_prediction
   - Key Features: Historical data analysis, predictive modeling, SHAP explainability, interactive web interface
   - Featured Project: Yes

2. AI-Buddy AI Powered Chatbot With Web Support
   - Category: Mobile App
   - Description: A chatbot is a computer program designed to simulate human-like conversations, either through text or voice. Using artificial intelligence, it processes and understands user inputs to provide automated, helpful responses. This mobile app integrates multiple AI services for enhanced functionality.
   - Technologies: Flutter, Dart, Gemini API, Firebase, OpenAI
   - GitHub: https://github.com/pyPandaDev/Chat_bot
   - Key Features: Multi-platform support, AI-powered responses, web integration, real-time chat
   - Featured Project: Yes

FORMATTING RULES:
- Use **Markdown** to organize your answers.
- Use **bullet points** for lists (skills, projects, technologies).
- Use **bold text** for emphasis on key technologies or achievements.
- Keep responses concise, professional, but friendly and engaging.
- When discussing projects, mention specific technologies and techniques used.
- When discussing skills, you can mention proficiency levels if relevant.
`;

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm Mayank. Ask me anything about my projects, skills, or experience!", sender: 'bot' }
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
            const text = (await result.response).text();
            setMessages(prev => [...prev, { id: Date.now() + 1, text, sender: 'bot' }]);
        } catch (error) {
            console.error("Gemini API Error:", error);
            let errorMessage = "Sorry, I encountered an error. Please try again later.";
            if (error.message?.includes("API key not valid")) errorMessage = "Error: Invalid API Key.";
            else if (error.message?.includes("404")) errorMessage = "Error: Model not found.";
            setMessages(prev => [...prev, { id: Date.now() + 1, text: errorMessage, sender: 'bot' }]);
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
                    <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
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
                            {isLoading && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start"><div className="bg-gray-100 dark:bg-white/10 p-3 rounded-2xl rounded-bl-none"><Loader2 size={20} className="animate-spin text-gray-500 dark:text-gray-400" /></div></motion.div>}
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
                )}
            </AnimatePresence>
            <motion.button onClick={() => setIsOpen(!isOpen)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="fixed bottom-6 right-6 p-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full shadow-lg hover:shadow-xl z-50 flex items-center justify-center transition-colors duration-300">
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.button>
        </>
    );
};

export default ChatBot;

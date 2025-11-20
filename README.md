# 🌟 Mayank Tiwari - AI & Data Science Portfolio

> A modern, professional portfolio website showcasing AI, Machine Learning, and Data Science expertise.

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://mayank-portfolio-rho.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## ✨ Features

### 🎨 **Premium UI/UX**
- ✅ **Light/Dark Mode** - Smooth theme switching with elegant transitions
- ✅ **Glassmorphism** - Modern glass effects on Navbar and ChatBot
- ✅ **Framer Motion Animations** - Smooth scroll animations and hover effects
- ✅ **3D Tilt Effects** - Interactive project cards with depth
- ✅ **Particle Background** - Dynamic animated particles
- ✅ **Fully Responsive** - Optimized for all devices (mobile, tablet, desktop)

### 🤖 **AI-Powered ChatBot**
- ✅ **Google Gemini 2.5 Flash** - Intelligent conversational AI
- ✅ **Text-to-Speech (TTS)** - Natural voice using Gemini TTS API
- ✅ **Markdown Support** - Rich formatted responses
- ✅ **Real-time Chat** - Instant AI responses
- ✅ **Persona-based** - Responds as Mayank himself (first-person)

### ⚡ **Performance**
- ✅ **Lazy Loading** - Components loaded on-demand
- ✅ **Optimized Assets** - Fast page loads
- ✅ **SEO Friendly** - Proper meta tags and semantic HTML

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 19, JavaScript (ES6+) |
| **Styling** | Tailwind CSS, Custom CSS |
| **Animations** | Framer Motion |
| **AI/API** | Google Gemini API (Chat + TTS) |
| **Icons** | Lucide React |
| **Markdown** | React Markdown |
| **Deployment** | Vercel |

---

## 📂 Project Structure

```
my-portfolio/
├── public/
│   ├── index.html          # HTML template
│   └── ...                 # Static assets
├── src/
│   ├── components/
│   │   ├── About/          # About section
│   │   ├── ChatBot/        # AI ChatBot (Gemini API)
│   │   ├── Contact/        # Contact form & info
│   │   ├── Cursor/         # Custom cursor effect
│   │   ├── Footer/         # Footer component
│   │   ├── Hero/           # Hero section with animations
│   │   ├── LoadingSpinner/ # Loading component
│   │   ├── Navigation/     # Floating dock navbar
│   │   ├── ParticleBackground/ # Animated particles
│   │   ├── Projects/       # Project showcase with 3D tilt
│   │   ├── Skills/         # Skills with proficiency bars
│   │   └── ThemeTransition/ # Theme switch animation
│   ├── context/
│   │   └── ThemeContext.js # Theme state management
│   ├── data/
│   │   ├── personalInfo.js # Personal information
│   │   ├── projects.js     # Project data
│   │   └── skills.js       # Skills data
│   ├── App.js              # Main app component
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── .env                    # Environment variables (API keys)
├── tailwind.config.js      # Tailwind configuration
└── package.json            # Dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14+)
- **npm** or **yarn**
- **Google Gemini API Key** (Free from [Google AI Studio](https://aistudio.google.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pyPandaDev/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_GEMINI_API_KEY=your_api_key_here
   ```
   
   > 💡 **Get your free API key**: Go to [Google AI Studio](https://aistudio.google.com/) → Create new API key

4. **Start the development server**
   ```bash
   npm start
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser

5. **Build for production**
   ```bash
   npm run build
   ```

---

## 🌐 Deployment (Vercel)

### Quick Deploy

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/) and import your repository
3. **IMPORTANT**: Add environment variable in Vercel:
   - Go to **Project Settings** → **Environment Variables**
   - Add: `REACT_APP_GEMINI_API_KEY` = `your_api_key`
4. Click **Deploy** 🚀

### Manual Deployment

```bash
vercel --prod
```

---

## 📝 Customization Guide

### 1. **Personal Information**
Edit `src/data/personalInfo.js`:
```javascript
export const personalInfo = {
    name: "Your Name",
    title: "Your Title",
    email: "your.email@example.com",
    phone: "+1234567890",
    location: "Your City, Country",
    // ... more fields
};
```

### 2. **Skills**
Update `src/data/skills.js`:
```javascript
export const skills = [
    {
        category: "Programming",
        items: [
            { name: "Python", level: 90 },
            // ... add more
        ]
    }
];
```

### 3. **Projects**
Modify `src/data/projects.js`:
```javascript
export const projects = [
    {
        id: 1,
        title: "Your Project",
        description: "Project description",
        technologies: ["React", "Python"],
        category: "Machine Learning",
        featured: true,
        // ... more fields
    }
];
```

### 4. **ChatBot Persona**
Edit the `SYSTEM_PROMPT` in `src/components/ChatBot/ChatBot.jsx` to customize the AI's personality and knowledge base.

### 5. **Theme Colors**
Customize colors in `tailwind.config.js`:
```javascript
module.exports = {
    theme: {
        extend: {
            colors: {
                // Add your custom colors
            }
        }
    }
};
```

---

## 🎨 Key Sections

| Section | Description |
|---------|-------------|
| **Hero** | Professional introduction with animated icons, education badge, CTA buttons |
| **About** | Personal background, statistics, achievements |
| **Skills** | Technical skills with animated progress bars and proficiency levels |
| **Projects** | Filterable project showcase with 3D tilt effects and live demo links |
| **Contact** | Contact form, email, phone, social links |
| **ChatBot** | AI-powered assistant with TTS (floating button, bottom-right) |

---

## 🤖 ChatBot Features

- **Conversational AI**: Powered by Google Gemini 2.5 Flash
- **Natural Voice**: Gemini TTS with "Puck" voice (1.1x speed)
- **Smart Responses**: Answers questions about skills, projects, and experience
- **Loading States**: Visual feedback while generating audio
- **Markdown Formatting**: Rich text responses with bullet points, bold text, etc.
- **First-Person Responses**: Bot responds as "I" (Mayank himself)

### ChatBot Controls
- Click the **chat bubble** (bottom-right) to open
- Type your question and press Enter
- Click the **speaker icon** 🔊 to hear responses (TTS)
- Spinner shows while audio is loading

---

## 📱 Responsive Design

- **Mobile** (<768px): Single column, hamburger menu (if applicable)
- **Tablet** (768px-1024px): Optimized grid layouts
- **Desktop** (>1024px): Full-width sections, multi-column grids

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run development server at `localhost:3000` |
| `npm run build` | Create production build in `build/` folder |
| `npm test` | Run tests (if configured) |
| `npm run eject` | Eject from Create React App (irreversible) |

---

## ⚠️ Important Notes

### API Rate Limits
- **Gemini Chat API**: Free tier has rate limits
- **Gemini TTS API**: 15 requests/day on free tier
- **Solution**: Upgrade to paid tier or add fallback (Web Speech API)

### Environment Variables
- **Never commit `.env` to Git**
- Always add `.env` to `.gitignore`
- Set environment variables in Vercel/deployment platform

---

## 📄 License

This project is open-source and available under the **MIT License**.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Contact

<<<<<<< HEAD
Mayank Tiwari - [LinkedIn](www.linkedin.com/in/mayank-tiwari-458400389) - mayankt1713@gmail.com
=======
**Mayank Tiwari**  
📧 Email: [mayankt1713@gmail.com](mailto:mayankt1713@gmail.com)  
💼 LinkedIn: [linkedin.com/in/mayank-tiwari-458400389](https://linkedin.com/in/mayank-tiwari-458400389)  
🐙 GitHub: [@pyPandaDev](https://github.com/pyPandaDev)  
📊 Kaggle: [@mayank1713](https://www.kaggle.com/mayank1713)
>>>>>>> 8b1992f (feat: Add AI ChatBot with Gemini TTS, comprehensive README, theme system)

**Project Link**: [github.com/pyPandaDev/my-portfolio](https://github.com/pyPandaDev/my-portfolio)

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Framer Motion](https://www.framer.com/motion/) - Animation Library
- [Google Gemini API](https://ai.google.dev/) - AI & TTS
- [Vercel](https://vercel.com/) - Hosting Platform
- [Lucide](https://lucide.dev/) - Icon Library

---

<div align="center">
  <p>Made with ❤️ by Mayank Tiwari</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>

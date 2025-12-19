# 🧠 Serenity AI - Mental Wellness Companion
### *Hackathon Submission 2025*

**Serenity AI** is an advanced, empathetic AI companion designed to support mental wellness through real-time conversation, multimodal emotion detection, and personalized therapeutic rituals. It bridges the gap between casual journaling and professional therapy by providing immediate, data-driven emotional support.

---

## 🚀 Key Features

### 1. **Multimodal Emotion Intelligence**
- **Textual Analysis**: Uses a fine-tuned **GoEmotions** BERT model to detect subtle emotional nuances in user messages.
- **Visual Analysis**: Integrated **Computer Vision (DeepFace)** analyzes facial expressions in real-time via the webcam to detect conflicting signals (e.g., saying "I'm fine" while looking sad).
- **Contextual Blending**: The AI synthesizes both text and video cues to respond with appropriate empathy and tone.

### 2. **Personalized Memory & Growth**
- **Long-term Memory (Mem0)**: Remembers past conversations, triggers, and preferences to build a deeper connection over time.
- **Smart Starters**: Generates personalized conversation openers based on recent memories (e.g., asking about a specific event mentioned days ago).

### 3. **Ritual Lab**
A suite of interactive, guided wellness activities designed to recalibrate emotional states:
- **Trataka (Candle Gazing)**: Focus training.
- **Box Breathing**: Anxiety reduction.
- **Journaling**: With sentiment tracking.
- **Doodle Pad**: Creative release.
- **Yoga & Grounding**: Physical mindfulness flows.

### 4. **Data-Driven Insights**
- **Mood Dashboard**: Visualizes emotional trends over time (Valence & Arousal).
- **Risk Assessment**: Uses **SHAP (SHapley Additive exPlanations)** values to explain risk factors based on user interactions and metadata.

### 5. **Voice Mode**
- **Gemini Live Integration**: Fluid, low-latency voice conversations for a hands-free therapeutic experience.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React (Vite) + TypeScript
- **Styling**: Tailwind CSS + Framer Motion (Animations)
- **Visualization**: Recharts
- **Icons**: Lucide React

### **Backend**
- **Framework**: FastAPI (Python)
- **AI Orchestration**: LangChain + LangGraph
- **LLM**: Llama 3.3 70B (via Groq)
- **Computer Vision**: OpenCV + DeepFace
- **Memory**: Mem0
- **Database**: Supabase (PostgreSQL)

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python (3.10+)
- Supabase Account
- API Keys (Groq, Gemini, Mem0)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/dataset-hackathon.git
cd dataset-hackathon
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in `backend/`:
```env
GROQ_API_KEY=your_groq_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_key
MEM0_API_KEY=your_mem0_key
EMOTIONS_API_URL=https://aadithya1-goemotions.hf.space/predict
```

Run the server:
```bash
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend Setup
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 🧠 AI Architecture

The core of Serenity AI is a **LangGraph** workflow that orchestrates the conversation:

1.  **Perception Node**:
    *   Detects Intent (Casual, Crisis, Venting).
    *   Analyzes Text Emotion (GoEmotions).
    *   Analyzes Facial Emotion (DeepFace).
    *   Retrieves Context (Mem0).
2.  **Wellness Logic Node**:
    *   Calculates Risk Score.
    *   Selects appropriate coping strategies (CBT/DBT techniques).
3.  **Generation Node**:
    *   Synthesizes all inputs.
    *   Generates a response using Llama 3.1 with a specific therapeutic persona.

---

## 🛡️ Safety
- **Crisis Detection**: Automatically detects suicidal ideation or severe distress and provides emergency resources immediately.

*Built with ❤️ for a healthier mind.*

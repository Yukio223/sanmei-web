# Sanmei Web 📊
算命学 (Four Pillars of Destiny) Web Application

## 🎯 Phase 1: Core Features
- 宿命表 (Destiny Table): Birth date input → yin/yang constellations, 10 major stars
- 相性表 (Compatibility): Two people birth dates → compatibility analysis

## 📁 Project Structure
```
sanmei-web/
├── backend/           # Python Flask API
│   ├── app.py        # Main Flask app
│   ├── calculations.py # Core calculation engine
│   ├── data_loader.py # CSV data loading
│   └── routes/       # API endpoints
├── frontend/         # React web UI
│   ├── src/
│   ├── public/
│   └── package.json
├── data/
│   └── csv/         # Copy of Sanmei CSV files
└── README.md
```

## 🔧 Tech Stack
- **Backend**: Python 3.9+, Flask, CORS
- **Frontend**: React 18+, TypeScript
- **Deployment**: Vercel (frontend), Replit/Heroku (backend)
- **Data**: CSV files from original Sanmei software

## 📖 Data Files Needed
From ~/Desktop/Sanmei/dat/:
- `kaku.csv` - 画数 (stroke count)
- `kyoku.csv` - 局数 (configuration)
- `setsuiribi.csv` - 節入日 (seasonal entry dates)
- `utsuwa.csv` - 器 (vessel/category)
- `60kakoushie.csv` - 60干支 (60 stems & branches)

## 🚀 Getting Started

### Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install flask flask-cors
python app.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 📝 Development Log
- 2026-04-21: Project initialization

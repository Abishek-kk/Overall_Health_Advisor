# ⚡ SwasthyaSathi - Quick Start Guide

Get the SwasthyaSathi AI Healthcare Chatbot running locally in 5 minutes.

---

## 🏃 Quick Start (5 Minutes)

### Step 1: Install Dependencies (2 min)

```bash
# Frontend dependencies
cd client
npm install

# Backend dependencies
cd ../server
npm install
```

### Step 2: Start the Servers (1 min)

**Terminal 1 - Frontend (Port 5173):**
```bash
cd client
npm run dev
```

**Terminal 2 - Backend (Port 5000):**
```bash
cd server
npm start
```

### Step 3: Open in Browser (1 min)

```
http://localhost:5173
```

✅ **Done!** You should see the SwasthyaSathi landing page.

---

## 🎮 Try the Features

### 1. Chat with AI

1. Click "💬 Chat" in navbar
2. Select a family member profile
3. Type a symptom: "fever and cough"
4. AI will suggest possible diseases and prevention tips

### 2. Check Climate Alerts

1. Click "⚠️ Alerts" → "Climate Alerts"
2. See weather-based disease risks
3. Get preventive tips based on your region

### 3. Track Vaccinations

1. Click "💉 Vaccines" in navbar
2. See recommended vaccination schedule
3. Filter by age group

### 4. View Disease Outbreaks

1. Click "🔔 Outbreaks" in navbar
2. See current disease clusters by region
3. Read government advisories

### 5. Find Hospitals

1. Click "🏥 Healthcare" in navbar
2. See nearby hospitals UI (integration pending)

### 6. Admin Dashboard

1. Go to http://localhost:5173/admin-dashboard
2. View health analytics and trends
3. See regional statistics

---

## 🗣️ Test Voice Features

### English Voice

1. Go to Chat page
2. Language = "English"
3. Click microphone icon
4. Say: "I have fever and cough"
5. AI responds with voice

### Hindi Voice (हिंदी)

1. Language = "हिंदी"
2. Click microphone icon
3. Say: "मुझे बुखार है"
4. Response in Hindi with voice

### Tamil Voice (தமிழ்)

1. Language = "தமிழ்"
2. Click microphone icon
3. Say: "நான் அজ்ஜே உள்ளேன்"
4. Response in Tamil with voice

---

## 🖼️ Test Image Upload

1. Go to Chat page
2. Click "📎 Upload Report" button
3. Upload any image (lab report, X-ray, etc.)
4. AI will analyze and explain in chat

---

## 🔧 Configuration

### Set Custom Port

**Frontend:**
```bash
# Change vite.config.js
export default {
  server: {
    port: 3000  // Change from 5173
  }
}
```

**Backend:**
```bash
# Change server/index.js or set environment variable
export PORT=3001
node index.js
```

### Use Real Database

**Optional: Connect MongoDB**

Create `.env` in server/:
```env
MONGODB_URI=mongodb://localhost:27017/swasthyasathi
```

Or use MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/swasthyasathi
```

---

## 📋 API Testing

### Test Chat API

```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "fever and headache",
    "profile": "Father",
    "language": "en"
  }'
```

Expected response:
```json
{
  "message": "Based on your symptoms...",
  "disease": "Common Cold/Flu",
  "severity": "Low",
  "action": "Rest and monitor temperature"
}
```

### Test Vaccination API

```bash
curl http://localhost:5000/api/vaccination
```

Expected response:
```json
[
  {
    "name": "Hepatitis B",
    "dueDate": "...",
    "age": "Birth",
    "dose": 1
  },
  ...
]
```

### Test Notification API

```bash
curl -X POST http://localhost:5000/api/notifications/send-sms \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+919876543210",
    "message": "Vaccination reminder: DPT vaccine due"
  }'
```

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5173
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5173
kill -9 <PID>
```

### Module Not Found Error

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Blank Page

1. Check browser console (F12)
2. Check terminal for errors
3. Clear browser cache (Ctrl+Shift+Delete)
4. Restart both servers

### Connection Refused

```bash
# Check if backend is running
curl http://localhost:5000

# Should return: {"message":"SwasthyaSathi AI Server is running",...}
```

### Voice Input Not Working

1. Check browser microphone permission
2. Use HTTPS (voice requires secure context in production)
3. Check browser console for errors

---

## 📦 Project Structure

```
chat/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── context/           # React contexts
│   │   ├── services/          # API services
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
│
└── server/                    # Node.js backend
    ├── index.js               # Express app
    ├── routes/                # API routes
    ├── services/              # Business logic
    ├── models/                # Database models
    ├── package.json
    └── .env                   # Environment variables
```

---

## 🚀 Development Commands

### Frontend

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Backend

```bash
# Start server (with auto-reload via nodemon)
npm start

# Or run directly
node index.js

# Install nodemon (for auto-restart on changes)
npm install -D nodemon
```

---

## 🔗 Useful Links

| Feature | URL | Purpose |
|---------|-----|---------|
| Landing Page | http://localhost:5173 | Overview & features |
| Chat | http://localhost:5173/chat | Main AI assistant |
| Symptoms | http://localhost:5173/symptom-checker | Symptom analysis |
| Vaccinations | http://localhost:5173/vaccination | Vaccine schedule |
| Disease Alerts | http://localhost:5173/disease-outbreaks | Outbreak tracking |
| Climate Alerts | http://localhost:5173/climate-alerts | Weather-based risks |
| Health Finder | http://localhost:5173/healthcare-finder | Hospital search |
| Admin Dashboard | http://localhost:5173/admin-dashboard | Boss analytics |
| Backend Health | http://localhost:5000 | Server status |
| Chat API | http://localhost:5000/api/chat | Test API |

---

## 📱 Mobile Testing

### Test Responsive Design

```bash
# Chrome DevTools (F12)
# Click "Toggle device toolbar" (Ctrl+Shift+M)
# Select device:
#   - iPhone 12
#   - Samsung Galaxy S20
#   - iPad
#   - Tablet
```

Expected behavior:
- ✅ Navigation collapses to hamburger menu
- ✅ Chat interface adjusts to screen width
- ✅ Buttons remain touchable (min 44x44px)
- ✅ Text is readable without zooming

---

## 🧪 Testing Scenarios

### Scenario 1: Child Profile

1. Select "Ravi (Child, 5 years)" profile
2. Type: "I have cough"
3. Expect: Advice tailored to 5-year-old child

### Scenario 2: Elderly Profile

1. Select "Grandmother (Elderly, 68 years)" profile
2. Type: "I have chest pain"
3. Expect: Emergency alert + hospital finder

### Scenario 3: Emergency Detection

1. Select any profile
2. Type: "I can't breathe"
3. Expect: Red alert + call ambulance option

### Scenario 4: Multilingual

1. Change language to Hindi
2. Type in English or Hindi
3. Expect: Response in Hindi with voice

### Scenario 5: Climate Alert

1. Go to Climate Alerts page
2. Check Mumbai region
3. Expect: Dengue alert if rainfall high

---

## 🎓 Example Prompts to Try

### General Health
- "I have fever since 3 days"
- "My child has cough and cold"
- "Dark circles under my eyes"

### Vaccination
- "Is my child due for vaccination?"
- "What vaccines does a 5-year-old need?"
- "Side effects of DPT vaccine"

### Emergency
- "I have chest pain and difficulty breathing"
- "My child is unconscious"
- "Heavy bleeding from wound"

### Weather-Related
- "Is it safe to go out? (with high rainfall)"
- "How to stay healthy in summer?"
- "Symptoms of heat stroke"

### Multilingual
- "मुझे बुखार और सर दर्द है" (Hindi)
- "எனக்கு ஜ்வரம் உள்ளது" (Tamil)
- "నాకు గుండెలో నొప్పి" (Telugu)

---

## 💡 Pro Tips

1. **Voice Works Better with Microphone**: 
   - Test on quiet environment
   - Speak clearly and slowly

2. **Check Browser Logs**:
   - Open F12 → Console
   - Helps debug issues quickly

3. **Reset Profile Context**:
   ```javascript
   // Run in browser console to reset profiles
   localStorage.removeItem('profiles')
   location.reload()
   ```

4. **Test Different Languages**:
   - Each language uses different speech synthesis
   - Some languages may not be available on your browser

5. **Check Responsiveness**:
   - Always test on mobile view (F12 → Toggle device)
   - Use Chrome DevTools device presets

---

## ⚙️ Advanced Setup

### Use Production Build Locally

```bash
# Frontend
cd client
npm run build
npm run preview

# Visit http://localhost:4173
```

### Debug Backend

```bash
# With Node Inspector
node --inspect server/index.js

# Visit chrome://inspect in Chrome
```

### Use React DevTools

```bash
# Install extension
# Chrome: React Developer Tools
# Firefox: React Developer Tools

# Then in browser:
# Components → Search for ChatInterface
# Props tab shows all current state
```

---

## 📊 Performance Monitoring

### Check Bundle Size

```bash
cd client
npm run build
# Check dist/ folder size
# Target: <500KB total
```

### Check API Response Time

```bash
curl -w "Total time: %{time_total}s\n" \
  http://localhost:5000/api/chat
```

Expected: <100ms response time

---

## 🔐 Security Considerations

**For Local Testing Only:**
- No authentication required
- All APIs publicly accessible
- No data encryption

**For Production:**
- Add JWT authentication
- Enable HTTPS/SSL
- Use environment variables for secrets
- Rate limit API endpoints
- Add CORS validation

---

## 📞 Getting Help

1. **Check Errors**: Open browser console (F12)
2. **Check Logs**: Look at terminal output
3. **Check Documentation**: 
   - README.md - Project overview
   - IMPLEMENTATION_SUMMARY.md - Feature details
   - FEATURE_CHECKLIST.md - Verification list
4. **Restart Servers**: Kill and restart npm commands
5. **Clear Cache**: Delete node_modules and package-lock.json

---

## ✅ Verification Checklist

After starting, verify:

- [ ] Frontend loads at http://localhost:5173
- [ ] Backend responds at http://localhost:5000
- [ ] Chat page renders without errors
- [ ] Profile selector works
- [ ] Language selector works
- [ ] Voice input button appears
- [ ] Climate Alerts page loads
- [ ] Disease Outbreaks page loads
- [ ] Admin Dashboard shows metrics
- [ ] No red errors in browser console
- [ ] No red errors in terminal

---

**Welcome to SwasthyaSathi! 🎉**

Start building a healthier India - one conversation at a time.

---

Version: 1.0.0  
Last Updated: 2026-02-09  
Status: Ready to Use

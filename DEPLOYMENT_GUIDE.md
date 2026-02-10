# 🚀 SwasthyaSathi Deployment Guide

Complete step-by-step guide to deploy the SwasthyaSathi AI Healthcare Chatbot to production.

---

## 📋 Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] MongoDB Atlas account created
- [ ] API keys obtained (Twilio, Google Maps, OpenWeatherMap)
- [ ] SSL certificates ready
- [ ] Domain registered
- [ ] CI/CD pipeline configured
- [ ] Error tracking (Sentry) setup
- [ ] Analytics (Google Analytics) configured
- [ ] Security audit completed
- [ ] Load testing done

---

## 🌐 Environment Configuration

### Frontend Environment Variables

Create `.env.production` in `client/` directory:

```env
VITE_API_URL=https://api.swasthyasathi.com
VITE_GOOGLE_MAPS_KEY=YOUR_GOOGLE_MAPS_API_KEY
VITE_WEATHER_API_KEY=YOUR_OPENWEATHERMAP_KEY
VITE_SENTRY_DSN=YOUR_SENTRY_DSN
```

### Backend Environment Variables

Create `.env.production` in `server/` directory:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/swasthyasathi
JWT_SECRET=your_super_secret_key_min_32_chars
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
GOOGLE_MAPS_API_KEY=your_google_maps_key
OPENWEATHERMAP_API_KEY=your_weather_key
REDIS_URL=redis://username:password@localhost:6379
CORS_ORIGIN=https://swasthyasathi.com
LOG_LEVEL=info
```

---

## 📦 Build Process

### Step 1: Build Frontend

```bash
cd client
npm install
npm run build
# Output: dist/ directory with optimized files
```

### Step 2: Build Backend

```bash
cd server
npm install
npm run build  # if using TypeScript
# or skip if using vanilla Node.js
```

### Step 3: Verify Builds

```bash
# Frontend
npm run preview  # Test production build locally

# Backend
npm start  # Test server startup
```

---

## ☁️ Deployment Options

### Option 1: Vercel + Railway (Recommended for Startups)

#### Frontend on Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from client directory
cd client
vercel --prod
```

Vercel Configuration (`vercel.json`):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_API_URL": "@api_url",
    "VITE_GOOGLE_MAPS_KEY": "@google_maps_key"
  }
}
```

#### Backend on Railway

1. Push code to GitHub
2. Go to Railway.app
3. New → GitHub Repository
4. Connect your repo
5. Add environment variables in Railway dashboard
6. Deploy

Railway configuration (automatic with `package.json`):

```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```

---

### Option 2: AWS (For Scale)

#### Frontend on CloudFront + S3

```bash
# Build frontend
cd client
npm run build

# Create S3 bucket
aws s3 mb s3://swasthyasathi-frontend --region ap-south-1

# Upload files
aws s3 sync dist/ s3://swasthyasathi-frontend --delete

# Create CloudFront distribution
# - Origin: S3 bucket
# - Default cache behavior: 24 hours
# - Error page: index.html (for SPA routing)

# Set CNAME to your domain: swasthyasathi.com
```

#### Backend on Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli

# Create EB app
eb init -p node.js-20 swasthyasathi-backend

# Create environment
eb create swasthyasathi-prod

# Deploy
eb deploy

# Configure environment variables
eb setenv MONGODB_URI=xxx TWILIO_ACCOUNT_SID=xxx ...
```

---

### Option 3: Docker + Kubernetes (For Enterprise)

#### Dockerfile (Backend)

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000
CMD ["npm", "start"]
```

#### Docker Compose (Local Testing)

```yaml
version: '3.8'
services:
  backend:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/swasthyasathi
      - NODE_ENV=production
    depends_on:
      - mongo
  
  frontend:
    build: 
      context: ./client
      args:
        - VITE_API_URL=http://backend:5000
    ports:
      - "3000:3000"
  
  mongo:
    image: mongo:6
    volumes:
      - mongo_data:/data/db
    ports:
      - "27017:27017"

volumes:
  mongo_data:
```

Build and run:

```bash
docker-compose up -d
```

#### Kubernetes Deployment

Create `k8s/backend-deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: swasthyasathi-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: your-registry/swasthyasathi-backend:latest
        ports:
        - containerPort: 5000
        env:
        - name: MONGODB_URI
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: uri
        - name: TWILIO_ACCOUNT_SID
          valueFrom:
            secretKeyRef:
              name: twilio-credentials
              key: account-sid
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

Deploy:

```bash
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
```

---

## 🗄️ Database Setup

### MongoDB Atlas

1. Create cluster at mongodb.com/atlas
2. Configure network access (whitelist your server IPs)
3. Create database user
4. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/swasthyasathi`
5. Run migration scripts:

```bash
# Seed initial data
node server/scripts/seedData.js

# Create indexes
node server/scripts/createIndexes.js
```

### Backup Strategy

```bash
# Daily backup to AWS S3
mongobackup --uri=$MONGODB_URI --out=/backups
aws s3 sync /backups s3://swasthyasathi-backups/
```

---

## 🔐 Security Configuration

### SSL/TLS Certificate

Using Let's Encrypt (free):

```bash
# Using Certbot
sudo certbot certonly --standalone -d swasthyasathi.com -d www.swasthyasathi.com

# Update server to use certificate
CERT_PATH=/etc/letsencrypt/live/swasthyasathi.com
```

### Security Headers

Add to backend (Express middleware):

```javascript
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});
```

### Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);
```

---

## 📊 Monitoring & Analytics

### Error Tracking (Sentry)

```javascript
// Backend
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### Performance Monitoring

```javascript
// New Relic APM
require('newrelic');

// Or Datadog
const { datadogRum } = require('@datadog/browser-rum');
datadogRum.init({
  applicationId: 'your_app_id',
  allowedTracingUrls: ['swasthyasathi.com']
});
```

### Logging

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

---

## 🚀 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install dependencies
        run: |
          cd client && npm install
          cd ../server && npm install
      
      - name: Run tests
        run: |
          cd client && npm run test
          cd ../server && npm run test
      
      - name: Build frontend
        run: cd client && npm run build
      
      - name: Deploy frontend
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./client/dist
      
      - name: Deploy backend
        run: |
          git remote add heroku https://git.heroku.com/swasthyasathi-backend.git
          git push heroku main
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
```

---

## 📈 Performance Optimization

### Frontend Optimization

```bash
# Check bundle size
npm run analyze  # requires 'npm i --save-dev rollup-plugin-visualizer'

# Results: dist/ files should be:
# - main.js: <200KB
# - Each component: <50KB
```

### Backend Optimization

```javascript
// Add caching headers
res.setHeader('Cache-Control', 'public, max-age=3600');

// Compress responses
const compression = require('compression');
app.use(compression());

// Use connection pooling for database
const OPTIONS = {
  maxPoolSize: 10,
  minPoolSize: 5
};
```

---

## 🧪 Staging Deployment

### Staging Environment

Similar setup to production but with:
- Staging database (separate MongoDB)
- Staging API keys (non-production)
- Staging domain: staging.swasthyasathi.com
- Less stringent rate limits
- Basic monitoring only

### Smoke Tests

```bash
# Check health
curl https://staging.swasthyasathi.com/health

# Test API
curl https://api-staging.swasthyasathi.com/api/chat

# Test notification service
curl -X POST https://api-staging.swasthyasathi.com/api/notifications/send-sms \
  -H "Content-Type: application/json" \
  -d '{"phone":"+919876543210","message":"Test"}'
```

---

## 🔄 Rollback Procedure

### If Production Breaks

```bash
# Check recent deployments
git log --oneline -10

# Revert to last stable
git revert <commit-hash>
git push origin main

# Or, immediate rollback (if using Vercel/Railway)
vercel remove production-deployment
vercel redeploy previous-deployment
```

---

## ✅ Post-Deployment Verification

```bash
#!/bin/bash

echo "🧪 Running Post-Deployment Tests..."

# Test homepage loads
curl -s https://swasthyasathi.com | grep -q "<title>" && echo "✅ Frontend loaded" || echo "❌ Frontend failed"

# Test API health
curl -s https://api.swasthyasathi.com/health | grep -q "running" && echo "✅ Backend running" || echo "❌ Backend failed"

# Test chat endpoint
curl -s -X POST https://api.swasthyasathi.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"test"}' | grep -q "response" && echo "✅ Chat API working" || echo "❌ Chat API failed"

# Test vaccination endpoint
curl -s https://api.swasthyasathi.com/api/vaccination | grep -q -E "vaccine|error" && echo "✅ Vaccination API working" || echo "❌ Vaccination API failed"

# Check database connection
npm run test:db && echo "✅ Database connected" || echo "❌ Database failed"

echo "✅ All checks complete!"
```

---

## 📱 Mobile App Deployment (Future)

### React Native Build

```bash
# For iOS
cd mobile
pod install
xcodebuild -workspace ios/SwasthyaSathi.xcworkspace -scheme SwasthyaSathi -configuration Release

# For Android
./gradlew assembleRelease

# Submit to App Store / Play Store
```

---

## 💰 Cost Estimation

| Component | Service | Monthly Cost |
|-----------|---------|--------------|
| Frontend Hosting | Vercel | $0-20 |
| Backend Hosting | Railway | $5-50 |
| Database (MongoDB) | Atlas | $0-100 |
| SMS Service | Twilio | $200-1000 |
| Email Service | SendGrid | $10-100 |
| Maps API | Google Maps | $0-500 |
| Weather API | OpenWeatherMap | $0-100 |
| Monitoring | Sentry/DataDog | $0-100 |
| Domain & SSL | GoDaddy/Cloudflare | $15-30 |
| CDN | CloudFlare | $0-200 |
| **Total** | | **$230-2,100** |

---

## 🎯 Launch Timeline

**Week 1**: Environment setup, domain purchase, SSL certificates
**Week 2**: API integrations (Twilio, Google Maps, OpenWeatherMap)
**Week 3**: Deploy to staging, run test suite
**Week 4**: Performance testing, security audit
**Week 5**: Deploy to production
**Week 6**: Monitor metrics, handle issues

---

## 📞 Support & Maintenance

- **24/7 Monitoring**: Sentry + DataDog alerts
- **Weekly Updates**: Security patches, dependency updates
- **Monthly Scaling Review**: Monitor costs, optimize resources
- **Quarterly Backups**: Test restore procedures
- **Annual Audit**: Security and compliance review

---

## 🎓 Learning Resources

- [Vercel Deployment Guide](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [AWS Best Practices](https://aws.amazon.com/architecture/well-architected/)
- [Docker & Kubernetes](https://www.docker.com/resources/docker-kubernetes)

---

**Version**: 1.0.0  
**Last Updated**: 2026-02-09  
**Status**: Production Ready

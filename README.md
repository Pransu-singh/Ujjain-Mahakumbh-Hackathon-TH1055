# CrowdGuard AI - Prototype

## Project Overview
CrowdGuard AI is an intelligent, real-time crowd monitoring and management platform designed for large-scale events like the Mahakumbh pilgrimage in Ujjain.
It empowers event organizers, security personnel, and administrators to monitor crowd density, respond to emergencies, and manage resources efficiently using a modern, role-based web application.

---

## Key Features

### Role-Based Access Control
- **Pilgrim** → Access to safety alerts, lost & found, and recommendations.
- **Security** → Access to live feeds, crowd analytics, and incident response tools.
- **Admin** → Full access to analytics, resource management, and system configuration.

### Authentication & User Management
- Secure **Supabase Auth** integration.
- User roles stored in **PostgreSQL** with **Row Level Security (RLS)** for access control.

### Real-Time Crowd Analytics
- **TensorFlow.js + COCO-SSD** integration for live video stream analysis and crowd density calculation.

### Automated Alerts
- Alerts for **high crowd density**, **unusual movements**, and **emergencies**, visible to **security** and **admin** users.

### Resource Deployment
- Dashboard to **track** and **manage** security and medical teams.

### Lost & Found Module
- Register and manage lost/found items, **accessible to all users**.

### AI Recommendations
- Intelligent **suggestions for crowd control** and **resource allocation**.

### Social Sentiment Analysis
- Visualize **public sentiment** from social media feeds to gauge risks.

### User Preferences
- Customizable **notifications**, **density thresholds**, and **dark/light mode**.

---

## Architecture & Technology Stack

### Frontend
- React 18 + TypeScript
- Tailwind CSS + Framer Motion
- Chart.js & Nivo for data visualizations
- Heroicons for modern, accessible icons
- Jest + React Testing Library

### AI/ML
- TensorFlow.js with **COCO-SSD** for real-time object detection

### Backend & Database
- **Supabase (PostgreSQL)**  
  - Authentication & user roles  
  - Row Level Security (RLS)  
  - Database triggers for auto-profile creation  

### APIs & Integrations
- Supabase REST APIs
- Social sentiment analysis *(simulated for prototype)*

### DevOps & Tooling
- VS Code, GitHub, Postman
---
## How It Works
1. **User Registration** → Users sign up & select their role; profiles are auto-created via Supabase triggers.
2. **Role-Based Access** → After login, dashboards are tailored based on the user role.
3. **Live Monitoring** → Security/Admin users access live video feeds; AI detects people & calculates crowd density in real-time.
4. **Incident Management** → Security teams receive alerts & manage incidents seamlessly.
5. **Pilgrim Support** → Pilgrims view safety alerts, recommendations, and lost & found items.
6. **Analytics & Reporting** → Admins visualize **heatmaps**, **sentiment trends**, and **real-time analytics**.

---

## Code Repository
🔗 **GitHub (Public):** [(https://github.com/Pransu-singh/Ujjain-Mahakumbh-Hackathon-TH1055)]

## Prototype Demonstration Video
📺 **Video Link (Public):** [ https://drive.google.com/drive/folders/11Ag2-6PIxbVvsppdHaq43c_lVZ9qmhd_?usp=drive_link]

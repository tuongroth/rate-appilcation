
# Full-Stack Web Application Project

## Project Overview

**Title:** *Solving the Crisis Invasion: The Parallel Journeys of Vietnam and Finland (2018–2025)*  

### Purpose:
This project addresses the conflict between quality and quantity in task management, focusing on creating an asynchronous, efficient, and cost-effective system. It helps users maintain independence during challenging situations such as wars, personal crises, or long-term stress, enabling both productivity and mental health improvement. 

## Key Features  

### Core Functionalities:
- **Timestamp Tools**:  
  - GitHub history for tracking progress:Ex Commit History (12/11 - 15/11/2025)
  - Submission system for performance validation: Ex Course marked on 30/12/2024, exam passed on 06/01/2025
  - SMS phone book integration for task notifications:Ex Reservation made on 17/06/2024 at 13:00.
  - ChatGPT for brainstorming and quick answers. 
  - CI/CD pipelines for automated testing and deployment.Ex: Used to send notifications via Discord webhook

### **Decision-Making Tools**  .
- **JWT and APIs**: Secure authentication using private and public keys to prevent fraud and unauthorized access. E.g: Endpoint: curl -X GET http://localhost:8001/ -"Authorization: Bearer <your-token>")
- **MongoDB**: Database management for login validation and data storage, with db.json as a starting point. E.g: Connection string:
'mongodb+srv://fullstack:2r6FcH9cLQRdnXHJ@cluster0.xgr0xci.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
- **Fly.io**: Hosting backend services, enabling multi-port terminal operations. E.g Localhost:3001/api/person
- **Visual Studio**: Fetch results faster and ensure consistency across environments. E.g PORT=8001 NODE_ENV=production node app.js
- **Private IP Management**: Using Visual Studio to handle actual private IPs for enhanced security.(e.g curl -X GET http://192.168.1.100:8001/)
- **Axios & RESTful APIs**: Streamlined communication between client and server with proper error handling (e.g., curl -X GET http://localhost:3001/api/person
200 for success, 404 for not found).  
- **Apollo Client Integration**: Enhancing real-time updates and facilitating efficient data fetching.  E.g export GRAPHQL_URI="http://localhost:4000/graphql"
- **GitHub Actions**: Automated workflows to track performance and ensure consistent task execution.
Feedback from reliable sources and stakeholders for improvement: Mehilainen, Posti, Monika, TE, Haaga Helia

### **User Insights**  
- **On JWT & APIs**: "Using private and public keys helps confirm critical security information, preventing fraud and misuse of fake information that could lead to misunderstanding or unexpected outcomes."_  
- **On MongoDB**:"I prefer MongoDB as it allows me to clearly identify endpoints and access reliable sources for help."
- **On Visual Studio & Private IPs**:"Managing actual private IPs through Visual Studio has reduced confusion between fake and authentic information, giving me more confidence in my capabilities."_  
- **On Axios & Error Handling**:"This approach saves time by avoiding unnecessary brainstorming about potential issues, letting me confirm if I'm on the right track with authorities."_  
- **On Asynchronous/Synchronous Models**:"The asyn/syn model has significantly reduced delays in my workflow, even during unexpected family conflicts, allowing me to work efficiently despite limited support."_  
- **On GitHub Actions**:"GitHub Actions has been invaluable for keeping me on track and monitoring progress."_

## Work Hours Log

[Work Hours Log](https://drive.google.com/file/d/1-svA1QXAkW1CNQbw-_i_grWY4c9N9Q3c/view)
**For an e-commerce app: Adding a wishlist, review and actual Project Team:** [Project Team Drive](https://drive.google.com/drive/u/0/home)  
**Working Hours Log:** [Working Hours Log Drive](https://drive.google.com/drive/u/0/home)
**Project Tunnel URL:** [Tunnel Link](https://ba0f-31-216-224-152.ngrok-free.app)

## Technical Documentation

### Architecture Overview:
Provide a diagram or explanation of the application’s architecture.

### API Documentation:
| Method | Endpoint           | Description               |
|--------|--------------------|---------------------------|
| GET    | /api/users         | Fetch all users           |
| POST   | /api/users         | Create a new user         |
| PUT    | /api/users/:id     | Update user details       |
| DELETE | /api/users/:id     | Delete a user             |

### Database Schema:
Include a diagram or description of your database structure.

### Testing:
To run tests, use the following command:
```bash
npm test
```

---

## Credits and Acknowledgments

- **Asynchronous and Performance Optimization**: Inspired by Philip Roberts' "What the heck is the event loop anyway?" (https://www.youtube.com/watch?v=8aGhZQkoFbQ)
- **Mental Health Concepts**: Concepts integrated from various sources including Mehilainen, Monika, and Posti.

---

## Contact

**Author:** TuongRoth  
**GitHub:** [TuongRoth GitHub](https://github.com/tuongroth/rate-appilcation)  
**Email:** rothtrancattuong0703@gmail.com


---

### Example MongoDB connection URL:
```javascript
const mongoUrl = 'mongodb+srv://fullstack:2r6FcH9cLQRdnXHJ@cluster0.xgr0xci.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
```



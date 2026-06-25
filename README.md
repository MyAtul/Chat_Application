#  Real-Time Chat Application

A full-stack real-time chat application built using **React**, **Spring Boot**, **Spring Security**, **JWT**, **WebSocket (STOMP + SockJS)**, and **MySQL**.

The application allows users to register, log in securely, exchange messages instantly, and view the online/offline status of other users in real time.

---

##  Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected REST APIs
* Protected WebSocket Connection
* Secure Logout

### Real-Time Chat

* One-to-One Chat
* Instant Message Delivery
* Chat History
* Auto Scroll
* Enter to Send Message
* Message Timestamp

### Online Presence

* Real-Time Online/Offline Status
* Instant Presence Updates
* Event-Driven Presence System
* Browser Close Detection
* Logout Detection

### User Interface

* Responsive Design
* User Avatars
* Online/Offline Indicators
* Clean Modern UI using Tailwind CSS

---

#  Tech Stack

## Frontend

* React.js
* React Router
* Axios
* Tailwind CSS
* SockJS
* STOMP.js

## Backend

* Spring Boot
* Spring Security
* Spring WebSocket
* Spring Data JPA
* Hibernate
* JWT Authentication
* Application Events

## Database

* MySQL

---

# Architecture

```
React
 │
 │ REST API
 ▼
Spring Boot
 │
 ├── Authentication (JWT)
 ├── REST Controllers
 ├── WebSocket (STOMP)
 ├── Application Events
 ├── Services
 ├── Repository
 ▼
MySQL
```

---

#  Real-Time Message Flow

```
Sender
   │
   ▼
WebSocket
   │
   ▼
Spring Boot
   │
   ▼
Save Message
   │
   ▼
Broadcast Message
   │
   ▼
Receiver
```

---

#  Online Presence Flow

```
User Connects
      │
      ▼
JWT Channel Interceptor
      │
      ▼
Application Event
      │
      ▼
Presence Event Listener
      │
      ▼
Presence Service
      │
      ▼
Presence Broadcaster
      │
      ▼
React Updates Online Users
```

---

#  Project Structure

```
Backend
│
├── config
├── controller
├── dto
├── entity
├── event
├── listener
├── repo
├── security
├── service
└── websocket

Frontend
│
├── components
├── pages
├── services
├── websocket
└── assets
```

---

#  Installation

## Clone Repository

```bash
git clone https://github.com/MyAtul/Chat_Application.git
```

---

## Backend

1. Open in IntelliJ IDEA
2. Configure MySQL
3. Update `application.properties`

```properties
spring.datasource.url=YOUR_DATABASE_URL
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

4. Run Spring Boot

---

## Frontend

```bash
cd Frontend/chat_app

npm install

npm run dev
```


#  Future Improvements

* Group Chat
* File Sharing
* Image Sharing
* Emoji Support
* Typing Indicator
* Read Receipts
* Last Message Preview
* Unread Message Count
* User Profile Images
* Message Search
* Push Notifications
* Cloud Deployment

---

#  Author

**Atul Yadav**

GitHub: https://github.com/MyAtul

---

#  If you like this project

Give this repository a ⭐ on GitHub.

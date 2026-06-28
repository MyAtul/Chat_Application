# ChatApp

A full-stack real-time chat application built with Spring Boot, React, MySQL, and WebSocket (STOMP). The application supports secure authentication, real-time messaging, online presence, message delivery tracking, typing indicators, unread message counts, and a modern responsive user interface.

---

## Features

### Authentication
- JWT-based Authentication
- User Registration
- User Login
- Protected Routes
- Secure REST APIs

### Real-Time Messaging
- Instant messaging using WebSocket (STOMP)
- Persistent chat history
- Automatic conversation updates
- Auto-scrolling message list

### Message Status
- Sent status
- Delivered status
- Read receipts
- Offline message delivery
- Automatic pending message synchronization

### Presence System
- Real-time online users
- Offline detection
- Live presence updates

### Typing Indicator
- Real-time typing indicator
- Typing status in chat header
- Typing status in conversation sidebar
- Optimized typing events using debounce
- Supports multiple simultaneous typing users

### Conversation Management
- Conversation sidebar
- Latest message preview
- Conversation sorting by latest message
- Unread message count
- Real-time sidebar updates

### User Interface
- Responsive layout
- Empty chat state
- User avatars
- Responsive message bubbles
- Message timestamps
- Emoji picker
- Modern dark theme
- Smooth animations

---

## Tech Stack

### Frontend
- React
- React Router DOM
- Axios
- Tailwind CSS
- STOMP.js
- SockJS
- Lucide React
- Emoji Picker React

### Backend
- Spring Boot
- Spring Security
- Spring WebSocket
- JWT Authentication
- Spring Data JPA
- Hibernate

### Database
- MySQL

### Build Tools
- Maven
- Vite

---

## Project Structure

### Backend

```
src/main/java/com/project/chatapp

├── config
├── controller
├── dto
├── entity
├── enums
├── event
├── listener
├── repo
├── security
├── service
└── websocket
```

### Frontend

```
src

├── components
├── pages
├── services
├── websockets
├── assets
└── App.jsx
```

---

## Implemented Features

- User Authentication
- JWT Authorization
- Secure REST APIs
- WebSocket Communication
- Real-Time Messaging
- Online/Offline Presence
- Conversation Sidebar
- Chat History
- Message Status Tracking
- Offline Message Delivery
- Read Receipts
- Typing Indicator
- Multiple Typing Users
- Unread Message Badge
- Emoji Picker
- Responsive UI
- Auto Scroll
- Empty State
- Conversation Sorting

---

## Future Improvements

### Messaging
- Image Sharing
- File Sharing
- Reply to Messages
- Forward Messages
- Edit Messages
- Delete Messages
- Message Reactions
- Message Search
- Date Separators
- Voice Messages

### User Experience
- Search Conversations
- User Profile Pictures
- Theme Switching
- Last Seen Status
- Push Notifications
- Browser Notifications
- Sound Notifications
- Mobile UI Improvements

### Advanced Features
- Group Chats
- Video Calling
- Audio Calling
- Message Encryption
- Message Pinning
- User Blocking
- Archive Chats
- Chat Backup

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Backend

```bash
cd Backend/chatapp

mvn clean install

mvn spring-boot:run
```

### Frontend

```bash
cd Frontend/chatapp

npm install

npm run dev
```

---

## Environment

Create an `application.properties` file containing:

```
spring.datasource.url=
spring.datasource.username=
spring.datasource.password=

jwt.secret=
jwt.expiration=
```

---

## Screenshots

Project screenshots will be added here.

---

## Author

Atul Yadav

Computer Engineering Student

Full Stack Java Developer
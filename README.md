# 🎨 AI Image Generator

A powerful full-stack web application that transforms text prompts into stunning AI-generated images using multiple state-of-the-art AI models.

## 🌟 Live Demo

🔗 **[Visit Live Website](https://imagiverse-frontend.onrender.com)**

## ✨ Features

### 🎯 Core Functionality

- **Multi-Model Support**: Generate images using various AI models including:
  - Gemini 2.5 Flash
  - Nano Banana
  - Flux.1 Krea Dev
  - Flux.1 Schnell (Free)
  - Flux.1 Dev & Depth
  - SDXL Turbo (Free)
  - Chroma
  - HiDream i1 Full
  - Minimax Image-01

### 🖼️ Image Generation

- **Multiple Aspect Ratios**: Square (1:1), Landscape (4:3, 16:9), Portrait (3:4, 9:16)
- **High-Quality Output**: Support for both standard and high-resolution generation
- **Real-time Feedback**: Live progress indicators and generation time tracking
- **Smart Model Selection**: Choose between free and premium models

### 👤 User Management

- **Secure Authentication**: JWT-based login/registration system
- **Credit System**: Fair usage with credit-based generation limits (2 credits per image)
- **User Profiles**: Customizable profiles with avatar upload
- **Featured Images**: Showcase your best creations on your profile
- **Username System**: Auto-generated unique usernames from email

### 🖼️ Gallery & Organization

- **Personal Gallery**: Private collection of your generated images
- **Public Gallery**: Community showcase of public creations
- **Image Management**: Download, delete, and organize your creations
- **Detailed Metadata**: View generation parameters, model used, and creation time
- **Privacy Control**: Toggle between public and private for each image

### 🎨 Advanced Features

- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark Theme**: Modern, eye-friendly interface
- **Toast Notifications**: Real-time feedback for all actions
- **Loading States**: Smooth UX with proper loading indicators
- **Error Handling**: Graceful error recovery with user-friendly messages

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Router v7** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Beautiful notifications
- **React Icons** - Comprehensive icon library

### Backend

- **Node.js** - JavaScript runtime (ES Modules)
- **Express.js v5** - Web application framework
- **MongoDB Atlas** - Cloud NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### AI Integration

- **Multiple AI APIs**:
  - ImageRouter API (Free models)
  - FAL AI (Advanced models)
  - Together AI (Flux models)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- API keys for image generation services

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd ai-image-generator
```

2. **Install Backend Dependencies**

```bash
cd backend
npm install
```

3. **Configure Backend Environment**
   Create `.env` file in `backend/` directory:

```env
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://your-mongodb-connection-string
JWT_SECRET=your-secret-key
IMAGEROUTER_API_KEY=your-imagerouter-api-key
FAL_API_KEY=your-fal-ai-api-key
IMAGE_API_KEY=your-together-ai-api-key
```

4. **Install Frontend Dependencies**

```bash
cd ../frontend
npm install
```

5. **Configure Frontend Environment**
   Create `.env` file in `frontend/` directory:

```env
VITE_BACKEND_BASE_URL=http://localhost:3000
```

### Running the Application

1. **Start Backend Server**

```bash
cd backend
npm start
```

Server runs on `http://localhost:3000`

2. **Start Frontend Development Server** (new terminal)

```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:5173`

## 📱 Usage

1. **Register/Login**: Create an account or sign in to existing account
2. **Generate Images**:
   - Enter a descriptive prompt
   - Select your preferred AI model
   - Choose aspect ratio
   - Set visibility (public/private)
   - Click "Generate Image"
3. **Manage Creations**: View, download, or delete your generated images
4. **Explore Gallery**: Browse public creations from the community
5. **Customize Profile**: Upload avatar and set featured image

### Credit System

- New users start with 20 free credits
- Each generation costs 2 credits
- Credits are deducted only on successful generation
- Insufficient credits prevent generation with clear error messages

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Protected routes with middleware validation
- CORS configuration for secure cross-origin requests
- Input validation and sanitization
- Secure environment variable management

## 📊 Project Structure

```
ai-image-generator/
├── backend/
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth & validation middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API route definitions
│   ├── DB/              # Database connection
│   └── public/uploads/  # Uploaded avatars
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context (auth state)
│   │   └── App.jsx      # Main app component
│   └── public/
└── README.md
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB Atlas IP whitelist includes your server IP
- Check MongoDB connection string format in `.env`
- Verify MongoDB Atlas cluster is active

### API Key Errors

- Verify all API keys are correctly copied (no extra spaces)
- Check API key quotas and limits
- Review API provider documentation for rate limits

### Port Already in Use

- Backend: Change `PORT` in `backend/.env`
- Frontend: Vite will automatically use next available port

## 📝 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Images

- `POST /api/image/generate` - Generate new image (protected)
- `GET /api/image/myimages` - Get user's images (protected)
- `GET /api/image/images` - Get all public images
- `GET /api/image/:id` - Get specific image
- `DELETE /api/image/:id/delete` - Delete image (protected)
- `POST /api/image/featured-image` - Set featured image (protected)

### Profile

- `GET /user/:username` - Get user profile
- `POST /user/change-avatar` - Upload avatar (protected)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Aman Saluja**

## 🙏 Acknowledgments

- ImageRouter API for free model access
- FAL AI for advanced image generation
- Together AI for Flux models
- MongoDB Atlas for database hosting
- Render for deployment

---

**Made with ❤️ by Aman Saluja**

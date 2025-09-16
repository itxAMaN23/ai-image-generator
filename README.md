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
  - Flux.1 Schnell
  - Flux.1 Dev & Depth
  - SDXL Turbo
  - Chroma
  - HiDream i1 Full
  - Minimax Image-01

### 🖼️ Image Generation

- **Multiple Aspect Ratios**: Square (1:1), Landscape (4:3, 16:9), Portrait (3:4, 9:16)
- **High-Quality Output**: Support for both standard and high-resolution generation

### 👤 User Management

- **Secure Authentication**: JWT-based login/registration system
- **Credit System**: Fair usage with credit-based generation limits
- **User Profiles**: Customizable profiles with avatar upload
- **Featured Images**: Showcase your best creations

### 🖼️ Gallery & Organization

- **Personal Gallery**: Private collection of your generated images
- **Public Gallery**: Community showcase of public creations
- **Image Management**: Download, delete, and organize your creations
- **Detailed Metadata**: View generation parameters, model used, and creation time

### 🎨 Advanced Features

- **Public/Private Toggle**: Control visibility of your generated images
- **Model-Specific Warnings**: Helpful notifications for temporary storage models
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark Theme**: Modern, eye-friendly interface

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Beautiful notifications
- **React Icons** - Comprehensive icon library

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### AI Integration

- **Multiple AI APIs**:
  - ImageRouter API (Free models)
  - FAL AI (Advanced models)
  - Together AI (Flux models)

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

**Made with ❤️ by Aman Saluja**

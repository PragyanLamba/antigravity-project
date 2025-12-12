# 🚀 DSA Roadmap - LeetCode Problem Tracker

A full-stack web application to track your progress through the **Blind 75** essential coding interview questions. Built with React and .NET 8, featuring authentication, progress tracking, and a clean NeetCode-style interface.

![DSA Roadmap](https://img.shields.io/badge/Status-Live-success)
![.NET](https://img.shields.io/badge/.NET-8.0-purple)
![React](https://img.shields.io/badge/React-18-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 📚 **74 Curated Questions** - Blind 75 essential interview problems
- 🔐 **Authentication** - Secure JWT-based login/registration
- 📊 **Progress Tracking** - Mark problems as completed and track your journey
- 🎨 **Professional UI** - NeetCode-style table layout with filters
- 🔍 **Smart Filtering** - Filter by topic (Arrays, DP, Graphs, etc.) and difficulty
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 📄 **Pagination** - Smooth navigation through large question sets

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **Axios** for API calls
- **Lucide React** for icons
- **Vanilla CSS** for styling

### Backend
- **.NET 8** Web API
- **Entity Framework Core** with SQLite
- **JWT Authentication** with BCrypt
- **Swagger** for API documentation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- .NET 8 SDK
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PragyanLamba/antigravity-project.git
   cd antigravity-project
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Start the backend**
   ```bash
   cd Antigravity.API
   dotnet run
   ```
   Backend will run on `http://localhost:5160`

4. **Start the frontend** (in a new terminal)
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173` or `http://localhost:5175`

5. **Open your browser**
   Navigate to the URL shown in your terminal (usually `http://localhost:5175`)

## 📖 Usage

1. **Register** - Create a new account
2. **Login** - Sign in with your credentials
3. **Browse Questions** - View all 74 Blind 75 questions
4. **Filter** - Use dropdowns to filter by topic or difficulty
5. **Track Progress** - Click the circle icon to mark questions as complete
6. **Monitor** - Watch your progress bar grow as you solve more problems!

## 🗂️ Project Structure

```
antigravity-project/
├── src/                          # Frontend source
│   ├── components/               # React components
│   │   ├── AuthModal.jsx        # Login/Register modal
│   │   ├── Navbar.jsx           # Navigation bar
│   │   ├── ProblemList.jsx      # Question table
│   │   ├── FilterBar.jsx        # Topic/Difficulty filters
│   │   └── ProgressBar.jsx      # Progress indicator
│   ├── context/                 # React context
│   │   └── AuthContext.jsx      # Authentication state
│   ├── hooks/                   # Custom hooks
│   │   └── useProgress.js       # Progress tracking logic
│   └── App.jsx                  # Main app component
├── Antigravity.API/             # Backend source
│   ├── Controllers/             # API endpoints
│   │   ├── AuthController.cs    # Login/Register
│   │   ├── ProblemsController.cs # Get questions
│   │   └── ProgressController.cs # Track progress
│   ├── Data/                    # Database context
│   │   ├── AppDbContext.cs      # EF Core context
│   │   └── DbSeeder.cs          # Blind 75 dataset
│   ├── Models/                  # Data models
│   │   ├── User.cs
│   │   ├── Problem.cs
│   │   └── UserProgress.cs
│   └── Program.cs               # App configuration
└── DEPLOYMENT.md                # Deployment guide
```

## 🌐 Deployment

Want to make your site live? Check out the [DEPLOYMENT.md](./DEPLOYMENT.md) guide for step-by-step instructions on deploying to:
- **Vercel** (Frontend)
- **Railway** (Backend)
- **Render**, **Azure**, **Netlify** (Alternatives)

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login and get JWT token

### Problems
- `GET /api/problems` - Get all questions

### Progress (Requires Auth)
- `GET /api/progress` - Get user's completed questions
- `POST /api/progress/{problemId}` - Toggle question completion

## 🎯 Roadmap

- [ ] Add more question sets (NeetCode 150, Top Interview Questions)
- [ ] Implement notes/solutions for each problem
- [ ] Add difficulty-based statistics
- [ ] Export progress as PDF
- [ ] Dark mode toggle
- [ ] Social features (share progress)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Pragyan Lamba**
- GitHub: [@PragyanLamba](https://github.com/PragyanLamba)

## 🙏 Acknowledgments

- Blind 75 question list curated by the coding interview community
- Inspired by [NeetCode](https://neetcode.io/)
- Built with ❤️ for aspiring software engineers

---



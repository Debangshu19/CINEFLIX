# 🎬 CineFlix - Movie & TV Show Discovery App

CineFlix is a full-stack movie and TV show discovery web application that allows users to search, explore, and manage their watchlist seamlessly. It provides real-time data fetched from The Movie Database (TMDB) API, offering trending movies, TV shows, detailed content info, and personalized search history.

## 🚀 Features

- 🔍 **Advanced Search & Filtering:** Discover movies and TV shows with real-time suggestions.
- 📊 **Search History Tracking:** Tracks user search history with options to manage and delete entries.
- 🔐 **Secure Authentication:** JWT-based user login with secure cookie management.
- ⚡ **Responsive UI:** Built with React & Tailwind CSS for a smooth, mobile-friendly experience.
- 🌍 **Cross-Origin Support:** Optimized CORS policies for frontend-backend communication (Vercel + Render).
- 🎥 **Trending Content:** View trending movies and TV shows updated daily.
- 🗑️ **Manage History:** Easily delete individual search history items.

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, JWT for authentication
- **Database:** MongoDB
- **APIs:** The Movie Database (TMDB) API
- **Deployment:** Frontend (Vercel), Backend (Render)

## 📦 Installation & Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/cineflix.git
   cd cineflix
   ```

2. **Frontend Setup:**

   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Backend Setup:**

   ```bash
   cd backend
   npm install
   npm run dev
   ```

4. **Environment Variables:** Create `.env` files in both frontend and backend directories.

   **Backend **``** Example:**

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   TMDB_API_KEY=your_tmdb_api_key
   ```

   **Frontend **``** Example:**

   ```env
   REACT_APP_API_BASE_URL=https://your-backend-api-url
   ```

## 🔐 Authentication & Security

- **JWT Token Management:** Tokens are stored securely in HTTP-only cookies.
- **Cookie Settings:**
  - `secure: false` (for local development)
  - `sameSite: 'Lax'` for better cross-origin compatibility

## 🌍 Deployment

- **Frontend:** Deployed on [Vercel](https://vercel.com/)
- **Backend:** Deployed on [Render](https://render.com/)

## 📝 API Endpoints

- **Authentication:** `/api/v1/auth/login`, `/api/v1/auth/register`
- **Search:** `/api/v1/search/movie/:query`, `/api/v1/search/tv/:query`, `/api/v1/search/person/:query`
- **Search History:** `/api/v1/search/history`, `/api/v1/search/history/:id`

## ⚙️ Known Issues & Challenges

- Handled secure cookie management with `sameSite` and `secure` flags for cross-origin compatibility.
- Resolved token handling issues for different devices ensuring consistent login experiences.
- Addressed CORS-related issues for smooth frontend-backend integration.

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## 📧 Contact

For any queries or feedback, feel free to reach out:

- **Developer:** Debangshu Dey
- **Email:** [debangshu.dey47@gmail.com](mailto\:debangshu.dey47@gmail.com)
- **LinkedIn:** [linkedin.com/in/debangshudey](https://www.linkedin.com/in/debangshudey)

---

⭐ **Star** this repository if you found it helpful!

🎉 **Happy Coding with CineFlix!** 🎬


import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import GeneratePage from "./pages/GeneratePage";
import { LoginProvider } from "./context/LoginContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MyImages from "./pages/MyImages";
import PublicImages from "./pages/PublicImages";
import ImagePage from "./pages/ImagePage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
      <Toaster
        className="bg-[#2B2A4C] text-[#EAE8FF]"
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 1500,
        }}
      />

      <LoginProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/generate" element={<GeneratePage />} />
            <Route path="/my-images" element={<MyImages />} />
          </Route>
          <Route path="/gallery" element={<PublicImages />} />
          <Route path="/image/:id" element={<ImagePage />} />
          <Route path="/:username" element={<ProfilePage />} />
        </Routes>
      </LoginProvider>
    </>
  );
}

export default App;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./lib/auth";
import { ToastProvider } from "./components/ui/Toast";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { AdminLayout } from "./components/admin/AdminLayout";
import App from "./App";
import { AdminLogin } from "./pages/AdminLogin";
import { Dashboard } from "./pages/admin/Dashboard";
import { Placeholder } from "./pages/admin/Placeholder";
import { Profile } from "./pages/admin/Profile";
import { ProjectsAdmin } from "./pages/admin/Projects";
import { ExperienceAdmin } from "./pages/admin/Experience";
import { SkillsAdmin } from "./pages/admin/Skills";
import { EducationAdmin } from "./pages/admin/Education";
import { CertificationsAdmin } from "./pages/admin/Certifications";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="projects" element={<ProjectsAdmin />} />
              <Route path="experience" element={<ExperienceAdmin />} />
              <Route path="skills" element={<SkillsAdmin />} />
              <Route path="education" element={<EducationAdmin />} />
              <Route path="certifications" element={<CertificationsAdmin />} />
              <Route path="messages" element={<Placeholder title="Messages" />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
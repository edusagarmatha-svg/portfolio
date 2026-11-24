import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
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
import { ServicesAdmin } from "./pages/admin/Services";
import { TestimonialsAdmin } from "./pages/admin/Testimonials";
import { MessagesAdmin } from "./pages/admin/Messages";
import { SettingsAdmin } from "./pages/admin/Settings";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
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
              <Route path="services" element={<ServicesAdmin />} />
              <Route path="testimonials" element={<TestimonialsAdmin />} />
              <Route path="messages" element={<MessagesAdmin />} />
              <Route path="settings" element={<SettingsAdmin />} />
              <Route path="messages" element={<Placeholder title="Messages" />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>,
);
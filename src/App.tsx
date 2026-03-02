import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "@/context/AuthContext";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import ForgotPassword from "@/pages/ForgotPassword";
import DashboardLayout from "@/pages/dashboard/DashboardLayout";
import DashboardUpload from "@/pages/dashboard/DashboardUpload";
import DashboardHome from "@/pages/dashboard/DashboardHome";
import DashboardHistory from "@/pages/dashboard/DashboardHistory";
import DashboardBilling from "@/pages/dashboard/DashboardBilling";
import DashboardSettings from "@/pages/dashboard/DashboardSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="upload" replace />} />
            <Route path="home" element={<DashboardHome />} />
            <Route path="upload" element={<DashboardUpload />} />
            <Route path="history" element={<DashboardHistory />} />
            <Route path="billing" element={<DashboardBilling />} />
            <Route path="settings" element={<DashboardSettings />} />
          </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

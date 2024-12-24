import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./app/login/login.tsx";
import { Home } from "./app/home/home.tsx";
import { ProtectedPage } from "./components/ProtectedPage.tsx";
import { Layout } from "./components/Layout.tsx";
import { AddEntry } from "./app/AddEntry.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedPage />}>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="add" element={<AddEntry />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>,
);

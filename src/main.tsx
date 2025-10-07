import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import OrdersPage from "./pages/OrdersPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OrdersPage />
  </StrictMode>
);

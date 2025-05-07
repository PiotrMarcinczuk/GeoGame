import { createRoot } from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./index.css";
import Main from "../components/Main";
import { Provider } from "react-redux";
import store from "./store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={new QueryClient()}>
      <Main />
    </QueryClientProvider>
  </Provider>
);

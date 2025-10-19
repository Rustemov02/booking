import ConfigureRoutes from "./configureRoutes";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <div className="flex justify-center h-auto w-full flex-col bg-neutral-100">
          <ConfigureRoutes />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

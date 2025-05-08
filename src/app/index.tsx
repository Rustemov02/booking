import ConfigureRoutes from "./configureRoutes";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="flex justify-center h-auto w-full flex-col bg-neutral-100">
          <ConfigureRoutes />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

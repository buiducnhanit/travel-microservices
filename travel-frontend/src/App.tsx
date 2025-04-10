import { LoadingProvider } from "./context/LoadingContext";
import LoadingOverlay from "./components/common/LoadingOverlay";
import AppRoutes from "./routes/index";

function App() {
  // return <AppRoutes />;
  return (
    <LoadingProvider>
      <LoadingOverlay />
      <AppRoutes />
    </LoadingProvider>
  );
}

export default App

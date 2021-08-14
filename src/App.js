import AppRouter from "./routers/AppRouter";
import AuthProvider from "./auth/AuthProvider";

function App() {
  return (
    <div>
        <AuthProvider>
            <AppRouter/>
        </AuthProvider>

    </div>
  );
}

export default App;

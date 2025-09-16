import { useState } from "react";
import AuthPage from "./AuthPage";
import HomePage from "./HomePage";

function App() {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token")); // (!!) tranduit en booléen

  return (
    <div>
      {isLogged ? (
        <HomePage onLogout={() => setIsLogged(false)} />
      ) : (
        <AuthPage onLogin={() => setIsLogged(true)} />
      )}
    </div>
  );
}

export default App;

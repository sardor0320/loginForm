import { Route, Routes } from "react-router-dom";
import Table from "./components/table";
import Header from "./components/header";
import Hero from "./components/hero";
import Card from "./components/card";
import Notfound from "./components/notfound";
import LoginForm from "./auth/loginForm";
// import LoginForm from "./auth/loginForm";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/table" element={<Table />} />
        <Route path="/card" element={<Card />} />
        <Route path="/*" element={<Notfound />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </>
  );
}

export default App;

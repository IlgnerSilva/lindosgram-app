import "./App.css";
import { db } from "./firebase";
import Header from "./components/Header"
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    console.log(db);
  }, []);
  return (
    <div className="App">
      <Header setUser = {setUser} user = {user}></Header>
    </div>
  );
}

export default App;

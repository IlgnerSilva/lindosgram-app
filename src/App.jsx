import "./App.css";
import { db } from "./firebase";
import Header from "./components/Header"
import { useEffect, useState } from "react";

function App() {


  useEffect(() => {
    console.log(db);
  }, []);
  return (
    <div className="App">
      <Header></Header>
    </div>
  );
}

export default App;

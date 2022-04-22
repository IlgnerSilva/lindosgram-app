import "./App.css";
import Header from "./components/Header"
import { db, auth} from "./firebase";
import { useEffect, useState } from "react";
import Post from "./components/Post";

function App() {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
      db.collection('posts').orderBy('timePost', 'desc').onSnapshot((snapshot)=>{
          setPosts(snapshot.docs.map((document)=>{
            return {id:document.id, info:document.data()}
          }))
      })

      auth.onAuthStateChanged((val)=>{
        if(val !== null){
          setUser(val.displayName)
        }
      })
  }, []);



  return (
    <div className="App">
      <Header setUser = {setUser} user = {user}></Header>
      {
        posts.map((val)=>{
          return(
            <Post user={user} info={val.info} id={val.id} />
          )
        })
      }
    </div>
  );
}

export default App;

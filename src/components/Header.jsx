import { useEffect, useState } from "react";
import firebase from "firebase";
import imagem from "./imgs/LindosGram.png";
import {auth, storage, db} from "./../firebase";

function Header(props) {

  const [progress, setProgress] = useState(0);

  const [file, setFile] = useState(null)

  function modalCriarConta(e){
    e.preventDefault()

    document.querySelector('.modalCriarConta').style.display = 'block'
  }
  function fecharModalCriarConta(){

    document.querySelector('.modalCriarConta').style.display = 'none'
  }
  function criarConta(e){
    e.preventDefault()
    let email = document.querySelector('#emailCadastro').value;
    let username = document.querySelector('#usernameCadastro').value;
    let senha = document.querySelector('#senhaCadastro').value;

    //Criar conta firebase
    auth.createUserWithEmailAndPassword(email, senha)
      .then((authUser)=>{
        authUser.user.updateProfile({
            displayName: username
        })
        alert('Conta Criada com sucesso!')
        document.querySelector('.modalCriarConta').style.display = 'none'
      }).catch((err)=>{
        alert(err.message)
      })
  }
  function logar(e){
    e.preventDefault()
    let emailLogin = document.querySelector('#emailLogin').value;
    let senhaLogin = document.querySelector('#senhaLogin').value;

    auth.signInWithEmailAndPassword(emailLogin, senhaLogin)
      .then((auth)=>{
        props.setUser(auth.user.displayName);
        console.log(props.setUser)
        alert('Logado com sucesso!');
        window.location.href = '/'
      }).catch((err)=>{
        alert(err.message)
      })
  }
  function abrirModalUpload(e){
    e.preventDefault()
    document.querySelector('.modalUpload').style.display = 'block'
  }
  function fecharModalupload(){
    document.querySelector('.modalUpload').style.display = 'none'
  }
  function uploadPost(e){
    e.preventDefault();

    let tituloPost = document.querySelector('#titulo-upload').value;
    //let progress = document.querySelector('#progress-upload');

    const upload = storage.ref(`images/${file.name}`).put(file);
    upload.on("state_changed", function(snapshot){
      const progress = Math.round(snapshot.bytesTransferred/snapshot.totalBytes) * 100;
      setProgress(progress);
    }, function(err){
      alert(err)
    }, function(){
      storage.ref("images").child(file.name).getDownloadURL()
        .then((url)=>{
            db.collection('posts').add({
              titulo: tituloPost,
              image: url,
              username: props.user,
              timePost: firebase.firestore.FieldValue.serverTimestamp()
            });
            setProgress(0)
            setFile(null)

            alert('upload realizado com sucesso!')

            document.querySelector('#form-upload').reset();
            document.querySelector('.modalUpload').style.display = 'none';
        })
    })
  }
  function logout(e){
    auth.signOut();
    auth.signOut().then((val)=>{
      props.setUser(null)
    })
  }

  return (
    <div className="header">

      <div className="modalCriarConta">
          <div className="formCriarConta">
              <div onClick={()=>fecharModalCriarConta()} className="fecharModalCriar">X</div>
            <h2>Criar Conta</h2>
              <form onSubmit={(e)=>criarConta(e)}>
                  <input id="emailCadastro" type="text" placeholder="Seu e-mail" />
                  <input id="usernameCadastro" type="text" placeholder="Seu username" />
                  <input id="senhaCadastro" type="password" placeholder="Sua senha" />
                  <input type="submit" value="Criar Conta!" />
              </form>
          </div>
      </div>

      <div className="modalUpload">
          <div className="formUpload">
              <div onClick={()=>fecharModalupload()} className="fecharModalCriar">X</div>
            <h2>Upload</h2>
              <form id="form-upload" onSubmit={(e)=>uploadPost(e)}>
                  <progress id="progress-upload" value={progress}></progress>
                  <input id="titulo-upload" type="text" placeholder="Legenda para foto..." />
                  <input onChange={(e)=>setFile(e.target.files[0])} type="file" name="file" />
                  <input type="submit" value="Postar no <LindosGram/>" />
              </form>
          </div>
      </div>

      <div className="center">
          <div className="header_logo">
              <a href="#">
                  <img src={imagem} />
              </a>
          </div>
          {props.user ? (
          <div className="header_logadoInfo">
              <p>
                 Olá <strong>{props.user}</strong>
              </p>
            <a onClick={(e)=>abrirModalUpload(e)} href="#">Postar</a>
            <a onClick={(e)=> logout(e)}>Sair</a>
          </div>
        ) : (
          <div className="header_loginForm">
            <form onSubmit={(e)=>logar(e)}>
              <input id="emailLogin" type="text" placeholder="Login..." />
              <input id="senhaLogin" type="password" placeholder="Senha..." />
              <input type="submit" name="acao" value="Logar!" />
            </form>
            <div className="btn_criarConta">
              <a onClick={(e)=> modalCriarConta(e)} href="#">Criar Conta!</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;

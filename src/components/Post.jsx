import { db } from "./../firebase";
import { useEffect, useState } from "react";
import firebase from "firebase"

function Post(props) {

    const [comentarios, setComentarios] = useState([])

    useEffect(() =>{
        db.collection('posts').doc(props.id).collection('comentarios').orderBy('timePost', 'desc').onSnapshot((snapshot)=>{
            setComentarios(snapshot.docs.map((document)=>{
                return {id:document.id, info:document.data()}
              }))
        })
    }, [])


    function comentar(id, e){
        e.preventDefault();
        let comentarioNovo = document.querySelector(`#comentario-${props.id}`).value;
        
        db.collection('posts').doc(id).collection('comentarios').add({
            nome: props.user,
            comentario: comentarioNovo,
            timePost: firebase.firestore.FieldValue.serverTimestamp()
        })
        
        alert('Comentario feito com suesso');
        comentarioNovo = document.querySelector(`#comentario-${props.id}`).value = '';

    }

  return (
    <div className="postSingle">
      <img src={props.info.image} />
      <p><strong>{props.info.username}</strong>: {props.info.titulo}</p>
      <div className="coments">
          {
              comentarios.map((val)=>{
                  return(
                      <div className="comentarioSingle">
                          <p><strong>{val.info.nome}</strong>: {val.info.comentario}</p>
                      </div>
                  )
              })
          }
      </div>
      {
        (props.user)?
        <form onSubmit={(e) => comentar(props.id, e)}>
            <textarea id={`comentario-${props.id}`}></textarea>
            <input type="submit" value="Comentar" />
        </form>
        :<div></div>
      }
    </div>
  );
}

export default Post;
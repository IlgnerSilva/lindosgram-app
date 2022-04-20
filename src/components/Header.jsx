import { useEffect, useState } from "react";
import imagem from "./imgs/LindosGram.png";

function Header() {
    const [user, setUser] = useState('Ilgner');
  return (
    <div className="header">
      <div className="center">
        <div className="header_logo">
          <a href="#">
            <img src={imagem} />
          </a>
        </div>
        {user ? (
          <div className="header_logadoInfo">
            <p>
              Olá <strong>{user}</strong>
            </p>
            <a href="#">Postar</a>
          </div>
        ) : (
          <div className="header_loginForm">
            <form>
              <input type="text" placeholder="Login..." />
              <input type="password" placeholder="Senha..." />
              <input type="submit" name="acao" value="Logar!" />
            </form>
            <div className="btn_criarConta">
              <a href="#">Criar Conta!</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;

import { html, css, LitElement } from 'lit';

export class LoginComponent extends LitElement {
  static get properties() {
    return {
    };
  }

  constructor() {
    super();
  }

  handleLogin() {
    const userName = this.shadowRoot.getElementById("nameLogin");
    if (userName.value  == "") {
      alert("Please enter a valid name")
    } else if (!localStorage.getItem("players." + userName.value)) {
      alert("This name is not registered")
    } else {
      const user = JSON.parse(localStorage.getItem("players." + userName.value));
      const customEvent = new CustomEvent('routePath', {detail : {page: "game", user: user}});
      this.dispatchEvent(customEvent);
    }
  }

  handleToRegister() {
    const customEvent = new CustomEvent('routePath', {detail : {page: "register"}});
    this.dispatchEvent(customEvent);
  }


  render() {
    return html`
      <div class="login">
        <div class="loginTitle">
          <img src="https://i.postimg.cc/VsqCx9BK/Titulo-PRSLK.png"></img>
        </div>
        <div class="loginForm">
          <div class="loginFormTitle">
            <h2>Login</h2>
          </div>
          <div class="loginFormPlayer">
            <div class="loginFormPlayerName">
              <h3>Name</h3>
            </div>
            <div class="loginFormPlayerInput">
              <input id="nameLogin" type="text" placeholder="Enter your name"></input>
              <button @click=${this.handleLogin}>Login</button>
            </div>
          </div>
          <hr class="loginLine"></hr>
          <div class="loginRegister">
            <p>Don't have an account yet?</p>
            <button @click=${this.handleToRegister}>Register</button>
          </div>
        </div>
      </div>
    `;
  }


  static get styles() {
    return css`
    .login{
      display: flex; 
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: black;
      font-family: Arial, sans-serif;
    }
    .loginTitle{
      display: flex; 
      justify-content: center;
      align-items: center;
      width: 100vw; 
      height: 30vh;
      padding-bottom: 1rem;
    }
    .loginTitle img{
      width: 95%;
      max-width: 540px; 
      height: auto;  
    }
    .loginForm{
      display: flex; 
      flex-direction: column;
      align-items: flex-start;
      border: 0.1rem solid gray;
      padding-left: 1.5rem; 
      padding-right: 1.5rem; 
      padding-bottom: 2rem;
    }
    .loginFormTitle{
      font-size: 1.5rem;
      font-style: italic;
    }
    .loginFormPlayer{
      font-size: 1.5rem;
      margin-top: -2rem;
      max-width: 540px;
    }
    .loginFormPlayerInput{
      display: flex; 
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .loginFormPlayerInput input{
      background-color: black; 
      border: 0.1rem solid gray; 
      border-radius: 0.5rem; 
      font-size: 1.2rem;
      color: white; 
      padding-left: 0.5rem;
      margin-bottom: 1rem;
      margin-top: -1rem;
      height: 5vh;
      width: 60vw;
      max-width: 540px;
    }
    .loginFormPlayerInput input::placeholder{
      color: gray; 
    }
    .loginFormPlayerInput input:focus{
      outline: none;  
      border: 0.1rem solid orange;
    }
    .loginFormPlayerInput button{
      border-radius: 0.5rem;
      border: 0.1rem solid darkblue;
      background-color: rgb(15, 121, 175);
      font-size: 22px;
      font-weight: bold;
      cursor: pointer;
      padding-top: 1re;
      width: 30vw;
      height: 5vh; 
      max-width: 150px;
    }
    .loginFormPlayerInput button:hover{
      background-color: #0066c0;
    }
    .loginLine{
      width: 9rem; 
      height: 0.1px;  
      background-color: gray;
      margin-top: 2rem;
      border: none; 
    }
    .loginRegister{
      display: flex; 
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 64vw;
      max-width: 540px;
    }
    .loginRegister p{
      font-size: 1.3rem;
    }
    .loginRegister button{
      border-radius: 0.5rem;
      border: 0.1rem solid darkorange;
      background-color: #f0c14b;
      font-size: 22px;
      font-weight: bold;
      cursor: pointer;
      padding-top: 1re;
      width: 30vw;
      height: 5vh; 
      max-width: 150px;
    }
    .loginRegister button:hover{
      background-color: orange;
    }
    `;
  }
}

window.customElements.define('login-component', LoginComponent);
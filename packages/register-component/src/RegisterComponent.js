import { html, css, LitElement } from 'lit';

export class RegisterComponent extends LitElement {
  static get properties() {
    return {
    };
  }

  constructor() {
    super();
  }


  handleRegister() {
    const userName = this.shadowRoot.getElementById("nameRegister");
    if (userName.value == "") {
      alert("Please enter a valid name...")
    } else if (!localStorage.getItem("players." + userName.value)) {
      let user = {
        name: userName.value,
        score: 0,
        attempts: 0,
      };
      localStorage.setItem("players." + userName.value, JSON.stringify(user));
      alert("Player registered successfully!")
      this.handleToLogin();
    } else {
      alert("This name is already registered!!")
    }
  }

  handleToLogin() {
    const customEvent = new CustomEvent('routePath', {detail : {page: "login"}});
    this.dispatchEvent(customEvent);
  }
  
 
  render() {
    return html`
    <div class="register">
      <div class="registerTitle">
        <img src="https://i.postimg.cc/VsqCx9BK/Titulo-PRSLK.png"></img>
      </div>
      <div class="registerForm">
        <div class="registerFormTitle">
          <h2>Register</h2>
        </div>
        <div class="registerFormPlayer">
          <div class="registerFormPlayerName">
            <h3>Name</h3>
          </div>
          <div class="registerFormPlayerInput">
            <input id="nameRegister" type="text" placeholder="Enter your name"></input>
            <button @click=${this.handleRegister}>Register</button>
          </div>
        </div>
        <hr class="registerLine"></hr>
        <div class="registerLogin">
          <p>Already have an account?</p>
          <button @click=${this.handleToLogin}>Login</button>
        </div>
      </div>
    </div>
    `;
  }


  static get styles() {
    return css`
    .register{
      display: flex; 
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: black;
      font-family: Arial, sans-serif;
    }
    .registerTitle{
      display: flex; 
      justify-content: center;
      align-items: center;
      width: 100vw; 
      height: 30vh;
      padding-bottom: 1rem;
    }
    .registerTitle img{
      width: 95%; 
      max-width: 540px;
      height: auto;  
    }
    .registerForm{
      display: flex; 
      flex-direction: column;
      align-items: flex-start;
      border: 0.1rem solid gray;
      padding-left: 1.5rem; 
      padding-right: 1.5rem; 
      padding-bottom: 2rem;
    }
    .registerFormTitle{
      font-size: 1.5rem;
      font-style: italic;
    }
    .registerFormPlayer{
      font-size: 1.5rem;
      margin-top: -2rem;
      max-width: 540px;
    }
    .registerFormPlayerInput{
      display: flex; 
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .registerFormPlayerInput input{
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
    .registerFormPlayerInput input::placeholder{
      color: gray; 
    }
    .registerFormPlayerInput input:focus{
      outline: none;  
      border: 0.1rem solid orange;
    }
    .registerFormPlayerInput button{
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
    .registerFormPlayerInput button:hover{
      background-color: #0066c0;
    }
    .registerLine{
      width: 9rem; 
      height: 0.1px;  
      background-color: gray;
      margin-top: 2rem;
      border: none; 
    }
    .registerLogin{
      display: flex; 
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 64vw;
      max-width: 540px;
    }
    .registerLogin p{
      font-size: 1.3rem;
    }
    .registerLogin button{
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
    .registerLogin button:hover{
      background-color: orange;
    }
    `;
  }
}

window.customElements.define('register-component', RegisterComponent);
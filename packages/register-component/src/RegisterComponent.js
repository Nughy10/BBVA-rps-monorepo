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
      <div class="register__title">
        <h1>Rock, Paper, Scissors, Lizard, Spock</h1>
      </div>
      <div class="register__form">
        <div class="register__formTitle">
          <h2>Register</h2>
        </div>
        <div class="register__formPlayer">
          <div class="register__formPlayerName">
            <h3>Name</h3>
          </div>
          <div class="register__formPlayerInput">
            <input id="nameRegister" type="text" placeholder="Enter your name"></input>
            <button @click=${this.handleRegister}>Register</button>
          </div>
        </div>
        <hr class="register__line"></hr>
        <div class="register__login">
          <p>Already account?</p>
          <button @click=${this.handleToLogin}>Login</button>
        </div>
      </div>
    </div>
    `;
  }

  
  static get styles() {
    return css`
    `;
  }
}

window.customElements.define('register-component', RegisterComponent);
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
        <div class="login__title">
          <h1>Rock, Paper, Scissors, Lizard, Spock</h1>
        </div>
        <div class="login__form">
          <div class="login__form--Title">
            <h2>Login</h2>
          </div>
          <div class="login__form--Player">
            <div class="login__form--Player--Name">
              <h3>Name</h3>
            </div>
            <div class="login__form--Player--Input">
              <input id="nameLogin" type="text" placeholder="Enter your name"></input>
              <button @click=${this.handleLogin}>Login</button>
            </div>
          </div>
          <hr class="login__line"></hr>
          <div class="login__register">
            <p>No account?</p>
            <button @click=${this.handleToRegister}>Register</button>
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

window.customElements.define('login-component', LoginComponent);
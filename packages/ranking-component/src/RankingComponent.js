import { html, css, LitElement } from 'lit';

import '@polymer/iron-icons/device-icons';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icon';

export class RankingComponent extends LitElement {
  static get properties() {
    return {
      players: {
        type: Array
      },
      loggedUser: {
        type: Object
      }
    };
  }

  constructor() {
    super();
    this.players = [];
    this.loggedUser = {};
    for (let i = 0; i < localStorage.length; i++) {
      if (/(players\.)+/.test(localStorage.key(i))) {
        this.players.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
      }
    }
  }


  handleGamePage() {
    const customEvent = new CustomEvent('routePath', {detail : {page: "game"}});
    this.dispatchEvent(customEvent);
  }

  handleLoggout() {
    const customEvent = new CustomEvent('routePath', {detail : {page: "login", user: {}}});
    this.dispatchEvent(customEvent);
  }


  render() {
    return html`
    <div class="ranking">
      <div class="rankingHeader">
        <div class="rankingHeaderPlayer">
          <h1>Hi ${this.loggedUser.name}!</h1>
        </div>
        <div class="rankingHeaderGame">
          <iron-icon @click="${this.handleGamePage}" icon="icons:home"></iron-icon>
        </div>
      </div>
    <div class="rankingHeaderTitle">
      <img src="https://i.postimg.cc/VsqCx9BK/Titulo-PRSLK.png"></img>
    </div>
    <div class="rankingMain">
      <div class="rankingMainPlayer">
        <div class="rankingMainPlayerTitle">
          <h1>Players</h1>
        </div>
        <div class="rankingMainPlayerNames">
          <ul>
            ${this.players.map((player) => html`<li>${player.name}</li>`)}
          </ul>
        </div>
      </div>
      <div class="rankingMainScore">
        <div class="rankingMainScoreTitle">
          <h1>Score</h1>
        </div>
        <div class="rankingMainScoreValue">
          <ul>
          ${this.players.map((player) => html`<li>${player.score}</li>`)}
          </ul>
        </div>
      </div>
      <div class="rankingMainAttempts">
        <div class="rankingMainAttemptsTitle">
          <h1>Attempts</h1>
        </div>
        <div class="rankingMainAttemptsValue">
          <ul>
          ${this.players.map((player) => html`<li>${player.attempts}</li>`)}
          </ul>
        </div>
      </div>
    </div>
    <div class="rankingFooter">
      <div class="rankingFooterLogout">
        <iron-icon @click="${this.handleLoggout}" icon="icons:exit-to-app"></iron-icon>
      </div>
    </div>
  </div>
    `;
  }


  static get styles() {
    return css`
    .ranking{
      display: flex; 
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: black;
      font-family: Arial, sans-serif;
    }
    .rankingHeader{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      width: 100vw;
      margin-top: 1rem; 
    }
    .rankingHeaderPlayer{
      color: gray;
    }
    .rankingHeaderGame iron-icon{
      width: 12vw;
      height: 12vh;
      max-width: 60px;
      max-height: 60px;
      color: rgb(15, 121, 175); 
      cursor: pointer;
    }
    .rankingHeaderGame iron-icon:hover{
      color: darkblue; 
    }
    .rankingHeaderTitle{
      display: flex; 
      justify-content: center;
      align-items: center;
      width: 100vw; 
      height: 30vh;
      padding-bottom: 1rem;
    }
    .rankingHeaderTitle img{
      width: 95%;
      max-width: 540px; 
      height: auto;  
    }
    .rankingMain{
      display: flex; 
      flex-direction: row; 
      justify-content: space-around;
      align-items: center;
      width: 100vw;
      background-color: #171717;
    }
    .rankingMainPlayerTitle h1{
      color: rgb(15, 121, 175); 
      text-decoration: underline;
      font-weight: normal;
    }
    .rankingMainPlayerNames li{
      color: rgb(15, 121, 175);
      list-style: none;
      font-size: 1.4rem;
    }
    .rankingMainScoreTitle h1{
      color: rgb(75 240 87);
      text-decoration: underline;
      font-weight: normal;
    }
    .rankingMainScoreValue li{
      color: rgb(75 240 87);
      list-style: none;
      font-size: 1.4rem;
    }
    .rankingMainAttemptsTitle h1{
      color: #f0c14b;
      text-decoration: underline;
      font-weight: normal;
    }
    .rankingMainAttemptsValue li{
      color: #f0c14b;
      list-style: none;
      font-size: 1.4rem;
    }
    .rankingFooterLogout{
      margin-top: 2rem; 
      margin-bottom: 2rem;
    }
    .rankingFooterLogout iron-icon{
      width: 12vw;
      height: 12vh;
      max-width: 60px;
      max-height: 60px;
      color: rgb(240 75 75);
      cursor: pointer;
    }
    .rankingFooterLogout iron-icon:hover{
      color: darkred; 
    }
    `;
  }
}
window.customElements.define('ranking-component', RankingComponent);
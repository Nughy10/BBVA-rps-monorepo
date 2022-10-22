import { html, css, LitElement } from 'lit';

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
      <div class="ranking__header">
        <div class="ranking__headerPlayer">
          <h1>Hi ${this.loggedUser.name}!</h1>
        </div>
        <div class="ranking__headerTitle">
          <h1>Rock, Paper, Scissors, Lizard, Spock</h1>
        </div>
        <div class="ranking__headerGame">
          <h1 @click=${this.handleGamePage}>Game</h1>
        </div>
      </div>
    <div class="ranking__main">
      <div class="ranking__mainPlayer">
        <div class="ranking_mainPlayerTitle">
          <h1>Players</h1>
        </div>
        <div class="ranking_mainPlayerNames">
          <ul>
            ${this.players.map((player) => html`<li>${player.name}</li>`)}
          </ul>
        </div>
      </div>
      <div class="ranking__mainScore">
        <div class="ranking_mainScoreTitle">
          <h1>Score</h1>
        </div>
        <div class="ranking_mainScoreValue">
          <ul>
          ${this.players.map((player) => html`<li>${player.score}</li>`)}
          </ul>
        </div>
      </div>
      <div class="ranking__mainAttempts">
        <div class="ranking_mainAttemptsTitle">
          <h1>Attempts</h1>
        </div>
        <div class="ranking_mainAttemptsValue">
          <ul>
          ${this.players.map((player) => html`<li>${player.attempts}</li>`)}
          </ul>
        </div>
      </div>
    </div>
    <div class="ranking__footer">
      <div class="ranking__footerLogout">
        <h1 @click=${this.handleLoggout}>Logout</h1>
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
window.customElements.define('ranking-component', RankingComponent);
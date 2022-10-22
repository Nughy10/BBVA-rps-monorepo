import { html, css, LitElement } from 'lit';

export class GameComponent extends LitElement {
  static get properties() {
    return {
      loggedUser: {
        type: Object,
      },
      choices: {
        type: Array,
      }, 
      playerChoice: {
        type: String,
      },
      botChoice: {
        type: Object,
      },
      result: {
        type: String, 
      },
    };
  }

  constructor() {
    super();
    this.loggedUser = {};
    this.choices = [
      {
        name: 'Rock',
        win: ['Scissors','Lizard'],
      }, 
      {
        name: 'Paper',
        win: ['Rock','Spock'],
      },
      {
        name: 'Scissors',
        win: ['Paper','Lizard'],
      },
      {
        name: 'Lizard',
        win: ['Spock','Paper'],
      },
      {
        name: 'Spock',
        win: ['Scissors','Rock'],
      },
    ];
    this.playerChoice = "";
    this.botChoice = {};
    this.result = '';
  }


  handleRankingPage() {
    const customEvent = new CustomEvent('routePath', {detail : {page: "ranking"}});
    this.dispatchEvent(customEvent);
  }

  handleLoggout() {
    const customEvent = new CustomEvent('routePath', {detail : {page: "login", user: {}}});
    this.dispatchEvent(customEvent);
  }

  setGameRules(playerChoice, botChoice) {
    if (playerChoice === botChoice.name) {
      return -1;
    } 
    const checkWin = botChoice.win.includes(playerChoice);
    return checkWin; 
  }

  getBotChoice(){
    const botChoice = this.choices[Math.floor(Math.random() * this.choices.length)];
      return botChoice;
  }

  async validateResult(e){
    this.playerChoice = e.currentTarget.name;
    
    setTimeout(() => {
      this.botChoice = this.getBotChoice();
      const result = this.setGameRules(this.playerChoice, this.botChoice);
      if (result === -1) {
        this.result = "It's a tie!";
        this.loggedUser.attempts++;
      } else if (!result) {
        this.result = "You win!";
        this.loggedUser.attempts++;
        this.loggedUser.score++; 
      } else {
        this.result = "You lose!";
        this.loggedUser.attempts++;
      }
      setTimeout(() => {
        this.result = "";
        this.playerChoice = "";
        this.botChoice = {};
      }, 2000);
      return this.storageScore();
    }, 1500); 
  }

  storageScore(){
    localStorage.setItem(
      "players." + this.loggedUser.name,
      JSON.stringify(this.loggedUser)
    );
  }


  render() {
    return html`
      <div class="game">
        <div class="game__header">
          <div class="game__headerPlayer">
            <h1>Hi ${this.loggedUser.name}!</h1>
          </div>
          <div class="game__headerTitle">
            <h1>Rock, Paper, Scissors, Lizard, Spock</h1>
          </div>
          <div class="game__headerRanking">
            <h1 @click=${this.handleRankingPage}>Ranking</h1>
          </div>
        </div>
        <div class="game__main">
          <div class="game__puntuation">
            <div class="game__puntuationAttempts">
              <h2>Attempts: </h2>
              <p>${this.loggedUser.attempts}</p>
            </div>
            <div class="game__puntuationScore">
              <h2>Score: </h2>
              <p>${this.loggedUser.score}</p>
            </div>
          </div>
          <div class="game__rpslk">
            <div class="game__rpslkR">
              <button @click="${this.validateResult}" name="Rock">Rock</button>
            </div>
            <div class="game__rpslkP">
              <button @click="${this.validateResult}" name="Paper">Paper</button>
            </div>
            <div class="game__rpslkS">
              <button @click="${this.validateResult}" name="Scissors">Scissors</button>
            </div>
            <div class="game__rpslkL">
              <button @click="${this.validateResult}" name="Lizard">Lizard</button>
            </div>
            <div class="game__rpslkK">
              <button @click="${this.validateResult}" name="Spock">Spock</button>
            </div>
          </div>
          <div class="game__resolution">
            <div class="game__resolutionPlayer">
              <h2>${this.loggedUser.name}:</h2>
              <p>${this.playerChoice}</p>
            </div>
            <div class="game__resolutionBot">
              <h2>Bot:</h2>
              <p>${this.botChoice.name}</p>
            </div>
          </div>
          ${this.result.length === 0 ? null : html`<div><h4>${this.result}</h4></div>`}
        </div>
        <div class="game__footer">
          <div class="game__footerLogout">
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
window.customElements.define('game-component', GameComponent);
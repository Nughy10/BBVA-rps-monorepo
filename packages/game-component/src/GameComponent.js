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
        type: Array,
      },
      botChoice: {
        type: Object,
      },
      loading: {
        type: Boolean
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
        url: "https://i.postimg.cc/4d0KbBWp/Rock.png"
      }, 
      {
        name: 'Paper',
        win: ['Rock','Spock'],
        url: "https://i.postimg.cc/c4wmCnJF/Paper.png"
      },
      {
        name: 'Scissors',
        win: ['Paper','Lizard'],
        url: "https://i.postimg.cc/JnXyxjvg/rock-paper-scissors-icon-15.png"
      },
      {
        name: 'Lizard',
        win: ['Spock','Paper'],
        url: "https://i.postimg.cc/02X86bHJ/Lizard.png"
      },
      {
        name: 'Spock',
        win: ['Scissors','Rock'],
        url: "https://i.postimg.cc/MGVxrtZy/Spock.png"
      },
    ];
    this.playerChoice = [];
    this.botChoice = {};
    this.loading = false;
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
    const playersChoiceTarget = e.currentTarget.name;
    this.playerChoice = playersChoiceTarget.split("_");
    this.loading = true;
    
    setTimeout(() => {
      this.botChoice = this.getBotChoice();
      this.loading = false;
      const result = this.setGameRules(this.playerChoice[0], this.botChoice);
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
        this.playerChoice = [];
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
        <div class="gameHeader">
          <div class="gameHeaderPlayer">
            <h1>Hi ${this.loggedUser.name}!</h1>
          </div>
          <div class="gameHeaderRanking">
            <iron-icon @click="${this.handleRankingPage}" icon="icons:grade"></iron-icon>
          </div>
        </div>
        <div class="gameHeaderTitle">
          <img src="https://i.postimg.cc/VsqCx9BK/Titulo-PRSLK.png"></img>
        </div>
        <div class="gameMain">
          <div class="gamePuntuation">
            <div class="gamePuntuationAttempts">
              <h1>Attempts</h1>
              <h3>${this.loggedUser.attempts}</h3>
            </div>
            <div class="gamePuntuationScore">
              <h1>Score</h1>
              <h3>${this.loggedUser.score}</h3>
            </div>
          </div>
          <div class="gameRpslk">
            <div class="gameRpslkR">
              <button @click="${this.validateResult}" name="Rock_https://i.postimg.cc/4d0KbBWp/Rock.png"><img src="https://i.postimg.cc/4d0KbBWp/Rock.png"></img></button>
            </div>
            <div class="gameRpslkP">
              <button @click="${this.validateResult}" name="Paper_https://i.postimg.cc/c4wmCnJF/Paper.png"><img src="https://i.postimg.cc/c4wmCnJF/Paper.png"></img></button>
            </div>
            <div class="gameRpslkS">
              <button @click="${this.validateResult}" name="Scissors_https://i.postimg.cc/JnXyxjvg/rock-paper-scissors-icon-15.png"><img src="https://i.postimg.cc/JnXyxjvg/rock-paper-scissors-icon-15.png"></img></button>
            </div>
            <div class="gameRpslkL">
              <button @click="${this.validateResult}" name="Lizard_https://i.postimg.cc/02X86bHJ/Lizard.png"><img src="https://i.postimg.cc/02X86bHJ/Lizard.png"></img></button>
            </div>
            <div class="gameRpslkK">
              <button @click="${this.validateResult}" name="Spock_https://i.postimg.cc/MGVxrtZy/Spock.png"><img src="https://i.postimg.cc/MGVxrtZy/Spock.png"></img></button>
            </div>
          </div>
          <div class="gameResolution">
            <div class="gameResolutionPlayer">
              <h2>${this.loggedUser.name}:</h2>
              <img src=${this.playerChoice[1]}></img>
            </div>
            <div class="gameResolutionBot">
              <h2>Bot: </h2>
              ${this.loading ? html`<h2 class="gameResolutionBotLoading">. . .</h2>` : null}
              <img src=${this.botChoice.url}></img>
            </div>
          </div>
          ${this.result.length === 0 ? html`<div class="gameResult"></div>` : html`<div class="${this.result.includes("win") ? "gameResultWin" : this.result.includes("lose") ? "gameResultLose" : "gameResultTie"}"><h4>${this.result}</h4></div>`}
        </div>
        <div class="gameFooter">
          <div class="gameFooterLogout">
          <iron-icon @click="${this.handleLoggout}" icon="icons:exit-to-app"></iron-icon>
          </div>
        </div>
      </div>
    `;
  }


  static get styles() {
    return css`
      .game{
      display: flex; 
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: black;
      font-family: Arial, sans-serif;
    }
    .gameHeader{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      width: 100vw;
      margin-top: 1rem; 
    }
    .gameHeaderPlayer{
      color: gray;
    }
    .gameHeaderRanking iron-icon{
      width: 12vw;
      height: 12vh;
      max-width: 60px;
      max-height: 60px;
      color: #f0c14b;
      cursor: pointer;
    }
    .gameHeaderRanking iron-icon:hover{
      color: yellow; 
    }
    .gameHeaderTitle{
      display: flex; 
      justify-content: center;
      align-items: center;
      width: 100vw; 
      height: 30vh;
      padding-bottom: 1rem;
    }
    .gameHeaderTitle img{
      width: 95%;
      max-width: 540px; 
      height: auto;  
    }
    .gameMain{
      display: flex; 
      flex-direction: column; 
      justify-content: space-around;
      align-items: center;
      width: 100vw;
      background-color: #171717;
      padding-bottom: 1rem; 
    }
    .gamePuntuation{
      display: flex; 
      flex-direction: row; 
      justify-content: space-evenly;
      align-items: center;
      width: 100vw;
    }
    .gamePuntuationAttempts{
      display: flex; 
      flex-direction: column; 
      align-items: center;
    }
    .gamePuntuationAttempts h1{
      color: #f0c14b;
      text-decoration: underline;
      font-weight: normal;
    }
    .gamePuntuationAttempts h3{
      color: #f0c14b;
      font-size: 1.4rem;
      margin-top: 0rem;
    }
    .gamePuntuationScore{
      display: flex; 
      flex-direction: column; 
      align-items: center;
    }
    .gamePuntuationScore h1{
      color: rgb(75 240 87);
      text-decoration: underline;
      font-weight: normal;
    }
    .gamePuntuationScore h3{
      color: rgb(75 240 87);
      font-size: 1.4rem;
      margin-top: 0rem;
    }
    .gameRpslk{
      display: flex; 
      flex-direction: row; 
      flex-wrap: wrap; 
      align-items: center; 
      justify-content: center; 
      margin-top: 1rem; 
      margin-bottom: 1rem; 
    }
    .gameRpslkR button{
      background-color: transparent; 
      border: none;
      padding-right: 1rem; 
      padding-left: 1rem; 
      cursor: pointer; 
    }
    .gameRpslkR img{
      width: 20vw;
      max-width: 100px;
      height: auto;
    }
    .gameRpslkP button{
      background-color: transparent;
      border: none;
      padding-right: 1rem; 
      padding-left: 1rem; 
      cursor: pointer; 
    }
    .gameRpslkP img{
      width: 20vw;
      max-width: 100px;
      height: auto;
    }
    .gameRpslkS button{
      background-color: transparent;
      border: none;
      padding-right: 1rem; 
      padding-left: 1rem; 
      cursor: pointer; 
    }
    .gameRpslkS img{
      width: 20vw;
      max-width: 100px;
      height: auto;
    }
    .gameRpslkL button{
      background-color: transparent; 
      border: none;
      padding-right: 1rem; 
      padding-left: 1rem; 
      cursor: pointer; 
    }
    .gameRpslkL img{
      width: 20vw;
      max-width: 100px;
      height: auto;
    }
    .gameRpslkK button{
      background-color: transparent;
      border: none;
      padding-right: 1rem; 
      padding-left: 1rem; 
      cursor: pointer; 
    }
    .gameRpslkK img{
      width: 20vw;
      max-width: 100px;
      height: auto;
    }
    .gameResolution{
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      width: 100vw;
      height: 15vh; 
    }
    .gameResolutionPlayer{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      color: gray;
    }
    .gameResolutionPlayer img{
      width: 15vw;
      max-width: 85px;
      height: auto;
      margin-left: 1rem;
    }
    .gameResolutionBot{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      color: gray;
    }
    .gameResolutionBot img{
      width: 15vw;
      max-width: 85px;
      height: auto;
      margin-left: 1rem;
    }
    .gameResolutionBotLoading {
      margin-left: 1rem;
    }
    .gameResult {
      width: 10px;
      height: 85px;
    }
    .gameResultWin {
      color: rgb(75 240 87);
      font-size: 1.4rem;
    }
    .gameResultTie {
      color: #f0c14b;
      font-size: 1.4rem;
    }
    .gameResultLose {
      color: rgb(240 75 75);
      font-size: 1.4rem;
    }
    .gameFooterLogout{
      margin-top: 2rem; 
      margin-bottom: 2rem;
    }
    .gameFooterLogout iron-icon{
      width: 12vw;
      height: 12vh;
      max-width: 60px;
      max-height: 60px;
      color: rgb(240 75 75);
      cursor: pointer;
    }
    .gameFooterLogout iron-icon:hover{
      color: darkred; 
    }
    `;
  }
}
window.customElements.define('game-component', GameComponent);
import { LitElement, html, css } from 'lit';

import { installRouter } from "pwa-helpers/router.js";

import "register-component";
import "login-component";
import "game-component";
import "ranking-component";

export class BbvaRps extends LitElement {
  static get properties() {
    return {
      page: {
        type: String,
      },
      loggedUser: {
        type: Object,
      }
    };;
  }

  constructor() {
    super()
    this.page = "login";
    this.loggedUser = {};

    installRouter((location) => {
      this.handleRouterPath(location);
    });
  }


  handleRouterPath(location) {
    const path = location.pathname;
    this.page = path === "/" ? "login" : path.slice(1);
  }

  routePath(event) {
    const detail = event.detail;
    console.log(detail)
    window.history.pushState({}, "", detail.page);
    this.handleRouterPath(window.location);
    if(detail.user) {
      this.loggedUser = detail.user;
    }
  }

  routePathApp(data) {
    window.history.pushState({}, "", data.page);
    this.handleRouterPath(window.location);
    if(data.user) {
      this.loggedUser = detail.user;
    }
  }

  _renderActivePage() {
    switch (this.page) {
      case "login": {
        return html`<login-component @routePath="${this.routePath}"></login-component>`;
      }
      case "register": {
        return html`<register-component @routePath="${this.routePath}"></register-component>`;
      }
      case "game": {
        return html`<game-component .loggedUser=${this.loggedUser} @routePath="${this.routePath}"></game-component>`;
      }
      case "ranking": {
        return html`<ranking-component .loggedUser=${this.loggedUser} @routePath="${this.routePath}"></ranking-component>`;
      }
      default: {
        this.routePathApp({page: "login"})
        return html`<login-component @routePath="${this.routePath}"></login-component>`;
      }
    }
  }


  render() {
    return html`
      ${this._renderActivePage()}
    `;
  }


  static get styles() {
    return css`
    `;
  }
}


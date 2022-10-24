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

    //installRouter config as a constructor function
    installRouter((location) => {
      this.handleRouterPath(location);
    });
  }

  //Routes Path config for page switching
  handleRouterPath(location) {
    const path = location.pathname;
    this.page = path === "/" ? "login" : path.slice(1);
  }

  //Route Path event for all components 
  routePath(event) {
    const detail = event.detail;
    window.history.pushState({}, "", detail.page);
    this.handleRouterPath(window.location);
    if(detail.user) {
      this.loggedUser = detail.user;
    }
  }

  //Route Path event for app
  routePathApp(data) {
    window.history.pushState({}, "", data.page);
    this.handleRouterPath(window.location);
  }

  //Active Page component render 
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


import {html} from 'lit';
import {fixture, expect, elementUpdated} from '@open-wc/testing';

import '../src/bbva-rps.js';

describe('BbvaRps', () => {
    it('renders login onload for the first time', async () => {
        const app = await fixture(html`
          <bbva-rps></bbva-rps>`);
          const login = app.shadowRoot.querySelector("login-component");
          expect(login).to.exist;
    });
    it('renders register when page switch to register', async () => {
        const app = await fixture(html`
          <bbva-rps></bbva-rps>`);
          app.routePathApp({page: "register"});
          await elementUpdated(app);
          const register = app.shadowRoot.querySelector("register-component")
          expect(register).to.exist;
    });
    it('renders game when login with user', async () => {
        const app = await fixture(html`
          <bbva-rps></bbva-rps>`);
          const event = {detail: {page: "game", user: {name: "Pau", attempts: 7, score: 4}}}
          app.routePath(event);
          await elementUpdated(app);
          const game = app.shadowRoot.querySelector("game-component")
          expect(game).to.exist;
    });
    it('renders ranking when page switch to ranking', async () => {
        const app = await fixture(html`
          <bbva-rps></bbva-rps>`);
          const event = {detail: {page: "ranking"}}
          app.routePath(event);
          await elementUpdated(app);
          const ranking = app.shadowRoot.querySelector("ranking-component")
          expect(ranking).to.exist;
    });
    it('renders login when page switch to default case', async () => {
        const app = await fixture(html`
          <bbva-rps></bbva-rps>`);
          const event = {detail: {page: "error"}}
          app.routePath(event);
          await elementUpdated(app);
          const login = app.shadowRoot.querySelector("login-component")
          expect(login).to.exist;
    });
});
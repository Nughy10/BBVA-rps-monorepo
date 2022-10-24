import {html} from 'lit';
import {fixture, expect, elementUpdated} from '@open-wc/testing';

import '../src/LoginComponent.js';

describe('LoginComponent', () => {
    it('login player successfully if the name is correct', async () => {
        const login = await fixture(html`
          <login-component></login-component>`);
          localStorage.setItem('players.Pau', JSON.stringify({name: 'Pau', attempts: 10, score: 7}));
          login.shadowRoot.querySelector('#nameLogin').value = "Pau";
          login.handleLogin();
    });
    it('non login player if the name doesnt exist', async () => {
        const login = await fixture(html`
          <login-component></login-component>`);
          login.shadowRoot.querySelector('#nameLogin').value = "Leo";
          login.handleLogin();
    });
    it('non login player if the field is empty', async () => {
        const login = await fixture(html`
          <login-component></login-component>`);
          login.shadowRoot.querySelector('#nameLogin').value = "";
          login.handleLogin();
    });
    it('render register when page switcht to register', async () => {
        const login = await fixture(html`
          <login-component></login-component>`);
          login.handleToRegister();
    });
});
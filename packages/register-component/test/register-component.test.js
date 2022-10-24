import {html} from 'lit';
import {fixture, expect, elementUpdated} from '@open-wc/testing';

import '../src/RegisterComponent';

describe('RegisterComponent', () => {
    it('render login when page switch to login', async () => {
        const register = await fixture(html`
          <register-component></register-component>`);
          register.handleToLogin();
    });
    it('register player if the name is correct', async () => {
        const register = await fixture(html`
          <register-component></register-component>`);
          register.shadowRoot.querySelector('#nameRegister').value = "Kiko";
          register.shadowRoot.querySelector('#registerBtn').click()
          register.shadowRoot.querySelector('#registerBtn').click()
    });
    it('non-register player if the name is incorrect', async () => {
        const register = await fixture(html`
          <register-component></register-component>`);
          register.shadowRoot.querySelector('#nameRegister').value = "";
          register.shadowRoot.querySelector('#registerBtn').click()
    });
});
import {html} from 'lit';
import {fixture, expect, elementUpdated} from '@open-wc/testing';

import '../src/RankingComponent.js';

describe('RankingComponent', () => {
    it('Setting localstorage user information', async () => {
        const ranking = await fixture(html`
          <ranking-component></ranking-component>`);
          localStorage.setItem('players.Pau', JSON.stringify({name: 'Pau', attempts: 10, score: 7}));
          localStorage.setItem('players.Rut', JSON.stringify({name: 'Rut', attempts: 8, score: 4}));
          localStorage.setItem('players.Luffy', JSON.stringify({name: 'Luffy', attempts: 39, score: 37}));
    });  
    it('render game when page switch to game', async () => {
        const ranking = await fixture(html`
          <ranking-component></ranking-component>`);
          ranking.handleGamePage();
    });  
    it('render login when page switch to logout', async () => {
        const ranking = await fixture(html`
          <ranking-component></ranking-component>`);
          ranking.handleLoggout();
    }); 

});
import { LANGUAGES_KEYS } from './keys.js';

export class MyKeyboard {

  constructor(textarea, grid, buttons) {

    this.textarea = textarea;
    this.grid = grid;
    this.buttons = buttons;
  }

  init() {
    this.textarea = document.createElement('textarea');
    this.grid = document.createElement('div');
    this.textarea.classList.add('textarea');
    this.textarea.spellcheck = 'true';
    this.textarea.cols = '30';
    this.textarea.rows = '5';
    this.grid.classList.add('grid');
    document.body.append(this.textarea);
    document.body.append(this.grid);
    this.createKeys();
  }

  createKeys(keys = LANGUAGES_KEYS.eng) {

    for (let i = 0; i < 65; i++) {

      this.buttons = document.createElement('button');
      this.buttons.classList.add('buttons');

      if (i === 13 || i === 29 || i === 41 || i === 42) this.buttons.classList.add('span');
      if (i === 59) this.buttons.classList.add('space');

      this.buttons.textContent = keys[i];
      this.buttons.dataset.code = LANGUAGES_KEYS.code[i];
      this.grid.append(this.buttons);

    }

    this.events(this.textarea, this.grid);
  }

  events(textarea, grid) {

    const ALL = document.querySelectorAll('button');
    let caps = 0;
    let changeLang = 0;

    document.body.addEventListener('keydown', (event) => {
      console.log(event.code);
      ALL.forEach(btn => {
        if (event.code === btn.dataset.code) btn.classList.add('active');
      })

      if (event.ctrlKey && event.altKey) {
        changeLang++;
        for (let i = 0; i < 65; i++) {
          ALL[i].textContent = LANGUAGES_KEYS.rus[i];
        }

        if (changeLang >= 2) {
          changeLang = 0;
          for (let i = 0; i < 65; i++) {
            ALL[i].textContent = LANGUAGES_KEYS.eng[i];
          }
        }
      }

      switch (event.key) {
        case 'Shift':
          for (let i = 0; i < 65; i++) { ALL[i].textContent = LANGUAGES_KEYS.shift[i]; }
          break;
        case 'CapsLock':
          caps++;
          ALL.forEach((btn, index) => {
            if (index === 29) btn.classList.toggle('caps-lock');
            if (btn.textContent.length < 2) btn.textContent = btn.textContent.toUpperCase();
          })

          if (caps >= 2) {
            caps = 0;
            ALL.forEach((btn) => {
              if (btn.textContent.length < 2) btn.textContent = btn.textContent.toLowerCase();
            });
          }
      }

    });


    document.body.addEventListener('keyup', function (event) {

      ALL.forEach(btn => {
        if (event.code === btn.dataset.code) btn.classList.remove('active');
      })

      switch (event.key) {
        case 'Shift':
          for (let i = 0; i < 65; i++) { ALL[i].textContent = LANGUAGES_KEYS.eng[i]; }
          break;
        case 'Delete': textarea.value = ''; break;
      }

    });

    grid.addEventListener('mousedown', function (event) {
      if (event.target.classList.contains('buttons')) {
        event.target.classList.add('active');
        if (event.target.textContent.length < 2) {
          textarea.value += event.target.textContent;
        }
        if (event.target.getAttribute('data-code') === 'Backspace') {
          textarea.value = textarea.value.slice(0, -1);
        }
        if (event.target.getAttribute('data-code') === 'Space') {
          textarea.value += ' ';
        }
        if (event.target.getAttribute('data-code') === 'Enter') {
          textarea.value += '\n';
        };
        if (event.target.getAttribute('data-code') === 'Shift') {
          for (let i = 0; i < 65; i++) {
            ALL[i].textContent = LANGUAGES_KEYS.shift[i];
          }
        }
        if (event.target.getAttribute('data-code') === 'Delete') {
          textarea.value = '';
        }
      }
    });

    grid.addEventListener('mouseup', function (event) {
      ALL.forEach(item => {
        item.classList.remove('active');
      });
    })

    grid.addEventListener('click', function (event) {
      if (event.target.getAttribute('data-code') === 'CapsLock') {
        caps++;
        event.metaKey
        ALL.forEach((btn, index) => {
          if (index === 29) btn.classList.toggle('caps-lock');
          if (btn.textContent.length < 2 && !btn.lastElementChild) btn.textContent = btn.textContent.toUpperCase();
        });
        if (caps >= 2) {
          caps = 0;
          ALL.forEach((btn) => {
            if (btn.textContent.length < 2 && !btn.lastElementChild) btn.textContent = btn.textContent.toLowerCase();
          })
        }
      }
      if (event.target.getAttribute('data-code') === 'Shift') {
        for (let i = 0; i < 65; i++) {
          ALL[i].textContent = LANGUAGES_KEYS.eng[i];
        }
      }
    })

  }
}
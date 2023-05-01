import { LANGUAGES_KEYS } from './keys.js';

export class MyKeyboard {

  constructor(textarea, grid, buttons, text1, text2) {

    this.textarea = textarea;
    this.grid = grid;
    this.buttons = buttons;
    this.text1 = text1;
    this.text2 = text2;
  }

  init() {
    this.textarea = document.createElement('textarea');
    this.grid = document.createElement('div');
    this.text1 = document.createElement('p');
    this.text2 = document.createElement('p');
    this.textarea.classList.add('textarea');
    this.textarea.spellcheck = 'true';
    this.textarea.cols = '30';
    this.textarea.rows = '5';
    this.grid.classList.add('grid');
    this.text1.textContent = 'Клавиатура создана в операционной системе Windows';
    this.text2.textContent = 'Для переключения языка комбинация: левыe ctrl + alt'
    document.body.append(this.textarea);
    document.body.append(this.grid);
    document.body.append(this.text1);
    document.body.append(this.text2);
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
      textarea.blur();
      ALL.forEach(btn => {
        if (event.code === btn.dataset.code) btn.classList.add('active');
        if (event.code === btn.dataset.code) {
          if (event.code === 'ShiftLeft') null;
          else if (event.code === 'Tab') textarea.value = textarea.value += '   ';
          else if (event.code === 'Backspace') textarea.value = textarea.value.slice(0, -1);
          else if (event.code === 'CapsLock') null;
          else if (event.code === 'Delete') textarea.value = '';
          else if (event.code === 'Enter') textarea.value += '\n';
          else if (event.code === 'ControlLeft') null;
          else if (event.code === 'OSLeft') null;
          else if (event.code === 'AltLeft') null;
          else if (event.code === 'Space') textarea.value += ' ';
          else if (event.code === 'AltRight') null;
          else if (event.code === 'ControlRight') null;
          else textarea.value += btn.outerText;
        }
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
          if (ALL[0].textContent === '`') {
            for (let i = 0; i < 65; i++) {
              ALL[i].textContent = LANGUAGES_KEYS.shift[i];
            }
          }
          if (ALL[0].textContent === 'ё') {
            for (let i = 0; i < 65; i++) {
              ALL[i].textContent = LANGUAGES_KEYS.shiftRus[i];
            }
          }
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
          if (ALL[0].textContent === '~') {
            for (let i = 0; i < 65; i++) { ALL[i].textContent = LANGUAGES_KEYS.eng[i]; }
          }
          if (ALL[0].textContent === 'Ё') {
            for (let i = 0; i < 65; i++) { ALL[i].textContent = LANGUAGES_KEYS.rus[i]; }
          }
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
        if (event.target.getAttribute('data-code') === 'ShiftLeft') {
          if (ALL[0].textContent === '`') {
            for (let i = 0; i < 65; i++) {
              ALL[i].textContent = LANGUAGES_KEYS.shift[i];
            }
          }
          if (ALL[0].textContent === 'ё') {
            for (let i = 0; i < 65; i++) {
              ALL[i].textContent = LANGUAGES_KEYS.shiftRus[i];
            }
          }
        }
        if (event.target.getAttribute('data-code') === 'Delete') {
          textarea.value = '';
        }
        if (event.target.getAttribute('data-code') === 'Tab') {
          textarea.value += '    ';
        }
      }
    });

    grid.addEventListener('mouseup', function (event) {
      ALL.forEach(item => {
        item.classList.remove('active');
      });

      if (event.target.getAttribute('data-code') === 'ShiftLeft') {
        if (ALL[0].textContent === '~') {
          for (let i = 0; i < 65; i++) {
            ALL[i].textContent = LANGUAGES_KEYS.eng[i];
          }
        }
        if (ALL[0].textContent === 'Ё') {
          for (let i = 0; i < 65; i++) {
            ALL[i].textContent = LANGUAGES_KEYS.rus[i];
          }
        }
      }
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
    })
  }
}
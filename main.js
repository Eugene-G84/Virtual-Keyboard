import { MyKeyboard } from './class.js';

const keybord = new MyKeyboard();
keybord.init();

document.onclick = function () {
  keybord.textarea.focus();
}



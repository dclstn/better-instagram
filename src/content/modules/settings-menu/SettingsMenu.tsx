import React from 'react';
import ReactDOM from 'react-dom';
import ModalButton from './components/Button';
import dom from '../../observers/dom';

const CLOSE_BUTTON_SELECTOR = '[title="Close Chat"]';

let mountedButtonNode: any = null;

class SettingsMenu {
  constructor() {
    this.load();
    dom.on(CLOSE_BUTTON_SELECTOR, this.load);
  }

  load() {
    if (mountedButtonNode != null) {
      ReactDOM.unmountComponentAtNode(mountedButtonNode);
    }

    const contentContainer = document.createElement('div');
    contentContainer.setAttribute('id', 'modalOpenButton');
    const body = document.querySelector('body');
    if (body) body.appendChild(contentContainer);
    mountedButtonNode = contentContainer;

    ReactDOM.render(<ModalButton />, contentContainer);
  }
}

export default new SettingsMenu();

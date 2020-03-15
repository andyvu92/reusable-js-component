class Dialog extends HTMLElement {
  constructor() {
    super();

    this.confirmActionHandle = this.confirmActionHandle.bind(this);
    this.cancelActionHandle = this.cancelActionHandle.bind(this);

    this.addEventListener('click', e => {
      this.toggleDialogHandle();
    });
  }

  confirmActionHandle() {
    this.answer = true;
    this.toggleDialogHandle();
  }

  cancelActionHandle() {
    this.answer = false;
    this.toggleDialogHandle();
  }

  toggleDialogHandle() {
    const hasDialog = document.querySelector('.dialog-overlay');
    if (hasDialog) {
      this.unmountDialog();
    } else {
      this.renderDialog();
    }
  }

  unmountDialog() {
    setTimeout(() => (this.answer = null), 0);
    document.querySelector('.dialog-overlay').remove();
  }

  renderDialog() {
    const body = document.querySelector('body');
    const overlay = document.createElement('div');
    overlay.classList.add('dialog-overlay');
    const dialog = document.createElement('div');
    dialog.classList.add('dialog-modal');
    const message = document.createElement('p');
    const actions = document.createElement('div');
    const confirmAction = document.createElement('button');
    const cancelAction = document.createElement('button');

    message.textContent = this.getAttribute('message');
    confirmAction.textContent = 'Yes';
    confirmAction.onclick = this.confirmActionHandle;
    cancelAction.textContent = 'Cancel';
    cancelAction.onclick = this.cancelActionHandle;

    dialog.appendChild(message);
    actions.appendChild(confirmAction);
    actions.appendChild(cancelAction);
    dialog.appendChild(actions);

    overlay.appendChild(dialog);
    body.appendChild(overlay);
  }
}

customElements.define('dialog-button', Dialog);

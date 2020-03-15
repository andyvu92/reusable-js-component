class DialogEvents extends HTMLElement {
  constructor() {
    super();

    const dialog = new MutationObserver(mutations => {
      this.events();
    });

    dialog.observe(document.querySelector('body'), { childList: true });
  }

  events() {
    const dialogButtons = document.querySelectorAll('dialog-button');
    const eventList = document.createElement('ul');
    eventList.classList.add('dialog-events');
    const eventListItem = document.createElement('li');

    dialogButtons.forEach(dialogButton => {
      if (typeof dialogButton.answer === 'boolean') {
        const msg = `You just clicked ${dialogButton.answer ? '"Yes"' : '"Cancel"'}`;
        eventListItem.textContent = msg;
        eventList.appendChild(eventListItem);
        this.appendChild(eventList);
      }
    });
  }
}

customElements.define('dialog-events', DialogEvents);

function checkForPhoneNumber(mutationRecords) {
  const textMutation = mutationRecords.find(m => m.type === 'characterData');
  if ( !textMutation ) return;

  const phoneNumber = textMutation.target.textContent;
  if ( phoneNumber.match(/^\d+$/) ) {
    const pane = document.querySelector('#pane-side');
    if ( !pane ) return;
    const searchResult = pane.querySelector('[role="listitem"]:not(#new-chat)');
    const newChatEl = document.getElementById('new-chat');
    if ( searchResult ) {
      const waLink = `https://wa.me/${phoneNumber}`;
      if ( !newChatEl ) {
        pane.insertAdjacentHTML('afterbegin', `
        <a
          id="new-chat"
          href="${waLink}"
          title="${waLink}"
          target="_blank"
          rel="noopener noreferrer"
          class="selectable-text copyable-text"
        >${waLink}</a>
      `);
      } else {
        newChatEl.innerHTML = `
          <a
            id="new-chat"
            href="${waLink}"
            title="${waLink}"
            target="_blank"
            rel="noopener noreferrer"
            class="selectable-text copyable-text"
          >${waLink}</a>
        `;
      }
    } else {
      if ( newChatEl ) newChatEl.remove();
    }
  }
}

// millorar aço
setTimeout(() => {
  const observer = new MutationObserver(checkForPhoneNumber);
  const el = document.querySelector('[data-lexical-editor="true"]');
  observer.observe(el, { childList: true, subtree: true, characterData: true });
}, 5000);

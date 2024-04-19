const newChatHtml = (phone) => {
  const waLink = `https://wa.me/${phone}`;
  const imgSrc = chrome.runtime.getURL('avatar.webp');
  return `
<div
  id="new-chat"
  style="display:flex;align-items:center;padding:13px"
>
  <div style="padding:0 15px 0 0">
    <span style="width:49px;height:49px;display:block" data-icon="default-user" class="">
      <img style="max-width:100%" src="${imgSrc}" />
    </span>
  </div>
  <div style="width:100%">
    <a
      href="${waLink}"
      title="${waLink}"
      target="_blank"
      rel="noopener noreferrer"
      class="selectable-text copyable-text"
      style="color:#ff9900"
    >+${phone}</a>
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 20px;
        font-size: 13px;
        line-height: 20px;
        color: var(--secondary);
      "
    >
      <p>New chat</p>
      <p><a href="https://coindrop.to/juanmanavarro" target="_blank">tip</a>
    </div>
  </div>
</div>
`
};

function addNewChat() {
  const newChatEl = document.getElementById('new-chat');
  const searchEl = document.querySelector('[data-lexical-editor="true"]');
  const phoneNumber = searchEl.textContent;

  if ( !phoneNumber && newChatEl ) {
    newChatEl.remove();
  }

  const a = document.querySelector('[aria-rowcount]');
  if ( !a?.attributes['aria-rowcount'].value ) {
    if ( phoneNumber.match(/^\d+$/) ) {
      const side = document.getElementById('side').firstChild;
      if ( !side ) return;

      if ( !newChatEl ) {
        side.insertAdjacentHTML('afterend', newChatHtml(phoneNumber));
      } else {
        newChatEl.outerHTML = newChatHtml(phoneNumber);
      }
    }
  } else {
    if ( newChatEl ) newChatEl.remove();
  }
}

const listItemObserver = new MutationObserver(addNewChat);
const observer = new MutationObserver(() => {
  const listItemEl = document.querySelector('#pane-side');
  if ( listItemEl ) {
    listItemObserver.observe(listItemEl, { childList: true, subtree: true });
  }
});
observer.observe(document.body, { childList: true, subtree: true });

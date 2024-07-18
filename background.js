chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'openWithWhatsApp',
    title: 'Open with WhatsApp Web',
    contexts: ['link'],
    targetUrlPatterns: ['tel:*']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'openWithWhatsApp') {
    const phone = info.linkUrl.replace('tel:', '').replace(/\s/g, '');
    const waLink = `https://web.whatsapp.com/send/?phone=${phone}&text&type=phone_number`
    chrome.tabs.create({ url: waLink });
  }
});

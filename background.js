chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'openWithWhatsAppLink',
    title: 'Open with WhatsApp Web',
    contexts: ['link'],
    targetUrlPatterns: ['tel:*']
  });

  chrome.contextMenus.create({
    id: 'openWithWhatsAppSelection',
    title: 'Open with WhatsApp Web',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'openWithWhatsAppLink') {
    const phone = info.linkUrl.replace('tel:', '').replace(/\s/g, '');
    const waLink = `https://web.whatsapp.com/send/?phone=${phone}&text&type=phone_number`;
    chrome.tabs.create({ url: waLink });
  }

  if (info.menuItemId === 'openWithWhatsAppSelection') {
    const selectedText = info.selectionText.replace(/\s/g, '');
    if (selectedText.match(/^\d+$/)) {
      const waLink = `https://web.whatsapp.com/send/?phone=${selectedText}&text&type=phone_number`;
      chrome.tabs.create({ url: waLink });
    }
  }
});

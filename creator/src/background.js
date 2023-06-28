import color16Url from '@/assets/cesium-16.png';
import color48Url from '@/assets/cesium-48.png';
import color128Url from '@/assets/cesium-128.png';
import browser from 'webextension-polyfill';

const TAB_VIDEOS = {};

browser.runtime.onMessage.addListener(async (message, sender) => {
  const tabId = sender.tab.id;

  if (message.type === 'video') {
    // Store the video src for later (mostly counting)
    const tabVideos = TAB_VIDEOS[tabId] = (TAB_VIDEOS[tabId]) ? TAB_VIDEOS[tabId] : [];
    tabVideos.push(message.src);
    const count = tabVideos.length;

    // Indicate to the user that we found videos.
    await browser.action.setIcon({
      tabId: sender.tab.id,
      path: {
        '16': color16Url,
        '48': color48Url,
        '128': color128Url,
      },
    });
    await browser.action.setBadgeText({
      tabId,
      text: count.toString(),
    });
  }
});

browser.tabs.onRemoved.addListener((tabId) => {
  // Clean up.
  delete videos[tabId];
});

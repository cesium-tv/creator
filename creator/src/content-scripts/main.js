import $ from 'cash-dom';
import browser from 'webextension-polyfill';

function video(el) {
  browser.runtime.sendMessage({
    type: 'video',
    src: $(el).attr('src'),
  });
}

function checkVideo(el) {
  if (el.tagName === 'VIDEO') {
    video(el);
  }
}

function walkTree(el, func=checkVideo) {
  checkVideo(el);
  let node = el.firstChild;
  while (node) {
    walkTree(node, func);
    node = node.nextSibling;    
  }
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    mutation.addedNodes.forEach(walkTree);
  }
});

observer.observe(document.body, {
  attributes: false,
  childList: true,
  subtree: true,
});

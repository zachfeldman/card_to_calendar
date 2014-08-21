chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, {
      command: "generate_link"
    },
    function(msg) {
      console.log("result message:", msg);
    });
});
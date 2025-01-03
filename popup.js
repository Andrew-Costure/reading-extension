document.getElementById("readText").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: readSelectedText,
  });
});

function readSelectedText() {
  const selectedText = window.getSelection().toString();
  if (selectedText) {
    const utterance = new SpeechSynthesisUtterance(selectedText);
    utterance.lang = "en-US"; // Set to American English
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Please select some text to read");
  }
}

window.onload = function () {
  setTimeout(addVoiceRecognition, 1000);
};

function initVoiceRecognition() {
  var voiceRecog = new (webkitSpeechRecognition || SpeechRecognition)();

  //voiceRecog.lang = 'ja-JP';
  voiceRecog.lang = 'en-US';
  voiceRecog.interimResults = true;
  voiceRecog.continuous = true;

  return voiceRecog;
}

function addVoiceRecognition() {
  // Create display element
  var insertDiv = document.createElement("div");
  insertDiv.innerHTML += '<div id="result-div" style="display:none; background:#000; color:#fff; padding:0.25em; font-size:medium; height:5em; overflow:auto; border:1px solid gray;"></div>';
  insertDiv.innerHTML += '<button id="start-button">start</button>';
  insertDiv.innerHTML += '<button id="stop-button">stop</button>';

  // Insert meta area
  var parentNode = document.querySelector('#meta-contents');
  if (!parentNode) {
    setTimeout(addVoiceRecognition, 500);
    return;
  }
  var refNode = parentNode.childNodes[0];
  parentNode.insertBefore(insertDiv, refNode);
  var startButton = document.querySelector('#start-button');
  var stopButton = document.querySelector('#stop-button');
  var resultDiv = document.querySelector('#result-div');

  // Setup voice recognition
  var voiceRecog = initVoiceRecognition();
  var result = '';
  var tmpResult = '';

  voiceRecog.onresult = (event) => {
    // get result
    tmpResult = '';
    for (var i = event.resultIndex, n = event.results.length; i < n; i++) {
      var res = event.results[i];
      var ts = res[0].transcript;
      if (res.isFinal) {
        result += ts + '<span style="color:#f66; font-weight:bold; font-size:large;"> / </span>';
      } else {
        tmpResult += ts;
      }
    }

    // display result and scroll
    resultDiv.innerHTML = result + '<span style="font-weight:bold; text-decoration:underline;">' + tmpResult + '</span>';
    resultDiv.scrollTop = resultDiv.scrollHeight;
  };

  function restart(isForce) {
    isForce && voiceRecog.abort();
    voiceRecog.start();
  }
  voiceRecog.onend = function () { restart(false); };
  voiceRecog.onerror = function () { restart(true); };
  startButton.onclick = function () { resultDiv.style.display = "block"; voiceRecog.start(); };
  stopButton.onclick = function () { voiceRecog.stop(); };
}

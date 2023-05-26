document.addEventListener("DOMContentLoaded", function() {
  var buildUrl = "https://mburlinson.github.io/capitalonecenter18/Build";
  var globalunityinstance = null;
  var loaderUrl = buildUrl + "/COcore18.loader.js";
  var config = {
    dataUrl: buildUrl + "/COcore18.data.unityweb",
    frameworkUrl: buildUrl + "/COcore18.framework.js.unityweb",
    codeUrl: buildUrl + "/COcore18.wasm.unityweb",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "DefaultCompany",
    productName: "Core",
    productVersion: "0.1",
  };

  var container = document.querySelector("#unity-container");
  var canvas = document.querySelector("#unity-canvas");
  var loadingBar = document.querySelector("#unity-loading-bar");
  var progressBarFull = document.querySelector("#unity-progress-bar-full");
  var mobileWarning = document.querySelector("#unity-mobile-warning");

  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    container.className = "unity-mobile";
    config.devicePixelRatio = 1;
    mobileWarning.style.display = "block";
    setTimeout(() => {
      mobileWarning.style.display = "none";
    }, 5000);
  } 

  loadingBar.style.display = "block";

  var script = document.createElement("script");
  script.src = loaderUrl;
  script.onload = () => {
    createUnityInstance(canvas, config, (progress) => {
      progressBarFull.style.width = 100 * progress + "%";
    }).then((unityInstance) => {
      loadingBar.style.display = "none";
      globalunityinstance = unityInstance;
    }).catch((message) => {
      alert(message);
    });
  };
  document.body.appendChild(script);

  var resetButton = document.createElement("button");
  resetButton.id = "reset-view-button";  // Assigning the ID to the button
  resetButton.textContent = "Reset View";
  resetButton.onclick = function() {
    if (globalunityinstance) {
      globalunityinstance.SendMessage('CameraController', 'ResetView');
    }
  };
  document.body.appendChild(resetButton);
});

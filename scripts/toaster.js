import { waitUntilAnimationsFinish } from "./animation.js";

export function initToaster(parent) {
  const toasterElememt = document.createElement("div");

  toasterElememt.classList.add("toaster");
  parent.appendChild(toasterElememt);

  return {
    success(message) {
      showToast(toasterElememt, message, "success");
    },
    error(message) {
      showToast(toasterElememt, message, "error");
    },
  };
}

function showToast(toasterElememt, message, type) {
  const toastElememt = createToast(message, type);
  animateToast(toasterElememt, toastElememt);
}

function createToast(message, type) {
  const toastElememt = document.createElement("div");
  toastElememt.textContent = message;
  toastElememt.classList.add("toast");
  toastElememt.classList.add(`toast--${type}`);

  return toastElememt;
}

function animateToast(toasterElememt, toastElememt) {
  const heightBefore = toasterElememt.offsetHeight;

  toasterElememt.appendChild(toastElememt);

  const heightAfter = toastElememt.offsetHeight;
  const heightDiff = heightBefore - heightAfter;

  const toasterAnimation = toastElememt.animate(
    [
      { transform: `translate(0, ${heightDiff}px)` },
      { transform: "translate(0, 0)" },
    ],
    {
      duration: 150,
      easing: "ease-out",
    }
  );

  toasterAnimation.startTime = document.timeline.currentTime;

  waitUntilAnimationsFinish(toastElememt)
    .then(() => {
      toasterElememt.removeChild(toastElememt);
    })
    .catch((error) => {
      console.error("Finish toast animation promise failed", error);
    });
}

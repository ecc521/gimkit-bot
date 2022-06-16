console.log("ClickIsTrusted: loading contentscript (and here is the debug link).");

function makeModifiersInteger(e) {
  let res = 0;
  if (e.getModifierState("Alt"))
    res += 1;
  if (e.getModifierState("Control"))
    res += 2;
  if (e.getModifierState("Meta"))
    res += 4;
  if (e.getModifierState("Shift"))
    res += 8;
  return res;
}

function convertMouseType(type) {
  if (type.startsWith("mousedown"))
    return "mousePressed";
  if (type.startsWith("mouseup"))
    return "mouseReleased";
  if (type.startsWith("mousemove"))
    return "mouseMoved";
  if (type.startsWith("wheel"))
    return "mouseWheel";
  throw new Error(`The ${type} event cannot be replicated by the ClickIsTrusted extension.`);
}

function convertButton(button) {
  if (button === 0)
    return "left";
  if (button === 1)
    return "middle";
  if (button === 2)
    return "right";
  if (button === 3)
    return "back";
  if (button === 4)
    return "forward";
}

function convertMouseEvent(e) {
  return {
    type: convertMouseType(e.type),
    modifiers: makeModifiersInteger(e),
    buttons: e.buttons,
    button: convertButton(e.button),
    x: e.clientX,
    y: e.clientY,
    deltaX: e.deltaX,
    deltaY: e.deltaY,
    clickCount: 1, // needed to make composed `click` events
    // deltaMode: e.deltaMode, //isn't active in the interface.
    // timeStamp: e.timeStamp //todo include this one??
    // pointerType: "mouse" || "pen" //todo enable this one??
  };
}

function convertTouchType(type) {
  if (type.startsWith("touchstart"))
    return "touchStart";
  if (type.startsWith("touchmove"))
    return "touchMove";
  if (type.startsWith("touchend"))
    return "touchEnd";
  if (type.startsWith("touchcancel"))
    return "touchcancel";
  throw new Error(`The ${type} event cannot be replicated by the ClickIsTrusted extension.`);
}

//todo this is untested and probably doesn't work. see eventToObject.js
function convertTouchPoint(t) {
  return {
    x: t.clientX,
    y: t.clientY,
    radiusX: t.radiusX,
    radiusY: t.radiusY,
    rotationAngle: t.rotationAngle,
    force: t.force,
    id: t.identifier
  };
}

function convertTouchEvent(e) {
  return {
    type: convertTouchType(e.type),
    modifiers: makeModifiersInteger(e),
    touchPoints: e.touches.map(convertTouchPoint),
    // timeStamp: e.timeStamp //todo include this one??
  }
}

function convertKeyType(type) {
  if (type === "keydown-is-trusted")
    return "keyDown";
  if (type === "keyup-is-trusted")
    return "keyUp";
  if (type === "rawkeydown-is-trusted")
    return "rawKeyDown";
  if (type === "char-is-trusted")
    return "char";
  throw new Error(`The ${e.type} event cannot be replicated by the ClickIsTrusted extension.`);
}

function convertKeyEvent(e) {
  return {
    type: convertKeyType(e.type),
    modifiers: makeModifiersInteger(e),
    key: e.key,
    code: e.code,
    location: e.location,
    autoRepeat: e.repeat,

    text: e.text,
    keyIdentifier: e.keyIdentifier,
    unmodifiedText: e.unmodifiedText,
    isKeyPad: e.isKeyPad,
    isSystemKey: e.isSystemKey,
    nativeVirtualKeyCode: e.nativeVirtualKeyCode,
    windowsVirtualKeyCode: e.windowsVirtualKeyCode,

    // timeStamp: e.timeStamp //todo include this one??
  };
}

function convertInputEvent(e) {
  if (!e.type.startsWith("beforeinput"))
    throw new Error(`The ${e.type} event cannot be replicated by the ClickIsTrusted extension.`);
  return {
    type: e.type,
    text: e.data,
    // timeStamp: e.timeStamp //todo include this one??
  };
}

//att 1. calling chrome.runtime cannot be done from inside the event listener. (a different 'this' context?? don't know).
function sendMessage(e) {
  let message;
  if (e instanceof MouseEvent)
    message = convertMouseEvent(e);
  else if (e instanceof TouchEvent)
    message = convertTouchEvent(e);
  else if (e instanceof KeyboardEvent)
    message = convertKeyEvent(e);
  else if (e instanceof InputEvent)
    message = convertInputEvent(e);
  else
    throw new Error("a script has tried to send a bad message: ", e);
  console.log("Passing native event request to background.js: ", message);
  chrome.runtime.sendMessage(message);
}

function manInTheMiddle(event) {
  console.log("received native event request from web page:", event);
  event.stopImmediatePropagation();
  event.preventDefault();
  sendMessage(event);
}

window.addEventListener("mousedown-is-trusted", manInTheMiddle);
window.addEventListener("mousemove-is-trusted", manInTheMiddle);
window.addEventListener("mouseup-is-trusted", manInTheMiddle);
window.addEventListener("wheel-is-trusted", manInTheMiddle);
window.addEventListener("keydown-is-trusted", manInTheMiddle);
window.addEventListener("keyup-is-trusted", manInTheMiddle);
window.addEventListener("rawkeydown-is-trusted", manInTheMiddle);
window.addEventListener("char-is-trusted", manInTheMiddle);
window.addEventListener("beforeinput-is-trusted", manInTheMiddle);
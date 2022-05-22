console.log('hello');

// ADDING ON HOVER EFFECTS TO ELEMENTS
let hoverElements = document.querySelectorAll('.on-hover');

for(let i = 0; i < hoverElements.length; i++) {
  hoverElements[i].setAttribute("onmouseover", "onHover(this)");
  hoverElements[i].setAttribute("onmouseout", "onHoverOut(this)");
}

function onHover(element) {
  element.style.transform = 'scale(1.2)';
}

function onHoverOut(element) {
  element.style.transform = 'scale(1.0)';
}
let elements = [".box2", ".box3", ".box2 > .front", ".box2 > .left", ".box2 > .top", ".box2 > .right", ".box2 > .bottom", ".last-box .rp16 .front", ".last-box .rpo51", ".last-box .rp16 .rpo53", ".last-box .bx.other", ".thirdPage img.five"];
let elemAnime = ["box2Anime", "box3Anime", "box2frontAnime", "box2leftAnime", "box2topAnime", "box2rightAnime", "box2bottomAnime", "rp16frontAnime", "rpo51Anime", "rp16rpo53Anime", "otherAnime", "fiveAnime"];
let elems = [];
let boxDrag = document.querySelector(".right-page .box-entering .rp1");
let boxPos = boxDrag.getBoundingClientRect().top + window.scrollY + boxDrag.clientHeight;
document.querySelector("#dateX").textContent = new Date().getFullYear();

for (let u = 0; u < elemAnime.length; u++) {
  elems.push(document.querySelector(elements[u]));
}

window.addEventListener('load', () => {
  animate();
});

window.addEventListener('scroll', () => {
  if (window.scrollY < 150) {
    boxDrag.style.transform = "rotateX(-15deg) rotateY(45deg) translateY(" + Math.floor(-96 + window.scrollY) + "px) translateZ(5em)";
  }
  if (window.scrollY > 66) {
    logoID.classList.add("logoShade");
  } else {
    logoID.classList.remove("logoShade");
  }
  animate();
});

function inView(elem) {
  var windowHeight = window.innerHeight;
  var scrollY = window.scrollY || window.pageYOffset;
  var scrollPosition = scrollY + windowHeight;
  var elementPosition = elem.getBoundingClientRect().top + scrollY + elem.clientHeight;
  if (scrollY > innerHeight && scrollY > elementPosition && scrollY != 0) {
    return 0;
  } else if (scrollPosition > elementPosition) {
    return 1;
  }
  return false;
}

function animate() {
  for (let i = 0; i < elems.length; i++) {
    if (inView(elems[i]) == 1) {
      elems[i].classList.add(elemAnime[i]);
    } else if (inView(elems[i]) == 0) {
      elems[i].classList.remove(elemAnime[i]);
    }
  }
}
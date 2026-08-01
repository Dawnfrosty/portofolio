/* =========================================================================
   HERO BOOT-SEQUENCE ANIMATION
   Types out a fake terminal "boot log" line by line inside #bootLog.
   Once the log finishes, it reveals the hero heading, tagline, and
   scroll hint (which start hidden via inline style in the HTML).
   ========================================================================= */

// Lines shown one at a time in the boot log, typed character-by-character.
const bootLines = [
  "booting portfolio_os v2.6 ...",
  "loading modules: [about] [skills] [projects] [contact]",
  "checking dependencies ................. OK",
  "connecting to localhost:8080 ........... OK",
  "welcome back."
];

// Elements the animation reads from / reveals when finished.
const logEl   = document.getElementById('bootLog');
const heading = document.getElementById('heroHeading');
const tagline = document.getElementById('heroTagline');
const hint    = document.getElementById('scrollHint');

/**
 * Recursively types out `lines[i]` into `el` one character at a time,
 * then moves on to the next line. Calls `done()` once every line has
 * been typed.
 */
function typeLine(lines, i, el, done){
  if(i >= lines.length){ done(); return; }

  const text = lines[i];
  let charIndex = 0;

  const span = document.createElement('div');
  el.appendChild(span);

  function typeChar(){
    if(charIndex <= text.length){
      span.textContent = text.slice(0, charIndex);
      if(charIndex === text.length){ span.classList.add('ok'); } // finished line glows brighter
      charIndex++;
      setTimeout(typeChar, 12); // typing speed per character (ms)
    } else {
      setTimeout(() => typeLine(lines, i + 1, el, done), 180); // pause before next line
    }
  }

  typeChar();
}

// Kick off the boot animation; reveal hero content once it completes.
typeLine(bootLines, 0, logEl, () => {
  heading.style.visibility = 'visible';
  tagline.style.visibility = 'visible';
  hint.style.visibility = 'visible';
});

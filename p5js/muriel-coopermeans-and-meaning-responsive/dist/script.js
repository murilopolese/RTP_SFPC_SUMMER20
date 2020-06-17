let interval = 0;
window.onload = function() {
  let main = document.querySelector('main')
  clearInterval(interval) // just in case
  setTimeout(function() {
  interval = setInterval(function() {
      let width = Math.random()*40+60;
      let height = Math.random()*40+60;
      let font = (2+parseInt(Math.random()*6)) * (90/21)
      main.style.width = `${width}vw`
      main.style.height = `${height}vh`
      main.style.fontSize = `${font}vh`
    }, 5000)
  }, 2500)
}
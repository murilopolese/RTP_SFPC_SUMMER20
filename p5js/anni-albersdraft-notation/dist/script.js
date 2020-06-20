function isPlainObject(value) {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}
function h (tag, attrs, ...children) {
  const el = document.createElement(tag)
  if (isPlainObject(attrs)) {
    for (let k in attrs) {
      if (typeof attrs[k] === 'function') el.addEventListener(k, attrs[k])
      else el.setAttribute(k, attrs[k])
    }
  } else if (attrs) {
    children = [attrs].concat(children)
  }
  for (let child of children) el.append(child)
  return el
}
function render(query, el) {
  let target = document.querySelector(query)
  target.innerHTML = ''
  if (el instanceof Array) {
    for (e in el) {
      target.appendChild(el[e])
    }
  } else {
    target.appendChild(el)
  }
}

let grid = [] // State
for (let y = 0; y < 12; y++) {
  grid[y] = []
  for (let x = 0; x < 12; x++) {
    grid[y][x] = (x + y) % 2
  }
}
let store = new EventTarget() // Polyfilled for Safari
store.addEventListener('set', function(e) {
  console.log('set', e.detail)
  let { i, j, value } = e.detail
  grid[i][j] = value
  renderPage(grid)
})

function renderPage(grid) {
  render('body', [renderGrid(grid), renderMesh(grid)])
}

function renderGrid(grid) {
  return h(
    'div', { id: 'grid'},
    ...grid.map(renderRow)
  )
}
function renderRow(row, i) {
  return h(
    'div', { class: 'row' },
    ...row.map((cell, j) => renderCell(cell, i, j))
  )
}
function renderCell(cell, i, j) {
  let toggleCell = function() {
    let e = new CustomEvent('set', { detail: { i, j, value: !cell } } )
    store.dispatchEvent(e)
  }
  let a = h('div', { class: 'cell', click: toggleCell }, '')
  if (cell) {
    a.classList.add('over')
  }
  return a
}

function renderIntersection(cell, i, j) {
  let toggleCell = function() {
    let e = new CustomEvent('set', { detail: { i, j, value: !cell } } )
    store.dispatchEvent(e)
  }
  let vLine = h('div', { class: 'v-line' }, '')
  let hLine = h('div', { class: 'h-line' }, '')
  if (cell) {
    hLine.classList.add('over')
  } else {
    vLine.classList.add('over')
  }
  
  return h('div', { class: 'cell', click: toggleCell }, vLine, hLine)
}
function renderMesh(grid) {
  let intersections = []
  for (let i = 0; i < grid.length; i++) {
    let row = grid[i]
    for (let j = 0; j < row.length; j++) {
      let value = grid[i][j]
      intersections.push(
        renderIntersection(value, i, j)
      )
    }
  }
  return h('div', { id: 'mesh' }, ...intersections)
}

window.onload = function() {
  // alert('Click around!')
  renderPage(grid)
}
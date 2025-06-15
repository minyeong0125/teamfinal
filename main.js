// // 매트릭스 배경 애니메이션 및 인터랙션 확장
// const canvas = document.getElementById("matrix");
// const ctx = canvas.getContext("2d");

// let animation;
// let drops = [];
// let columns;
// const fontSize = 14;

// function initializeMatrix() {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;

//   // 0과 1만 사용
//   const letters = "01".split("");

//   columns = Math.floor(canvas.width / fontSize);
//   drops = new Array(columns)
//     .fill(0)
//     .map(() => (Math.random() * canvas.height) / fontSize);

//   if (animation) clearInterval(animation);

//   animation = setInterval(() => {
//     ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     ctx.fillStyle = "#0F0";
//     ctx.font = `${fontSize}px 'Orbitron', sans-serif`;

//     for (let i = 0; i < columns; i++) {
//       const text = letters[Math.floor(Math.random() * letters.length)];
//       const x = i * fontSize;
//       const y = drops[i] * fontSize;
//       ctx.fillText(text, x, y);

//       if (y > canvas.height) {
//         drops[i] = 0;
//       } else {
//         drops[i] += 1;
//       }
//     }
//   }, 33);
// }

// initializeMatrix();
// window.addEventListener("resize", initializeMatrix);

const canvas = document.getElementById('matrix')
const ctx = canvas.getContext('2d')

let animation = null
let drops = []
let columns
const fontSize = 14
const letters = '01'.split('')

function initializeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  columns = Math.floor(canvas.width / fontSize)
  drops = new Array(columns)
    .fill(0)
    .map(() => (Math.random() * canvas.height) / fontSize)
}

function startMatrix() {
  initializeCanvas()

  animation = setInterval(() => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#0F0'
    ctx.font = `${fontSize}px 'Orbitron', sans-serif`

    for (let i = 0; i < columns; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)]
      const x = i * fontSize
      const y = drops[i] * fontSize
      ctx.fillText(text, x, y)

      if (y > canvas.height) {
        drops[i] = 0
      } else {
        drops[i] += 1
      }
    }
  }, 33)
}

function stopMatrix() {
  if (animation) {
    clearInterval(animation)
    animation = null
    ctx.clearRect(0, 0, canvas.width, canvas.height) // 화면 비우기
  }
}

// 버튼에 연결할 함수
function toggleMatrix() {
  if (animation) {
    stopMatrix()
  } else {
    startMatrix()
  }
}

// 창 크기 변경 시 캔버스 재조정
window.addEventListener('resize', () => {
  if (animation) {
    initializeCanvas()
  }
})

// 섹션 등장 애니메이션
function animateSections() {
  const sections = document.querySelectorAll('.section')
  const options = {
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, options)

  sections.forEach((section) => {
    observer.observe(section)
  })
}

window.addEventListener('DOMContentLoaded', animateSections)

// 스크롤 시 Navbar 배경 변경
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar')
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled')
  } else {
    navbar.classList.remove('scrolled')
  }
})

// 메뉴 클릭 시 강조 효과
const navLinks = document.querySelectorAll('.nav-link')
navLinks.forEach((link) => {
  link.addEventListener('click', function () {
    navLinks.forEach((l) => l.classList.remove('active'))
    this.classList.add('active')
  })
})

// 다크 모드 토글
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode')
}

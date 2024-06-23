const text = document.querySelector('.title');
const menus = document.querySelectorAll('.menu');
// const page = document.querySelector('.page');
const titleText = 'Takuya Tsumoto PorTfolio'

// 文字を受け取り、<span>要素を作成する関数
const createSpan = (char) => {
  const span = document.createElement('span');
  span.textContent = char;
  span.style.opacity = '0';
  span.style.whiteSpace = 'pre';
  return span;
}

// titleTextの各文字に対して<span>要素を作成し、#titleに追加
for (let i = 0; i < titleText.length; i++) {
  const span = createSpan(titleText[i]);
  text.append(span);
}

const spans = text.querySelectorAll('span');

// 特定の文字のみを表示
const firstMoveTitle = () => {
  spans.forEach((span, index) => {
    if (index === 0 || index === 7 || index === 18) {
      if (index === 18) {
        index = 14;
      }
      const keyframes = {
        opacity: [0, 1],
        translate: ['0 -20%', 0],
      };
      const options = {
        duration: 1000,
        easing: 'ease',
        delay: index * 100,
        fill: 'forwards',
      };
      span.animate(keyframes, options);
    };
  });
};

// 残りの文字を表示
const secondMoveTitle = () => {
  const keyframes = {
    opacity: [0, 1],
    translate: ['20% 0', 0],
  };
  const options = {
    duration: 1000,
    easing: 'ease',
    fill: 'forwards',
  };
  spans.forEach((span, index) => {
    if (index !== 0 && index !== 7 && index !== 18 ) {
      span.animate(keyframes, options);
    };
  });
  // メニューを表示
  for (let i = 0; i < menus.length; i++) {
    console.log(i);
    menus[i].animate(keyframes, options);
  };
};

// タイトルとメニューを表示
const moveTitleFunctions = [
  firstMoveTitle,
  secondMoveTitle
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const executeFunctions = async () => {
  for (let i = 0; i < moveTitleFunctions.length; i++) {
    moveTitleFunctions[i]();
    await delay(3000);
  }
};

executeFunctions();

const moveCerterColumn = (start, end) => {
  const keyframes = {
    opacity: [start, end],
    translate: ['20%', 0],
  }
  const options = {
    duration: 1000,
    easing: 'ease',
    fill: 'forwards'
  } 
  page.animate(keyframes, options);
}

// ページ遷移
function showPage(pageID) {
  let pages = document.querySelectorAll('.page');
  // moveCerterColumn(1,0);
  
  pages.forEach(function(page) {
    page.classList.remove('active');
  });
  
  
  let activePage = document.getElementById(pageID);
  activePage.classList.add('active');
  // moveCerterColumn(0,1);
}
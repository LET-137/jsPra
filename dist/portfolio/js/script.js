const text = document.querySelector('.title');
const menus = document.querySelectorAll('.menu');
const contentContainer = document.querySelectorAll('.contents-container');
const topPage = document.querySelector('#top');
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

// 遷移時のanimateを定義
const animationText = (startOpa, endOpa, startTran, endTran, element, duration) => {
  const keyframes = {
    opacity: [startOpa, endOpa],
    translate: [`${startTran}`, `${endTran}`],
  }
  const options = {
    duration: duration,
    easing: 'ease',
    fill: 'forwards'
  } 
  element.animate(keyframes, options);
}

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
  const durationlTime = 800
  spans.forEach((span, index) => {
    if (index !== 0 && index !== 7 && index !== 18 ) {
      animationText(0, 1, '20% 0', 0, span, durationlTime);
    };
  });
  // メニューを表示
  for (let i = 0; i < menus.length; i++) {
    animationText(0, 1, '20% 0', 0, menus[i], durationlTime);
  };
  animationText(0, 1, '10% 0', 0, topPage, durationlTime);
};

// 複数の関数を非同期処理で順次実行
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const executeFunctions = async (funcs, time) => {
  for (let i = 0; i < funcs.length; i++) {
    const { func, args = [] } = funcs[i];
    func(...args);
    await delay(time);
  }
};

// タイトルとメニューを表示
const moveTitleFunctions = [
  { func: firstMoveTitle },
  { func: secondMoveTitle },
];
executeFunctions(moveTitleFunctions, 3000);

// 遷移時にactiveクラスを操作
function pageTransition(pageID) {
  let pages = document.querySelectorAll('.page');
  pages.forEach(function(page) {
    page.classList.remove('active');
  });
  let activePage = document.getElementById(pageID);
  activePage.classList.add('active');
  
};

// ページ遷移
function showPage(pageID) {
  const activePage = document.getElementById(`navi-${pageID}`);
  activePage.style.pointerEvents = 'none';
  const durationlTime = 550
  const closePage = () => {
    contentContainer.forEach((content) => {
      animationText(1,0,'0','5%',content, durationlTime);
    });
  };
  const openPage = () => {
    contentContainer.forEach((content) => {
      animationText(0,1,'5%','0',content, durationlTime);
    });
    activePage.style.pointerEvents = 'auto';
  };

  const funcPages = [
    { func: closePage },
    { func: pageTransition, args: [pageID] },
    { func: openPage },
  ];
  executeFunctions(funcPages, 600,pageTransition, pageID);
}
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
    menus[i].animate(keyframes, options);
    console.log('menu')
  };
  topPage.animate(keyframes, options);
};

// タイトルとメニューを表示
const moveTitleFunctions = [
  { func: firstMoveTitle },
  { func: secondMoveTitle },
];

// 非同期で指定した関数を実行
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const executeFunctions = async (funcs, time) => {
  for (let i = 0; i < funcs.length; i++) {
    const { func, args = [] } = funcs[i];
    func(...args);
    await delay(time);
  }
};
executeFunctions(moveTitleFunctions, 3000);

// 遷移時のアニメーション
const moveCerterColumn = (startOpa, endOpa,startDir,endDir, element, duration) => {
  const keyframes = {
    opacity: [startOpa, endOpa],
    translate: [`${startDir}`, `${endDir}`],
  }
  const options = {
    duration: duration,
    easing: 'ease',
    fill: 'forwards'
  } 
  element.animate(keyframes, options);
}

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
  const closePage = () => {
    contentContainer.forEach((content) => {
      moveCerterColumn(1,0,'0','5%',content, 700);
    });
  };
  const openPage = () => {
    contentContainer.forEach((content) => {
      moveCerterColumn(0,1,'5%','0',content, 700);
    });
    activePage.style.pointerEvents = 'auto';
  };

  const funcPages = [
    { func: closePage },
    { func: pageTransition, args: [pageID] },
    { func: openPage },
  ];
  executeFunctions(funcPages, 800,pageTransition, pageID);
}
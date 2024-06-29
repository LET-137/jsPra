
const text = document.querySelector('.title');
const menus = document.querySelectorAll('.menu');
const contentContainer = document.querySelectorAll('.contents-container');
const topPage = document.querySelector('#top');
const arrows = document.querySelectorAll('arrow');
let isArrow = true;
const titleText = 'Takuya Tsumoto PorTfolio'

// 使用デバイスがPCかモバイルか判定
function isMobile() {
  const devise = /Mobi|Andoroid/i.test(navigator.userAgent);
  return devise;
};
isMobile();

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
  animationText(0, 1, '2% 0', 0, topPage, durationlTime);
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
}

// 指定した時間の間、mauseOverをオフにする
function mouseOverOff(element) {
  element.removeEventListener('mouseover');
  // 指定時間後にイベントリスナーを再追加
  setTimeout(() => {
    element.addEventListener('mouseover');
  }, 600);
};

// ページ遷移
function showPage(pageID) {
  isArrow = false;
  const nextPage = document.getElementById(`navi-${pageID}`);
  const arrowId = document.getElementById(`arrow-${pageID}`)
  nextPage.style.pointerEvents = 'none';
  
  const durationlTime = 550
  const closePage = () => {
    contentContainer.forEach((content) => {
      animationText(1,0,'0','2%',content, durationlTime);
      animationText(1,0,'0','40%',arrowId, durationlTime);
    });
  };
  const openPage = () => {
    contentContainer.forEach((content) => {
      animationText(0,1,'2%','0',content, durationlTime);
    });
    nextPage.style.pointerEvents = 'auto';
    isArrow = true;
  };
  
  const funcPages = [
    { func: closePage },
    { func: pageTransition, args: [pageID] },
    { func: openPage },
  ];
  executeFunctions(funcPages, 600,pageTransition, pageID);
}

// mouseoverのarrowIdを取得
function getArrowId(element) {
  const id = element.id.slice(5,element.id.length);
  const arrowId = `arrow-${id}`
  const arrow = document.querySelector(`#${arrowId}`);
  return arrow
};

// メニューにカーソルを合わせた時の動作
// mouseoverでカーソルを表示
menus.forEach((element) => {
  if (!isMobile()) {
    element.addEventListener('mouseover', () => {
      const arrow = getArrowId(element);
      if (isArrow === true) {
        animationText(0,1,0,0,arrow,800);
      };
    });
  };
});
// mouseoutでカーソルを隠す
menus.forEach((element) => {
  if (!isMobile()) {
    element.addEventListener('mouseout', () => {
      const arrow = getArrowId(element);
      if (isArrow === true) {
        animationText(1,0,0,0,arrow,800);
      };
    });
  };
});

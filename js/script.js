const text = document.querySelector('.title');
const titleText = 'Takuya Tsumoto porTfolio'

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
console.log(spans);
const firstMove = () => {
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

const secondMove = () => {
  spans.forEach((span, index) => {
    if (index !== 0 && index !== 7 && index !== 18 ) {
      const keyframes = {
        opacity: [0, 1],
        translate: ['20% 0', 0],
      };
      const options = {
        duration: 1000,
        easing: 'ease',
        fill: 'forwards',
      };
      span.animate(keyframes, options);
    };
  });
};

const moveFunctions = [
  firstMove,
  secondMove
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const executeFunctions = async () => {
  for (let i = 0; i < moveFunctions.length; i++) {
    moveFunctions[i]();
    await delay(3000);
  }
};

executeFunctions();
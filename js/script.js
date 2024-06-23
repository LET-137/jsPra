const text1 = document.querySelector('#text1');
const text2 = document.querySelector('#text2');
const texts = document.querySelector('.texts');
const position = '100%'

const keyframes = {
  backgroundPosition: [`${position} 0`, '0 0'],
};
const options = {
  duration: 300,
  easing: 'ease',
};

const animateText = (element) => {
  element.animate(keyframes, options).finished.then(() => {
    setTimeout(() => {
      element.classList.remove('gradation-bef');
      element.classList.add('gradation-aft');
      element.animate(keyframes, options)
    }, 100);
  });
}

const handleScroll = (textElement) => {
  const textPosition = textElement.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;  
  if (textPosition < windowHeight && textPosition > 0 && !textElement.classList.contains('animated')) {
    animateText(textElement);
    textElement.classList.add('animated');
    window.removeEventListener('scroll', () => handleScroll(textElement));
  }
};

const animation = () => {
  let timeout1, timeout2;

  window.addEventListener('scroll', () => {
    clearTimeout(timeout1);
    timeout1 = setTimeout(() => handleScroll(text1), 100); // 100ms 遅延
  });

  setTimeout(() => {
    window.addEventListener('scroll', () => {
      clearTimeout(timeout2);
      timeout2 = setTimeout(() => handleScroll(text2), 200); // 200ms 遅延
    });
  }, 100);  // 100ms 遅延後にリスナー追加
};

animation();
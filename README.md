# Vue.js 3 Embedded Widget Estafeta

node -v
v21.7.3

npm install
npm run dev

Верстаем статичную верстку в файле src/Dev.vue. После мы накинем туда программинг. Стилистику лучше пиш в src/assets/main.css
Я не уверен по поводу tailwind - боюсь будет конфликтовать с нашей стилитикой. Поэтому давай делать в отрыве, чистую.
Также положил старые файлы main_.css

Инструкция по сборке

- npm run build
- добавить тэг custom element в необходимое сесто на странице: <pds-calculator></pds-calculator>
- подключить скрипт виджета в конце body на странице: <script type="module" src="./pds-calculator/widget.js" defer></script>
- обязательно добавить свойство defer, для того чтобы скрипт был загружен после объявления custom element в разметке.


<div id="pds-calc-container"></div>
<script>!function(){let e=document.createElement("iframe");e.src="https://xn--80apaohbc3aw9e.xn--p1ai/pds-calc-widget/widget.html",e.width="600px",e.height="1000px",e.style.border="none";let t=document.getElementById("pds-calc-container");t?t.appendChild(e):console.error("Container не найден")}();</script>
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
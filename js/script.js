const names = [];
const log = [];
const questions = [
  "最近やらかしたことは？", "寝言で何か言ったことある？", "好きな駄菓子は？",
  "ゾンビが来たらどう逃げる？", "最近笑ったことは？", "好きなギャグは？",
  "実は苦手な食べ物は？", "宝くじが当たったら何する？", "子どもの頃の変な癖は？",
  "無人島に1つだけ持っていくなら？"
];

// ランダム選出ヘルパー
const getRandomItem = array => array[Math.floor(Math.random() * array.length)];

document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("nameInput");
  const addBtn = document.getElementById("addName");
  const nameList = document.getElementById("nameList");
  const startBtn = document.getElementById("start");
  const questionSection = document.getElementById("question");
  const selectedName = document.getElementById("selectedName");
  const selectedQuestion = document.getElementById("selectedQuestion");
  const countdownEl = document.getElementById("countdown");
  const showLogBtn = document.getElementById("showLog");
  const logArea = document.getElementById("logArea");
    // 泡を自動生成
  const bubbleContainer = document.querySelector(".bubble-container");

  function createBubble() {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${3 + Math.random() * 3}s`;
    bubble.style.width = bubble.style.height = `${5 + Math.random() * 10}px`;

    bubbleContainer.appendChild(bubble);

    // 一定時間後に削除
    setTimeout(() => {
      bubble.remove();
    }, 6000);
  }

  // 一定間隔で泡を追加
  setInterval(createBubble, 300);


  // 名前登録処理
  const addName = () => {
    const name = nameInput.value.trim();
    if (!name) return alert("名前を入力してください！");
    names.push(name);
    const li = document.createElement("li");
    li.textContent = name;
    nameList.appendChild(li);
    nameInput.value = "";

      // 紙吹雪生成
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = `${Math.random() * 20 + 40}px`;
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 75%)`;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 1000);
  }

  // 👍マーク表示
  const like = document.createElement("div");
  like.className = "like-icon";
  like.innerText = "👍";
  like.style.left = `${nameInput.getBoundingClientRect().left + 50}px`;
  like.style.top = `${nameInput.getBoundingClientRect().top - 10 + window.scrollY}px`;
  document.body.appendChild(like);
  setTimeout(() => like.remove(), 1200);

  };

  addBtn.addEventListener("click", addName);
  nameInput.addEventListener("keydown", e => e.key === "Enter" && addName());

  // ログ表示処理
  showLogBtn.addEventListener("click", () => {
    logArea.style.display = "block";
    logArea.innerHTML = `
      <h3>今日の思い出</h3>
      <ul>${log.map(item => `<li>${item}</li>`).join("")}</ul>
    `;
  });

  // スタート処理
  startBtn.addEventListener("click", () => {
    if (names.length === 0) {
      alert("名前を登録してください！");
      return;
    }

    const selected = getRandomItem(names);
    const question = getRandomItem(questions);

    // ログ保存＆ボタン表示
    log.push(`${selected} さん：${question}`);
    showLogBtn.style.display = "block";

    // 表示処理
    selectedName.textContent = `${selected} さんに質問です！`;
    selectedQuestion.textContent = question;
    countdownEl.textContent = "";
    questionSection.style.display = "block";

    // スクロール調整（PCのみ実行）
//if (window.innerWidth > 768) {
 // const offset = 15;
  //const rect = questionSection.getBoundingClientRect();
  //const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  //const targetY = rect.top + scrollTop + offset;
  //window.scrollTo({ top: targetY, behavior: 'smooth' });
//}
questionSection.scrollIntoView({ behavior: 'smooth' });

    // 7秒後に5秒カウントダウン開始
    setTimeout(() => {
      let count = 5;
      countdownEl.textContent = count;
      const timer = setInterval(() => {
        count--;
        countdownEl.textContent = count > 0 ? count : "";
        if (count <= 0) clearInterval(timer);
      }, 1000);
    }, 7000);
  });
});

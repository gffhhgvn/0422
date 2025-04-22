document.addEventListener('DOMContentLoaded', () => {
    const iframe = document.getElementById('content-frame');
    const submenuLinks = document.querySelectorAll('.submenu a');
    const menu = document.querySelector('.menu');
    const quizPopup = document.getElementById('quiz-popup');
    let currentQuestionIndex = 0;
    let isQuizActive = false; // 用於判斷是否處於測驗狀態

    // 子選單點擊事件
    submenuLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // 阻止預設行為
            const src = link.getAttribute('data-src'); // 獲取 data-src 屬性
            iframe.src = src; // 設定 iframe 的 src
            iframe.style.display = 'block'; // 顯示 iframe
            currentQuestionIndex = 0; // 重置測驗狀態
            isQuizActive = false; // 離開測驗狀態
            quizPopup.style.display = 'none'; // 隱藏測驗內容
        });
    });

    // 首頁點擊事件
    document.querySelector('.menu li:first-child').addEventListener('click', () => {
        iframe.src = ''; // 清空 iframe 的內容
        iframe.style.display = 'none'; // 隱藏 iframe
        currentQuestionIndex = 0; // 重置測驗狀態
        isQuizActive = false; // 離開測驗狀態
        quizPopup.style.display = 'none'; // 隱藏測驗內容
    });

    // 點擊自我介紹按鈕事件
    document.querySelector('.menu li:nth-child(2)').addEventListener('click', () => {
        const introContent = `
            <html>
            <head>
                <title>自我介紹</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                        margin: 0;
                        background-color: #ffe4e1; /* 與背景一致的淡粉色 */
                    }
                    h1 {
                        color: #03045e;
                    }
                </style>
            </head>
            <body>
                <h1>嗨我是阿吉</h1>
            </body>
            </html>
        `;
        const blob = new Blob([introContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        iframe.src = url; // 將自我介紹內容顯示到 iframe
        iframe.style.display = 'block'; // 顯示 iframe
        currentQuestionIndex = 0; // 重置測驗狀態
        isQuizActive = false; // 離開測驗狀態
        quizPopup.style.display = 'none'; // 隱藏測驗內容
    });

    // 教學影片點擊事件
    document.getElementById('teaching-video').addEventListener('click', () => {
        iframe.src = 'https://cfchen58.synology.me/%E4%BA%92%E5%8B%95%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%88/1132/week1/20250218_105928.mp4';
        iframe.style.display = 'block'; // 顯示 iframe
        currentQuestionIndex = 0; // 重置測驗狀態
        isQuizActive = false; // 離開測驗狀態
        quizPopup.style.display = 'none'; // 隱藏測驗內容
    });

    // 測驗題目
    const quizQuestions = [
        {
            question: "JavaScript 是什麼類型的語言？",
            options: ["靜態語言", "動態語言", "標記語言", "編譯語言"],
            answer: 1
        },
        {
            question: "HTML 的全名是什麼？",
            options: ["HyperText Markup Language", "HyperText Markdown Language", "HyperTransfer Markup Language", "HyperTransfer Markdown Language"],
            answer: 0
        },
        {
            question: "CSS 用於什麼？",
            options: ["結構化數據", "設計網頁樣式", "伺服器端程式", "資料庫管理"],
            answer: 1
        },
        {
            question: "以下哪個是 JavaScript 的正確變數宣告方式？",
            options: ["var x = 10;", "let x == 10;", "const x <- 10;", "int x = 10;"],
            answer: 0
        },
        {
            question: "以下哪個是用於迴圈的關鍵字？",
            options: ["if", "while", "switch", "case"],
            answer: 1
        }
    ];

    // 點擊測驗卷按鈕事件
    document.getElementById('quiz-button').addEventListener('click', () => {
        isQuizActive = true; // 進入測驗狀態
        showQuizQuestion();
        quizPopup.style.display = 'block'; // 顯示測驗內容
        quizPopup.style.height = '400px'; // 設定固定高度
        quizPopup.style.width = '500px'; // 設定固定寬度
        quizPopup.style.overflowY = 'auto'; // 當內容超過高度時顯示滾動條
        quizPopup.style.backgroundColor = 'rgba(0, 0, 0, 0)'; // 透明背景
        quizPopup.style.borderRadius = '10px'; // 圓角
        iframe.style.display = 'none'; // 隱藏 iframe
    });

    function showQuizQuestion() {
        if (!isQuizActive) return; // 如果不在測驗狀態，直接返回

        if (currentQuestionIndex >= quizQuestions.length) {
            const endHTML = `
                <div style="color: white; font-size: 20px; padding: 20px; text-align: center;">
                    <p>測驗結束！感謝您的參與！</p>
                </div>
            `;
            quizPopup.innerHTML = endHTML;
            isQuizActive = false; // 離開測驗狀態
            return;
        }

        const questionData = quizQuestions[currentQuestionIndex];
        const questionHTML = `
            <div style="color: white; font-size: 20px; padding: 20px;">
                <p>${questionData.question}</p>
                ${questionData.options.map((option, index) => `
                    <button class="quiz-option" data-index="${index}" style="margin: 5px; padding: 10px;">${option}</button>
                `).join('')}
                <div id="quiz-feedback" style="margin-top: 20px; color: yellow;"></div>
            </div>
        `;
        quizPopup.innerHTML = questionHTML;

        // 等待內容加載完成後綁定事件
        const buttons = quizPopup.querySelectorAll('.quiz-option');
        const feedback = quizPopup.querySelector('#quiz-feedback');
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                const selectedIndex = parseInt(event.target.getAttribute('data-index'), 10);
                checkAnswer(selectedIndex, feedback);
            });
        });
    }

    function checkAnswer(selectedIndex, feedback) {
        if (!isQuizActive) return; // 如果不在測驗狀態，直接返回

        const questionData = quizQuestions[currentQuestionIndex];

        if (selectedIndex === questionData.answer) {
            feedback.innerHTML = "<p style='color: green;'>回答正確！</p>";
        } else {
            feedback.innerHTML = `<p style='color: red;'>回答錯誤！正確答案是：${questionData.options[questionData.answer]}</p>`;
        }

        currentQuestionIndex++;
        setTimeout(showQuizQuestion, 2000); // 2 秒後顯示下一題
    }

    // 初始化圓
    const circlesContainer = document.getElementById('circles-container');
    const numCircles = 20;
    const circles = [];

    for (let i = 0; i < numCircles; i++) {
        const circle = document.createElement('div');
        const size = Math.random() * 50 + 20; // 圓的大小範圍 20px ~ 70px
        circle.classList.add('circle');
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.backgroundColor = getRandomColor();
        circle.style.left = `${Math.random() * window.innerWidth}px`;
        circle.style.top = `${Math.random() * window.innerHeight}px`;
        circlesContainer.appendChild(circle);
        circles.push({ element: circle, baseSize: size });
    }

    // 隨機顏色生成
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // 監聽滑鼠移動事件
    window.addEventListener('mousemove', (event) => {
        if (event.clientY < 250) {
            // 當滑鼠 Y 軸小於 250 時，顯示選單
            menu.classList.add('show');
        } else {
            // 當滑鼠 Y 軸大於 250 時，隱藏選單
            menu.classList.remove('show');
        }

        const mouseX = event.clientX;
        const screenWidth = window.innerWidth;

        circles.forEach(({ element, baseSize }) => {
            const scaleFactor = mouseX / screenWidth; // 根據滑鼠水平位置計算比例
            const newSize = baseSize * (0.5 + scaleFactor); // 最小 0.5 倍，最大 1.5 倍
            element.style.width = `${newSize}px`;
            element.style.height = `${newSize}px`;
        });
    });
});

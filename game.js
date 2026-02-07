window.onload = function () {

    const board = document.getElementById("game-board");
    const statusText = document.getElementById("status");

    let cards = ["A","A","B","B","C","C","D","D"];
    cards.sort(() => Math.random() - 0.5);

    let flipped = [];
    let matched = [];

    function createBoard() {
        board.innerHTML = "";
        cards.forEach(letter => {
            const card = document.createElement("div");
            card.className = "card";
            card.textContent = "?";
            card.dataset.value = letter;
            card.onclick = () => flipCard(card);
            board.appendChild(card);
        });
    }

    function flipCard(card) {
        if (flipped.length < 2 && !flipped.includes(card) && !matched.includes(card)) {
            card.textContent = card.dataset.value;
            card.classList.add("open");
            flipped.push(card);

            if (flipped.length === 2) {
                setTimeout(checkMatch, 800);
            }
        }
    }

    function checkMatch() {
        const [c1, c2] = flipped;

        if (c1.dataset.value === c2.dataset.value) {
            matched.push(c1, c2);
        } else {
            c1.textContent = "?";
            c2.textContent = "?";
            c1.classList.remove("open");
            c2.classList.remove("open");
        }

        flipped = [];

        if (matched.length === cards.length) {
            statusText.textContent = " You Won the Game!";
        }
    }

    window.restartGame = function () {
        location.reload();
    };

    createBoard();
};

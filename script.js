document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const pauseResumeButton = document.getElementById('pause-resume-button');
    const scoreElement = document.getElementById('score');
    const gridSize = 25;
    const cellSize = 20;
    let snake = [{ x: 5, y: 5 }];
    let direction = 'right';
    let food = generateFood();
    let score = 0;
    let gameInterval;

    function draw() {
        board.innerHTML = '';

        snake.forEach(segment => {
            const snakeElement = document.createElement('div');
            snakeElement.className = 'snake';
            snakeElement.style.left = segment.x * cellSize + 'px';
            snakeElement.style.top = segment.y * cellSize + 'px';
            board.appendChild(snakeElement);
        });

        const foodElement = document.createElement('div');
        foodElement.className = 'food';
        foodElement.style.left = food.x * cellSize + 'px';
        foodElement.style.top = food.y * cellSize + 'px';
        board.appendChild(foodElement);

        scoreElement.textContent = `Score: ${score}`;
    }

  function generateFood() {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
        };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));

    return newFood;
}

    function checkCollision() {
        const head = snake[0];
        if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
            return true; // Wall collision
        }

        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true; // Self collision
            }
        }

        return false;
    }

    function update() {
        const head = { ...snake[0] };

        switch (direction) {
            case 'up':
                head.y -= 1;
                break;
            case 'down':
                head.y += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'right':
                head.x += 1;
                break;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            food = generateFood();
            score += 1;
        } else {
            snake.pop();
        }

        if (checkCollision()) {
            clearInterval(gameInterval);
            alert(`Game over! Your score: ${score}`);
            snake = [{ x: 5, y: 5 }];
            direction = 'right';
            startButton.style.display = 'none';
            restartButton.style.display = 'block';
            pauseResumeButton.style.display = 'none';
            score = 0;
        }

        draw();
    }

    function startGame() {
        startButton.style.display = 'none';
        restartButton.style.display = 'none';
        pauseResumeButton.style.display = 'block';
        gameInterval = setInterval(update, 200);
    }

    function restartGame() {
        
        startButton.style.display = 'none';
        restartButton.style.display = 'none';
        pauseResumeButton.style.display = 'block';
        score = 0;
        gameInterval = setInterval(update, 200);
    }

    function pauseResumeGame() {
        if (gameInterval) {
            clearInterval(gameInterval);
            gameInterval = null;
            pauseResumeButton.textContent = 'Resume Game';
        } else {
            gameInterval = setInterval(update, 200);
            pauseResumeButton.textContent = 'Pause';
        }
    }

    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', restartGame);
    pauseResumeButton.addEventListener('click', pauseResumeGame);

    document.addEventListener('keydown', event => {
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down') direction = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') direction = 'down';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') direction = 'left';
                break;
            case 'ArrowRight':
                if (direction !== 'left') direction = 'right';
                break;
        }
    });
});

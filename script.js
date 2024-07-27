class Coin {
    constructor() {
        this.balance = parseFloat(localStorage.getItem('balance')) || 0.0;
        this.id = Math.floor(Math.random() * 1000000000);
        this.coinContainer = document.getElementById('coin-container');

        document.getElementById("ID-KEY").innerHTML = this.id;

        let globalthis = this;
        this.coinContainer.addEventListener('click', (event) => {
            const plusOne = document.createElement('div');
            plusOne.textContent = '+0.1$';
            plusOne.classList.add('plus');

            const {
                clientX,
                clientY
            } = event;

            plusOne.style.left = `${clientX}px`;
            plusOne.style.top = `${clientY}px`;

            document.body.appendChild(plusOne);

            setTimeout(() => {
                plusOne.style.transform = 'translateY(-30px)';
                plusOne.style.opacity = '0';
            }, 10);

            setTimeout(() => {
                plusOne.remove();
            }, 500);

            globalthis.increaseBalance();
        });

        setTimeout(hideLoadingScreen, 1000);
        document.getElementById('balanceDisplay').innerText = "Balance: $" + this.balance.toFixed(1);

        setInterval(this.checkInstance.bind(this), 125);

        console.warn("Do not put anything here! You will be banned.");
    }

    // Load balance from localStorage
    increaseBalance() {
        this.balance += 0.1;
        document.getElementById('balanceDisplay').innerText = "Balance: $" + this.balance.toFixed(1); // Обновление текста для отображения баланса
        localStorage.setItem('balance', this.balance.toFixed(1));

        // TODO: заменить на отправку на сервер. localStorage - не выход (не безопасно, можно легко изменить через консоль)
    }

    checkInstance() {
        if (document.getElementById("ID-KEY") != null && document.getElementById("ID-KEY") != undefined) {
            if (document.getElementById("ID-KEY").innerHTML != this.id) {
                window.location.reload();
            } else {
                document.getElementById("ID-KEY").innerHTML = this.id;
            }
        } else {
            window.location.reload();
        }
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.opacity = 0;
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        document.getElementById('main').style.display = 'block';
    }, 500); // Увеличиваем время до 3500мс для дополнительного времени загрузки
}

document.querySelector(".active").addEventListener("click", function () {
    document.querySelector("#main").style.display = "block";
    document.querySelector("#tasks").style.display = "none";
    document.querySelector("#store").style.display = "none";
});

document.querySelector(".tasks").addEventListener("click", function () {
    document.querySelector("#main").style.display = "none";
    document.querySelector("#tasks").style.display = "block";
    document.querySelector("#store").style.display = "none";
});

document.querySelector(".store").addEventListener("click", function () {
    document.querySelector("#main").style.display = "none";
    document.querySelector("#tasks").style.display = "none";
    document.querySelector("#store").style.display = "block";
});

function main() {
    new Coin();
    console.log("ScrawCoin instance created!");
}
window.onload = main;
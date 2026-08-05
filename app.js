"use strict";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyTlUUUlBwVocrYvLQp0xQ2mJIIPuHaFgIYe01MS5bhMUSI-KjsgScs7F5KtnZaTT3JdA/exec";

const VALID_PINS = [
  "2001",
  "1122", "1133", "1144", "1155", "1166", "1177", "1188", "1199",
  "2211", "2233", "2244", "2255", "2266", "2277", "2288", "2299",
  "3311", "3322", "3344", "3355", "3366", "3377", "3388", "3399",
  "4411", "4422", "4433", "4455", "4466", "4477", "4488", "4499",
  "5511", "5522", "5533", "5544", "5566", "5577", "5588", "5599",
  "6611", "6622", "6633", "6644", "6655", "6677", "6688", "6699",
  "7711", "7722", "7733", "7744", "7755", "7766", "7788"
];


document.getElementById("tsdForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const worker1 = document.getElementById("worker1").value.trim();
    const pin1 = document.getElementById("pin1").value.trim();
    const worker2 = document.getElementById("worker2").value.trim();
    const pin2 = document.getElementById("pin2").value.trim();
    const issuerPin = document.getElementById("issuerPin").value.trim();

    if (!worker1 || !pin1 || !issuerPin) {
        alert("Заполните обязательные поля: ФИО Рабочего 1, PIN-код 1 и PIN выдавшего!");
        return
    }

    if (!VALID_PINS.includes(pin1)) {
        alert("Неверный PIN-код для Рабочего 1!")
        return
    }

    if (worker2 && !VALID_PINS.includes(pin2)) {
        alert("Неверный PIN-код для Рабочего 2!");
        return;
    }

    if (!VALID_PINS.includes(issuerPin)) {
        alert("Неверный PIN-код Выдавшего!");
        return;
    }

    const formData = {
        datetime: document.getElementById("datetime").value,
        site: document.getElementById("site").value,
        opType: document.getElementById("opType").value,
        tsdSubmitted: document.getElementById("tsdSubmitted").value,
        reason: document.getElementById("reason").value,
        tsdIssued: document.getElementById("tsdIssued").value,
        worker1: document.getElementById("worker1").value,
        worker2: document.getElementById("worker2").value,
        pin1: document.getElementById("pin1").value,
        pin2: document.getElementById("pin2").value,
        issuerPin: document.getElementById('issuerPin').value
    };

    fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(formData)
    })
    .then(() => {
        alert("Данные отправлены!");
        document.getElementById("tsdForm").reset(); // Исправлена опечатка
    })
    .catch(error => {
        console.error("Ошибка сети:", error);
        alert("Произошла ошибка при отправке данных.");
    });
});

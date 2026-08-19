"use strict";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyTlUUUlBwVocrYvLQp0xQ2mJIIPuHaFgIYe01MS5bhMUSI-KjsgScs7F5KtnZaTT3JdA/exec";


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

    const formData = {
        datetime: document.getElementById("datetime")?.value || "",
        site: document.getElementById("site")?.value || "",
        opType: document.getElementById("opType")?.value || "",
        tsdSubmitted: document.getElementById("tsdSubmitted")?.value || "",
        reason: document.getElementById("reason")?.value || "",
        tsdIssued: document.getElementById("tsdIssued")?.value || "",
        // сondition: document.getElementById("condition")?.value || "",
        worker1: worker1,
        worker2: worker2,
        pin1: pin1,
        pin2: pin2,
        issuerPin: issuerPin
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

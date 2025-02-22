document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("appointment-form");
    const submitButton = document.getElementById("sendBtn");
  
    const botToken = "7953347117:AAG3oqF1wV-UJlEX9vjzOtQlpV1ufpSP-eg";
    const chatId = "1685356708";
  
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Formni yuborishni to'xtatamiz
  
      // 📌 Tugmani blokirovka qilish
      submitButton.disabled = true;
      submitButton.textContent = "Yuborilmoqda...";
  
      // 📌 Formdan ma'lumotlarni olish
      const name = document.getElementById("name").value.trim();
      const surname = document.getElementById("surname").value.trim();
      const messages = document.getElementById("message").value.trim();
  
      if (!name || !surname || !messages ) {
        alert("");
        Toastify({
          text: "Barcha maydonlarni to'ldiring!",
          duration: 3000,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "rgb(255, 0, 0)",
          },
        }).showToast();
        submitButton.disabled = false;
        submitButton.textContent = "/// Uchrashuv ///";
        return;
      }
  
      // 📌 Telegramga yuborish uchun xabarni shakllantiramiz
      const message = `
    📌 Yangi xabar:
    👤 Ism: ${name} ${surname}
    📝 Xabar: ${messages}
        `;
  
      // 📌 Telegram API orqali xabar yuborish
      fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.ok) {
            form.reset(); // Formni tozalash
            Toastify({
              text: "Uchrashuv muvaffaqiyatli yuborildi!",
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: "top", // `top` or `bottom`
              position: "right", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background: "green",
              },
              onClick: function () {}, // Callback after click
            }).showToast();
          } else {
            throw new Error("Telegram bilan muammo yuz berdi!");
          }
        })
        .catch(() => {
          Toastify({
            text: "Xatolik yuz berdi! Qaytadan urinib ko'ring.",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "rgb(255, 0, 0)",
            },
            onClick: function () {}, // Callback after click
          }).showToast();
        })
        .finally(() => {
          // 📌 Tugmani yana faollashtirish
          submitButton.disabled = false;
          submitButton.textContent = "/// Uchrashuv ///";
        });
    });
  });
  
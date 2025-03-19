function closeFormContainer() {
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('overlay_pop-up').style.display = 'none';
}

function openFormContainer() {
    document.getElementById('form-container').style.display = 'flex';
    document.getElementById('overlay_pop-up').style.display = 'block';

    document.getElementById('form-container').innerHTML = `
        <div class="form-header">
            <div class="title-header">
                <span class="login-span">Вход</span>
            </div>
            <a href="#" class="cross-form-close" onclick="closeFormContainer()"></a>
        </div>
        <div class="form-main">
            <form id="auth_form" class="auth_container" method="post">
                <input type="email" class="authEmail" id="authEmail" name="authEmail" 
                placeholder="Адрес электронной почты" required minlength="8" maxlength="70" />

                <input type="password" class="authPassword" id="authPassword" name="authPassword" 
                placeholder="Пароль" required minlength="8" />

                <div class="auth-actions">
                    <button id="authButton" class="authBtnEmail" type="submit">Войти</button>
                    <div class="auth-links">
                        <a href="#" class="auth-number" onclick="openAuthPhone()">Войти по номеру телефона</a>
                        <a href="#" class="remind-password">Забыли пароль?</a>
                        <a href="#" class="register-href" onclick="showRegister()">Зарегистрироваться</a>
                    </div>
                </div>
            </form>
        </div>
        <div class="form-footer"></div>
    `;
    const passwordInput = document.getElementById("authPassword");

    if (!passwordInput) return;

    const errorMessage = document.createElement("div");
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "15px";
    errorMessage.style.marginTop = "5px";
    errorMessage.style.display = "none";
    passwordInput.insertAdjacentElement("afterend", errorMessage);

    passwordInput.addEventListener("input", function () {
        const password = passwordInput.value;

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (!passwordRegex.test(password)) {
            passwordInput.style.border = "2px solid red";
            errorMessage.textContent = "Пароль должен содержать минимум 8 латинских символов, одну заглавную букву, цифру и спецсимвол.";
            errorMessage.style.display = "block";
        } else {
            passwordInput.style.border = "2px solid green";
            errorMessage.style.display = "none";
        }
    });
}

function openAuthPhone() {
    document.getElementById('form-container').innerHTML = `
        <div class="form-header">
            <div class="title-header">
                <span class="login-span">Вход</span>
            </div>
            <a href="#" class="cross-form-close" onclick="closeFormContainer()"></a>
        </div>
        <div class="form-main">
            <form id="auth_form" class="auth_container" method="post">
                <input type="tel" class="authPhone" id="authPhone" name="authPhone" placeholder="+7(___)___-__-__" required maxlength="18" />

                <input type="password" class="authPassword" id="authPassword" name="authPassword" placeholder="Пароль" required minlength="8" />

                <div class="auth-actions">
                    <button id="authButton" class="authBtnPhone" type="submit">Получить код</button>
                    <div class="auth-links">
                        <a href="#" class="auth-email" onclick="openFormContainer()">Войти по адресу электронной почты</a>
                        <a href="#" class="remind-password">Забыли пароль?</a>
                        <a href="#" class="register-href" onclick="showRegister()" >Зарегистрироваться</a>
                    </div>
                </div>
            </form>
        </div>
        <div class="form-footer"></div>
    `;

    const phoneInput = document.getElementById("authPhone");

    if (!phoneInput) return;

    phoneInput.addEventListener("input", function (e) {
        let value = phoneInput.value.replace(/\D/g, ""); // Удаляем все нецифровые символы

        // Разрешаем полностью стереть номер
        if (e.inputType === "deleteContentBackward" && value.length <= 1) {
            phoneInput.value = "+7 (";
            return;
        }

        // Если ввели 8 в начале, заменяем её на 7
        if (value.startsWith("8")) {
            value = "7" + value.slice(1);
        }

        // Форматирование номера
        let formatted = "+7";
        if (value.length > 1) formatted += " (" + value.substring(1, 4);
        if (value.length >= 4) formatted += ") " + value.substring(4, 7);
        if (value.length >= 7) formatted += "-" + value.substring(7, 9);
        if (value.length >= 9) formatted += "-" + value.substring(9, 11);

        phoneInput.value = formatted; // Устанавливаем отформатированное значение

        // Проверяем длину: если номер < 11, подсвечиваем красным
        phoneInput.style.border = value.length === 11 ? "2px solid green" : "2px solid red";
    });

    // Устанавливаем начальное значение
    phoneInput.value = "+7 (";


    const passwordInput = document.getElementById("authPassword");

    if (!passwordInput) return;

    const errorMessage = document.createElement("div");
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "15px";
    errorMessage.style.marginTop = "5px";
    errorMessage.style.display = "none";
    passwordInput.insertAdjacentElement("afterend", errorMessage);

    passwordInput.addEventListener("input", function () {
        const password = passwordInput.value;

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (!passwordRegex.test(password)) {
            passwordInput.style.border = "2px solid red";
            errorMessage.textContent = "Пароль должен содержать минимум 8 латинских символов, одну заглавную букву, цифру и спецсимвол.";
            errorMessage.style.display = "block";
        } else {
            passwordInput.style.border = "2px solid green";
            errorMessage.style.display = "none";
        }
    });
}

function showRegister() {
    document.getElementById('form-container').innerHTML = `
        <h2>Регистрация</h2>
        <input type="text" class="registerName" id="registerName" name="registerName"
        placeholder="Никнейм" required />

        <input type="email" class="registerEmail" id="registerEmail" name="registerEmail" 
        placeholder="E-mail" required minlength="8" maxlength="70" />

        <input type="password" class="registerPassword" id="registerPassword" name="registerPassword" 
        placeholder="Пароль" required minlength="8" />

        <button id="registerButton" type="submit">Зарегистрироваться</button>
        <p>Уже есть аккаунт? <a href="#" onclick="openFormContainer()">Войти</a></p>
    `;

    document.querySelector("#registerName").addEventListener("input", function () {
        this.value = this.value.replace(/[^A-Za-zА-Яа-яЁё]/g, '');
    });
}

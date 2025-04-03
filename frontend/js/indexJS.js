document.addEventListener("DOMContentLoaded", () => {
    if (Cookies.get("accessToken")) {
        document.getElementById("auth-button").style.display = "none";
        document.getElementById("logout-button").style.display = "block";
    }
});

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
                <input type="email" class="authEmail" id="authEmail" name="authEmail" placeholder="Адрес электронной почты" required minlength="8" maxlength="70" />

                <input type="password" class="authPassword" id="authPassword" name="authPassword" placeholder="Пароль" required minlength="8" />

                <div class="auth-actions">
                    <button id="authButton" class="authBtnEmail" type="submit" disabled>Войти</button>
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

    check_email_login_validate();
    check_auth_password();
    login_cookie();
}

function closeFormContainer() {
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('overlay_pop-up').style.display = 'none';
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
                    <button id="authButton" class="authBtnPhone" type="submit" disabled>Войти</button>
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

    check_login_number();
    check_auth_password();
    check_phone_login_validate();
    login_cookie();
}

function showRegister() {
    document.getElementById('form-container').innerHTML = `
        <div class="form-header">
            <div class="title-header">
                <span class="register-span">Регистрация</span>
            </div>
            <a href="#" class="cross-form-close" onclick="closeFormContainer()"></a>
        </div>
        <div class="form-main">
            <form id="register_form" class="register_container" method="post">

                <input type="text" class="registerName" id="registerName" name="registerName" placeholder="Имя" required />

                <input type="text" class="registerSurname" id="registerSurname" name="registerSurname" placeholder="Фамилия" required />

                <input type="tel" class="registerPhone" id="registerPhone" name="registerPhone" placeholder="+7(___)___-__-__" required maxlength="18" />

                <input type="email" class="registerEmail" id="registerEmail" name="registerEmail" placeholder="Адрес электронной почты" required minlength="8" maxlength="70" />

                <input type="password" class="registerPassword" id="registerPassword" name="registerPassword" placeholder="Пароль" required minlength="8" />

                <input type="password" class="registerCheckPassword" id="registerCheckPassword" name="registerCheckPassword" placeholder="Повторить пароль" required minlength="8" />
                
                <div class="auth-actions">
                    <button id="authButton" class="registerBtn" type="submit" disabled>Зарегистрироваться</button>
                    <div class="auth-links">
                        <a href="#" class="auth-number" onclick="openFormContainer()">Войти</a>
                        <a href="#" class="remind-password">Забыли пароль?</a>
                    </div>
                </div>
            </form>
        </div>
        <div class="form-footer">
            <label class="custom-checkbox">
                <input type="checkbox" id="agreeCheckbox" required/>
                <span class="checkmark"></span>
                Даю согласие на обработку&nbsp<a href="../pages/policy.html" class="href_to_personal_data" target="_blank">персональных данных</a>
            </label>
        </div>
    `;

    document.querySelector("#registerName").addEventListener("input", function () {
        this.value = this.value.replace(/[^A-Za-zА-Яа-яЁё]/g, '');
    });

    document.querySelector("#registerSurname").addEventListener("input", function () {
        this.value = this.value.replace(/[^A-Za-zА-Яа-яЁё]/g, '');
    });

    register_to_login();
    check_register_number();
    check_register_password();
    check_register_passwords();
    check_all_register_validate();
}

// Функции валидации
function check_auth_password() {
    const passwordInput = document.getElementById("authPassword");
    passwordInput.value = '';

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

function check_register_password() {
    const passwordInput = document.getElementById("registerPassword");
    passwordInput.value = '';

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

function check_register_number() {
    const phoneInput = document.getElementById("registerPhone");

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
}

function check_login_number() {
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
}

function check_register_passwords() {
    const passwordInput = document.getElementById("registerPassword");
    const confirmPasswordInput = document.getElementById("registerCheckPassword");

    if (!passwordInput || !confirmPasswordInput) return;

    // Создаём div для ошибок
    const passwordError = document.createElement("div");
    const confirmError = document.createElement("div");

    [passwordError, confirmError].forEach(error => {
        error.style.color = "red";
        error.style.fontSize = "15px";
        error.style.marginTop = "5px";
        error.style.display = "none"; // Скрыто по умолчанию
    });

    passwordInput.insertAdjacentElement("afterend", passwordError);
    confirmPasswordInput.insertAdjacentElement("afterend", confirmError);

    function validatePassword() {
        const password = passwordInput.value;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (!passwordRegex.test(password)) {
        } else {
            passwordInput.style.border = "2px solid green";
            passwordError.style.display = "none";
        }
        validateConfirmPassword(); // Проверяем второй input после изменения пароля
    }

    function validateConfirmPassword() {
        if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordInput.style.border = "2px solid red";
            confirmError.textContent = "Пароли не совпадают!";
            confirmError.style.display = "block";
        } else {
            confirmPasswordInput.style.border = "2px solid green";
            confirmError.style.display = "none";
        }
    }

    passwordInput.addEventListener("input", validatePassword);
    confirmPasswordInput.addEventListener("input", validateConfirmPassword);
}

function check_all_register_validate() {
    const fields = [
        document.getElementById("registerName"),
        document.getElementById("registerSurname"),
        document.getElementById("registerPhone"),
        document.getElementById("registerEmail"),
        document.getElementById("registerPassword"),
        document.getElementById("registerCheckPassword")
    ];
    
    const button = document.getElementById("authButton");
    const checkbox = document.getElementById("agreeCheckbox");

    function validateForm() {
        const allFilled = fields.every(field => field.value.trim() !== "");
        const passwordsMatch = document.getElementById("registerPassword").value === document.getElementById("registerCheckPassword").value;
        const checkBoxChecked = checkbox.checked;

        button.disabled = !(allFilled && passwordsMatch && checkBoxChecked);
    }
    fields.forEach(field => field.addEventListener("input", validateForm));
    checkbox.addEventListener("change", validateForm);
}

function check_email_login_validate() {

    const fields = [
        document.getElementById('authEmail'),
        document.getElementById('authPassword')
    ]
    const button = document.getElementById("authButton");

    function validateForm() {
        const allFilled = fields.every(field => field.value.trim() !== "");
        button.disabled = !(allFilled);
    }

    fields.forEach(field => field.addEventListener("input", validateForm));
}

function check_phone_login_validate() {
    const fields = [
        document.getElementById('authPhone'),
        document.getElementById('authPassword')
    ]
    const button = document.getElementById("authButton");

    function validateForm() {
        const allFilled = fields.every(field => field.value.trim() !== "");
        button.disabled = !(allFilled);
    }

    fields.forEach(field => field.addEventListener("input", validateForm));
}

// Работа с куки
function register_to_login() {
    document.getElementById("register_form").addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        
        try {
            const response = await fetch("https://check-j52a.onrender.com/register/", {
                method: "POST",
                body: formData
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert("Регистрация успешна! Теперь войдите в аккаунт.");
                window.location.href = "../index.html";
                openFormContainer();
            } else {
                alert(`Ошибка регистрации: ${data.message || "Попробуйте снова."}`);
            }
        } catch (error) {
            alert("Ошибка сети. Попробуйте снова.");
        }
    });
}

function login_cookie() {
    document.getElementById("auth_form").addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        console.log("Содержимое formData:", Object.fromEntries(formData.entries()));

        const loginUrl = formData.get("authPhone") 
            ? "https://check-j52a.onrender.com/login/phone/" 
            : "https://check-j52a.onrender.com/login/email/";
    
        try {
            const response = await fetch(loginUrl, {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {

                Cookies.set('accessToken', data.access, 
                    { secure: true, sameSite: 'Strict', expires: 1 }); // 1 день
                Cookies.set('refreshToken', data.refresh, 
                    { secure: true, sameSite: 'Strict', expires: 7 }); // 7 дней

                alert("Вход выполнен успешно!");
                window.location.href = "../pages/profile.html";
                
            } else {
                alert(`Ошибка входа: ${data.message || "Неверные данные."}`);
            }
        } catch (error) {
            alert("Ошибка сети. Попробуйте снова.");
        }
    });
}

// Проверка авторизвции на кнопках
function lk_and_cart_check() {
    if (!Cookies.get("accessToken")) {
        alert("Пожалуйтса, войдите в аккаунт");

        document.querySelector(".cookie-required").addEventListener("click", function(event) {
            event.preventDefault();
        });
    }
}

function logout() {
    Cookies.remove("accessToken", { path: "/" });
    Cookies.remove("refreshToken", { path: "/" });

    document.getElementById("auth-button").style.display = "block";
    document.getElementById("logout-button").style.display = "none";

    window.location.href = "../index.html";
}

document.getElementById("logout-button").addEventListener("click", logout);

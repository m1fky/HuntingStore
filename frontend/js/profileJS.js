document.addEventListener("DOMContentLoaded", () => {
    if (Cookies.get("accessToken")) {

        document.getElementById("auth-button").style.display = "none";
        document.getElementById("logout-button").style.display = "block";

        // fetch("https://check-j52a.onrender.com/register/", {
        //     method: "GET",
        //     credentials: "include",
        // })
        // .then(res => res.json())
        // .then(data => {
        //     document.getElementById("registerName").value = data.registerName;
        //     document.getElementById("registerSurname").value = data.registerSurname;
        //     document.getElementById("registerEmail").value = data.registerEmail;
        //     document.getElementById("registerPhone").value = data.registerPhone;
        // });
    } else {
        window.location.href = "../index.html";
    }
});

function showTab(tab) {
    document.querySelectorAll('.container').forEach(div => div.style.display = 'none');
    document.getElementById(tab).style.display = 'block';
    
    document.querySelectorAll('.sidebar ul li').forEach(li => li.classList.remove('active'));
    event.target.classList.add('active');
}

function goToCatalog() {
    window.location.href = "../index.html"; // Замените на актуальную ссылку каталога
}

function logout() {
    Cookies.remove("accessToken", { path: "/" });
    Cookies.remove("refreshToken", { path: "/" });

    // Обновление интерфейса
    document.getElementById("auth-button").style.display = "block";
    document.getElementById("logout-button").style.display = "none";

    window.location.href = "../index.html";
}
document.getElementById("logout-button").addEventListener("click", logout);

function validateInput() {
    let name = document.getElementById("registerName");
    let surname = document.getElementById("registerSurname");
    let email = document.getElementById("registerEmail");
    let phone = document.getElementById("registerPhone");

    let nameError = document.getElementById("nameError");
    let surnameError = document.getElementById("surnameError");
    let emailError = document.getElementById("emailError");
    let phoneError = document.getElementById("phoneError");

    let namePattern = /^[A-Za-zА-Яа-яЁё]+$/;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phonePattern = /^\+?[0-9\s\-()]+$/;

    let isValid = true;

    // Очистка старых ошибок
    nameError.textContent = "";
    surnameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";

    if (!namePattern.test(name.value)) {
        nameError.textContent = "Имя должно содержать только буквы!";
        isValid = false;
    }
    if (!namePattern.test(surname.value)) {
        surnameError.textContent = "Фамилия должна содержать только буквы!";
        isValid = false;
    }
    if (!emailPattern.test(email.value)) {
        emailError.textContent = "Введите корректный email!";
        isValid = false;
    }
    if (!phonePattern.test(phone.value)) {
        phoneError.textContent = "Введите корректный номер телефона!";
        isValid = false;
    }

    return isValid;
}

function saveChanges() {
    if (validateInput()) {
        console.log("Данные успешно сохранены!");
    }
}
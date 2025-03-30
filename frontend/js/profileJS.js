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

function saveChanges() {
    alert("Данные сохранены!");
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
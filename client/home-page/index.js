const addBtn = document.querySelector('.submit-btn');
const loginForm = document.querySelector('#loginForm');

$(document).ready(() => {
    $('.data-recived').hide();
});

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const email = document.forms["loginForm"]["email-login-input"].value;
    const password = document.forms["loginForm"]["password-login-input"].value;
    const loginItem = document.querySelector(".login-item");

    fetch('http://localhost:5000/login/'+ email + '/' + password)
    .then(response => response.json())
    .then(data => {
        if (data['data'].length > 0) {
            loginItem.hidden = true;
            window.location.replace('/client/leads-panel-page/leads_panel.html');
        } else {
            console.log(data);
        }
    })
});

addBtn.onclick = () => {

    const fullName = document.querySelector('#fullname-input').value;
    const email = document.querySelector("#email-input").value;
    const phone = document.querySelector("#phone-number-input").value;
    const city = document.querySelector("#city-input").value;
    const check1 = document.querySelector("#check1-input").checked;
    const check2 = document.querySelector("#check2-input").checked;

    document.querySelector('#fullname-input').value = "";
    document.querySelector("#email-input").value = "";
    document.querySelector("#phone-number-input").value = "";
    document.querySelector("#city-input").value = "";
    document.querySelector("#check1-input").checked = "";
    document.querySelector("#check2-input").checked = "";

    $('.form-container').hide();
    $('.data-recived').show(1000);

    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ 

            fullName : fullName,
            email : email,
            phone : phone,
            city : city,
            check1 : check1,
            check2 : check2,

        })
    })
    .then(response => response.json())
}
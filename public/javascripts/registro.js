// let passwords = document.querySelectorAll('input[type="password"]');
// let messages = document.getElementById("messages");

// let handlePassword = (event) => {
//     passwords[0].value === passwords[1].value?
//         messages.innerText = ''
//         :messages.innerText = "Las contraseñas deben ser iguales";
// } 

// [...passwords].forEach(pass => pass.addEventListener('keyup',handlePassword));

const form = document.getElementById("register")
let messages = document.getElementById("messages")
form.addEventListener('submit', function(ev){
    
    const inputs = form.getElementsByTagName('input');
    
    let fillFields = Object.keys(inputs).every(key => {
        return inputs[key].value !== "";
    })

    if (!fillFields || inputs.acept.checked === false) {
        ev.preventDefault();
        messages.classList.remove('invisible');
        messages.innerText = "Debes rellenar todos los campos";
    }

    if (inputs.passOne.value !== inputs.passTwo.value) {
        ev.preventDefault();
        messages.classList.remove('invisible');
        messages.innerText = "Las contraseñas deben ser iguales";
    }
})

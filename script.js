let getSel = sel => document.querySelector(sel);

const form = document.forms['form'];
const loginUser = form.login;
const passwordUser = form.password;
const emailUser = form.email;
const addUser = form.addUser;
const saveEditBtn = form.saveEditBtn;

let users = [];
let editIndex;

function User(id, login, password, email) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.email = email;
}

render = () => {
    getSel('.tbody').innerHTML = '';
    let tr;
    let td;

    for (const user of users) {
        let editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'edit', 'btn-warning');
        editBtn.textContent = 'Edit';
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'delete', 'btn-danger');
        deleteBtn.textContent = 'Delete';
        td1 = document.createElement('td');
        td2 = document.createElement('td');
        td1.append(editBtn);
        td2.append(deleteBtn);
        tr = document.createElement('tr');
        for (const key in user) {
            td = document.createElement('td');
            td.innerHTML = user[key];
            tr.append(td);
        }
        tr.append(td1);
        tr.append(td2);
        getSel('.tbody').append(tr);

        // delete function

        deleteBtn.onclick = (e) => {
            let index = e.target.parentNode.parentNode.firstChild.textContent;
            users.splice(index - 1, 1);

            // render id function

            let newId = 0;
            users.forEach(user => {
                user.id = ++newId;
            });
            render();
        }

        // edit function

        editBtn.onclick = (e) => {
            editIndex = e.target.parentNode.parentNode.firstChild.textContent-1;
            loginUser.value = users[editIndex].login;
            passwordUser.value = users[editIndex].password;
            emailUser.value = users[editIndex].email;
            addUser.style.display = 'none';
            saveEditBtn.style.display = 'block';
            render();
        }
    }
}


addUser.onclick = function () {
    let loginCurrent = loginUser.value;
    let passwordCurrent = passwordUser.value;
    let emailCurrent = emailUser.value;
    let idCurrent = users.length + 1;
    let user = new User(idCurrent, loginCurrent, passwordCurrent, emailCurrent);
    users.push(user);
    render();
    form.reset();
}

saveEditBtn.onclick = function () {
users[editIndex].login = loginUser.value;
users[editIndex].password = passwordUser.value;
users[editIndex].email = emailUser.value;
    addUser.style.display = 'block';
    saveEditBtn.style.display = 'none';
    render();
    form.reset();
}
var guidelist = document.querySelector('.guides')
var logout_links = document.querySelectorAll('.logged-out')
var login_links = document.querySelectorAll('.logged-in')
var nav_menu = document.querySelector('#nav-mobile')
var account_info = document.querySelector('.account-details')
var adminElements = document.querySelectorAll('.admin')
// console.log(adminElements)

const setupUI = (user) => {
    nav_menu.style.display = 'block'
    if (user) {
        if (user.admin) {
            adminElements.forEach((value, index, array) => {
                value.style.display = 'block'
                console.log("admin recognized")
            })
        } else {
            adminElements.forEach((value, index, array) => {
                value.style.display = 'none'
            })
        }
        login_links.forEach((value, index, array) => {
            value.style.display = 'block'
        })
        logout_links.forEach((value, index, array) => {
            value.style.display = 'none'
        })
        db.collection('users').doc(user.uid).get().then(doc => {
            account_info.innerHTML = `
            <h5>${user.email}</h5><p>${doc.data().bio}</p>
            <small class = "blue-text center-align">${user.admin ? 'ADMIN' : ''}</small>
            `
        })

    } else {
        login_links.forEach((value, index, array) => {
            value.style.display = 'none'
        })
        logout_links.forEach((value, index, array) => {
            value.style.display = 'block'
        })
        adminElements.forEach((value, index, array) => {
            value.style.display = 'none'
        })

        account_info.innerHTML = ``

    }
}

//setup guides
const CG = (data, user) => {

    // var html = ''

    guidelist.innerHTML = ''
    if (data.length && user) {
        data.forEach((doc, index, array) => {
            const guide = doc.data()
            // console.log(doc)
            // console.log(guide)
            const li = `
            <li>
                <div class="collapsible-header grey lighten-4">${guide.title}</div>
                <div class="collapsible-body white">${guide.content}</div>
            </li>
            `
            guidelist.innerHTML += li
            // html += li
        })
    } else if (!data.length && user) {
        guidelist.innerHTML = `
        <h5 class = "center-align">Nothing interesting yet!</h5>
        `
    } else {
        guidelist.innerHTML = `
        <h5 class = "center-align">Login to view guides.</h5>
        `
        // guidelist.innerHTML = html
    }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});
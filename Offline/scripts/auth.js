//admin add function
const admin_form = document.querySelector('.admin-actions')
admin_form.addEventListener('submit', (e) => {
    e.preventDefault()
    const admin_email = document.querySelector('#admin-email').value
    const addAdminRole = functions.httpsCallable('addAdminRole')
    addAdminRole({ email: admin_email }).then(result => {
        console.log(result)
        admin_form.reset()
    })
})


//auth change listen
auth.onAuthStateChanged((user) => {
    if (user) {

        user.getIdTokenResult().then(idToken => {
            // console.log(idToken.claims)
            user.admin = idToken.claims.admin
            setupUI(user)
        })
        db.collection('guides').onSnapshot((snapshot) => {
            CG(snapshot.docs, user)
        }, (e) => {
            CG([], null)
            setupUI()
        })

    }
    else {
        nav_menu.style.display = 'block'
        CG([], user)
        setupUI()
        console.log('logged out')
    }
})


//new guide creation
const create_form = document.querySelector('#create-form')
create_form.addEventListener('submit', e => {
    e.preventDefault()
    db.collection('guides').add({
        title: create_form['title'].value,
        content: create_form['content'].value,
        entrytime: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log('Guide added')
        M.Modal.getInstance(document.querySelector('#modal-create')).close()
        create_form.reset()
    }).catch((e) => {
        console.log('You are not authorized to create guide.\nLogin to add guides.')
        M.Modal.getInstance(document.querySelector('#modal-create')).close()
        create_form.reset()
    })

})


//signup
const signupForm = document.querySelector('#signup-form')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    var username = signupForm['signup-email'].value
    var password = signupForm['signup-password'].value

    //signup user
    auth.createUserWithEmailAndPassword(username, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value
        })
    }).then(() => {
        const modal = document.querySelector('#modal-signup')
        M.Modal.getInstance(modal).close()
        signupForm.reset()
        signupForm.querySelector('.error').textContent = ""
    }).catch(e => {
        signupForm.querySelector('.error').textContent = e.message
    })
})

//logout
const logout = document.querySelector('#logout')
logout.addEventListener('click', e => {
    e.preventDefault()
    auth.signOut().then(() => [
        // console.log('Successfully Logged-Out')
    ])
})

//login
const loginForm = document.querySelector('#login-form')
loginForm.addEventListener('submit', e => {
    e.preventDefault()
    var username = loginForm['login-email'].value
    var password = loginForm['login-password'].value
    auth.signInWithEmailAndPassword(username, password).then((cred) => {
        // console.log('Successfully Logged-In : ' + JSON.stringify(cred))
        const modal = document.querySelector('#modal-login')
        M.Modal.getInstance(modal).close()
        loginForm.reset()
        loginForm.querySelector('.error').innerHTML = ""
    }).catch(e => {
        loginForm.querySelector('.error').innerHTML = e.message
    })
})

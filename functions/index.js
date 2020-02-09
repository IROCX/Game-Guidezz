const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {

    //check admin request
    if (context.auth.token.admin !== true) {
        return { error: 'Admins are allowed to make other users admin.' }
    }

    if (context.auth.token.admin === true) {
        return { error: `The ${data.email} us already an Admin.` }
    }

    //get user and add custom admin claim
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        })
    }).then(() => {
        return {
            message: `Success ${data.email} has been made an admin`
        }
    }).catch(e => {
        return e
    })
})


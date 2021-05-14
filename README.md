# Game-Guidezz
A basic app to demonstrate the integration of firebse DB &amp; authentication to web-app.

## To run on local machine:

1. Clone the directory
3. Setup a firebase project
4. Copy and replace your integration code given at the successful creation of firebase app in `index.html` at line 139-145
5. Open cmd (preferably in project directory) and run following scripts:

  a. `npm install -g firebase-tools`
  
  After completion of above script login using following command
  
  b. `firebase login`
  
  After successful login
  
  c. `firebase init`
  
  Select Firesore and functions. Do not overwrite `functions/index.js` file. Select Y for **install dependencies with npm**
  
  d. `firebase deploy --only functions`
  
6. Below are the sample firestore rules used in this app.

```
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {

        match /users/{userId}{
          allow create: if request.auth.uid != null;
          allow read : if request.auth.uid == userId
        }
    
        match /guides/{guideId} {
          allow read: if request.auth.uid != null;
          allow write: if request.auth.token.admin == true;
        }
      }
    }
```

## Creating your first admin user to be able to make others admin
### Make sure to sign up with a user first to have that user to make admin

For this, I have used a work-around.

Go to functions/index.js and comment-out line 8-14.
```
    if (context.auth.token.admin !== true) {
        return { error: 'Admins are allowed to make other users admin.' }
    }

    if (context.auth.token.admin === true) {
        return { error: `The ${data.email} us already an Admin.` }
    }
```

Then go to scripts/auth.js and add the code from line 7-10 in the global space and replace `admin_email` with your user's email which you have signed up with and wants to make admin.

Now execute command `d` mentioned above.

After this, revert all changes and re-execute command `d` in above

You are good to go with this web-app.

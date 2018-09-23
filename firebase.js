const firebase = require('firebase')
 // Initialize Firebase
 const config = {
    apiKey: "AIzaSyALsgpDOM0qm8UeLBwHbXNCuSzPuZ_tl9A",
    authDomain: "reminderapp-51318.firebaseapp.com",
    databaseURL: "https://reminderapp-51318.firebaseio.com",
    projectId: "reminderapp-51318",
    storageBucket: "reminderapp-51318.appspot.com",
    messagingSenderId: "570569057226"
  };
  firebase.initializeApp(config);

  const database = firebase.database()

//   export default database


// *****************************************************child removed*****************************************************
//   database.ref('remind').on('child_removed', (snapshot) => {
//       console.log(snapshot.key, snapshot.val())
//   })
// ***************************************************** Realtime child removed*****************************************************

// database.ref('remind').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })

// ***************************************************** Realtime child change*****************************************************
// database.ref('remind').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })
// ***************************************************** Realtime child added*****************************************************

//   database.ref('remind').on('child_added', (snapshot) => {
//       console.log(snapshot.key, snapshot.val())
//   })

// *****************************************************Array Fetch*****************************************************
//   database.ref('remind')
//         .once('value')
//         .then((snapshot) => {
//             // console.log(snapshot.val())
//             const reminds = [];

//             snapshot.forEach((childSnapshot) => {
//                 reminds.push({
//                     id: childSnapshot.key,
//                     ...childSnapshot.val()
//                 });
//             });
//             console.log(reminds)
//         });
// *****************************************************Realtime Array Fetch*****************************************************

database.ref('remind').on('value', (snapshot) => {
            const reminds = [];

            snapshot.forEach((childSnapshot) => {
                reminds.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            console.log(reminds)
})

// *****************************************************Realtime Fetch*****************************************************

// const onValueChange  = database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val())
// })

// setTimeout(() => {
//     database.ref('age').set(25)
// }, 3500)

// setTimeout(() => {
//     database.ref().off(onValueChange)
// }, 7000)

// setTimeout(() => {
//     database.ref('age').set(40)
// }, 10500)


// *****************************************************Fetch*****************************************************


// database.ref()
//         .once('value')
//         .then((snapshot) => {
//             const val = snapshot.val()
//             console.log(val)
//         })
//         .catch((e) => {
//             console.log('Error fetching data', e)
//         })


// database.ref('location/city')
//         .once('value')
//         .then((snapshot) => {
//             const val = snapshot.val()
//             console.log(val)
//         })
//         .catch((e) => {
//             console.log('Error fetching data', e)
//         })

// *****************************************************Add*****************************************************

//   database.ref().set({
//       name: 'Teerapat Thong-o',
//       age: 21,
//       isSingle: true,
//       stressLevel: 6,
//       job: {
//         title: 'software developer',
//         company: 'Google'
//       },
//       location: {
//           city: 'Trang',
//           country: 'Thailand'
//       }
//   }).then(() => {
//       console.log('Data is saved')
//   }).catch((e) => {
//       console.log('This failed', e)
//   })

//   database.ref('age').set(22)
//   database.ref('location/city').set('bkk')




//   database.ref('attributes').set({
//       height: 73,
//       weight: 150
//   }).then(() => {
//       console.log('Second set call worked')
//   }).catch((e) => {
//       console.log('Things didn', e)
//   })

// *****************************************************update*****************************************************

// database.ref().update({
//     name:'Mike',
//     age: 29,
//     job: 'Softwate developer',
//     isSingle: null
// })
// database.ref().update({
//     job: 'Manager',
//     'location/city': 'bkk'
// })

// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Pattaya'
// })


// *****************************************************delete*****************************************************
// database.ref('isSingle').set(null)

// database.ref('isSingle')
//   .remove()
//   .then(() => {
//       console.log('Data was removed')
//   }).catch((e) => {
//       console.log('Did not remove data', e)
//   })


// *****************************************************Filter Array*****************************************************

// const notes = [
//     {
//         id: '12',
//         title: 'First Note',
//         body: 'This is my note'
//     },
//     {
//         id: '761ase',
//         title: 'Another',
//         body: 'This is my note'
//     }
// ]



// database.ref('notes').set(notes)

// database.ref('notes').push({
//     title: 'Done',
//     body: 'GGWP'
// })

// database.ref('notes/-LMemJREP0FXE-lLmZZz').update({
//     body: 'Buy food'
// })

// database.ref('notes/-LMemJREP0FXE-lLmZZz').remove();

// database.ref('expenses').push({
//     description: 'Rent',
//     note: '',
//     amount: 109500,
//     createdAt: 976123498763
// })

// database.ref('expenses').push({
//     description: 'Food',
//     note: '',
//     amount: 109,
//     createdAt: 976123498763
// })

// database.ref('expenses').push({
//     description: 'xx',
//     note: '',
//     amount: 120,
//     createdAt: 976123498763
// })
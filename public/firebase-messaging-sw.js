importScripts('https://www.gstatic.com/firebasejs/8.0.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.1/firebase-messaging.js');

const firebaseConfig = {
  apiKey: 'AIzaSyAxehSdjrnCXGLApgiCUW7Geoh7L7opQ84',
  authDomain: 'wt-test-11301.firebaseapp.com',
  databaseURL: 'https://wt-test-11301.firebaseio.com',
  projectId: 'wt-test-11301',
  storageBucket: 'wt-test-11301.appspot.com',
  messagingSenderId: '337469102940',
  appId: '1:337469102940:web:902a1ddee2e251fae67f99',
  measurementId: 'G-VEPSEJNT2H',
};

const fire = firebase.initializeApp(firebaseConfig);
const messaging = fire.messaging();


//! This method just send a message if the user is not in the application window.
messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messagin-sw.js] Received background message ',
    payload
  );
  const title = payload.data.title;
  const data = {
    body: payload.data.body,
    icon: payload.data.icon,
  };
  return self.registration.showNotification(title, data);
});

function register() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(
      process.env.PUBLIC_URL + '/firebase-messagin-sw.js'
    );
  }
}



// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the 'N+1' visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.

// const isLocalhost = Boolean(
//   window.location.hostname === 'localhost' ||
//     // [::1] is the IPv6 localhost address.
//     window.location.hostname === '[::1]' ||
//     // 127.0.0.1/8 is considered localhost for IPv4.
//     window.location.hostname.match(
//       /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
//     )
// );
//
// function register() {
//   if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
//     // The URL constructor is available in all browsers that support SW.
//     const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
//     console.log('This is the publicUrl', publicUrl)
//     if (publicUrl.origin !== window.location.origin) {
//       // Our service worker won't work if PUBLIC_URL is on a different origin
//       // from what our page is served on. This might happen if a CDN is used to
//       // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
//       return;
//     }
//
//     window.addEventListener('load', () => {
//       const swUrl = `${process.env.PUBLIC_URL}/firebase-messaging-sw.js`;
//      console.log('Esta es la ruta sw ->  ', swUrl);
//        if (isLocalhost) {
//          // This is running on localhost. Lets check if a service worker still exists or not.
//          checkValidServiceWorker(swUrl);
//
//          // Add some additional logging to localhost, pointing developers to the
//          // service worker/PWA documentation.
//          navigator.serviceWorker.ready.then(() => {
//            console.log(
//              'This web app is being served cache-first by a service ' +
//                'worker. To learn more, visit https://goo.gl/SC7cgQ'
//            );
//          });
//        } else {
//         // Is not local host. Just register service worker
//         registerValidSW(swUrl);
//       }
//     });
//   }
// }
//
// function registerValidSW(swUrl) {
//   navigator.serviceWorker
//     .register(swUrl)
//     .then(registration => {
//       registration.onupdatefound = () => {
//         console.log('Registration data; ', registration);
//         const installingWorker = registration.installing;
//         installingWorker.onstatechange = () => {
//           if (installingWorker.state === 'installed') {
//             if (navigator.serviceWorker.controller) {
//               //? At this point, the old content will have been purged and
//               //? the fresh content will have been added to the cache.
//               //? It's the perfect time to display a 'New content is
//               //? available; please refresh.' message in your web app.
//               console.log('New content is available; please refresh.');
//             } else {
//               //? At this point, everything has been precached.
//               //? It's the perfect time to display a
//               //? 'Content is cached for offline use.' message.
//               console.log('Content is cached for offline use.');
//             }
//           }
//         };
//       };
//     })
//     .catch(error => {
//       console.error('Error during service worker registration:', error);
//     });
// }
//
// function checkValidServiceWorker(swUrl) {
//   console.log('conectando service worker')
//   // Check if the service worker can be found. If it can't reload the page.
//   fetch(swUrl)
//   .then(response => {
//    console.log('Service worker', response)
//       // Ensure service worker exists, and that we really are getting a TS file.
//       if (
//         response.status === 404 ||
//         response.headers.get('content-type').indexOf('javascript') === -1
//       ) {
//         // No service worker found. Probably a different app. Reload the page.
//         navigator.serviceWorker.ready.then(registration => {
//           registration.unregister().then(() => {
//             window.location.reload();
//           });
//         });
//       } else {
//         // Service worker found. Proceed as normal.
//         registerValidSW(swUrl);
//       }
//     })
//     .catch(() => {
//       console.log(
//         'No internet connection found. App is running in offline mode.'
//       );
//     });
// }
//
// function unregister() {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.ready.then(registration => {
//       registration.unregister();
//     });
//   }
// }
//
//

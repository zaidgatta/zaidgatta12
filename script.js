import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GithubAuthProvider, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
  import {getFirestore, getDocs, doc, collection, addDoc, deleteDoc} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";



  const firebaseConfig = {
    apiKey: "AIzaSyAoNYokMDxiz7dtI1VIygJtotMcs4xQiVE",
    authDomain: "login-page-607de.firebaseapp.com",
    projectId: "login-page-607de",
    storageBucket: "login-page-607de.appspot.com",
    messagingSenderId: "152115418657",
    appId: "1:152115418657:web:7f03d230cc29d186a43560",
    measurementId: "G-6F9HEQJ1EC"
  };


  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const provider = new GoogleAuthProvider(app);
  const providers = new GithubAuthProvider();
  const homeTab = document.getElementById('home-tab')
  const loginForm = document.getElementById('container')
  let uid = ''
  const logoutBtn = document.getElementById('logout')
  const addInfo = document.getElementById('new-task-submit')
  const todoInput = document.getElementById('new-task-input')
  const todosCollectionRef = collection(db, 'test')
  
  

  logoutBtn.addEventListener('click', () => {
      signOut(auth).then(() => {
        alert ("Sign-out successful.")
  }).catch((error) => {
    alert ("An error happened.")
  });
  })


  onAuthStateChanged(auth, user => {
    if (user) {
      uid = user.uid
      loginForm.style.display = 'none'
      homeTab.style.display = 'block'
      getTodos()
    } else {
      console.log('User is logged out')
      loginForm.style.display = 'block'
     homeTab.style.display = 'none'
    }
  })


    

googles.addEventListener('click',(e) => {
    signInWithRedirect(auth, provider);
    getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error?.customData?.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
})


google?.addEventListener('click',(e) => {
    signInWithRedirect(auth, provider);
    getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error?.customData?.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
})

//   logoutBtn?.addEventListener('click', () => {
//     signOut(auth).then(() => alert('User is logged out.'))
//   })
  
  registerForm?.addEventListener('submit', e => {
    e.preventDefault()
    console.log(e)
    const userInfo = {
      fullname: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value
    }
    createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
      .then(userCredential => {
        const user = userCredential.user
        console.log('user->', user)
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('errorMessage->', errorMessage)
      })
  })
  
  loginForm?.addEventListener('submit', e => {
    e.preventDefault()
    console.log(e)
    const userInfo = {
      email: e.target[0].value,
      password: e.target[1].value
    }
    signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
      .then(userCredential => {
        // Signed up
        const user = userCredential.user
        console.log('user logged in->', user)
        // ...
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('errorMessage user not logged in->', errorMessage)
  
        // ..
      })
  })
  
//   blogForm?.addEventListener('submit', async e => {
//     e.preventDefault()
//     const blogInfo = {
//       title: e.target[0].value,
//       description: e.target[1].value,
//       level: e.target[2].value,
//       user: uid
//     }
//     try {
//       const docRef = await addDoc(collection(db, 'blogs'), blogInfo)
//       console.log('Document written with ID: ', docRef.id)
//       alert('Document added')
//     } catch (e) {
//       console.error('Error adding document: ', e)
//     }
//   })

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

addInfo.addEventListener('click', async () => {
  
  try {
      const docAdded = await addDoc(todosCollectionRef, {
          todo: todoInput.value
      });
      todoInput.value = ''
      console.log("Document written with ID: ", docAdded);
  } catch (e) {
      console.error("Error adding document: ", e);
  }
})






async function getTodos(){
  const querySnapshot = await getDocs(todosCollectionRef);
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
  const todoObj = doc.data()
  

	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks");

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const task = input.value;

		const task_el = document.createElement('div');
		task_el.classList.add('task');
		const task_content_el = document.createElement('div');
		task_content_el.classList.add('content');

		task_el.appendChild(task_content_el);

		const task_input_el = document.createElement('input');
		task_input_el.classList.add('text');
		task_input_el.type = 'text';
		task_input_el.value = todoObj.todo;
		task_input_el.setAttribute('readonly', 'readonly');

		task_content_el.appendChild(task_input_el);

		const task_actions_el = document.createElement('div');
		task_actions_el.classList.add('actions');
		
		// const task_edit_el = document.createElement('button');
		// task_edit_el.classList.add('edit');
		// task_edit_el.innerText = 'Edit';

		const task_delete_el = document.createElement('button');
		task_delete_el.classList.add('delete');
		task_delete_el.innerText = 'Delete';

		// task_actions_el.appendChild(task_edit_el);
		task_actions_el.appendChild(task_delete_el);

		task_el.appendChild(task_actions_el);

		list_el.appendChild(task_el);

		input.value = '';

		// task_edit_el.addEventListener('click', (e) => {
		// 	if (task_edit_el.innerText.toLowerCase() == "edit") {
		// 		task_edit_el.innerText = "Save";
		// 		task_input_el.removeAttribute("readonly");
		// 		task_input_el.focus();
		// 	} else {
		// 		task_edit_el.innerText = "Edit";
		// 		task_input_el.setAttribute("readonly", "readonly");
		// 	}
		// });

		task_delete_el.addEventListener('click', async (e) => {
			list_el.removeChild(task_el);
		});
	});
});
}
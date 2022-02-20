import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import "./login.css";

firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}


function Login() {

  const[newUser, setNewUser] = useState(false);

  const[user, setUser] = useState({
    isSignedIn : false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  });

const [ loggedInUser , setLoggedInUser] = useContext(UserContext);
const history = useHistory();
const location = useLocation();
let { from } = location.state || { from: { pathname: "/" } };

//////////////////// Sign in using Google ////////////////////////////
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  const handleSignIn = () =>{

    firebase.auth().signInWithPopup(googleProvider)
    .then(res =>{

      const {displayName, email, photoURL} = res.user;
      const signedInUser = {
        isSignedIn : true,
        name: displayName,
        email: email,
        photo: photoURL
      }

      setUser(signedInUser);

      console.log(displayName, email, photoURL);
    })

   .catch(err =>{
     console.log(err);
     console.log(err.message);
   })

  }



  const handleFbSignIN = () =>{
     
         firebase.auth().signInWithPopup(fbProvider)

     
         .then((result) => {
         var credential = result.credential;
         var user = result.user;
         var accessToken = credential.accessToken;
         console.log(user, accessToken);

        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          console.log(errorCode, errorMessage, email, credential);

        });
  
  
      }



  const handleSignOut = () => {

    const signedOutUser = {
      isSignedIn: false,
      name: '',
      email: '',
      photo: ''
    }

    setUser(signedOutUser);
   
  }
  const handleChange = (event) =>{
          console.log(event.target.name, event.target.value)
          
          let isFormValid = true;
          if (event.target.name === 'email'){
              isFormValid = /\S+@\S+\.\S+/.test(event.target.value)
              
          }

          if(event.target.name === 'password'){
              const isPasswordValid = event.target.value.length > 6;
              const passwordHasNumber = /\d{1}/.test(event.target.value);
              isFormValid = isPasswordValid && passwordHasNumber;
          }

        if(isFormValid){

              const newUserInfo = {...user};
              newUserInfo[event.target.name] = event.target.value;
              setUser(newUserInfo);
        }


  }





  const handleSubmit = (event) =>{
        if( newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res =>{

              const newUserInfo = {...user};
              newUserInfo.error = '';
              newUserInfo.success = true;
              setUser(newUserInfo);
              updateUserName(user.name)
             
              console.log(res)
            })
            
            .catch(error => {
            // Handle Errors here.
            const newUserInfo = {...user};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo);
            
          })
        }

        if(!newUser && user.email && user.password){

            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res =>{
              const newUserInfo = {...user};
              newUserInfo.error = '';
              newUserInfo.success = true;
              setUser(newUserInfo);
              setLoggedInUser(newUserInfo);
              history.replace(from);
              console.log('sign in user info' , res.user);
            })
            .catch(function(error){
              const newUserInfo = {...user};
              newUserInfo.error = error.message;
              newUserInfo.success = false;
              setUser(newUserInfo);
            });
        }

       event.preventDefault();
  }


  const updateUserName = name =>{
        var user = firebase.auth().currentUser;
        user.updateProfile({
        displayName: name
      
      }).then(function() {
        console.log('User updated successfully')
      }).catch(function(error) {
        console.log(error)
      });
  }
    

  return (
    <div className="login" style={{textAlign: 'center', marginTop:"50px" }}>
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> :
        <button onClick={handleSignIn} style={{height: "40px", borderRadius:"10px", cursor:"pointer", width:"160px", backgroundColor:"blue", color:"white", fontSize:"15px",marginTop:"20px"}}>Sign in using google</button>
      }
      <br />
      <button style={{height: "40px", borderRadius:"10px", cursor:"pointer", backgroundColor:"blue", width:"160px", color:"white", fontSize:"15px", marginTop:"10px"}} onClick={handleFbSignIN}>Sign in using facebook</button>

      {

        user.isSignedIn && 
        <div>
               <p> Welcome, {user.displayName}</p>
               <p> Your emal: {user.email}</p>
               
               <img style={{height:'500px', width:'500px'}} src={user.photo} alt=""/>

        </div>

        
      }
               
               <h3 style={{color:"white"}}>Our own authentication</h3>
               {/* <p>Your name: {user.name}</p>
               <p>Your email: {user.email}</p>
               <p>Your password: {user.password}</p> */}

               <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser"/>
               <label style={{color:"white"}} htmlFor="newUser">Are You New Here?</label><br /><br />
               
               <form onSubmit={handleSubmit}>
                    {newUser && <input style={{width:"300px", borderRadius:"5px", height:"40px"}} onBlur={handleChange}  type="text" name="name" id="" placeholder="Your name"/>}
                    <br/><br />
                    <input style={{width:"300px", borderRadius:"5px", height:"40px"}} onBlur={handleChange} name="email" type="text" placeholder='Your email' required/><br/><br />
                    <input style={{width:"300px", borderRadius:"5px", height:"40px"}} onBlur={handleChange} name="password" type="password" placeholder='Your password' required/><br/><br />
                    <input type="submit" style={{height: "40px", borderRadius:"10px", cursor:"pointer", backgroundColor:"blue", width:"160px", color:"white", fontSize:"15px"}} value={newUser ? 'Sign up' : 'Sign in'}/>
               </form>
               <p style={{color:'red'}}>{user.error}</p>
               
                 {
                   user.success && <p style={{color:'green'}}> User { newUser ? 'created' : 'logged in'} successfully</p>
                   
                 }
               
    </div>
  );
}

export default Login;

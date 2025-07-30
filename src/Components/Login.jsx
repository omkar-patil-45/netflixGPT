import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../Utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Utils/firebase";
import { addUser } from "../Utils/userSlice";
import { useDispatch } from "react-redux";
import { BG_URL } from "../Utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const massage = checkValidData(email.current.value, password.current.value);
    setErrorMessage(massage);

    if (massage) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.massage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSigninForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={BG_URL} alt="logo" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "SignIn" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder=" Full Name"
            className="p-4 my-4 w-full bg-gray-800"
          />
        )}
        <input
          ref={email}
          type="text"
          name="email"
          placeholder="Email Addres"
          className="p-4 my-4 w-full bg-gray-800"
        />

        <input
          ref={password}
          type="password"
          name="password"
          placeholder="Password"
          className="p-4 my-4  w-full bg-gray-800"
        />
        <p className="text-red-600 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-green-400 w-full rounded-lg cursor-pointer"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "SignIn" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSigninForm}>
          {isSignInForm
            ? "New to Netflix?  SignUp Now"
            : "Allready registered? Sign In Now... "}
        </p>
      </form>
    </div>
  );
};

export default Login;

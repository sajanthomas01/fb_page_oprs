import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import useScript from 'react-script-hook';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import './App.css';
import { loginWithFacebook, snackBarAlert, getRandomQuote } from "./utils.js";

function Login({ setUserInfo }) {

  // router history
  const history = useHistory();

  // loading script with use script
  const [isSdkLoading, sdkLoadingError] = useScript({
    src: 'https://connect.facebook.net/en_US/sdk.js',
    checkForExisting: true,
  });

  const [isSdkLoaded, setIsSdkLoaded] = React.useState(false);
  const [randomQuote, setRandomQuote] = React.useState('');

  React.useEffect(() => {

    if (!isSdkLoading && !sdkLoadingError) {
      window.FB.init({
        appId: `${process.env.REACT_APP_FB_APP_ID}`,
        cookie: true,
        xfbml: true,
        version: `v${process.env.REACT_APP_GRAPH_VERSION}`,
      });
      // set sdk loaded to true
      setIsSdkLoaded(true);
    }
  }, [isSdkLoading, sdkLoadingError]);

  React.useEffect(() => {
    // just for fun fetching random quote
    async function fetchQuote() {
      setRandomQuote(await getRandomQuote());
      // ...
    }
    fetchQuote();
  }, [])


  // Only works after `FB.init` is called
  async function handleFBLogin(): Promise<void> {

    try {
      const loginResponse = await loginWithFacebook();
      if (loginResponse.status === "connected") {
        snackBarAlert("success", "Login with FB Successful");
        setUserInfo({
          token: loginResponse.authResponse.accessToken,
          userId: loginResponse.authResponse.userID
        });
        history.push("/dashboard");

        // const fbUserInfo = await getMyFbUserInfo();
        // console.log(fbUserInfo);
      }
    } catch (e) {
      //
      console.log(e);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        {isSdkLoaded && (
          <Button
            onClick={handleFBLogin}
            variant="primary">
            Login with FB
          </Button>
        )}

        <div style={{margin: 50}}>
          <p>{randomQuote}</p>
        </div>
      </header>

    </div>
  );
}

export default Login;

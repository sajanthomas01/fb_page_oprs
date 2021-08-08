import { toast } from 'react-toastify';
import axios from "axios";

export function loginWithFacebook() {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    FB.login(
      (res) => {
        if (!res?.authResponse) {
          return reject(res);
        }

        return resolve(res);
      },
      {
        scope: [
          'pages_manage_metadata', // Manage accounts, settings, and webhooks for a Page
          'pages_show_list', // Show a list of the Pages you manage
          'pages_read_engagement' // Read content posted on the Page
        ].join(',')
      }
    );
  });
}

export function getMyFbUserInfo() {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    FB.api('/me', { fields: "name" },
      (res) => {
        if (!res?.name) {
          return reject(res);
        }

        return resolve(res);
      }
    );
  });
}

export function snackBarAlert(type, message) {
  const options = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  switch (type) {
    case "success":
      return toast.success(`🦄 ${message}`, options);

    case "info":
      return toast.info(`🦄 ${message}`, options);

    case "error":
      return toast.error(`🦄 ${message}`, options);

    default:
  }
}

export async function getRandomQuote() {
  try {
    // just for fun
    const res = await await axios.get('https://goquotes-api.herokuapp.com/api/v1/random?count=1');
    console.log(res.data.quotes[0].text);
    return res.data.quotes[0].text;
  } catch (error) {
    return ""
  }
}
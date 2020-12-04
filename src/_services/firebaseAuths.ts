import { FIRE, PROVIDER } from '../_helpers/CONST_REFS';

export const signInWithEmailAndPassword: any = async (
  email: string,
  password: string,
) => {
  const fireRes: any = await FIRE.auth()
    .signInWithEmailAndPassword(email, password)
    .then((res: any) => {
      // console.log(`This is the response from FIREBASE -> ${JSON.stringify(res)}`);
      const user: any = transformData(res);
      return user;
    })
    .catch((err: Error) => {
      console.log(`Something went wrong error_code: ${err}`);
      return err.message;
    });

  if (fireRes && fireRes.id) {
    return { code: 200, data: fireRes };
  } else {
    return { code: 400, data: fireRes };
  }
};

export const signInWithSSOMicrosoft = async () => {
  PROVIDER.setCustomParameters({
    redirect_url: 'http://localhost:8080/',
    prompt: 'consent',
  });

  const response: UserType | Error = await FIRE.auth()
    .signInWithPopup(PROVIDER)
    .then((res: any) => {
      // console.log(`This is the result of microsoft SSO ${JSON.stringify(res.user)}`);
      const user: UserType = transformData(res);
      // console.log(`This is user -> ${JSON.stringify(user)}`);
      return user;
    })
    .catch((error: Error) => {
      return error;
    });

  if (response instanceof Error) {
    console.log('Error: Failure on the request -> ', response.message);
    const newMessage = filterMessage(response.message);
    return { code: 400, data: newMessage };
  } else {
    // console.log('OK: This is the Response -> ', response);
    return { code: 200, data: response };
  }
};

export const createUserWithEmailAndPassowrd = async (
  email: string,
  password: string,
) => {
  const response: UserType | String = await FIRE.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      // console.log('Response -> ', JSON.stringify(res));
      const user: UserType = transformData(res);
      return user;
    })
    .catch((error: Error) => {
      console.error('Error: ', error.message);
      return error.message;
    });

  if (response instanceof String) {
    return { code: 400, data: response };
  } else {
    return { code: 200, data: response };
  }
};

interface UserType {
  id: string | number;
  name: string;
  email: string;
  location?: string;
  businessPhones?: string;
  jobTitle?: string;
  accesToken: string;
  operationType?: string;
}
const transformData = (res: any): UserType => {
  const user: UserType = {
    id: '',
    name: '',
    email: '',
    location: '',
    businessPhones: '',
    jobTitle: '',
    accesToken: '',
    operationType: '',
  };

  if (res.credential) {
    console.log('Loggin with Single Sign On Microsoft. . .');
    const profile = res.additionalUserInfo.profile;
    const token = res.credential.accessToken;
    // console.log(`Este es el access token -> ${token}`);
    // console.log(`Res profile -> ${JSON.stringify(profile)}`);

    user.id = profile.id;
    user.name = profile.displayName;
    user.email = profile.mail;
    user.location = profile.officeLocation;
    user.businessPhones = profile.businessPhones;
    user.jobTitle = profile.jobTitle;
    user.operationType = res.user.operationType || '';
    user.accesToken = token;
  } else {
    console.log('Loggin with Email & Passwrod. . .');
    // console.log(`Este es el provider Data -> ${JSON.stringify(res.user.providerData[0])}`);

    const uid = res.user.uid;
    const profile = res.user.providerData[0];
    const token = res.user.refreshToken;

    user.id = uid;
    user.name = !profile.displayName ? profile.email : profile.displayName; // if empty , adding the email
    user.email = profile.email;
    user.operationType = res.user.operationType
      ? res.user.operationType
      : 'Sign In';
    user.accesToken = token; // refresh token
  }
  // console.log('User -> ', user);
  return user;
};

const filterMessage = (str: string) => {
  let newMessage = '';
  if (str.includes('Error getting verification code from microsoft.com response')){
    newMessage = `This type of email is not accepted for the system, \n Please try again with a valid enterprise email.`;
  } else {
    newMessage = str;
  }
  return newMessage;
}

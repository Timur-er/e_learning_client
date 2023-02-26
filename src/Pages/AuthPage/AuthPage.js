import React, {useState} from 'react';
import RegisterForm from "../../Components/RegAuth/RegisterForm/RegisterForm";
import styles from './AuthPage.module.scss';
import LoginForm from "../../Components/RegAuth/LoginForm/LoginForm";

const AuthPage = () => {
    const [haveAccount, setHaveAccount] = useState(false)

    const toggleAuthWay = (e) => {
        e.preventDefault();
        setHaveAccount(!haveAccount)
    }

    return (
        <div className={styles.auth}>
            <div className={styles.auth__formWrapper}>
                {
                    haveAccount ? <LoginForm/> : <RegisterForm/>
                }
            </div>
            <div className={styles.auth__buttonBlock}>
                   <span>
                         {
                             haveAccount ? 'Do not have an account yet?' : 'Already have an account?'
                         }

                       <span
                           className={styles.auth__callToAction}
                           onClick={e => toggleAuthWay(e)}
                       >
                             {
                                 haveAccount ? 'Register here' : 'Login here'
                             }
                       </span>
                </span>
            </div>
        </div>
    );
};

export default AuthPage;
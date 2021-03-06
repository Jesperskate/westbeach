// Hack to force forbidClientAccountCreation option to false.
 if (Meteor.isServer) {
    Accounts._options.forbidClientAccountCreation = false;
 }



AccountsTemplates.configure({
        // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    texts: {
        navSignIn: "signIn",
        // navSignOut: "signOut",
        optionalField: "optioneel",
        pwdLink_pre: "",
        pwdLink_link: "",
        pwdLink_suff: "",
        resendVerificationEmailLink_pre: "Verificatie email verloren?",
        resendVerificationEmailLink_link: "Verstuur opnieuw",
        resendVerificationEmailLink_suff: "",
        sep: "OR",
        signInLink_pre: "ifYouAlreadyHaveAnAccount",
        signInLink_link: "signIn",
        signInLink_suff: "",
        signUpLink_pre: "dontHaveAnAccount",
        signUpLink_link: "join",
        signUpLink_suff: "",
        socialAdd: "add",
        socialConfigure: "configure",
        socialIcons: {
            "meteor-developer": "fa fa-rocket",
        },
        socialRemove: "remove",
        socialSignIn: "signIn",
        socialSignUp: "signUp",
        socialWith: "with",
        termsPreamble: "clickAgree",
        termsPrivacy: "privacyPolicy",
        termsAnd: "and",
        termsTerms: "terms",
        button: {
          changePwd: "Wachtwoord veranderen",
          enrollAccount: "Enroll account",
          resetPwd: "Reset Wachwoord",
          signIn: "Sign In ",
          signUp: "Sign Up",
        },
        info: {
            emailSent: "info.emailSent",
            emailVerified: "info.emailVerified",
            pwdChanged: "info.passwordChanged",
            pwdReset: "info.passwordReset",
            pwdSet: "info.passwordReset",
            signUpVerifyEmail: "Successful Registration! Please check your email and follow the instructions.",
            verificationEmailSent: "A new email has been sent to you. If the email doesn't show up in your inbox, be sure to check your spam folder.",
        },
        errors: {
            accountsCreationDisabled: "Client side accounts creation is disabled!!!",
            cannotRemoveService: "Cannot remove the only active service!",
            captchaVerification: "Captcha verification failed!",
            loginForbidden: "Wachtwoord of email is onjuist",
            mustBeLoggedIn: "Must be logged in",
            pwdMismatch: "Wachtwoorden komen niet overeen",
            validationErrors: "Validation Errors",
            verifyEmailFirst: "Please verify your email first. Check the email and follow the link!",
        }
    }
});
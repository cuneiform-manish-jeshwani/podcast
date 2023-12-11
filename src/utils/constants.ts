// Messages
const message = {
    dbConnect: "MONGODB::Connected to database",
    clConnect: "MONGODB::Connected to cluster",
    success: "Success",
    failed: "failed",
    dataNotFound: "Data not found.",
    internalServerError: "Internal server error. Please try after some time",
    unAuthAccess: "Unauthorized access ",
    reqAccessKey: "Access Key is required",
    invalidAccesskey: "Invalid Access Key",
    superAdmin: "Super Admin Created Successfully.",
    invalidEmail: "Invalid email address.",
    invalidPassword: "Invalid password.",
    userInactive: "Your account is disabled.",
    userDeleted: "Your account is suspended.",
    invalidUser: "You are not a valid user.",
    reqAccessToken: "Access Token is required",
    invalidAccessToken: "Invalid Access Token.",
    reqProfilePic: "Profile Picture is required.",
    phoneTaken: "Phone number is taken.",
    diffPassword: "New password should be different from old password.",
    invalidOldPassword: "Invalid old password.",
    passChange: "Password changed Successfully.",
    twoFactoreOn: "Two-factor authentication turn on successfully.",
    twoFactorOff: "Two-factor authentication turn off successfully.",
    invalidType: "The selected type is invalid.",
    userLogin: "User logged in successfully.",
    userDetail: "User details get successfully.",
    userUpdate: "User details updated successfully.",
    emailTaken:"Email already Taken",
    userDisable: "Your Account deactivated successfully.",
    userRemove: "Your Account deleted successfully.",
    logout: "Logout successfully.",
    logoutAll: "Logout from all devices successfully.",
    resetEmail: "A mail with reset link sent successfully.",
    invalidAuthToken: "Invalid authentication token.",
    invalidVerifyToken: "Invalid verification token.",
    tokenExpire:
      "The token has expired. Please re-send the verification token to try again.",
    tokenSuccess: "Token verified successfully",
    profileSuccess: "Profile picture updated successfully.",
    invalidDateTimeFormat: "Invalid date time format.",
    invalidTimeFormat: "Invalid time format.",
  };
  
  // Response Status
  const status = {
    statusTrue: true,
    statusFalse: false,
  };
  
  // Response Code
  const code = {
    success: 200,
    FRBDN: 403,
    internalServerError: 500,
    dataNotFound: 404,
    badRequest: 400,
    reqTimeOut: 408,
    unAuthorized: 401,
    PaymentRequired: 402,
    badMethod: 405,
    notAcceptable: 406,
    preconditionFailed: 412,
  };
  
  // User Status
  const userStatus = {
    statusTrue: true,
    statusFalse: false,
  };
  
  // email titles
  const emailTitle = {
    otp: "Send OTP",
    resetPassword: "Reset Password",
    credential: "Credential",
  };
  
  // Registration Type
  const registrationType = {
    normal: "normal",
    google: "google",
  };
  
  // User level
  const accountLevel = {
    superAdmin: 1,
    admin: 2,
    user: 3,
  };
  
  // Privileges
  const privileges = {
    user_management: "user_management",
    email_management: "email_management",
    cms_management: "cms_management",
    configuration_management: "configuration_management",
  };
  
  // Rights
  const rights = {
    read: "read",
    write: "write",
    delete: "delete",
  };
  
  // Address Types
  const addressTypes = {
    home: "Home",
    work: "Work",
  };
  export default {
    message,
    status,
    code,
    userStatus,
    emailTitle,
    registrationType,
    accountLevel,
    privileges,
    rights,
    addressTypes,
  };
  
// import express from 'express'


// import cmsRoutes from "../modules/admin/cms/cmsRoute";
// import userRoute from "../modules/user/userRoute";

// const router = express.Router()

// router.use(`/api/admin/cms`, cmsRoutes);



// export default router;

import adminCmsRoute from "../modules/admin/cms/cmsRoute";
import userRoute from "../modules/user/userRoute";

import adminRoute from "../modules/admin/adminRoute"

import adminuserRoute from '../modules/admin/user/userRoute'


import authRoute from '../modules/auth/authRoute'

import adminemailRoute from '../modules/admin/email/emailRoute'

export default (app: any) => {
 
    app.use(`/api/admin/cms`, adminCmsRoute);
   
    // User
    app.use(`/api/user`, userRoute);

    app.use(`/api/admin/email`, adminemailRoute)

    app.use(`/api/admin/user`, adminuserRoute)

    app.use(`/api/admin`, adminRoute)

    app.use(`/api/auth`, authRoute)
  };

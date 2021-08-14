
const publicRoutes = {
    HOME: '/',
    ABOUT: '/about',
    CONTACT: '/contact',
    LOGIN: '/login',
    REGISTER: '/register',
    CONFIRMATION: '/confirmation',
    DASHBOARD:'/dashboard',
    SOLICITUDES: '/dashboard/solicitudes',
    OFERTAS: '/dashboard/ofertas',
    POSTULACION: '/dashboard/postulacion',
    OFERTAR: '/dashboard/ofertar',
    POSTULAR: '/dashboard/postular',
    EMPRESA: '/dashboard/empresa',
};
/*
const privateRoutes = {
    LOGOUT: '/logout',
    PRIVATE: '/privada',
    ARTICLE_ID: '/articulo/:id'
};
*/

const Routes = {
    ...publicRoutes,
    //...privateRoutes
};
export default Routes;
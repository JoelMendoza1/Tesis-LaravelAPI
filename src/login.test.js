import LoginPage from "./pages/LoginPage";
import {login} from "./login";

 describe('Probando login',()=>{
     //Inicia Sesión?
     //Resultado cuando ingresa credenciales incorrectas
     it('Inicia Sesión?', ()=> {
         const resultado = LoginPage;
         expect(resultado).toEqual(true)
     });
 })
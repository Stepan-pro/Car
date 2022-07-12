import {environment} from "../../environments/environment";


const {API} = environment

export const urls = {
  auth:`${API}/auth`,
  cars:`${API}/cars`,
  users:`${API}/users`,
}

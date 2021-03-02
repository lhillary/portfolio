import axios from "axios"

export default {
  async createContact(contact) {
      
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json'
        }
    };

    try{
        let res = await axios.post('http://localhost:8000/contacts', contact, axiosConfig);
        console.log(res.data);
    } catch(err) {
        console.log(err);
    }
  }
}
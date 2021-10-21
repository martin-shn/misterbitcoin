
import { httpService } from "@/services/http.service.js";



async function  query(filterBy = '') {
    let contacts;
    let DB = localStorage.getItem("BTDB");
    if (DB) {
        DB = JSON.parse(DB)
        contacts = DB.contacts
    } else {
        contacts = await httpService.get(
            "http://www.filltext.com/?rows=40&f={firstName}&l={lastName}&p={phone}&e={email}"
            );
        }
    // return contacts
    return contacts.filter(contact=>(contact.f +' '+ contact.l).includes(filterBy));
}

export default {
    query
}
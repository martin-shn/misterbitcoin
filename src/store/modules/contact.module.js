import contactService from '@/services/contacts.service'

export default {
    strict: true,
    state: {
        contacts: null,
        currContact: null,
    },
    mutations: {
        setContacts(state, payload){
            state.contacts = payload.contacts
        },
        removeContact(state, payload){
            const idx = state.contacts.findIndex(contact=>contact._id===payload.id)
            if(idx>=0) state.contacts.splice(idx,1)
        },
        updateContact(state, payload){
            const idx = state.contacts.findIndex(contact=>contact._id===payload.savedContact.id)
            if(idx>=0) state.contacts.splice(idx,1,payload.savedContact)
        },
        addContact(state, payload){
            state.contacts.unshift(payload.savedContact)
            state.currContact = payload.savedContact
        },
    },
    getters:{
        getContacts(state){
            return state.contacts
        },
        getCurrContact(state){
            return state.currContact
        },
    },
    actions: {
        async setContacts(context){
            const contacts = await contactService.query()
            context.commit({ type: 'setContacts', contacts});
        },
        async remove(context, {id}){
            await contactService.remove(id);
            context.commit({ type: 'removeContact', id});
        },
        async save(context, {contact}){
            let savedContact;
            if (contact._id){
                // update
            savedContact = await contactService.update(contact);
            context.commit({ type: 'updateContact', savedContact});
        }else{
            // add
            savedContact = await contactService.save(contact);
            context.commit({ type: 'addContact', savedContact});
        }
        },
    }
  }
  
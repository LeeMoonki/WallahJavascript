import Constant from '../constant';

export default {
    [Constant.FETCH_CONTACTS]: (state, payload) => {
        console.log("mutations > Constant.FETCH_CONTACTS ", payload);
        state.contactlist = payload.contactlist;
    },
    [Constant.FETCH_CONTACT_ONE]: (state, payload) => {
        state.contact = payload.contact;
    },
    [Constant.INITIALIZE_CONTACT_ONE]: (state, payload) => {
        state.contact = { no: '', name: '', tel: '', address: '', photo: '' };
    }
}

const initialState =[
    {
         id:0,
         firstname:"Umar",
         lastname:"shaikh",
         number:1234567890,
         status:'active',
    },
    {
        id:1,
        firstname:"test",
        lastname:"shaikh",
        number:3232787890,
        status:'active',
    },
    {
      id:2,
      firstname:"tested",
      lastname:"shaikhed",
      number:3232783452,
      status:'unactive',
  },
];
const contactReducer = (state = initialState , action)=>{
  switch(action.type){
    case 'ADD_CONTACT':
      state =[...state, action.payload];
         return state;
      case 'UPDATE_CONTACT':
      const updateState = state.map(contact=>contact.id === action.payload.id ? action.payload : contact);
      state = updateState; 
         return state;
      case 'DELETE_CONTACT':
        const filterContacts = state.filter(contact=>contact.id !== action.payload && contact)
        state =  filterContacts;
        return state
    default:
        return state;
  }
};
export default contactReducer;
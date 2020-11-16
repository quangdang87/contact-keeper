import React, {useReducer} from "react";
import {v4 as uuid} from "uuid";
import ContactContext from "./contactContext";
import ContactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Quang Dang",
        email: "quang@gmail.com",
        phone: "111-111-1111",
        type: "personal"
      },
      {
        id: 2,
        name: "Hien Ho",
        email: "hien@gmail.com",
        phone: "222-222-2222",
        type: "personal"
      },
      {
        id: 3,
        name: "Quyen Dang",
        email: "quyen@gmail.com",
        phone: "333-333-3333",
        type: "professional"
      }
    ],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //Add contact
  const addContact = contact => {
    contact.id = uuid();
    dispatch({type: ADD_CONTACT, payload: contact});
  };
  //Delete contact
  const deleteContact = id => {
    dispatch({type: DELETE_CONTACT, payload: id});
  };
  //Set current contact
  const setCurrent = contact => {
    dispatch({type: SET_CURRENT, payload: contact});
  };
  //Clear current contact
  const clearCurrent = () => {
    dispatch({type: CLEAR_CURRENT});
  };
  //Update contact
  const updateContact = contact => {
    dispatch({type: UPDATE_CONTACT, payload: contact});
  };
  //Filter Contacts
  const filterContacts = text => {
    dispatch({type: FILTER_CONTACTS, payload: text});
  };
  //Cleaer Filter
  const clearFilters = () => {
    dispatch({type: CLEAR_FILTER});
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
        deleteContact,
        clearCurrent,
        setCurrent,
        current: state.current,
        updateContact,
        filtered: state.filtered,
        filterContacts,
        clearFilters
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;

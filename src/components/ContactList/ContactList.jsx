import { useDispatch, useSelector } from 'react-redux';
import css from './contactlist.module.css';
import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { deletePhoneBookThunk, getPhoneBookThunk } from 'store/phonebook/thunkPhonebook';
import { Loader } from 'components/Loader/Loader';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const phoneBookSelector = (state) => { return state.phoneBook }

const ContactLists = () => {
  const { contactList, isLoading, error } = useSelector(phoneBookSelector);
  
  const { filter } = useSelector(state => state.filter)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getPhoneBookThunk());
  }, [dispatch])

  const getVisibleContacts = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();
    return contactList.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }, [contactList, filter]);

  const handleDeleteContact = (contactId) => {
    dispatch(deletePhoneBookThunk(contactId))
    toast.warn("Delete contact !");
  }

  return (
    <ul className={css.list}>
      {isLoading && <Loader/>}
      {!isLoading && error === "" && getVisibleContacts.map(({ id, name, phone }) => (
        <li key={id} className={css.item}>
          <p className={css.name}>{name}:</p>
          <p className={css.phone}>{phone}</p>
          <button
            onClick={() => handleDeleteContact(id)}
            className={css.button_delet}
          >
            Delete
          </button>
        </li>
      ))}
      {getVisibleContacts.length === 0 && !isLoading && error === "" && <p className={css.item}>I'm sorry, but there are not contacts</p>}
      {error && !isLoading && <p className={css.item}>{error}</p>}
    </ul>
  );
};

export default ContactLists;

ContactLists.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

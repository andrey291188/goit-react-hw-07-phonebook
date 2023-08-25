import ContactForm from './ContactForm/ContactForm.jsx';
import ContactLists from './ContactList/ContactList.jsx';
import FilterList from './FilterList/FilterList.jsx';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={true} theme="colored" />
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <FilterList />
      <ContactLists />
    </div>
  );
};

export default App;

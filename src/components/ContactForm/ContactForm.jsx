import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import css from './contactform.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { createPhoneBookThunk } from 'store/phonebook/thunkPhonebook';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ContactForm = () => {
  const { contactList } = useSelector(state => state.phoneBook);

  const dispatch = useDispatch();

  const addContact = value => {
    const { name: nameProps, phone: numberProps } = value;
    const includsName = contactList.find(
      ({ name, phone }) =>
        name.toLowerCase() === nameProps.toLowerCase() || phone === numberProps
    );
    if (includsName) {
      alert(`Name ${nameProps}, phone ${numberProps} is already in contacts`);
      return;
    }
    dispatch(createPhoneBookThunk(value));
    toast.success("Create contact !");
  };

  const handleSubmit = (values, { resetForm }) => {
    addContact(values);
    resetForm();
  };

  const schema = yup.object().shape({
    name: yup.string().min(2).required(),
    phone: yup.number().min(6).required(),
  });

  return (
    <Formik
      initialValues={{ name: '', phone: '' }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form_style}>
        <label htmlFor="name">
          <p className={css.nameInput}>Enter your Name</p>
          <Field type="text" name="name" className={css.form_input} />
          <ErrorMessage name="name" component="div" />
        </label>
        <label htmlFor="phone">
          <p className={css.nameInput}>Enter your Phone</p>
          <Field type="tel" name="phone" className={css.form_input} />
          <ErrorMessage name="phone" component="div" />
        </label>
        <button type="submit" className={css.button_create}>
          Add contacts
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;

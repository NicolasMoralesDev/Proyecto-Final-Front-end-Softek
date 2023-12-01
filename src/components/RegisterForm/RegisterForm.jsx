import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Form as BootstrapForm, Alert } from 'react-bootstrap';
import { object, string, ref } from 'yup';

const validationSchema = object().shape({
  email: string().email('Invalid email').required('Required'),
  password: string().required('Required'),
  confirmPassword: string()
    .oneOf([ref('password'), null], 'Passwords must match')
    .required('Required'),
  firstName: string().required('Required'),
  lastName: string().required('Required'),
});

// eslint-disable-next-line react/prop-types
const RegisterForm = ({ handleSubmit, handleCloseRegisterModal }) => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form as={BootstrapForm}>
        <div className="mb-3">
          <label htmlFor="email">Correo electrónico:</label>
          <Field
            type="email"
            name="email"
            className="form-control"
            id="email"
            autoComplete="off"
          />
          <ErrorMessage name="email" component={Alert} variant="danger" />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Contraseña:</label>
          <Field
            type="password"
            name="password"
            className="form-control"
            id="password"
          />
          <ErrorMessage name="password" component={Alert} variant="danger" />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword">Repita la contraseña:</label>
          <Field
            type="password"
            name="confirmPassword"
            className="form-control"
            id="confirmPassword"
          />
          <ErrorMessage
            name="confirmPassword"
            component={Alert}
            variant="danger"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="firstName">Nombre:</label>
          <Field
            type="text"
            name="firstName"
            className="form-control"
            id="firstName"
          />
          <ErrorMessage name="firstName" component={Alert} variant="danger" />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName">Apellido:</label>
          <Field
            type="text"
            name="lastName"
            className="form-control"
            id="lastName"
          />
          <ErrorMessage name="lastName" component={Alert} variant="danger" />
        </div>
        <Button type="submit" className="me-2">
          Enviar
        </Button>
        <Button variant="secondary" onClick={handleCloseRegisterModal}>
          Cancelar
        </Button>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
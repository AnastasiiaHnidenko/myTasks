
import './App.css';
import React from "react";
//import Name from "./components/name/name";
import { Formik } from 'formik';
import * as yup from 'yup'

function App() {
    const validationsSchema = yup.object().shape({
        name: yup.string().typeError('Должно быть строкой').required('Обязательно'),
        email: yup.string().email('Введите верный email').required('Обязательно'),
        password: yup.string()
            .required("Пожалуйста, введите пароль")
            .min(8, "Пароль слишком короткий")
            .test("isValidPass", " Пароль должен иметь минимум 8 символов, 1 знак, одну цифру и одну заглавную букву", (value, context) => {
                const hasUpperCase = /[A-Z]/.test(value);
                const hasLowerCase = /[a-z]/.test(value);
                const hasNumber = /[0-9]/.test(value);
                const hasSymbole = /[!@#%&]/.test(value);
                let validConditions = 0;
                const numberOfMustBeValidConditions = 3;
                const conditions = [hasLowerCase, hasUpperCase, hasNumber, hasSymbole];
                conditions.forEach((condition) =>
                    condition ? validConditions++ : null
                );
                if (validConditions >= numberOfMustBeValidConditions) {
                    return true;
                }
                return false;
            })
    })
  return <div className={'main-container'}>

      <Formik
          initialValues={{
              name: '',
              email: '',
              password: ''
          }}
          validateOnBlur
          onSubmit={(values)=> { console.log(values)}}
          validationSchema={validationsSchema}>

          {({ values, errors, touched,
                handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
              <div className={'form'}>
                  <p>
                      <label htmlFor={'name'}>Имя: </label><br/>
                      <input className={'input'}
                             type={'text'}
                             name={'name'}
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.name}
                      />
                  </p>
                  {touched.name && errors.name && <p className={'error'}>{errors.name}</p>}
                  <p>
                      <label htmlFor={'email'}>Электронная почта: </label><br/>
                      <input className={'input'}
                             type={'email'}
                             name={'email'}
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.email}
                      />
                  </p>
                  {touched.email && errors.email && <p className={'error'}>{errors.email}</p>}
                  <p>
                      <label htmlFor={'password'}>Пароль: </label><br/>
                      <input className={'input'}
                             type={'password'}
                             name={'password'}
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.password}
                      />
                  </p>
                  {touched.password && errors.password && <p className={'error'}>{errors.password}</p>}
                  <button className={'button'}
                      disabled={!isValid && !dirty}
                      onClick={handleSubmit}
                      type={'submit'}
                  >
                      Отправить                  </button>
              </div>
          )}

      </Formik>

  </div>

}

export default App;

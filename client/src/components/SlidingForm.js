import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'; // for form validation
import { animated, useSpring } from 'react-spring';
import '../css/SlidingForm.css';

function SlidingForm() {
  // Animation setup for React Spring
  const animationProps = useSpring({
    from: { opacity: 0, transform: 'translate3d(-100%,0,0)' },
    to: { opacity: 1, transform: 'translate3d(0%,0,0)' }
  });

  const navigate = useNavigate();
   
  // Formik setup
  const formik = useFormik({
    initialValues: {
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
    },
    validationSchema: Yup.object({
      minPrice: Yup.number().required('Required'),
      maxPrice: Yup.number().min(Yup.ref('minPrice'), 'Max price should be greater than min price').required('Required'),
      bedrooms: Yup.number().min(1).required('Required'),
      bathrooms: Yup.number().min(1).required('Required'),
    }),
    onSubmit: values => {
      console.log('Form values:', values);
      navigate('/chat', { state: { formValues: values } });
    },
  });
   return (
    <form onSubmit={formik.handleSubmit}>
      <animated.div style={animationProps}>
        <label>
          Min Price:
          <input
            type="number"
            name="minPrice"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.minPrice}
          />
          {formik.touched.minPrice && formik.errors.minPrice ? <div>{formik.errors.minPrice}</div> : null}
        </label>
        <label>
          Max Price:
          <input
            type="number"
            name="maxPrice"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.maxPrice}
          />
          {formik.touched.maxPrice && formik.errors.maxPrice ? <div>{formik.errors.maxPrice}</div> : null}
        </label>
        <label>
          Bedrooms:
          <select
            name="bedrooms"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.bedrooms}
          >
            {Array.from({length: 9}).map((_, i) => 
              <option key={i} value={i}>{i}</option>
            )}
          </select>
          {formik.touched.bedrooms && formik.errors.bedrooms ? <div>{formik.errors.bedrooms}</div> : null}
        </label>

        <label>
          Bathrooms:
          <select
            name="bathrooms"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.bathrooms}
          >
            {Array.from({length: 9}).map((_, i) => 
              <option key={i} value={i}>{i}</option>
            )}
          </select>
          {formik.touched.bathrooms && formik.errors.bathrooms ? <div>{formik.errors.bathrooms}</div> : null}
        </label>

        <button type="submit">Submit</button>
        <button type="reset" onClick={() => {navigate('/chat')}}> skip</button> 
      </animated.div>
    </form>
  );
}

export default SlidingForm;
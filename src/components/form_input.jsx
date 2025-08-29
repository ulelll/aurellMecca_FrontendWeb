const FormInput = ({ register, errors, name, label, type = 'text' }) => (
  <div style={{ marginBottom: '20px' }}>
    <label style={{ display: 'block', marginBottom: '5px' }}>{label}</label>
    <input type={type} {...register(name)} />
    {errors[name] && <p className="error">{errors[name].message}</p>}
  </div>
);

export default FormInput;
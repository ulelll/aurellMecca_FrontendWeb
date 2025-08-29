const FormInput = ({ label, type = 'text', error, register, Icon }) => (
  <div style={{ marginBottom: '20px', width: '100%' }}>
    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>{label}</label>
    <div style={{ position: 'relative' }}>
      {Icon && <Icon style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#555' }} />}
      <input
        type={type}
        {...register} 
        style={{
          width: '100%',
          padding: Icon ? '10px 10px 10px 35px' : '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          fontSize: '1rem',
        }}
      />
    </div>
    {error && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>{error}</p>}
  </div>
);

export default FormInput;
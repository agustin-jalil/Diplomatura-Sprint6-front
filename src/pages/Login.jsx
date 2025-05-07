import { useState, useRef } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      toast.current.show({ severity: 'success', summary: 'Login exitoso', detail: 'Bienvenido', life: 3000 });
      setTimeout(() => navigate('/superheroes'), 1500);
    } catch (err) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Credenciales inválidas', life: 3000 });
    }
  };

  return (
        <div className="flex justify-content-center mt-6 ">
        <Toast ref={toast} />
        <Card title="Iniciar Sesión" className="w-4 p-6 gap-4 backgroundcards">
            <form onSubmit={handleSubmit} className="p-fluid">
            <div className="field mb-3 flex flex-column ">
                <label htmlFor="email">Email</label>
                <input className='border-white-custom p-2' id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="field mb-4 flex flex-column ">
                <label htmlFor="password">Contraseña</label>
                <input className='border-white-custom p-2' id="password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask required />
            </div>
            <Button label="Iniciar Sesión" icon="pi pi-sign-in" type="submit" />
            </form>
        </Card>
        </div>
  );
}

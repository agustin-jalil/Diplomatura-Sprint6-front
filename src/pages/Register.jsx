import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const toast = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', formData);
      toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Usuario registrado', life: 3000 });
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo registrar', life: 3000 });
    }
  };

  return (
    <div className="flex justify-content-center mt-6 ">
      <Toast ref={toast} />
      <Card title="Registro de Usuario" className="w-4 p-6 gap-4 backgroundcards">
        <form onSubmit={handleSubmit} className="p-fluid p-4 gap-4">
          <div className="field mb-3">
            <label htmlFor="name">Nombre</label>
            <InputText
              className="border-white-custom rounded p-2"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field mb-3">
            <label htmlFor="email">Email</label>
            <InputText
              className="border-white-custom rounded p-2"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border-2 border-white-custom rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button
            label="Registrarse"
            icon="pi pi-user-plus bg-blue"
            type="submit"
          />
        </form>
      </Card>
    </div>
  );
}

// src/components/auth/RegisterForm.tsx
'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../ui/button";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthDate: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "Nombre es requerido";
    if (!formData.lastName.trim()) newErrors.lastName = "Apellido es requerido";
    
    if (!formData.email.trim()) {
      newErrors.email = "Correo es requerido";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Correo no válido";
    }
    
    if (!formData.password) {
      newErrors.password = "Contraseña es requerida";
    } else if (formData.password.length < 8) {
      newErrors.password = "Mínimo 8 caracteres";
    }
    
    if (!formData.birthDate) {
      newErrors.birthDate = "Fecha de nacimiento es requerida";
    } else {
      const birthDate = new Date(formData.birthDate);
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 100);
      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() - 13);
      
      if (birthDate < minDate || birthDate > maxDate) {
        newErrors.birthDate = "Debes tener entre 13 y 100 años";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Registro exitoso:", formData);
      router.push("/login");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#00527C]">Registro</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="firstName">
            Nombre *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="lastName">
            Apellido *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-1" htmlFor="email">
          Correo electrónico *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          required
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-1" htmlFor="password">
          Contraseña *
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          required
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        <p className="text-gray-500 text-xs mt-1">Mínimo 8 caracteres</p>
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-1" htmlFor="birthDate">
          Fecha de nacimiento *
        </label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded ${errors.birthDate ? 'border-red-500' : 'border-gray-300'}`}
          required
          max={new Date(new Date().setFullYear(new Date().getFullYear() - 13)).toISOString().split('T')[0]}
          min={new Date(new Date().setFullYear(new Date().getFullYear() - 100)).toISOString().split('T')[0]}
        />
        {errors.birthDate && <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>}
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-[#00527C] hover:bg-[#003d5c] text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#00527C] focus:ring-offset-2"
      >
        Crear cuenta
      </Button>
      
      <p className="text-center text-gray-600 text-sm mt-4">
        ¿Ya tienes una cuenta?{' '}
        <a href="/auth/login" className="text-[#00527C] hover:underline font-medium">
          Inicia sesión
        </a>
      </p>
    </form>
  );
}
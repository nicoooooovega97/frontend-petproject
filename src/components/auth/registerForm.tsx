'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../ui/button";
import { toast } from 'react-hot-toast';
// 1. Importamos el hook y los tipos GENERADOS por Codegen
import { useRegisterMutation, RegisterDto } from '@/types/generated/graphql';

export default function RegisterForm() {
  // 2. Adaptamos el estado del formulario para que coincida con el DTO del backend
  const [formData, setFormData] = useState<RegisterDto>({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegisterDto, string>>>({});
  const router = useRouter();

  // 3. Usamos el hook autogenerado y tipado
  const [register, { loading }] = useRegisterMutation({
    onCompleted: (data) => {
      // 4. Lógica de éxito: se ha creado el usuario
      if (data.register.id) {
        toast.success('¡Registro exitoso! Ahora puedes iniciar sesión.');
        router.push("/auth/login"); // Redirigimos a la página de login
      }
    },
    onError: (error) => {
      // Manejamos errores de red o de GraphQL
      toast.error(error.message || 'Error al conectar con el servidor');
      console.error("Registration error:", error);
    }
  });

  const validateForm = () => {
    const newErrors: Partial<Record<keyof RegisterDto, string>> = {};
    
    // 5. Adaptamos las validaciones a los campos correctos
    if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
    if (!formData.lastName.trim()) newErrors.lastName = "El apellido es requerido";
    
    if (!formData.email.trim()) {
      newErrors.email = "El correo es requerido";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "El formato del correo no es válido";
    }
    
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) { // Ajustado a un mínimo razonable
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      // 6. Llamamos a la mutación con las variables correctamente tipadas
      await register({
        variables: {
          input: {
            name: formData.name,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
          }
        }
      });
    } catch (error) {
      // El hook de Apollo se encarga de los errores en su callback 'onError'
      // así que no necesitamos hacer mucho aquí, solo evitar que crashee.
      console.log("Submit-level error catcher");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof RegisterDto]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof RegisterDto];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#00527C]">Registro</h2>
      
      {/* 7. JSX ADAPTADO A LOS CAMPOS CORRECTOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="name">
            Nombre *
          </label>
          <input
            type="text"
            id="name"
            name="name" // Coincide con el estado
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="lastName">
            Apellido *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName" // Coincide con el estado
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
      </div>
      
      {/* Email y Password (sin cambios, ya estaban bien) */}
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
      
      <div className="mb-6">
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
      </div>

      <Button 
        type="submit" 
        className="w-full bg-[#00527C] hover:bg-[#003d5c] text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#00527C] focus:ring-offset-2"
        disabled={loading}
      >
        {loading ? "Creando cuenta..." : "Crear cuenta"}
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
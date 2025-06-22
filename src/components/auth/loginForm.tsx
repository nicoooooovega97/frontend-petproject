'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '@/graphql/auth/mutations';
import Button from "../ui/button";
import Link from "next/link";
import { FiMail, FiLock, FiAlertCircle, FiLoader, FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  
  // Integración de Apollo Mutation
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onError: (err) => {
      setError(err.message);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await login({
        variables: {
          email: formData.email,
          password: formData.password
        }
      });

      if (data?.login?.token) {
        localStorage.setItem("authToken", data.login.token);
        // Opcional: Guardar información adicional del usuario
        localStorage.setItem("userData", JSON.stringify(data.login.user));
        router.push("/user");
      }
    } catch (err) {
      console.error("Login error:", err);
      // El error ya se maneja en onError de useMutation
    }
  };

  const isFormValid = formData.email.includes("@") && 
                     formData.email.includes(".") && 
                     formData.password.length >= 6;

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
      {/* Título con icono */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#00527C] flex items-center justify-center gap-2">
          <FiLock className="inline" />
          Iniciar Sesión
        </h2>
        <p className="text-gray-600 mt-2">Ingresa a tu cuenta</p>
      </div>
      
      {/* Mensaje de error */}
      {error && (
        <div className="mb-5 p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
          <FiAlertCircle className="mr-2" />
          {error}
        </div>
      )}

      {/* Campo Email con icono */}
      <div className="mb-5">
        <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">
          Correo electrónico
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiMail className="text-gray-400" />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00527C] focus:border-transparent"
            required
            placeholder="tu@email.com"
          />
        </div>
      </div>
      
      {/* Campo Contraseña con icono y mostrar/ocultar */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2 font-medium" htmlFor="password">
          Contraseña
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiLock className="text-gray-400" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 pr-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00527C] focus:border-transparent"
            required
            placeholder="••••••••"
            minLength={6}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff className="text-gray-400" /> : <FiEye className="text-gray-400" />}
          </button>
        </div>
      </div>

      {/* Botón con estado de carga */}
      <Button 
        type="submit" 
        className={`w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 shadow-md flex justify-center items-center ${
          loading || !isFormValid ? "opacity-75 cursor-not-allowed" : ""
        }`}
        disabled={loading || !isFormValid}
      >
        {loading ? (
          <>
            <FiLoader className="animate-spin mr-2" />
            Procesando...
          </>
        ) : (
          "Ingresar"
        )}
      </Button>

      {/* Enlaces adicionales */}
      <div className="mt-6 text-center space-y-3">
        <Link 
          href="/forgot-password" 
          className="text-sm text-[#00527C] hover:underline flex items-center justify-center gap-1"
        >
          <FiAlertCircle />
          ¿Olvidaste tu contraseña?
        </Link>
        
        <p className="text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link 
            href="/auth/register" 
            className="text-[#00527C] font-medium hover:underline"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </form>
  );
}
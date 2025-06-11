import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logoImg from '../images/looogin.png'; // asegúrate que esta imagen exista

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Autofill fix aplicado globalmente cuando carga el componente
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      input:-webkit-autofill,
      input:-webkit-autofill:hover, 
      input:-webkit-autofill:focus, 
      input:-webkit-autofill:active  {
          transition: background-color 9999s ease-in-out 0s;
          -webkit-transition: background-color 9999s ease-in-out 0s;
          -webkit-box-shadow: 0 0 0 1000px #ffffff inset !important;
          box-shadow: 0 0 0 1000px #ffffff inset !important;
          -webkit-text-fill-color: #000 !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="relative w-screen h-screen bg-gray-50 flex items-center justify-center font-[Inter] overflow-hidden">
      {/* Burbujas decorativas */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-purple-300 rounded-full opacity-60 animate-pulse blur-sm" />
      <div className="absolute top-40 right-32 w-24 h-24 bg-blue-300 rounded-full opacity-60 animate-bounce" />
      <div className="absolute bottom-32 left-40 w-40 h-40 bg-indigo-300 rounded-full opacity-60 animate-pulse" />
      <div className="absolute bottom-40 right-20 w-20 h-20 bg-purple-400 rounded-full opacity-60 animate-bounce" />
      <div className="absolute top-60 left-1/2 w-28 h-28 bg-blue-400 rounded-full opacity-60 animate-pulse" />
      <div className="absolute bottom-20 right-1/2 w-16 h-16 bg-indigo-400 rounded-full opacity-60 animate-bounce" />

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-[1200px] h-[90vh] md:h-[600px] rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl bg-white">

        {/* Panel izquierdo */}
        <div className="flex flex-col justify-start p-10 md:p-14 w-full md:w-1/2 bg-gradient-to-br from-[#4f57b0] via-[#667eea] to-[#764ba2] relative">
          <div className="mb-8">
            <div className="rounded-full bg-white w-16 h-16 opacity-90" />
          </div>

          <h1 className="text-white text-[28px] leading-[34px] font-semibold max-w-[320px] mb-3">
            Todo lo que dices, capturado al instante.
          </h1>
          <p className="text-white text-[14px] leading-[20px] max-w-[320px] mb-10 opacity-90">
            Transcripción y resúmenes automáticos para que no pierdas nada importante.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mt-4">
            <img
              src={logoImg}
              alt="Imagen decorativa"
              className="rounded-xl border border-white/20 max-w-full shadow-lg"
              width={600}
              height={280}
            />
          </div>
        </div>

        {/* Panel derecho - Formulario */}
        <div className="bg-white w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-10 rounded-tr-3xl rounded-br-3xl">
          <div className="mb-8">
            <h2 className="text-black text-[28px] font-bold mb-2">Iniciar sesión</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-[13px] font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <i className="far fa-envelope" />
                </span>
                <input
                  type="email"
                  id="email"
                  placeholder="Ingresa tu correo electrónico"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg py-3 pl-10 pr-4 text-[13px] text-black focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Campo Contraseña */}
            <div>
              <label htmlFor="password" className="block text-[13px] font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <i className="fas fa-lock" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="••••••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg py-3 pl-10 pr-12 text-[13px] placeholder:text-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center justify-center w-8 h-8 bg-transparent hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-500 text-sm`} />
                </button>
              </div>
            </div>

            {/* Checkbox recordar contraseña */}
            <div className="flex items-center space-x-3 text-[13px] text-gray-700">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                />
                <div className="ml-2 flex items-center">
                  <i className="fas fa-check-circle text-white bg-purple-500 rounded-full text-xs mr-2 w-4 h-4 flex items-center justify-center"></i>
                  <label htmlFor="remember" className="select-none font-medium">Recordar contraseña</label>
                </div>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
            >
              Iniciar Sesión
            </button>
          </form>

          <p className="text-[12px] text-gray-600 mt-6 text-center">
            ¿No tienes una cuenta?
            <a href="#" className="text-purple-600 hover:text-purple-700 font-semibold hover:underline ml-1">
              Regístrate
            </a>
          </p>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-[12px] text-gray-500 bg-white px-2">O continuar con</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>

          <button
            type="button"
            className="w-full bg-white border border-gray-300 rounded-lg py-3 flex items-center justify-center gap-3
                      text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google logo"
              className="w-5 h-5"
            />
            <span className="font-medium">Inicia sesión con Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

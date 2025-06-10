import { useState } from 'react';
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

  return (
    <div className="relative w-screen h-screen bg-white flex items-center justify-center font-[Inter] overflow-hidden">
      {/* Burbujas animadas */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-200 rounded-full blur-3xl opacity-40 animate-pulse z-0" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[250px] h-[250px] bg-purple-100 rounded-full blur-2xl opacity-40 animate-pulse z-0" />

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-[1200px] h-[90vh] md:h-[600px] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
        {/* Izquierda */}
        <div className="flex flex-col justify-start p-10 md:p-14 w-full md:w-1/2 bg-gradient-to-r from-[#4f57b0] to-[#a7a9d9]">
          <div className="mb-8">
            <div className="rounded-full bg-white w-16 h-16" />
          </div>
          <h1 className="text-white text-[28px] leading-[34px] font-semibold max-w-[320px] mb-3">
            Todo lo que dices, capturado al instante.
          </h1>
          <p className="text-white text-[14px] leading-[20px] max-w-[320px] mb-10">
            Transcripción y resúmenes automáticos para que no pierdas nada importante.
          </p>
          <img
            src={logoImg}
            alt="Imagen decorativa"
            className="rounded-xl border border-white/30 max-w-full"
            width={600}
            height={280}
          />
        </div>

        {/* Derecha */}
        <div className="bg-white w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-10 rounded-tr-2xl rounded-br-2xl">
          <h2 className="text-black text-[22px] font-normal mb-10 text-center">Iniciar sesión</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-[13px] text-black mb-2">Correo electrónico</label>
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
                  className="w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-4 text-[13px] placeholder:text-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-[13px] text-black mb-2">Contraseña</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <i className="fas fa-lock" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="*************"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-10 text-[13px] placeholder:text-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-white bg-gray-500 hover:bg-gray-600 px-2 rounded"
                >
                  <i className={`far ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-[13px] text-black">
              <input type="checkbox" id="remember" name="remember" className="w-4 h-4 border border-gray-300 text-blue-600 focus:ring-blue-500" />
              <label htmlFor="remember" className="select-none">Recordar contraseña</label>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full text-white bg-blue-600 rounded-md py-2 text-[14px] font-normal hover:bg-blue-700 transition"
            >
              Iniciar Sesión
            </button>
          </form>

          <p className="text-[12px] text-gray-500 mt-4 text-center">
            ¿No tienes una cuenta?
            <a href="#" className="text-blue-600 font-semibold hover:underline ml-1">Regístrate</a>
          </p>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-3 text-[12px] text-black">O continuar con</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>

          <button
            type="button"
            className="w-full border border-gray-300 bg-white rounded-md py-2 flex items-center justify-center space-x-2 text-[14px] text-black hover:bg-gray-50 transition"
          >
            <img src="https://storage.googleapis.com/a1aa/image/ec5dfc94-e1c6-40ca-55b4-0ffda05d0699.jpg" alt="Google logo" className="w-5 h-5" />
            <span>Inicia sesión con Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Dashboard principal de la aplicación picaso.ai
 * Layout de 3 columnas: sidebar izquierdo (navegación), área principal (contenido), sidebar derecho (chat)
 */

// Estilo reutilizable para botones con borde claro
const iconBtn =
  'flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 transition';

export default function Dashboard() {
  const { user, logout } = useAuth();

  useEffect(() => {
    // Configuración inicial del documento
    document.title = 'picaso.ai';
    
    // Inyección de estilos personalizados para scrollbar
    const style = document.createElement('style');
    style.textContent = `
      /* Scrollbar personalizada webkit (Chrome, Safari, Edge) */
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background: #f1f5f9;
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
      }
      /* Soporte para Firefox */
      * {
        scrollbar-width: thin;
        scrollbar-color: #cbd5e1 #f1f5f9;
      }
    `;
    document.head.appendChild(style);
    
    // Cleanup: remover estilos al desmontar componente
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Patrón de fondo punteado para el área central vacía
  const dotPattern =
    'bg-[radial-gradient(circle,_1px_1px_at_1px_1px,#e2e8f0_1px,transparent_0)] bg-[length:14px_14px]';

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-white text-black font-[Inter]">
      {/* Container principal con bordes redondeados y sombra */}
      <div className="h-full w-full max-h-[95vh] max-w-[96vw] flex overflow-hidden rounded-3xl border border-black/10 shadow-lg">
        
        {/* SIDEBAR IZQUIERDO - Navegación y espacios de trabajo */}
        <aside className="w-64 min-w-[256px] flex flex-col border-r border-gray-200 p-4">
          {/* Header: Logo + botón de notificaciones */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg border border-blue-300 bg-gradient-to-b from-blue-100 to-blue-200" />
            <div className="text-blue-500 text-sm leading-tight">
              picaso.ai
              <div className="text-xs text-gray-400">company</div>
            </div>
            <button className={`${iconBtn} p-[6px] ml-auto`}>
              <i className="far fa-bell fa-sm" />
            </button>
          </div>

          {/* Barra de búsqueda */}
          <div className="flex items-center mb-6">
            <i className="fas fa-search text-gray-500 text-sm" />
            <input
              placeholder="Busca algo por aqui..."
              className="ml-2 w-full text-xs placeholder-gray-400 focus:outline-none bg-transparent"
            />
          </div>

          {/* Navegación principal */}
          <span className="uppercase text-[11px] text-gray-500 font-light mb-1">Main</span>
          <nav className="flex flex-col gap-1 text-xs mb-6">
            {/* Item activo (Dashboard principal) */}
            <a className="flex items-center gap-2 rounded-md bg-gray-200 px-3 py-2" href="#">
              <i className="fas fa-columns text-gray-600 text-sm" />
              Dashboard principal
            </a>
            <a className="flex items-center gap-2 rounded-md hover:bg-gray-100 px-3 py-2" href="#">
              <i className="fas fa-bookmark text-gray-600 text-sm" />
              Sesiones guardadas
            </a>
            <a className="flex items-center gap-2 rounded-md hover:bg-gray-100 px-3 py-2" href="#">
              <i className="fas fa-exchange-alt text-gray-600 text-sm" />
              Conexiones
            </a>
          </nav>

          {/* Lista de espacios de trabajo */}
          <span className="uppercase text-[11px] text-gray-500 font-light mb-1">Spaces</span>
          <nav className="flex flex-col gap-1 text-xs flex-grow overflow-y-auto">
            {/* Array de espacios con iconos y nombres */}
            {[
              ['fa-sync-alt', 'Nuevo espacio de trabajo'],
              ['fa-hashtag', 'Clase de Matematicas s...'],
              ['fa-hashtag', 'Reunión con el profesor...'],
              ['fa-hashtag', 'Clase de Literatura Orga...'],
              ['fa-hashtag', 'Clase Inteligencia Artific...'],
              ['fa-hashtag', 'Literatura y filosofía 1B S...']
            ].map(([icon, label]) => (
              <a
                key={label}
                className="flex items-center gap-2 rounded-md hover:bg-gray-100 px-3 py-2 truncate"
                href="#"
              >
                <i className={`fas ${icon} text-gray-600 text-sm`} />
                {label}
              </a>
            ))}
          </nav>

          {/* Área inferior: Banner PRO + Perfil de usuario */}
          <div className="mt-6 space-y-4">
            {/* Promoción de cuenta PRO */}
            <div className="p-3 border border-gray-300 rounded-lg text-xs text-blue-500">
              <div className="flex items-center gap-1 font-semibold mb-1">
                <i className="fas fa-magic" /> Prueba Picaso Pro
              </div>
              <p className="text-gray-500 mb-1">
                Pásate a Pro para ampliar tus límites y acceder a funciones premium.
              </p>
              <a className="text-blue-400 underline" href="#">+10 mejoras a tu cuenta</a>
            </div>

            {/* Perfil de usuario con avatar y botón de logout */}
            <div className="flex items-center gap-3 border border-gray-300 rounded-lg p-3">
              <img
                src="https://storage.googleapis.com/a1aa/image/670c5513-d859-4876-8612-b781dc7238a1.jpg"
                alt="avatar"
                className="w-10 h-10 rounded-md object-cover"
              />
              <div className="text-xs">
                <span className="font-semibold">{user?.name}</span><br />{user?.email}
              </div>
              <button onClick={logout} className={`${iconBtn} w-8 h-8 ml-auto`}>
                <i className="fas fa-sign-out-alt" />
              </button>
            </div>
          </div>
        </aside>

        {/* ÁREA PRINCIPAL - Contenido central de la aplicación */}
        <main className="flex flex-col flex-grow p-6 overflow-auto">
          {/* Header del área principal */}
          <div className="flex items-center space-x-3 mb-6 max-w-xs">
            <div className="border border-gray-300 rounded-md px-3 py-1 text-xs">Espacio / Trabajo</div>
            <button className={`${iconBtn} px-3 py-1 text-xs`}>Opciones</button>
          </div>

          {/* Estado vacío - Onboarding para nuevos usuarios */}
          <div className={`flex flex-col items-center flex-grow max-w-3xl mx-auto text-center ${dotPattern}`}>
            {/* Icono principal del estado vacío */}
            <div className={`${iconBtn} w-12 h-12 mx-auto mb-4`}>
              <i className="fas fa-archive text-lg" />
            </div>

            {/* Título y descripción del onboarding */}
            <h2 className="text-2xl font-semibold mb-1">Empieza transcribiendo un audio o vídeo</h2>
            <p className="text-gray-400 text-sm mb-10 max-w-sm">
              Arrastra, suelta y deja que la IA convierta tu voz en texto con precisión. Sube un archivo o graba desde tu micrófono.
            </p>

            {/* Pasos del proceso de onboarding */}
            {[1, 2].map((step) => (
              <div key={step} className="flex flex-col items-center w-full max-w-md">
                {/* Línea conectora entre pasos (excepto el primero) */}
                {step !== 1 && <div className="h-10 w-px bg-gray-200" />}
                
                {/* Número del paso */}
                <span className="flex items-center justify-center w-6 h-6 rounded-full border border-blue-300 bg-white text-blue-400 text-xs">
                  {step}
                </span>

                {/* Card del paso con contenido específico */}
                <div className={`mt-2 mb-10 w-full px-4 py-3 rounded-lg flex items-center gap-3 border 
                  ${step === 1 ? 'border-blue-400 shadow-[0_0_0_2px_rgba(59,130,246,0.25)]' : 'border-gray-300'}
                  bg-white`}>
                  <div className={`${iconBtn} w-10 h-10`}>
                    <i className={step === 1 ? 'fas fa-search' : 'fas fa-film'} />
                  </div>
                  <div className="text-left text-xs">
                    <div className="font-semibold flex items-center gap-1">
                      {step === 1 ? 'Importemos una Rubrica' : 'Importemos una grabación o video'}
                      <i className="fas fa-info-circle text-gray-400 text-xs" />
                    </div>
                    <div className="text-gray-400 mt-0.5">
                      {step === 1
                        ? 'Comencemos por el análisis de tu conversación'
                        : 'Importa alguna conversación para comenzar'}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Box de tutorial con botón de reproducción */}
            <div className="w-full max-w-md h-40 rounded-lg border border-gray-300 bg-white shadow-[0_4px_8px_rgba(147,174,204,0.3)] flex flex-col items-center justify-center text-gray-400 text-xs">
              <p className="mb-6">Aprende a utilizar <span className="font-medium">picaso.app</span> aquí</p>
              <button className={`${iconBtn} w-11 h-11`}>
                <i className="fas fa-play" />
              </button>
            </div>
          </div>
        </main>

        {/* SIDEBAR DERECHO - Chat y herramientas auxiliares */}
        <aside className="w-72 min-w-[288px] flex flex-col border-l border-gray-200 p-4">
          {/* Header del espacio de trabajo actual */}
          <div className="border border-gray-300 rounded-lg p-3 mb-6 text-xs">
            <div className="font-semibold">Espacio de trabajo sin título</div>
            <div className="flex items-center space-x-2 text-gray-400 mt-1">
              <i className="far fa-calendar-alt" />
              <span>Jun 8 • 9:49 pm</span>
              <i className="fas fa-user-friends ml-2" />
              <span>1</span>
            </div>
          </div>

          {/* Navegación por tabs: Chat / Otros */}
          <div className="flex items-center space-x-4 mb-6 text-xs">
            <button className="bg-blue-200 text-blue-500 rounded px-3 py-1">Chat</button>
            <button className={`${iconBtn} px-3 py-1 text-xs`}>Otros</button>
            <button className={`${iconBtn} w-8 h-8 ml-auto`}>
              <i className="fas fa-info-circle" />
            </button>
          </div>

          {/* Estado vacío del chat - Información sobre la IA */}
          <div className="flex flex-col items-center flex-grow text-center">
            <img
              src="https://storage.googleapis.com/a1aa/image/1ecc8de3-4e8b-4337-e0ca-765017e9d14f.jpg"
              alt="AI logo"
              className="w-20 h-20 rounded-full mb-2"
            />
            <div className="text-blue-400 text-sm mb-2">picaso AI</div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Tu asistente de IA te ayudará a transcribir y analizar contenido una vez que cargues algo.
            </p>
          </div>
          
          {/* Input de chat con botones de acción */}
          <form className="flex items-center space-x-2 border border-gray-300 rounded-full px-3 py-2 mt-6">
            {/* Botón de funciones especiales/magia */}
            <button 
              type="button" 
              className="flex items-center justify-center w-8 h-8 bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-800 rounded-full transition-all duration-200 flex-shrink-0"
            >
              <i className="fas fa-magic text-sm" />
            </button>
            {/* Campo de entrada de texto */}
            <input
              placeholder="Escribe algo..."
              className="flex-grow text-xs placeholder-gray-400 bg-transparent focus:outline-none min-w-0"
            />
            {/* Botón de envío */}
            <button 
              type="submit" 
              className="flex items-center justify-center w-8 h-8 bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-800 rounded-full transition-all duration-200 flex-shrink-0"
            >
              <i className="fas fa-arrow-up text-sm" />
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}
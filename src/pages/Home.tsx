import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  useEffect(() => {
    document.title = 'nameapp.ai';
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-50 flex font-[Inter]">
      {/* -------- SIDEBAR -------- */}
      <aside className="w-[280px] flex flex-col justify-between border-r border-black/10 bg-white">
        {/* top */}
        <div>
          <div className="flex items-center gap-2 px-6 py-4">
            <div className="w-7 h-7 rounded-md border border-blue-500" />
            <span className="text-blue-600 text-xs">nameapp.ai</span>

            {/* campana clara */}
            <button
              aria-label="Notificaciones"
              className="ml-auto rounded-md p-[6px] text-blue-600 hover:bg-blue-50 transition"
            >
              <i className="fas fa-bell" />
            </button>
          </div>

          {/* buscador claro */}
          <form className="px-6 py-2">
            <label htmlFor="search" className="sr-only">
              Buscar
            </label>
            <div className="relative text-xs">
              <input
                id="search"
                type="search"
                placeholder="Busca algo por aquí…"
                className="w-full bg-gray-100 pl-8 pr-2 py-1 rounded border border-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <i className="fas fa-search absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs" />
            </div>
          </form>

          {/* secciones */}
          <div className="px-6 mt-6 text-[10px] text-gray-500">Main</div>
          <nav className="flex flex-col gap-1 px-6 mt-2 text-[11px]">
            <a className="flex items-center gap-2 rounded-md bg-blue-100 text-blue-700 px-3 py-2" href="#">
              <i className="fas fa-th-large text-xs" />
              Dashboard principal
            </a>
            <a className="flex items-center gap-2 rounded-md hover:bg-gray-100 px-3 py-2" href="#">
              <i className="far fa-bookmark text-xs" />
              Sesiones guardadas
            </a>
            <a className="flex items-center gap-2 rounded-md hover:bg-gray-100 px-3 py-2" href="#">
              <i className="fas fa-exchange-alt text-xs" />
              Conexiones
            </a>
          </nav>

          <div className="px-6 mt-6 mb-2 text-[10px] text-gray-500">Spaces</div>
          <nav className="flex flex-col gap-1 px-6 text-[11px]">
            {[
              'Nuevo espacio de trabajo',
              'Clase de Matemáticas s…',
              'Reunión con el profesor…',
              'Clase de Literatura Orga…',
              'Clase Inteligencia Artific…',
              'Literatura y filosofía 1B S…'
            ].map((l, i) => (
              <a
                key={i}
                href="#"
                className="flex items-center gap-2 rounded-md hover:bg-gray-100 px-3 py-2 truncate"
              >
                <i className={`fas ${i === 0 ? 'fa-sync-alt' : 'fa-hashtag'} text-xs`} />
                {l}
              </a>
            ))}
          </nav>
        </div>

        {/* bottom */}
        <div className="mb-6 px-6 space-y-2">
          <button
            type="button"
            className="w-full border border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md py-3 text-[10px] font-medium"
          >
            ¡Mejora a Premium!
          </button>

          {/* user + logout */}
          <div className="w-full flex items-center gap-3 border border-gray-200 rounded-md py-2 px-3">
            <img
              src="https://storage.googleapis.com/a1aa/image/cde48156-c7e0-479b-fe9e-a80862dbb662.jpg"
              alt="avatar"
              className="rounded w-6 h-6"
            />
            <div className="leading-tight">
              <span className="text-[11px] font-semibold text-black">{user?.name}</span>
              <br />
              <span className="text-[9px] text-gray-500">{user?.email}</span>
            </div>
            <button
              onClick={logout}
              className="ml-auto text-[10px] text-red-500 hover:text-red-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      </aside>

      {/* -------- MAIN -------- */}
      <main className="flex-1 overflow-auto flex flex-col items-center">
        <div className="w-full max-w-[640px] px-6 py-10">
          {/* saludo en negro */}
          <h1 className="text-xl font-semibold text-black text-center mb-8">
            ¡Bienvenido, {user?.name}! <span className="animate-wave">👋</span>
          </h1>

          {/* icono */}
          <div className="w-12 h-12 rounded-md border border-gray-200 flex items-center justify-center mx-auto mb-6">
            <img
              src="https://storage.googleapis.com/a1aa/image/b8fbae88-eb8b-4f73-a7ac-0e2d3c733944.jpg"
              alt="folder"
              className="w-5 h-5"
            />
          </div>

          <p className="text-center text-[12px] text-gray-500 mb-10">
            Arrastra, suelta y deja que la IA convierta tu voz en texto con precisión. Sube un
            archivo o graba desde tu micrófono.
          </p>

          {/* tarjetas */}
          <div className="flex flex-col gap-8">
            {[
              {
                title: 'Importemos una Rubrica',
                desc: 'Comencemos por el análisis de tu conversación',
                icon:
                  'https://storage.googleapis.com/a1aa/image/6afceb79-bac9-4895-bd57-c3cfcd05fbf2.jpg',
                border: 'border-blue-300'
              },
              {
                title: 'Importemos una grabación o video',
                desc: 'Importa alguna conversación para comenzar',
                icon:
                  'https://storage.googleapis.com/a1aa/image/810ed79f-0475-4114-76df-ed425dcb1887.jpg',
                border: 'border-gray-200'
              }
            ].map((c, i) => (
              <div
                key={i}
                className={`border ${c.border} rounded-lg px-4 py-3 flex items-center gap-3 hover:bg-gray-50 cursor-pointer`}
              >
                <div className="w-10 h-10 rounded-md border border-gray-200 flex items-center justify-center">
                  <img src={c.icon} className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-[11px]">
                  <span className="font-semibold">{c.title}</span>
                  <span className="text-gray-500">{c.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* caja tutorial más grande */}
          <div className="mt-16 w-full max-w-[480px] h-[160px] rounded-lg border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-4 text-gray-500 text-[11px] mx-auto">
            <span>
              Aprende a utilizar <span className="font-medium">name.app</span> aquí
            </span>

            {/* botón play claro */}
            <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition">
              <i className="fas fa-play text-gray-600" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

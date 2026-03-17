import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loguear } from "../Services/AuthService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const InicioSesion = async (e) => {
    e.preventDefault();

    const { error } = await Loguear(email, password);

    if (error) {
      alert(error.message);
    } else {
      alert("Login exitoso");
      navigate("/PaginaPrincipal");
    }
  };

  return (
    <main className="app-shell flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_25%,rgba(137,85,40,0.16),transparent_18%),radial-gradient(circle_at_82%_22%,rgba(234,211,172,0.07),transparent_16%),linear-gradient(180deg,rgba(9,6,4,0)_0%,rgba(9,6,4,0.3)_100%)]" />

      <section className="grid w-full max-w-[1120px] gap-8 lg:grid-cols-[0.95fr_0.75fr]">
        <div className="app-panel hidden min-h-[640px] flex-col justify-between p-8 lg:flex">
          <div>
            <span className="app-kicker">Acceso al catalogo</span>
            <h1 className="app-title mt-5 max-w-lg text-[58px] leading-[0.95] tracking-[-0.05em]">
              Entra al panel con la misma atmosfera del catalogo principal.
            </h1>
            <p className="app-copy mt-5 max-w-xl text-[15px] leading-8">
              Administra juegos, explora categorias y trabaja sobre una interfaz
              consistente, oscura y mas actual.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="app-panel-soft p-5">
              <p className="text-[28px] font-semibold text-[#f6efe4]">Catalogo</p>
              <p className="mt-2 text-sm text-[#aa957f]">Busqueda, destacado y carruseles.</p>
            </div>
            <div className="app-panel-soft p-5">
              <p className="text-[28px] font-semibold text-[#f6efe4]">CRUD</p>
              <p className="mt-2 text-sm text-[#aa957f]">Crear, editar y eliminar juegos.</p>
            </div>
            <div className="app-panel-soft p-5">
              <p className="text-[28px] font-semibold text-[#f6efe4]">Sesion</p>
              <p className="mt-2 text-sm text-[#aa957f]">Acceso con Supabase.</p>
            </div>
          </div>
        </div>

        <div className="app-panel w-full p-8 md:p-10">
          <div className="mb-8">
            <span className="app-kicker">Iniciar sesion</span>
            <h2 className="app-title mt-4 text-4xl">Bienvenido de vuelta</h2>
            <p className="app-copy mt-3 text-sm leading-7">
              Accede al panel para continuar gestionando el catalogo.
            </p>
          </div>

          <form className="space-y-5" onSubmit={InicioSesion}>
            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8a38d]">
                Correo
              </label>
              <input
                className="app-input"
                placeholder="usuario@correo.com"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8a38d]">
                Contrasena
              </label>
              <input
                className="app-input"
                placeholder="••••••••"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="app-button-primary mt-3 w-full" type="submit">
              Iniciar sesion
            </button>
          </form>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-sm text-[#9d8770]">
            <a className="transition hover:text-[#f2dfbf]" href="/">
              Volver al inicio
            </a>
            <p>
              No tienes cuenta?
              <a className="ml-1 text-[#ead3ac] transition hover:text-[#f2dfbf]" href="/Register">
                Registrate
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;

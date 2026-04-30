import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/index";

export default function ResetPassword() {
    const [params] = useSearchParams();
    const token = params.get("token") ?? "";
    const navigate = useNavigate();
    
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const handleSubmit = async () => {
        if (password !== confirm) return setError("Contraseñas no coinciden");
        if (password.length < 6) return setError("La contraseña debe tener minimo 6 caracteres");

        setLoading(true);
        setError("");

        try {
            await api.post("/auth/reset-password", {
                token,
                nueva_contrasena: password,
            });
            navigate("/login");
        } catch {
            setError("Token invalido o expirado, solicita un nuevo correo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div>
                    <h2>Nueva contraseña</h2>
                    <label>Nueva contraseña</label>
                    <input onChange={e => setPassword(e.target.value)}/>

                    <label>Confirmar contraseña</label>
                    <input onChange={e => setConfirm(e.target.value)} />

                    {error && <p>{error}</p>}

                    <button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Guardando..." : "Cambiar contraseña"}
                    </button>
                </div>
            </div>
        </>
    )
}
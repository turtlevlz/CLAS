import { useState } from "react";
import Footer from "../components/Footer";

export default function ForgotPswd() {
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        console.log({ email });
    }

    return (
        <>
            <div className="min-h-screen flex flex-col">
                <main className="flex-1 bg-gray-50 p-10">
                    <a href="/login" className='inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-8'>← Volver al login</a>
                        <div className='grid gap-8 max-w-xl mx-auto'>
                            <div> 

                                <div className="flex flex-col items-center p-8">
                                        <div className="w-[50px] h-[50px] border-[3px] border-black flex items-center justify-center relative before:content-[''] before:absolute before:w-[65px] before:h-[3px] before:bg-black before:rotate-45 after:content-[''] after:absolute after:w-[65px] after:h-[3px] after:bg-black after:-rotate-45" />
                                        <span className="font-heading font-bold text-5xl text-black leading-none">CLAS</span>
                                        <span className="font-heading font-light text-xl text-text-muted">Cluster Automotriz De Sonora</span>
                                </div>

                                <p className="text-center text-xl pb-5">Herramienta de recuperación de contraseña</p>
                                <p className="text-center text-l pb-5">Ingrese su correo electrónico y se enviará un correo con instrucciones para recuperar su contraseña</p>

                                <label className='block text-sm text-gray-500 mb-1'>Correo Electrónico</label>
                                <input 
                                type='email' 
                                placeholder='usuario@dominio.com' 
                                value={email} 
                                onChange={e => setEmail(e.target.value)}
                                className='w-full px-3 py-2 text-m border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400'/>

                                <button onClick={handleSubmit} className='mb-15 w-full mt-4 bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors'>
                                    Enviar correo de recuperación
                                </button>
                            </div>

                        </div>            
                </main>
                <Footer/>
            </div>
        </>
    )
}
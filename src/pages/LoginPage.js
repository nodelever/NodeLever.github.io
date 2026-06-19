// import React, { useState, useEffect } from 'react';
// import { Mail, Lock, Eye, EyeOff, ArrowRight, Globe, Loader2, AlertCircle, Home } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';
// import { useNavigate, Link } from 'react-router-dom';

// const FloatingOrb = ({ delay, size, color, mousePosition }) => (
//   <div 
//     className="absolute rounded-full blur-[100px] opacity-20 animate-pulse pointer-events-none"
//     style={{
//       width: size,
//       height: size,
//       background: color,
//       animationDelay: `${delay}s`,
//       animationDuration: '6s',
//       transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`,
//       transition: 'transform 0.2s ease-out'
//     }}
//   />
// );

// const AnimatedBackground = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   return (
//     <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#030014]">
//       {/* Deep Background Orbs */}
//       <FloatingOrb delay={0} size="600px" color="#4F46E5" mousePosition={mousePosition} />
//       <FloatingOrb delay={2} size="500px" color="#7C3AED" mousePosition={mousePosition} />
//       <FloatingOrb delay={4} size="400px" color="#06B6D4" mousePosition={mousePosition} />
      
//       {/* Scanline Effect */}
//       <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_51%)] bg-[length:100%_4px] pointer-events-none opacity-[0.03]" />
      
//       {/* Grid with perspective */}
//       <div className="absolute inset-0 opacity-20 [perspective:1000px]">
//         <div 
//           className="absolute inset-0" 
//           style={{
//             backgroundImage: `linear-gradient(rgba(139,92,246,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.2) 1px, transparent 1px)`,
//             backgroundSize: '40px 40px',
//             transform: 'rotateX(60deg) translateY(-100px)',
//             maskImage: 'linear-gradient(to bottom, transparent, black)'
//           }} 
//         />
//       </div>
//     </div>
//   );
// };

// export default function LangwageLogin() {
//   const { login } = useAuth();    
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');

//   useEffect(() => { setIsVisible(true); }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email || !password) return setErrorMsg('Identity credentials required.');
//     setIsLoading(true);
//     setErrorMsg('');

//     try {
//       const response = await fetch('https://the-king-backend.onrender.com/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         login(data.token, { email: data.user.email, firstName: data.user.firstName });
//         navigate('/dash');
//       } else {
//         setErrorMsg(data.message || 'Access Denied: Invalid Authentication.');
//       }
//     } catch (error) {
//       setErrorMsg('System Offline: Connection Failed.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen relative flex items-center justify-center py-12 px-4 selection:bg-purple-500/30">
//       <AnimatedBackground />

//       {/* --- HOME NAVIGATION --- */}
//       <Link 
//         to="/" 
//         className="absolute top-8 left-8 z-50 flex items-center gap-2 px-5 py-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all backdrop-blur-xl group"
//       >
//         <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
//         <span className="text-xs uppercase tracking-widest font-semibold">Terminal</span>
//       </Link>

//       {/* --- ERROR MODAL --- */}
//       {errorMsg && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
//           <div className="bg-[#0c0a15] w-full max-w-sm rounded-3xl border border-red-500/50 p-8 shadow-[0_0_50px_rgba(239,68,68,0.2)] animate-in zoom-in-95 duration-200">
//             <div className="flex flex-col items-center text-center">
//               <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 border border-red-500/20 shadow-inner">
//                 <AlertCircle className="w-7 h-7 text-red-500" />
//               </div>
//               <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Authentication Error</h3>
//               <p className="text-gray-400 text-sm leading-relaxed mb-8">{errorMsg}</p>
//               <button
//                 onClick={() => setErrorMsg('')}
//                 className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 py-3 rounded-xl transition-all border border-red-500/30 font-bold uppercase tracking-widest text-xs"
//               >
//                 Retry Auth
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Login Card */}
//       <div className={`relative z-40 w-full max-w-[440px] transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
        
//         {/* Glow behind card */}
//         <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-[2rem] blur opacity-20" />
        
//         <div className="relative bg-[#0c0a15]/80 backdrop-blur-2xl rounded-[2rem] p-10 border border-white/10 shadow-2xl">
          
//           {/* Header */}
//           <div className="text-center mb-10">
//             <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-white/5 mb-6 shadow-inner">
//               <Globe className="w-10 h-10 text-purple-400 animate-[pulse_4s_infinite]" />
//             </div>
//             <h1 className="text-4xl font-black tracking-tighter mb-3 italic">
//               <span className="bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">LANG</span>
//               <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">WAGE</span>
//             </h1>
//             <p className="text-gray-500 text-sm font-medium tracking-wide uppercase">Neural Link Established</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Input Groups */}
//             <div className="space-y-4">
//               <div className="group relative">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
//                 </div>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="block w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/10 rounded-2xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all"
//                   placeholder="Network Email"
//                   required
//                 />
//               </div>

//               <div className="group relative">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="block w-full pl-12 pr-12 py-4 bg-white/[0.03] border border-white/10 rounded-2xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all"
//                   placeholder="Access Code"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
//                 >
//                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center justify-between px-1">
//               <label className="flex items-center gap-2 cursor-pointer group">
//                 <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-purple-500 transition-all cursor-pointer" />
//                 <span className="text-[11px] uppercase tracking-wider font-bold text-gray-500 group-hover:text-gray-300">Keep Logged</span>
//               </label>
//               <Link to="/forgot-password" size="sm" className="text-[11px] uppercase tracking-wider font-bold text-purple-400 hover:text-purple-300">
//                 Reset Access
//               </Link>
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full relative group overflow-hidden rounded-2xl py-4 transition-all"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 group-hover:scale-105 transition-transform duration-500" />
//               <div className="relative flex items-center justify-center gap-3 text-white font-black uppercase tracking-[0.2em] text-sm">
//                 {isLoading ? (
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                 ) : (
//                   <>Authorize <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
//                 )}
//               </div>
//             </button>
//           </form>

//           <div className="mt-10 text-center">
//             <p className="text-gray-500 text-[11px] uppercase tracking-[0.15em] font-medium">
//               New to the system?{' '}
//               <Link to="/reg" className="text-white hover:text-cyan-400 font-black transition-colors underline underline-offset-4 decoration-purple-500/50">
//                 Initialize Account
//               </Link>
//             </p>
//           </div>
//         </div>

//         <p className="text-center mt-8 text-[10px] text-gray-600 uppercase tracking-[0.3em] font-bold">
//           © 2026 Langwage Neural Systems // Secured Connection
//         </p>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Globe, Eye, EyeOff, ArrowRight, Loader2, AlertCircle, Home } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const loginStyles = `
  /* Shared Keyframes */
  @keyframes glow-in { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  
  /* Container & Backgrounds */
  .nl-reg-wrapper {
    background: #0b0d14;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-family: sans-serif;
    overflow: hidden;
    padding: 20px;
  }
  .nl-grid-bg { position:absolute;inset:0; background-image:linear-gradient(rgba(120,80,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(120,80,255,.07) 1px,transparent 1px); background-size:44px 44px; pointer-events:none; z-index: 1; }
  
  .nl-glow-orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.3; z-index: 0; pointer-events: none; transition: transform 0.2s ease-out; }
  .nl-glow-1 { top: -10%; left: -10%; width: 50vw; height: 50vw; background: rgba(124,58,237, 0.4); max-width: 600px; max-height: 600px; }
  .nl-glow-2 { bottom: -10%; right: -10%; width: 40vw; height: 40vw; background: rgba(14,165,233, 0.3); max-width: 500px; max-height: 500px; }

  /* Top Navigation */
  .nl-back-nav { position: absolute; top: 32px; left: 32px; z-index: 10; background: rgba(255,255,255,.03); border: 0.5px solid rgba(255,255,255,.08); border-radius: 24px; padding: 10px 20px; color: rgba(255,255,255,.6); font-size: 13px; font-weight: 500; text-decoration: none; display: flex; align-items: center; gap: 8px; transition: all .2s; backdrop-filter: blur(8px); }
  .nl-back-nav:hover { background: rgba(255,255,255,.08); color: #fff; transform: translateY(-1px); border-color: rgba(255,255,255,.15); }

  /* Main Form Card */
  .nl-reg-card {
    background: rgba(255,255,255,.03);
    border: 0.5px solid rgba(255,255,255,.08);
    border-radius: 20px;
    padding: 48px 40px;
    width: 100%;
    max-width: 440px;
    position: relative;
    z-index: 5;
    backdrop-filter: blur(16px);
    animation: glow-in .6s ease both;
    box-shadow: 0 24px 48px rgba(0,0,0,.4);
  }
  
  /* Headers */
  .nl-reg-header { text-align: center; margin-bottom: 32px; }
  .nl-reg-icon { display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; border-radius: 16px; background: rgba(124,58,237,.12); border: 0.5px solid rgba(167,139,250,.3); margin-bottom: 20px; color: #a78bfa; }
  .nl-reg-title { font-size: 32px; font-weight: 500; color: #fff; margin-bottom: 8px; letter-spacing: -0.5px; }
  .nl-reg-title em { font-style: normal; background: linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .nl-reg-sub { font-size: 15px; color: rgba(255,255,255,.5); }

  /* Form Elements */
  .nl-form-group { margin-bottom: 18px; text-align: left; }
  .nl-label { display: block; font-size: 13px; color: rgba(255,255,255,.6); margin-bottom: 8px; font-weight: 500; }
  .nl-input-wrapper { position: relative; display: flex; align-items: center; }
  .nl-input { width: 100%; background: rgba(0,0,0,.3); border: 0.5px solid rgba(255,255,255,.12); border-radius: 12px; padding: 14px 16px; color: #fff; font-size: 14px; outline: none; transition: all .2s; box-sizing: border-box; }
  .nl-input:focus { border-color: #a78bfa; background: rgba(0,0,0,.5); box-shadow: 0 0 0 1px rgba(167,139,250,.2); }
  .nl-input::placeholder { color: rgba(255,255,255,.25); }
  .nl-input-icon-btn { position: absolute; right: 12px; background: none; border: none; color: rgba(255,255,255,.4); cursor: pointer; padding: 4px; display: flex; align-items: center; transition: color .2s; }
  .nl-input-icon-btn:hover { color: #fff; }

  /* Checkbox & Small Links */
  .nl-checkbox-wrapper { display: flex; align-items: center; justify-content: space-between; margin-top: 20px; }
  .nl-checkbox-label { display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(255,255,255,.6); cursor: pointer; }
  .nl-checkbox { appearance: none; width: 16px; height: 16px; border: 1px solid rgba(255,255,255,.2); border-radius: 4px; background: rgba(0,0,0,.3); cursor: pointer; position: relative; transition: all .2s; }
  .nl-checkbox:checked { background: #7c3aed; border-color: #7c3aed; }
  .nl-checkbox:checked::after { content: ''; position: absolute; left: 4px; top: 1px; width: 4px; height: 8px; border: solid white; border-width: 0 2px 2px 0; transform: rotate(45deg); }
  
  .nl-link { color: #a78bfa; text-decoration: none; transition: color .2s; font-weight: 500; cursor: pointer; }
  .nl-link:hover { color: #c4b5fd; }

  /* Buttons */
  .nl-btn-primary { background: linear-gradient(135deg, #7c3aed, #0ea5e9); border: none; border-radius: 24px; padding: 14px 28px; color: #fff; font-size: 14px; font-weight: 500; cursor: pointer; transition: opacity .2s, transform .15s; width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 28px; }
  .nl-btn-primary:hover { opacity: .88; transform: translateY(-1px); }
  .nl-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  /* Footers */
  .nl-footer-text { margin-top: 28px; text-align: center; font-size: 13px; color: rgba(255,255,255,.4); }
  .nl-footer-text .nl-link { font-weight: 400; }

  /* Error Modal */
  .nl-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.7); backdrop-filter: blur(8px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; }
  .nl-modal { background: #0b0d14; border: 1px solid rgba(239,68,68,.3); border-radius: 20px; padding: 32px; width: 100%; max-width: 360px; text-align: center; position: relative; overflow: hidden; animation: glow-in .3s ease both; box-shadow: 0 20px 40px rgba(0,0,0,.6); }
  .nl-modal-glow { position: absolute; top: -20px; left: 50%; transform: translateX(-50%); width: 120px; height: 120px; background: rgba(239,68,68,.2); filter: blur(40px); border-radius: 50%; pointer-events: none; }
  .nl-modal-icon { width: 48px; height: 48px; border-radius: 50%; background: rgba(239,68,68,.1); border: 1px solid rgba(239,68,68,.2); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: #ef4444; position: relative; z-index: 1; }
  .nl-modal-title { font-size: 18px; font-weight: 500; color: #fff; margin-bottom: 8px; position: relative; z-index: 1; }
  .nl-modal-text { font-size: 14px; color: rgba(255,255,255,.5); margin-bottom: 24px; position: relative; z-index: 1; line-height: 1.5; }
  .nl-modal-btn { background: rgba(255,255,255,.05); border: 0.5px solid rgba(255,255,255,.15); border-radius: 24px; padding: 12px 24px; color: #fff; font-size: 14px; cursor: pointer; transition: all .2s; width: 100%; position: relative; z-index: 1; }
  .nl-modal-btn:hover { background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.3); }
`;

export default function LangwageLogin() {
  const { login } = useAuth();    
  const navigate = useNavigate();
  
  const [injected, setInjected] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Inject styles matching the pattern
  useEffect(() => {
    if (!injected) {
      const tag = document.createElement('style');
      tag.textContent = loginStyles;
      document.head.appendChild(tag);
      setInjected(true);
    }
  }, [injected]);

  // Ambient mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth - 0.5) * 40, 
        y: (e.clientY / window.innerHeight - 0.5) * 40 
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }
    
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('https://the-king-backend-cutd.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        login(data.token, { email: data.user.email, firstName: data.user.firstName });
        navigate('/dash');
      } else {
        setErrorMsg(data.message || 'Invalid email or password.');
      }
    } catch (error) {
      setErrorMsg('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="nl-reg-wrapper">
      <div className="nl-grid-bg" />
      
      {/* Background Ambient Orbs linked to mouse */}
      <div 
        className="nl-glow-orb nl-glow-1" 
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }} 
      />
      <div 
        className="nl-glow-orb nl-glow-2" 
        style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }} 
      />

      {/* Floating Home Nav */}
      <Link to="/" className="nl-back-nav">
        <Home size={16} /> Home
      </Link>
      
      {/* Error Modal */}
      {errorMsg && (
        <div className="nl-modal-overlay">
          <div className="nl-modal">
            <div className="nl-modal-glow" />
            <div className="nl-modal-icon">
              <AlertCircle size={24} />
            </div>
            <h3 className="nl-modal-title">Notice</h3>
            <p className="nl-modal-text">{errorMsg}</p>
            <button onClick={() => setErrorMsg('')} className="nl-modal-btn">
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Main Login Card */}
      <div className="nl-reg-card">
        <div className="nl-reg-header">
          <div className="nl-reg-icon">
            <Globe size={28} />
          </div>
          <h1 className="nl-reg-title">
            Access <em>NodeLever</em>
          </h1>
          <p className="nl-reg-sub">Sign in to continue.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="nl-form-group">
            <label className="nl-label">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="nl-input"
              required
            />
          </div>

          <div className="nl-form-group">
            <label className="nl-label">Password</label>
            <div className="nl-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="nl-input"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="nl-input-icon-btn"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="nl-checkbox-wrapper">
            <label className="nl-checkbox-label">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="nl-checkbox" 
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="nl-link" style={{ fontSize: '13px' }}>
              Forgot password?
            </Link>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="nl-btn-primary"
          >
            {isLoading ? (
              <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Authenticating...</>
            ) : (
              <>Sign In <ArrowRight size={16} /></>
            )}
          </button>
        </form>

        {/* Footer Text */}
        <div className="nl-footer-text">
          Don't have an account? <Link to="/reg" className="nl-link">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
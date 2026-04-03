import './index.css'
import { BentoGrid } from "@mahalisunil1/bento-grid"

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 py-8 md:py-24 font-sans bg-[#09090b]">
       <div className="w-full max-w-6xl space-y-8">
           <header className="space-y-3">
               <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Real-World Integration Test</h1>
               <p className="text-white/60 font-mono text-xs md:text-sm">npm install @mahalisunil1/bento-grid @mahalisunil1/tokens @mahalisunil1/utils</p>
           </header>
           
           <main className="w-full">
               <BentoGrid enableMechanics={true} />
           </main>

           <footer className="pt-12 pb-4 text-center text-white/30 text-xs uppercase tracking-widest">
               Vite + React sandbox consuming local workspace packages
           </footer>
       </div>
    </div>
  )
}

export default App

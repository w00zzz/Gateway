
import './globals.css'
import './css/custom.css'
import './css/bootstrap.min.css'



export const metadata = {
  title: 'Panel de Administracion',
  description: 'Puertas de enlace y dispocitivos',
}
 
export default function RootLayout({
children, }: 
{ children: React.ReactNode }) 
{
  return (
    <>
      <html lang="en">
      
        <body>
          
          {children}

        </body>
        
      </html>
    </>
    
    
  )
}

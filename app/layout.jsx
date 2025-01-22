import '../styles/globals.css';
import Footer from '@/components/Footer';
import 'w3-css'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { AuthProvider } from '@/components/AuthContext';
import '../styles/fonts.css';

export const metadata = {
  title: 'Kitchen Store',
  description: 'Find the best Kitchenware for your home Kitchen',
};

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body className="flex flex-col min-h-screen m-0 p-0">
        <AuthProvider>
          <main className="flex-grow">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
};


export default RootLayout;

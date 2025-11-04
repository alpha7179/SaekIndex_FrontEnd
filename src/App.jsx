/* src/App.jsx */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Pages
import HomePage from './pages/HomePage';
import AnalyzePage from './pages/AnalyzePage';
import VisualizationPage from './pages/VisualizationPage';
import AdminPage from './pages/AdminPage';
import StatsPage from './pages/StatsPage'; 

// Components
import Header from './components/Header';
import Footer from './components/Footer'; 
import NotFound from './components/NotFound';
import ErrorBoundary from './components/ErrorBoundary';

// Styles
import GlobalStyles from './styles/GlobalStyles';
import { DEFAULT_CONFIG } from './constants';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: DEFAULT_CONFIG.QUERY.STALE_TIME,
      retry: DEFAULT_CONFIG.QUERY.RETRY,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GlobalStyles />
        <div className="app">
          <Header />
          <main className="main-content">
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/analyze" element={<AnalyzePage />} />
                <Route path="/visualization" element={<VisualizationPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/stats" element={<StatsPage />} /> 
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </main>
          <Footer />
        </div>
        <ToastContainer
          position={DEFAULT_CONFIG.TOAST.POSITION}
          autoClose={DEFAULT_CONFIG.TOAST.AUTO_CLOSE}
          theme="light"
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
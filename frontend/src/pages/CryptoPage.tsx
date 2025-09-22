import React from 'react';
import CryptoPrices from '../components/CryptoPrices';

const CryptoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Crypto Live Prices
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Monitorea los precios de criptomonedas en tiempo real con actualizaciones instantáneas
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CryptoPrices />
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">₿</span>
              </div>
              <span className="text-lg font-semibold text-gray-800">CryptoLive</span>
            </div>
            <p className="text-gray-500 text-sm">
              Plataforma de monitoreo de criptomonedas en tiempo real
            </p>
            <div className="mt-4 flex items-center justify-center space-x-6 text-xs text-gray-400">
              <span>• Tiempo real</span>
              <span>• Actualizaciones automáticas</span>
              <span>• Datos precisos</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CryptoPage;

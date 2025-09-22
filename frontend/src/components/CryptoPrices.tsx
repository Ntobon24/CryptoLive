import React from 'react';
import { useCryptoPrices } from '../hooks/useCryptoPrices';

const CryptoPrices: React.FC = () => {
  const { prices, isConnected, error } = useCryptoPrices();

  const formatPrice = (price: number): string => {
    return price.toFixed(2);
  };

  const formatTime = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getPriceChangeColor = (_price: number): string => {
    return 'text-gray-700';
  };

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">Error</div>
          <p className="text-red-600 font-medium">{error}</p>
          <p className="text-gray-500 text-sm mt-1">Verificando conexión...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Precios en Tiempo Real</h2>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={`text-sm font-medium ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
              {isConnected ? 'Conectado' : 'Desconectado'}
            </span>
          </div>
        </div>
      </div>

      {prices.length === 0 ? (
        <div className="flex items-center justify-center p-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Esperando datos de precios...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {prices.map((crypto) => (
            <div
              key={crypto.symbol}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-800">
                  {crypto.symbol}
                </h3>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>

              <div className="mb-4">
                <p className={`text-2xl font-bold ${getPriceChangeColor(crypto.price)}`}>
                  ${formatPrice(crypto.price)}
                </p>
              </div>

              <div className="text-sm text-gray-500">
                <p className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {formatTime(crypto.timestamp)}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center text-xs text-gray-400">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                  Actualizado recientemente
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {prices.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Mostrando {prices.length} {prices.length === 1 ? 'moneda' : 'monedas'} • 
            Última actualización: {new Date().toLocaleTimeString('es-ES')}
          </p>
        </div>
      )}
    </div>
  );
};

export default CryptoPrices;

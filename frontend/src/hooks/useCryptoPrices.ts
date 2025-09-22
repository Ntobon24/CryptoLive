import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export interface CryptoPrice {
  symbol: string;
  price: number;
  timestamp: number;
}

export const useCryptoPrices = () => {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const connect = () => {
      try {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }

        socketRef.current = io('http://localhost:3001/crypto', {
          transports: ['websocket'],
          timeout: 10000,
        });

        const socket = socketRef.current;

        socket.on('connect', () => {
          console.log('Conectado al WebSocket de criptomonedas');
          setIsConnected(true);
          setError(null);
        });

        socket.on('disconnect', (reason) => {
          console.log('Desconectado del WebSocket:', reason);
          setIsConnected(false);
          
          if (reason !== 'io client disconnect') {
            reconnectTimeoutRef.current = setTimeout(() => {
              console.log('Intentando reconectar...');
              connect();
            }, 3000);
          }
        });

        socket.on('connect_error', (err) => {
          console.error('Error de conexión:', err);
          setError('Error de conexión al servidor');
          setIsConnected(false);
        });

        socket.on('crypto_update', (data: CryptoPrice | CryptoPrice[]) => {
          setPrices(prevPrices => {
            const newPrices = Array.isArray(data) ? data : [data];
            const updatedPrices = [...prevPrices];
            
            newPrices.forEach(newPrice => {
              const existingIndex = updatedPrices.findIndex(
                p => p.symbol === newPrice.symbol
              );
              
              if (existingIndex >= 0) {
                updatedPrices[existingIndex] = newPrice;
              } else {
                updatedPrices.push(newPrice);
              }
            });
            
            return updatedPrices.sort((a, b) => a.symbol.localeCompare(b.symbol));
          });
        });

      } catch (err) {
        console.error('Error al conectar:', err);
        setError('Error al establecer conexión');
      }
    };

    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return {
    prices,
    isConnected,
    error,
  };
};

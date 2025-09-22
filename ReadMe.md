# 🚀 CryptoLive

<div align="center">
  <img src="https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/NestJS-11.0.1-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-5.7.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/WebSocket-Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.io" />
</div>

<div align="center">
  <h3>📊 Dashboard de Criptomonedas en Tiempo Real</h3>
  <p>Monitorea los precios de Bitcoin y Ethereum con actualizaciones instantáneas a través de WebSockets</p>
</div>

---

## ✨ Características

- 🔄 **Actualizaciones en tiempo real** - Precios actualizados cada 5 segundos
- 📈 **Gráficos interactivos** - Visualización de datos con Recharts
- 🎨 **Diseño moderno** - Interfaz elegante con Tailwind CSS
- ⚡ **WebSockets** - Comunicación bidireccional instantánea
- 🔌 **API de Binance** - Datos precisos y confiables
- 🔄 **Reconexión automática** - Manejo robusto de conexiones


## 🚀 Instalación y Configuración

### Prerrequisitos

- **Node.js** >= 18.0.0
- **pnpm** (recomendado) o npm
- **Git**

### 1. Clonar el repositorio

```bash
git clone
cd CryptoLive
```

### 2. Instalar dependencias

```bash
# Backend
cd backend
pnpm install

# Frontend
cd ../frontend
pnpm install
```

### Ejecutar la aplicación

#### Backend (Terminal 1)
```bash
cd backend
pnpm start:dev
```
El servidor estará disponible en `http://localhost:3001`

#### Frontend (Terminal 2)
```bash
cd frontend
pnpm dev
```
La aplicación estará disponible en `http://localhost:5173`

## 🛠️ Tecnologías Utilizadas

### Backend
- **NestJS** - Framework Node.js escalable
- **Socket.io** - Comunicación en tiempo real
- **Axios** - Cliente HTTP para APIs
- **TypeScript** - Tipado estático
- **Jest** - Testing framework

### Frontend
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **Recharts** - Biblioteca de gráficos
- **Vite** - Build tool moderno
- **Socket.io Client** - Cliente WebSocket

## 📡 API y WebSockets

### Endpoints WebSocket

- **URL**: `ws://localhost:3001/crypto`
- **Eventos disponibles**:
  - `crypto_update` - Recibe actualizaciones de precios
  - `get_crypto_prices` - Solicita precios actuales

## 🌐 Fuente de Datos

La aplicación utiliza la **API pública de Binance** para obtener precios en tiempo real:

- `https://api.binance.com/api/v3/ticker/price`

## 📱 Características del Dashboard

- **Precios en tiempo real** de cryptomonedas
- **Indicadores de conexión** con el servidor
- **Gráficos interactivos** con Recharts
- **Manejo de errores** y reconexión automática


## 👨‍💻 Autor

**Nicolas Tobon**

- **Github:** https://github.com/Ntobon24




import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './css/bootstrap.min.css'
import './css/index.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { store } from './store.js'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import { Provider } from 'react-redux'
const queryClient = new QueryClient

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}> 
  <Provider store={store}> 
    <PayPalScriptProvider options={{ clientId: "AR7uMRn48N1pbZeC1jHonftv5k6Lq0cb58KIMSM9QJUm2u9NcLaVznlqHzEgz3baC_CNBG1m2Avv0EQl" }}> 
      <App />
    </PayPalScriptProvider>
  </Provider>
</QueryClientProvider>
);

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { ClicksProvider } from '../src/utils/ClicksContext.tsx'
import { ItemsProvider } from '../src/utils/ItemsContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClicksProvider>
      <ItemsProvider>
        <App />
      </ItemsProvider>
    </ClicksProvider>
  </StrictMode>,
)
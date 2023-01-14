import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from '@siakit/core'
import { DialogProvider } from '@siakit/dialog'
import { LoadingProvider } from '@siakit/loading'
import { ToastProvider } from '@siakit/toast'

import { App } from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider>
    <ToastProvider>
      <DialogProvider>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </DialogProvider>
    </ToastProvider>
  </Provider>,
)

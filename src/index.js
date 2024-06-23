import reportWebVitals from './reportWebVitals'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-utilities.min.css'
import 'react-quill/dist/quill.snow.css'
import App from './App'
import { Amplify } from 'aws-amplify'
import awsConfig from 'aws-exports'

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === '[::1]' ||
  // 127.0.0.1/8 is considered localhost for IPv4.
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
  ),
)

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [localRedirectSignIn,productionRedirectSignIn] =
  awsConfig.oauth.redirectSignIn.split(',')

const [localRedirectSignOut,productionRedirectSignOut] =
  awsConfig.oauth.redirectSignOut.split(',')

const updatedAwsConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: isLocalhost
      ? localRedirectSignIn
      : productionRedirectSignIn,
    redirectSignOut: isLocalhost
      ? localRedirectSignOut
      : productionRedirectSignOut,
  },
}

Amplify.configure(updatedAwsConfig)

const domNode = document.getElementById('root')
const root = createRoot(domNode)
root.render(<App />)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

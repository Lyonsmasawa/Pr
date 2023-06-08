import Footer from '@/components/Footer'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div>
      <div className="mb-auto">
      <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  )
}

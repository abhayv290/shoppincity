import Head from 'next/head'
import {Inter} from 'next/font/google'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({subsets: ['latin']})




export default function Home() {
  return (
    <div>
      <Head>
        <title>ShoppinCity: Where Every Click Unlocks a World of Fashion and More!</title>
        <meta name="description" content="Discover a world of endless shopping possibilities at ShoppinCity---your premier destination for curated collections, exclusive deals, and the latest trends. Immerse yourself in a seamless online shopping experience where convenience meets style. Join the shopping revolution today! " />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=7" />
        <link rel="shortcut icon" href="../../public/favicon1.ico" type="image/x-icon" />
      </Head>
      <main>
        <div>hey buddy</div>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </main>
    </div>
  )
}





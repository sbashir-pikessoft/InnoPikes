import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="canonical" href="https://www.creative-tim.com/product/blk-design-system-pro" />
        <link href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,600,700,800" rel="stylesheet" />
        <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
        <link href="/static/blk_Theme/css/nucleo-icons.css" rel="stylesheet" />
        <link href="/static/blk_Theme/css/blk-design-system-pro.min.css" rel="stylesheet" />
        <link href="/static/blk_Theme/demo/demo.css" rel="stylesheet" />
      </Head>
      <body className='landing-page'>
        <Main/>
        <NextScript>
          
        </NextScript>
      </body>
    </Html>
  )
}

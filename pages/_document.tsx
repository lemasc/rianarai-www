import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;700&family=Pattaya&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <meta name="theme-color" content="#000000"></meta>
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://rianarai.netlify.app/insider_card.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="title" content="RianArai 3.0 - Insider Program" />
          <meta
            name="description"
            content="ทดลองใช้งาน RianArai 3.0 ที่จะเปลี่ยนรูปแบบการเรียนออนไลน์ให้ดีขึ้นกว่าที่เคย"
          />
          <meta property="og:url" content="https://rianarai.netlify.app/insider" />
          <meta property="og:title" content="RianArai 3.0 - Insider Program" />
          <meta
            property="og:description"
            content="ทดลองใช้งาน RianArai 3.0 ที่จะเปลี่ยนรูปแบบการเรียนออนไลน์ให้ดีขึ้นกว่าที่เคย"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

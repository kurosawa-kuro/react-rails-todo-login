import React from "react"
import Header from "components/layouts/Header"

interface CommonLayoutProps {
  children: React.ReactElement
}

// 全てのページで共通となるレイアウト
const CommonLayout = ({ children }: CommonLayoutProps) => {

  return (
    <>
      <header>
        <Header />
      </header>
      <main style={{ marginTop: "3rem", maxWidth: "1200px", margin: "3rem auto", textAlign: "center" }}>
        {children}
      </main>
    </>
  )
}

export default CommonLayout

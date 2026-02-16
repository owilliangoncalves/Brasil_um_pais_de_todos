import Head from "next/head";
import React from "react";
import GeralPage from "@/pages/Geral";


export default function Geral() {

    return (
        <>
            <Head>
                {/* Título da página */}
                <title>Portal Cidadão de Olho - Visão Geral</title>

                {/* Meta descrição */}
                <meta
                    name="description"
                    content="Portal de transparência para controle social: receitas, despesas e dados abertos do governo brasileiro."
                />

                {/* Favicon */}
                <link rel="icon" href="/favicon.ico" />

                <meta property="og:title" content="Portal Cidadão de Olho" />
                <meta property="og:description" content="Portal de transparência para controle social." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://deolhocidadao.org" />
            </Head>
            <GeralPage/>
        </>
    );
}
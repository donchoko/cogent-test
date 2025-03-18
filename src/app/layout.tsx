import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import React from "react";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript defaultColorScheme="auto" />
                <link rel="shortcut icon" href="/favicon.svg" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
            </head>
            <body>{children}</body>
        </html>
    );
}

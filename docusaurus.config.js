// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import graphqlDocs from "./graphql.mjs";
import { buildSchema } from "graphql";
import lightTheme from "./prismLight.mjs";
import darkTheme from "./prismDark.mjs";

/** @type {import('@docusaurus/types').Config} */
export default {
    title: "MiSArch",
    tagline: "A representable microservice reference architecture",
    url: "https://misarch.github.io",
    favicon: "icons/misarch-logo.svg",
    baseUrl: "/",
    organizationName: "misarch",
    projectName: "misarch.github.io",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "throw",
    i18n: {
        defaultLocale: "en",
        locales: ["en"]
    },
    presets: [
        [
            "classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve("./sidebars.mjs"),
                    remarkPlugins: [remarkMath],
                    rehypePlugins: [rehypeKatex]
                },
                theme: {
                    customCss: require.resolve("./src/css/custom.css")
                }
            })
        ]
    ],
    themes: ["@docusaurus/theme-mermaid"],
    themeConfig: {
        navbar: {
            title: "MiSArch",
            logo: {
                src: "icons/misarch-logo.svg",
                srcDark: "icons/misarch-logo-dark.svg"
            },
            items: [
                {
                    type: "docSidebar",
                    sidebarId: "docsSidebar",
                    position: "left",
                    label: "Docs"
                },
                {
                    type: "docSidebar",
                    sidebarId: "graphqlSupergraphSidebar",
                    position: "left",
                    label: "GraphQL"
                },
                {
                    type: "docSidebar",
                    sidebarId: "graphqlSidebar",
                    position: "left",
                    label: "GraphQL (services)"
                },
                {
                    href: "https://github.com/MiSArch",
                    label: "GitHub",
                    position: "right"
                }
            ]
        },
        footer: {
            style: "dark",
            copyright: `Copyright © ${new Date().getFullYear()} MiSArch contributors. Built with Docusaurus.`
        },
        prism: {
            theme: lightTheme,
            darkTheme: darkTheme,
            additionalLanguages: ["bash"]
        }
    },
    plugins: [
        ...graphqlDocs.map((doc) => [
            "@graphql-markdown/docusaurus",
            {
                id: doc.id,
                schema: doc.path,
                rootPath: ".",
                baseURL: `docs/graphql/${doc.id}`,
                docOptions: {
                    index: true
                },
                loaders: {
                    GraphQLFileLoader: "@graphql-tools/graphql-file-loader"
                }
            }
        ]),
        [
            "@graphql-markdown/docusaurus",
            {
                id: "supergraph",
                schema: "supergraph.graphql",
                rootPath: ".",
                baseURL: `docs/graphql/schema`,
                docOptions: {
                    index: true
                },
                loaders: {
                    GraphQLFileLoader: "@graphql-tools/graphql-file-loader"
                }
            }
        ]
    ],
    markdown: {
        mermaid: true
    },
    stylesheets: [
        {
            href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
            type: "text/css",
            integrity: "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
            crossorigin: "anonymous"
        }
    ]
};

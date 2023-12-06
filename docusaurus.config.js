// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require("prism-react-renderer");
const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "MiSArch",
    tagline: "A representable microservice reference architecture",
    url: "https://misarch.github.io",
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
                    sidebarPath: require.resolve("./sidebars.js")
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
            items: [
                {
                    type: "docSidebar",
                    sidebarId: "tutorialSidebar",
                    position: "left",
                    label: "Docs"
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
    markdown: {
        mermaid: true
    }
};

module.exports = config;

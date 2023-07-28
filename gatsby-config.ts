import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  // Since `gatsby-plugin-typescript` is automatically included in Gatsby you
  // don't need to define it here (just if you need to change the options)
  plugins: [
    `gatsby-plugin-pnpm`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-preload-fonts`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ViatiTracker`,
        short_name: `VT`,
        description: `Registro de facturas y gastos para viajes de trabajo`,
        start_url: `/`,
        background_color: `#FFF`,
        theme_color: `#4C9FC1`,
        display: `standalone`,
        icon: `src/images/logo.svg`,
        icons: [
          {
            src: `/favicons/logo.svg`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/favicons/logo.svg`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
  ],
  jsxRuntime: `automatic`,
}

export default config

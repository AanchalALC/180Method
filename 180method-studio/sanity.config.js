import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

/* ============================================================================
   180 METHOD — SANITY STUDIO CONFIG

   projectId below is a PLACEHOLDER. Replace it with the real project ID from
   manage.sanity.io once the project has been created (see the "How to
   publish a blog post" guide / the Part A setup instructions). The same ID
   also needs to go into sanity.cli.js and src/data/blog.config.js in the main
   180method app — three copies, one source of truth (the Sanity dashboard).
   ========================================================================== */
const projectId = 'ruxd82na'
const dataset = 'production'

export default defineConfig({
  name: 'default',
  title: '180 Method Blog',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Posts')
              .child(
                S.documentTypeList('post')
                  .title('Posts')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})

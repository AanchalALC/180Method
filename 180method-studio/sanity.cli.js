import { defineCliConfig } from 'sanity/cli'

// projectId must match sanity.config.js and src/data/blog.config.js.
// appId pins the deploy target to https://the180method.sanity.studio so
// `npx sanity deploy` never re-prompts for a hostname.
export default defineCliConfig({
  api: {
    projectId: 'ruxd82na',
    dataset: 'production',
  },
  deployment: {
    appId: 'rd5wlzznl6gtvenv3i7gj7du',
  },
})

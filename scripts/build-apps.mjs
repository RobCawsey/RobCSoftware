import { execSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const siteRoot = join(__dirname, '..')
const reposRoot = join(siteRoot, '..')

// Locally, EvoLab/NeuralLab are siblings of WebSite on disk. In CI they're checked out inside
// the site's own workspace instead, so EVOLAB_DIR/NEURALLAB_DIR let the workflow point here.
const evolabDir = process.env.EVOLAB_DIR ? resolve(process.env.EVOLAB_DIR) : join(reposRoot, 'EvoLab')
const neurallabDir = process.env.NEURALLAB_DIR
  ? resolve(process.env.NEURALLAB_DIR)
  : join(reposRoot, 'NeuralLab')

const apps = [
  { slug: 'evolab', repoDir: evolabDir, webAppDir: join(evolabDir, 'apps', 'web') },
  { slug: 'neurallab', repoDir: neurallabDir, webAppDir: join(neurallabDir, 'apps', 'web') },
]

for (const app of apps) {
  if (!existsSync(app.webAppDir)) {
    console.warn(`Skipping ${app.slug}: ${app.webAppDir} not found`)
    continue
  }

  console.log(`Building ${app.slug}...`)
  execSync('npm install', { cwd: app.repoDir, stdio: 'inherit' })

  // Per-app override, e.g. EMBED_BASE_PATH_EVOLAB, so each app's base composes correctly with
  // whatever path the site itself is deployed under. Falls back to the app's own root-relative
  // default (set in its vite.config.ts) when unset, which is what local dev relies on.
  const embedBasePath = process.env[`EMBED_BASE_PATH_${app.slug.toUpperCase()}`]
  const buildEnv = embedBasePath ? { ...process.env, EMBED_BASE_PATH: embedBasePath } : process.env
  execSync('npm run build:embed', { cwd: app.webAppDir, stdio: 'inherit', env: buildEnv })

  const distDir = join(app.webAppDir, 'dist')
  if (!existsSync(distDir)) {
    console.warn(`Skipping copy for ${app.slug}: no dist/ produced. Did the app's vite.config.ts set base: "/apps/${app.slug}/"?`)
    continue
  }

  const target = join(siteRoot, 'public', 'apps', app.slug)
  rmSync(target, { recursive: true, force: true })
  mkdirSync(target, { recursive: true })
  cpSync(distDir, target, { recursive: true })
  console.log(`Copied ${app.slug} build to public/apps/${app.slug}`)
}

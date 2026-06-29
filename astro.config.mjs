// @ts-check
import { defineConfig } from 'astro/config';
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, posix } from 'node:path';
import starlight from '@astrojs/starlight';
import { visit } from 'unist-util-visit';

const SOURCE_ASSET_DIR = join(process.cwd(), 'public/source');
const SOURCE_GITHUB_ROOT = 'https://github.com/cesarnml/son-of-anton/blob/main';

function collectSourceAssetPaths(dir = SOURCE_ASSET_DIR, prefix = '') {
  if (!existsSync(dir)) return new Set();

  return readdirSync(dir).reduce((paths, entry) => {
    const absolutePath = join(dir, entry);
    const sourcePath = prefix ? posix.join(prefix, entry) : entry;

    if (statSync(absolutePath).isDirectory()) {
      for (const child of collectSourceAssetPaths(absolutePath, sourcePath)) paths.add(child);
    } else {
      paths.add(sourcePath);
    }

    return paths;
  }, new Set());
}

const sourceAssetPaths = collectSourceAssetPaths();

function sourceAssetPath(value) {
  const normalizedPath = value.replace(/^\/+/, '');

  if (!sourceAssetPaths.has(normalizedPath)) return undefined;

  return {
    localHref: `/source-view/${normalizedPath
      .split('/')
      .map((segment) => encodeURIComponent(segment))
      .join('/')}/`,
    githubHref: `${SOURCE_GITHUB_ROOT}/${normalizedPath
      .split('/')
      .map((segment) => encodeURIComponent(segment))
      .join('/')}`,
  };
}

/** Remark plugin: convert ```mermaid blocks to <div class="mermaid"> for CDN rendering */
function remarkMermaid() {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang === 'mermaid') {
        parent.children.splice(index, 1, {
          type: 'html',
          value: `<div class="mermaid">\n${node.value}\n</div>`,
        });
      }
    });
  };
}

/** Remark plugin: link inline source-file references to mirrored local copies. */
function remarkSourceFileLinks() {
  return (tree) => {
    visit(tree, 'inlineCode', (node, index, parent) => {
      if (!parent || typeof index !== 'number' || parent.type === 'link') return;

      const sourcePath = sourceAssetPath(node.value);
      if (!sourcePath) return;

      parent.children.splice(index, 1, {
        type: 'link',
        url: sourcePath.localHref,
        title: `Open mirrored source file. GitHub main: ${sourcePath.githubHref}`,
        data: {
          hProperties: {
            className: ['source-file-link'],
            'data-github-href': sourcePath.githubHref,
          },
        },
        children: [{ ...node }],
      });
    });
  };
}

export default defineConfig({
  site: 'https://sonofantonfordummies.vercel.app',
  markdown: {
    remarkPlugins: [remarkMermaid, remarkSourceFileLinks],
  },
  integrations: [
    starlight({
      components: {
        Header: './src/components/starlight/Header.astro',
      },
      customCss: ['./src/styles/custom.css'],
      title: 'Son of Anton for Dummies',
      description:
        'Learn Son of Anton: the AI-assisted delivery workflow, three human decision gates, delivery orchestrator, TDD ticket loop, adversarial review, and first-contribution path for junior developers.',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/cesarnml/son-of-anton' }],
      head: [
        { tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' } },
        { tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icon-192.png' } },
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' } },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#101721' } },
        {
          tag: 'meta',
          attrs: {
            name: 'keywords',
            content:
              'Son of Anton guide, Son-of-Anton onboarding, AI-assisted development workflow, delivery orchestrator, stacked PRs, TDD ticket loop, adversarial subagent review, Codex workflow, Claude Code workflow, Cursor workflow, junior developer onboarding, AGENTS.md, software delivery',
          },
        },
        { tag: 'meta', attrs: { name: 'robots', content: 'index, follow, max-image-preview:large' } },
        { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
        { tag: 'meta', attrs: { property: 'og:site_name', content: 'Son of Anton for Dummies' } },
        {
          tag: 'meta',
          attrs: {
            property: 'og:title',
            content: 'Son of Anton for Dummies — Developer Guide to AI-Assisted Delivery',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:description',
            content:
              'A practical developer guide to Son of Anton: three human gates, plan/decompose/closeout, the delivery orchestrator, TDD ticket loop, review gates, and first contributions.',
          },
        },
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://sonofantonfordummies.vercel.app/assets/son-of-anton-workflow-hero.png' } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image:alt',
            content: 'Son of Anton workflow illustration showing plan, decompose, ticket stack, artifacts, and AI assistance.',
          },
        },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:title',
            content: 'Son of Anton for Dummies — Developer Guide to AI-Assisted Delivery',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:description',
            content: 'Learn the Son-of-Anton mental model, delivery workflow, ticket loop, review gates, and first contribution path.',
          },
        },
        { tag: 'meta', attrs: { name: 'twitter:image', content: 'https://sonofantonfordummies.vercel.app/assets/son-of-anton-workflow-hero.png' } },
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          content: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: 'Son of Anton for Dummies',
            description:
              'A practical developer guide to the Son-of-Anton mental model, delivery orchestrator, TDD ticket loop, review gates, and contribution workflow.',
            url: 'https://sonofantonfordummies.vercel.app/',
            image: 'https://sonofantonfordummies.vercel.app/assets/son-of-anton-workflow-hero.png',
            about: [
              'AI-assisted software delivery',
              'delivery orchestration',
              'test-driven development',
              'adversarial code review',
              'developer onboarding',
            ],
            audience: {
              '@type': 'Audience',
              audienceType: 'Junior software developers and AI-assisted development contributors',
            },
            isPartOf: {
              '@type': 'SoftwareApplication',
              name: 'Son of Anton',
              applicationCategory: 'DeveloperApplication',
              url: 'https://sonofanton.vercel.app/',
            },
            mainEntityOfPage: 'https://sonofantonfordummies.vercel.app/',
          }),
        },
        { tag: 'script', attrs: { defer: true, src: '/_vercel/insights/script.js' } },
        {
          tag: 'script',
          attrs: { type: 'module' },
          content: `
            import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
            mermaid.initialize({ startOnLoad: true, theme: 'dark' });
          `,
        },
      ],
      sidebar: [
        { label: 'Home', slug: '' },
        {
          label: 'Core pipeline',
          items: [
            { label: '01 — Mental Model', slug: '01-mental-model' },
            { label: '02 — Repo Map', slug: '02-repo-map' },
            { label: '03 — Delivery Workflow', slug: '03-delivery-workflow' },
            { label: '04 — Ticket Loop', slug: '04-ticket-loop' },
          ],
        },
        {
          label: 'Hands-on',
          items: [
            { label: '05 — Review Gates', slug: '05-review-gates' },
            { label: '06 — First Contribution', slug: '06-first-contribution' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: '07 — Command Cookbook', slug: '07-command-cookbook' },
            { label: '08 — Glossary', slug: '08-glossary' },
          ],
        },
      ],
    }),
  ],
});

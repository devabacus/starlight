// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkWikiLink from 'remark-wiki-link'; // 👈 1. Импортируем плагин

// https://astro.build/config
export default defineConfig({
    // 2. Явно указываем режим статической генерации (SSG)
    output: 'static', 
    
    integrations: [
        starlight({
            title: 'My Notes', // Обновил заголовок для большей релевантности
            social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/your-repo-link' }],
            
            // 3. Добавляем конфигурацию Markdown
            markdown: { 
                remarkPlugins: [
                    // Настраиваем, чтобы Obsidian-ссылки работали
                    [remarkWikiLink, {
                        pageResolver: (name) => [name.replace(/ /g, '-').toLowerCase()],
                        hrefTemplate: (permalink) => `/docs/${permalink}`,
                        aliasDivider: '|',
                    }],
                ],
            },

            sidebar: [
                {
                    label: 'Guides',
                    items: [
                        { label: 'Example Guide', slug: 'guides/example' },
                    ],
                },
                {
                    label: 'Reference',
                    autogenerate: { directory: 'reference' },
                },
            ],
        }),
    ],
});
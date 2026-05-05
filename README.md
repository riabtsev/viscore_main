# VisualCore — лендинг и кабинет (Next.js + Tailwind)

- Статический экспорт (`output: 'export'`), без API и БД на клиенте
- Стек: Next.js App Router, TypeScript, Tailwind v4

## Запуск

```bash
npm install
npm run dev
```

## SEO / мета

- `src/app/layout.tsx` — title, description, OpenGraph/Twitter, robots, favicon
- Язык: `ru`, канонический URL, превью для соцсетей: `/pedagog.png`

## Деплой

- После `next build` экспорт в `out/` — готово к Vercel, Netlify или любому статику

import fs from 'fs'
import RSS from 'rss'
import { loadTags } from 'utils/tags'
import { Article } from './articles'

const RSS_PATH = 'public/rss.xml'

export function generateRSS(articles: Article[]) {
  const tags = loadTags()
  const year = new Date().getFullYear()

  const feed = new RSS({
    title: process.env.SITE_TITLE,
    description: process.env.SITE_DESCRIPTION,
    managingEditor: process.env.AUTHORS_NAME,
    webMaster: process.env.AUTHORS_NAME,
    copyright: `${year} ${process.env.AUTHORS_NAME}`,
    language: process.env.SITE_LOCALE,
    categories: tags,
    // eslint-disable-next-line @typescript-eslint/camelcase
    feed_url: `${process.env.SITE_URL}/rss.xml`,
    // eslint-disable-next-line @typescript-eslint/camelcase
    site_url: process.env.SITE_URL,
  })

  articles.forEach(article => {
    feed.item({
      title: article.title,
      description: article.content,
      url: `${process.env.SITE_URL}/articles/${article.slug}`,
      guid: article.slug,
      categories: article.tags,
      author: process.env.SITE_LOCALE,
      date: article.date,
    })
  })

  const rssXML = feed.xml({ indent: true })

  fs.writeFileSync(RSS_PATH, rssXML)
}
import React from 'react'
import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { loadTags, loadTagArticles } from 'utils/tags'
import { Article } from 'utils/articles'
import Layout from 'components/layout/Layout'
import TagList from 'components/TagList'
import ArticleList from 'components/ArticleList'
import Container from 'components/layout/Container'
import { FiHash } from 'react-icons/fi'

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: loadTags().map(tag => `/tags/${tag}`),
  fallback: false,
})

export const getStaticProps: GetStaticProps = async context => {
  const { tag } = context.params as { tag: string }

  const articles = loadTagArticles(tag)
  const tags = loadTags()

  return {
    props: {
      articles,
      tags: tags.filter(t => t !== tag),
      tag,
    },
  }
}

type TagPageProps = {
  tag: string
  tags: string[]
  articles: Article[]
}

const TagPage: NextPage<TagPageProps> = ({ articles, tag, tags }) => (
  <Layout
    title={`#${tag}`}
    subheader={
      <Container size="small" className="mb-6">
        <h1 className="col-span-2 text-4xl font-black text-white">
          <FiHash />
          {tag}
        </h1>
        <div className="text-xs text-white hover:text-gray-200">
          <TagList tags={tags} light />
        </div>
      </Container>
    }
  >
    <Container size="small">
      <ArticleList articles={articles} />
    </Container>
  </Layout>
)

export default TagPage
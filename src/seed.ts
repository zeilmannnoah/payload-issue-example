import type { Payload } from 'payload'

export async function seed(payload: Payload) {
  const existingTags = await payload.find({ collection: 'tags', limit: 1 })
  if (existingTags.totalDocs > 0) return

  payload.logger.info('Seeding database...')

  const tagNames = ['Bug', 'Feature', 'Enhancement', 'Documentation', 'Question']
  const tags = await Promise.all(
    tagNames.map((name) => payload.create({ collection: 'tags', data: { name } })),
  )

  const posts = [
    { title: 'Fix login redirect', tag: tags[0].id },
    { title: 'Add dark mode', tag: tags[1].id },
    { title: 'Improve search speed', tag: tags[2].id },
    { title: 'Update API docs', tag: tags[3].id },
    { title: 'How to deploy?', tag: tags[4].id },
    { title: 'Fix broken CSS', tag: tags[0].id },
    { title: 'Add export button', tag: tags[1].id },
    { title: 'Refactor auth module', tag: tags[2].id },
  ]

  await Promise.all(
    posts.map((data) => payload.create({ collection: 'posts', data })),
  )

  payload.logger.info('Seeded 5 tags and 8 posts.')
}

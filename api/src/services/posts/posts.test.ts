import { posts, post, createPost, updatePost, deletePost } from './posts'
import type { StandardScenario } from './posts.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('posts', () => {
  scenario('returns a single post', async (scenario: StandardScenario) => {
    const result = await post({ id: scenario.post.one.id })

    expect(result).toEqual(scenario.post.one)
  })

  scenario('creates a post', async (scenario: StandardScenario) => {
    const result = await createPost({
      input: {
        title: 'String',
        content: 'String',
        tags: ['String'],
        likes: 4674280,
        authorId: scenario.post.one.authorId,
      },
    })

    expect(result.title).toEqual('String')
    expect(result.content).toEqual('String')
    expect(result.tags).toEqual(['String'])
    expect(result.likes).toEqual(4674280)
    expect(result.authorId).toEqual(scenario.post.one.authorId)
  })

  scenario('updates a post', async (scenario: StandardScenario) => {
    const original = await post({ id: scenario.post.one.id })
    const result = await updatePost({
      id: original.id,
      input: { title: 'String2', tags: [] },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('returns all posts', async (scenario: StandardScenario) => {
    const result = await posts({ authorId: scenario.post.one.authorId })

    expect(result.length).toEqual(1)
  })

  scenario('deletes a post', async (scenario: StandardScenario) => {
    const original = await deletePost({ id: scenario.post.one.id })
    const result = await post({ id: original.id })

    expect(result).toEqual(null)
  })
})

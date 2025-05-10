import { JSONContent } from '@tiptap/react'

export const parseJsonContent = (
  input: string | null | undefined,
): JSONContent => {
  if (!input || input.trim() === '') {
    return { type: 'doc', content: [] }
  }

  try {
    const parsed = JSON.parse(input)
    return parsed as JSONContent
  } catch {
    return {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: input,
            },
          ],
        },
      ],
    }
  }
}

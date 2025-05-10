import { Editor } from '@tiptap/react'
import { JSONContent } from '@tiptap/react'

export interface MenuBarProps {
  editor: Editor | null
}

export interface TextEditorProps {
  onChange: (content: JSONContent) => void
  value: JSONContent
  placeholder?: string
}

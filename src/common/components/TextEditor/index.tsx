import './index.css'
import { useEditor, EditorContent, Editor, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useMemo, useState } from 'react'
import debounce from 'lodash.debounce'
import Placeholder from '@tiptap/extension-placeholder'
import MenuBar from './MenuBar'

export interface TextEditorProps {
  onChange: (content: JSONContent) => void
  value?: JSONContent
  placeholder?: string
}

const TextEditor = ({ onChange, value, placeholder }: TextEditorProps) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const deboucedChange = useMemo(
    () =>
      debounce((editorInstance: Editor) => {
        const content = editorInstance.getJSON()
        onChange(content)
        setIsUpdating(false)
      }, 500),
    [onChange],
  )

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,

    onUpdate: ({ editor }) => {
      setIsUpdating(true)
      deboucedChange(editor)
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getJSON()) {
      editor.commands.setContent(value || '', false)
    }
  }, [value])

  useEffect(() => {
    if (!editor) return

    const handleFocus = () => setIsFocused(true)
    const handleBlur = () => setIsFocused(false)

    const dom = editor.view.dom
    dom.addEventListener('focus', handleFocus)
    dom.addEventListener('blur', handleBlur)

    return () => {
      dom.removeEventListener('focus', handleFocus)
      dom.removeEventListener('blur', handleBlur)
    }
  }, [editor])

  return (
    <div className={`text-editor ${isFocused ? 'focused' : ''}`}>
      <div
        style={{
          backgroundColor: '#f9f9f9',
          borderBottom: '1px solid #ddd',
          padding: '8px 16px',
        }}
        onMouseDown={(e) => {
          e.preventDefault()
        }}
      >
        <MenuBar editor={editor} />
      </div>

      <div
        style={{
          position: 'relative',
          padding: '0 16px',
        }}
      >
        <EditorContent editor={editor} spellCheck={false} />
        {isUpdating && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              fontSize: 12,
              color: '#999',
            }}
          >
            <span className='text-editor__spinner' />
          </div>
        )}
      </div>
    </div>
  )
}

export default TextEditor

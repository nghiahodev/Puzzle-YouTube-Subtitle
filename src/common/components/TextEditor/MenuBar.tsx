import {
  FormatBold,
  FormatClear,
  FormatItalic,
  FormatListBulleted,
  Redo,
  StrikethroughS,
  Undo,
} from '@mui/icons-material'
import './MenuBar.css'

import { MenuBarProps } from './textEditorTypes'

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
      }}
      className='text-editor__menubar'
    >
      <button
        type='button'
        style={{
          flex: 1,
          height: '30px',
        }}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <FormatBold />
      </button>
      <button
        type='button'
        style={{
          flex: 1,
          height: '30px',
        }}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <FormatItalic />
      </button>
      <button
        type='button'
        style={{
          flex: 1,
          height: '30px',
        }}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <StrikethroughS />
      </button>

      <button
        type='button'
        style={{
          flex: 1,
          height: '30px',
        }}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <FormatListBulleted />
      </button>
      <button
        type='button'
        style={{
          flex: 1,
          height: '30px',
          fontWeight: 'bold',
        }}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        BR
      </button>

      <button
        type='button'
        style={{
          flex: 1,
          height: '30px',
        }}
        onClick={() =>
          editor.chain().focus().unsetAllMarks().clearNodes().run()
        }
      >
        <FormatClear />
      </button>

      <button
        type='button'
        style={{
          flex: 1,
          height: '30px',
        }}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo />
      </button>
      <button
        type='button'
        style={{
          flex: 1,
          height: '30px',
        }}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo />
      </button>
    </div>
  )
}

export default MenuBar

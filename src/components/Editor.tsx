import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { initialContent } from '../services/initialContent'
import { lowlight } from 'lowlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import js from 'highlight.js/lib/languages/javascript'
import {
  RxFontBold,
  RxFontItalic,
  RxStrikethrough,
  RxCode,
  RxChevronDown,
  RxChatBubble
} from 'react-icons/rx'

import 'highlight.js/styles/tokyo-night-dark.css'
import { BubbleButton } from './BubbleButton'

lowlight.registerLanguage('js', js)

export function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight
      })
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'outline-none'
      }
    }
  })

  return (
    <>
      <EditorContent
        className="max-w-[700px] mx-auto pt-16 prose prose-invert prose-violet"
        editor={editor}
      />
      {editor && (
        <BubbleMenu
          className="bg-zinc-700 shadow-xl border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex divide-x divide-zinc-600"
          editor={editor}
        >
          <BubbleButton>
            Text
            <RxChevronDown className="w-4 h-4" />
          </BubbleButton>
          <BubbleButton>
            Comment
            <RxChatBubble className="w-4 h-4" />
          </BubbleButton>
          <div className="flex items-center">
            <BubbleButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              data-active={editor.isActive('bold')}
            >
              <RxFontBold w-4 h-4 />
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              data-active={editor.isActive('italic')}
            >
              <RxFontItalic w-4 h-4 />
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              data-active={editor.isActive('strike')}
            >
              <RxStrikethrough w-4 h-4 />
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleCode().run()}
              data-active={editor.isActive('code')}
            >
              <RxCode w-4 h-4 />
            </BubbleButton>
          </div>
        </BubbleMenu>
      )}
    </>
  )
}

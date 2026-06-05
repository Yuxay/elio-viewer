export interface Document {
  id: string
  title: string
  content: string
  fileType: string
  createdAt: number
  updatedAt: number
}

export type ThemeMode = 'light' | 'dark' | 'system'

// ---------------------------------------------------------------------------
// 文件类型定义
// ---------------------------------------------------------------------------
export interface FileTypeInfo {
  ext: string        // e.g. 'js', 'md', 'java'
  label: string      // display name
  category: 'web' | 'general' | 'config' | 'other'
  mime?: string      // for export
}

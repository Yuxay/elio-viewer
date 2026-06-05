import { getFileType } from '@/utils/fileTypes'

export function importMdFile(): Promise<{ name: string; content: string; ext: string }> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.md,.txt,.js,.ts,.jsx,.tsx,.json,.html,.css,.scss,.vue,.py,.java,.c,.cpp,.cs,.go,.rs,.swift,.kt,.yaml,.yml,.xml,.sql,.sh,.toml'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return reject(new Error('No file selected'))
      const content = await file.text()
      const name = file.name.replace(/\.[^.]+$/, '')
      const ext = (file.name.match(/\.([^.]+)$/) || [])[1] || 'txt'
      resolve({ name, content, ext })
    }
    input.click()
  })
}

export function exportFile(title: string, content: string, fileType: string) {
  const ext = fileType || 'md'
  const info = getFileType(ext)
  const mimeMap: Record<string, string> = {
    js: 'text/javascript',
    ts: 'text/typescript',
    html: 'text/html',
    css: 'text/css',
    json: 'application/json',
    xml: 'application/xml',
    md: 'text/markdown',
    yaml: 'text/yaml',
    sql: 'text/sql',
    sh: 'text/x-shellscript',
    py: 'text/x-python',
    java: 'text/x-java',
    c: 'text/x-c',
    cpp: 'text/x-c++',
    go: 'text/x-go',
    rs: 'text/x-rust'
  }
  const mime = info?.mime || mimeMap[ext] || 'text/plain'
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${title || 'untitled'}.${ext}`
  a.click()
  URL.revokeObjectURL(url)
}

// 保持向后兼容
export function exportMdFile(title: string, content: string, fileType?: string) {
  exportFile(title, content, fileType || 'md')
}

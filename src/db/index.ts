import localforage from 'localforage'
import type { Document } from '@/types'

const store = localforage.createInstance({
  name: 'elio-docs',
  storeName: 'documents'
})

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

export async function listDocuments(): Promise<Document[]> {
  const docs: Document[] = []
  await store.iterate<Document, void>((value) => {
    docs.push(value)
  })
  docs.sort((a, b) => b.updatedAt - a.updatedAt)
  return docs
}

export async function getDocument(id: string): Promise<Document | null> {
  return store.getItem<Document>(id)
}

export async function createDocument(title = 'Untitled', fileType = 'md'): Promise<Document> {
  const now = Date.now()
  const doc: Document = {
    id: generateId(),
    title,
    content: '',
    fileType,
    createdAt: now,
    updatedAt: now
  }
  await store.setItem(doc.id, doc)
  return doc
}

export async function saveDocument(doc: Document): Promise<void> {
  doc.updatedAt = Date.now()
  await store.setItem(doc.id, { ...doc })
}

export async function deleteDocument(id: string): Promise<void> {
  await store.removeItem(id)
}

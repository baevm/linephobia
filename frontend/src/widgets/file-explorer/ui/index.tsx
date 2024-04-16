import { useState } from 'react'
import styles from './styles.module.css'
import { TbFolder, TbFile } from 'react-icons/tb'

const files = [
  { label: 'bin', type: 'dir' },
  { label: 'node_modules', type: 'dir' },
  { label: 'src', type: 'dir' },
  { label: 'bin', type: 'dir' },
  { label: 'packages', type: 'dir' },
  { label: 'cmd', type: 'dir' },
  { label: 'index.html', type: 'file' },
  { label: 'README.md', type: 'file' },
]

export const FileExplorer = () => {
  const [currentFolder, setCurrentFolder] = useState(files)

  return (
    <div className={styles.explorer_container}>
      {currentFolder.map((file) => (
        <div key={file.label} className={styles.explorer_item}>
          {file.type === 'dir' ? <TbFolder size='20px' /> : <TbFile size='20px' />}
          <div className={styles.explorer_item_label}>{file.label}</div>
        </div>
      ))}
    </div>
  )
}

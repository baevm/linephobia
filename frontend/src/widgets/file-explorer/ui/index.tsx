import { useGetRepoContentQuery } from '@entities/repository/api'
import { RepositoryContent } from '@entities/repository/model'
import { useGetFullnameFromURL } from '@shared/lib/git'
import { useMemo, useState } from 'react'
import { TbFile, TbFolder } from 'react-icons/tb'
import { sortFilesByType } from '../lib'
import styles from './styles.module.css'

type StateFolder = {
  parentGitUrls: string[]
  gitUrl: string
}

export const FileExplorer = () => {
  const { gitUrl } = useGetFullnameFromURL()
  const [stateFolder, setStateFolder] = useState<StateFolder>({ gitUrl: gitUrl, parentGitUrls: [] })

  const { data: files, isFetching } = useGetRepoContentQuery(stateFolder.gitUrl)
  const isWithParent = stateFolder.parentGitUrls.length > 0

  const sortedFiles = useMemo(() => {
    return files ? sortFilesByType([...files]) : []
  }, [files])

  const onClick = (item: RepositoryContent) => {
    if (item.type === 'dir') {
      setStateFolder({ gitUrl: item.url, parentGitUrls: [...stateFolder.parentGitUrls, stateFolder.gitUrl] })
    } else if (item.type === 'file') {
      console.log('clicked file')
    }
  }

  const handleBack = () => {
    const parent = stateFolder.parentGitUrls.pop()
    setStateFolder({ gitUrl: parent!, parentGitUrls: stateFolder.parentGitUrls })
  }

  if (sortedFiles.length === 0) return null

  return (
    <div className={styles.explorer_container}>
      {isWithParent && (
        <>
          <div className={styles.explorer_item} onClick={() => handleBack()}>
            <TbFolder size='20px' />
            <div className={styles.explorer_item_label}>...</div>
          </div>
        </>
      )}
      {!isFetching &&
        sortedFiles.map((file) => (
          <div key={file.sha} className={styles.explorer_item} onClick={() => onClick(file)}>
            {file.type === 'dir' ? <TbFolder size='20px' /> : <TbFile size='20px' />}
            <div className={styles.explorer_item_label}>{file.name}</div>
          </div>
        ))}
    </div>
  )
}

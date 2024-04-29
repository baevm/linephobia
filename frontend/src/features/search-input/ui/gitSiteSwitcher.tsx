import { useCombobox, Combobox, InputBase } from '@mantine/core'
import { useState } from 'react'
import { IconType } from 'react-icons'
import { IoLogoGithub, IoLogoGitlab } from 'react-icons/io5'

interface Item {
  icon: IconType
  value: string
}

const GitSites: Item[] = [
  { icon: IoLogoGithub, value: 'github' },
  { icon: IoLogoGitlab, value: 'gitlab' },
]

type TSelectOption = {
  icon: IconType
  iconSize: string
}

function SelectOption({ icon, iconSize }: TSelectOption) {
  const Icon = icon

  return (
    <>
      <Icon size={iconSize} />
    </>
  )
}

export function GitSiteSwitcher({ iconSize }: { iconSize: string }) {
  const combobox = useCombobox()

  const [value, setValue] = useState<string | null>('github')
  const selectedOption = GitSites.find((item) => item.value === value)

  const options = GitSites.map((item) => (
    <Combobox.Option
      value={item.value}
      key={item.value}
      p='0'
      w='100%'
      py='5px'
      style={{ display: 'flex', justifyContent: 'center' }}>
      <SelectOption {...item} iconSize={iconSize} />
    </Combobox.Option>
  ))

  const marginBottomIcon = iconSize === '24px' ? '2px' : '0px'

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      width='50px'
      withArrow={true}
      arrowSize={10}
      onOptionSubmit={(val) => {
        setValue(val)
        combobox.closeDropdown()
      }}>
      <Combobox.Target>
        <InputBase
          component='button'
          type='button'
          pointer
          rightSection={<div />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents='none'
          styles={{
            input: {
              border: 'none',
              width: iconSize,
              height: iconSize,
              minHeight: iconSize,
              padding: 0,
              display: 'flex',
              alignItems: 'center',
            },
            wrapper: {
              marginBottom: marginBottomIcon,
            },
          }}>
          {selectedOption && <SelectOption {...selectedOption} iconSize={iconSize} />}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown p='0'>
        <Combobox.Options style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '5px' }}>
          {options}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}

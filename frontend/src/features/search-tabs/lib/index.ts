export const formatName = (owner: string, name: string) => {
  const fullName = `@${owner}/${name}`
  return fullName.length > 20 ? fullName.slice(0, 17) + '...' : fullName
}

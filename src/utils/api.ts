import fs from 'fs'

export const readJsonFile = async <T = string>(
  filename: string
): Promise<{ data: T | null }> => {
  const filePath = `data/${filename}`
  try {
    const content = await fs.promises.readFile(filePath, { encoding: 'utf8' })
    return { data: content ? (JSON.parse(content) as T) : null }
  } catch (error) {
    return { data: null }
  }
}

export const writeJsonFile = async <T>(
  filename: string,
  data: T
): Promise<{ data: T | null }> => {
  const filePath = `data/${filename}`
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(data), {
      encoding: 'utf8',
    })
    return { data }
  } catch (error) {
    return { data: null }
  }
}

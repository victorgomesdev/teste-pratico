export function imageToBase64Util(target: HTMLInputElement) {

  const file = target.files![0]

  target.value = ''
  
  return new Promise<{
    base64: string,
    imageName: string
  }>((resolve, reject) => {

    if (!file) {
      reject(null)
    }

    if(file.size > 100000){
      reject(-1)
    }
    const reader = new FileReader()

    reader.onload = () => resolve({ base64: reader.result as string, imageName: file.name })
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

}
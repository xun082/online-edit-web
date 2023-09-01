import jszip from 'jszip';

import { DirectoryInterface, EmptyFileInterface, FilerInterface, isDirectory, isFiler } from '@/types';

class Zip {
  zip: jszip;
  constructor () {
    this.zip = new jszip();
  }
  public addFile (file: EmptyFileInterface | FilerInterface) {
    if ('content' in file) {
      this.zip.file(file.path, file.content);
    } else {
      this.zip.file(file.path, '');
    }
    return this
  }

  public addFolder(path: string) {
    this.zip.folder(path);
    return this
  }

  public addDirectory (directory: DirectoryInterface) {
    
    const { path, children } = directory
    this.zip.folder(path)
    const stack = [...children]
    while (stack.length) {
      const cur = stack.shift()!
      if (isFiler(cur)) {
        this.addFile(cur)
      } else if (isDirectory(cur)) {
        this.addFolder(cur.path)
        stack.push(...cur.children)
      }
    }
    return this
  }

  public generateAsync <T extends jszip.OutputType = 'blob'>(options?: jszip.JSZipGeneratorOptions<T>, onUpdate?: jszip.OnUpdateCallback) {
    try {
      return this.zip.generateAsync(options, onUpdate)
    } catch (error) {
      console.log(error);
      return Promise.resolve(undefined)
    }
  }

  public async downloadZip () {
    const zipFile = await this.generateAsync<'blob'>({ type: 'blob' })
    if (!zipFile) {
      return ''
    }
    return window.URL.createObjectURL(zipFile)
  }
}

export default Zip
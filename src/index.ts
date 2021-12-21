import Trumpet from 'trumpet'
import from2 from 'from2-string'
import { arg } from 'decarg'
import stream from 'stream'
import fs from 'fs'

export class Options {
  @arg('<selector>', 'CSS selector where content will be injected')
  selector!: string

  @arg('-i', '--input', 'Input HTML file that will be transformed')
  input!: string

  @arg(
    '-w',
    '--write',
    'Write file in-place ** DANGEROUS! Make sure you have a backup'
  )
  write? = false

  streamIn?: stream.Readable = process.stdin
  streamOut?: stream.Writable = process.stdout

  static examples = {
    'echo foo | $ body -i index.html':
      'Replace body contents with "foo" from stdin, write to stdout',
    'toc index.html | $ "#toc" -w -i index.html':
      'Replace contents in element with id `toc` and write file in-place',
  }
}

/**
 * Inject text in an HTML file at a certain element given a selector.
 *
 * @param options
 * @param options.selector CSS selector where content will be injected
 * @param options.input Input HTML file that will be transformed
 * @param options.write Write file in-place ** DANGEROUS! Make sure you have a backup
 * @param options.streamIn Input stream to use (defaults to process.stdin)
 * @param options.streamOut Output stream to use (defaults to process.stdout)
 */
export const inject = (options: Options) => {
  const trumpet = Trumpet()

  options.streamIn ??= process.stdin
  options.streamOut ??= process.stdout

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trumpet.selectAll(options.selector, (node: any) => {
    const writeStream = node.createWriteStream()
    options.streamIn!.pipe(writeStream)
  })

  if (options.write) {
    const file = fs.readFileSync(options.input, 'utf8')
    from2(file).pipe(trumpet).pipe(fs.createWriteStream(options.input))
  } else {
    fs.createReadStream(options.input).pipe(trumpet).pipe(options.streamOut)
  }

  return true
}

import { stdin } from 'mock-stdin'
import { stdout, stderr } from 'stdout-stderr'
import { inject, Options } from '../'
import from2 from 'from2-string'
import streams from 'memory-streams'
import fs from 'fs'

const pause = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

describe('Options', () => {
  it('should be correct', () => {
    expect(new Options()).toEqual({
      write: false,
      streamIn: process.stdin,
      streamOut: process.stdout,
    })
  })
})

describe('inject', () => {
  const fixture = __dirname + '/fixture.html'
  const fixtureContents = `<html><head></head><body><main></main><div id="toc"></div></body></html>\n`

  beforeAll(() => {
    fs.writeFileSync(fixture, fixtureContents)
  })

  const io = {
    stdin: stdin(),
    stdout,
    stderr,
  }

  const collect = () => {
    stdout.stop()
    stderr.stop()
    return {
      stdout: stdout.output,
      stderr: stderr.output,
    }
  }

  beforeEach(() => {
    io.stdin.reset(true)
    io.stdout.start()
    io.stderr.start()
  })

  it('read stdin - transform <main> - output stdout', async () => {
    inject({ input: fixture, selector: 'main' })

    // wait for handlers to be setup
    await pause(10)

    io.stdin.send('hello world')
    io.stdin.send(null)

    // wait for stdout to be filled
    await pause(100)

    expect(collect()).toEqual({
      stdout:
        '<html><head></head><body><main>hello world</main><div id="toc"></div></body></html>\n',
      stderr: '',
    })
  })

  it('read custom stream - transform <main> - output stdout', async () => {
    inject({ input: fixture, selector: 'main', streamIn: from2('foo') })

    // wait for stdout to be filled
    await pause(100)

    expect(collect()).toEqual({
      stdout:
        '<html><head></head><body><main>foo</main><div id="toc"></div></body></html>\n',
      stderr: '',
    })
  })

  it('read custom stream - transform <main> - output custom stream', async () => {
    const out = new streams.WritableStream()
    inject({
      input: fixture,
      selector: 'main',
      streamIn: from2('foo'),
      streamOut: out,
    })

    // wait for stdout to be filled
    await pause(100)

    expect(out.toString()).toEqual(
      '<html><head></head><body><main>foo</main><div id="toc"></div></body></html>\n'
    )
  })

  it('read stdin - transform #toc - output stdout', async () => {
    inject({ input: fixture, selector: '#toc' })

    // wait for handlers to be setup
    await pause(10)

    io.stdin.send('hello world')
    io.stdin.send(null)

    // wait for stdout to be filled
    await pause(100)

    expect(collect()).toEqual({
      stdout:
        '<html><head></head><body><main></main><div id="toc">hello world</div></body></html>\n',
      stderr: '',
    })
  })

  it('read stdin - transform main - output in-place', async () => {
    inject({ input: fixture, selector: 'main', write: true })

    // wait for handlers to be setup
    await pause(10)

    io.stdin.send('hello world')
    io.stdin.send(null)

    // wait for file to be written
    await pause(100)

    expect(fs.readFileSync(fixture, 'utf8')).toEqual(
      '<html><head></head><body><main>hello world</main><div id="toc"></div></body></html>\n'
    )

    // reset the fixture

    inject({ input: fixture, selector: 'main', write: true })

    // wait for handlers to be setup
    await pause(10)

    io.stdin.send('')
    io.stdin.send(null)

    // wait for file to be written
    await pause(100)

    expect(fs.readFileSync(fixture, 'utf8')).toEqual(
      '<html><head></head><body><main></main><div id="toc"></div></body></html>\n'
    )
  })
})

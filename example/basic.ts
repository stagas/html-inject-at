import { inject } from '../src'
import from2 from 'from2-string'

inject({
  input: __dirname + '/example.html',
  selector: '#toc',
  streamIn: from2('hello world')
})

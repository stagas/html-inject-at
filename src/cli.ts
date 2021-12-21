#!/usr/bin/env node

import { decarg } from 'decarg'
import { inject, Options } from '.'

const options = decarg(new Options())!

inject(options)

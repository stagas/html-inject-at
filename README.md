<h1 align="center">html-inject-at</h1>

<p align="center">
inject text in an html file at a certain element given a selector
</p>

<p align="center">
   <a href="#install">        🔧 <strong>Install</strong></a>
 · <a href="#example">        🧩 <strong>Example</strong></a>
 · <a href="#api">            📜 <strong>API docs</strong></a>
 · <a href="https://github.com/stagas/html-inject-at/releases"> 🔥 <strong>Releases</strong></a>
 · <a href="#contribute">     💪🏼 <strong>Contribute</strong></a>
 · <a href="https://github.com/stagas/html-inject-at/issues">   🖐️ <strong>Help</strong></a>
</p>

***

## Install

```sh
$ npm i html-inject-at -g
```

## Usage

```sh
Usage: html-inject-at [options] <selector>

                 <selector>  CSS selector where content will be injected

   -i, --input=...           Input HTML file that will be transformed
   -w, --write               Write file in-place ** DANGEROUS! Make sure you have a backup

Examples:
  # Replace body contents with "foo" from stdin, write to stdout
  echo foo | html-inject-at body -i index.html

  # Replace contents in element with id `toc` and write file in-place
  toc index.html | html-inject-at "#toc" -w -i index.html
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

*   [inject](#inject)
    *   [Parameters](#parameters)

### inject

[src/index.ts:42-62](https://github.com/stagas/html-inject-at/blob/07f9ee7bb77f8ac0476ff9224b145477d1ed8025/src/index.ts#L42-L62 "Source code on GitHub")

Inject text in an HTML file at a certain element given a selector.

#### Parameters

*   `options` **Options**&#x20;

    *   `options.selector`  CSS selector where content will be injected
    *   `options.input`  Input HTML file that will be transformed
    *   `options.write`  Write file in-place \*\* DANGEROUS! Make sure you have a backup
    *   `options.streamIn`  Input stream to use (defaults to process.stdin)
    *   `options.streamOut`  Output stream to use (defaults to process.stdout)

## Contribute

[Fork](https://github.com/stagas/html-inject-at/fork) or
[edit](https://github.dev/stagas/html-inject-at) and submit a PR.

All contributions are welcome!

## License

MIT © 2021
[stagas](https://github.com/stagas)

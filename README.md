<div align=center>
  <picture>
    <img
      alt=""
      height="200"
      role="presentation"
      src="https://raw.githubusercontent.com/hedge-code/push-gh-pages/main/hedgecode-dev-logo.svg"
      width="200"
    />
  </picture>
  <h1>Push GH pages</h1>
</div>

Publish a static bundler output on a separate branch to host at GitHub Pages!

## Getting Started

Build a static page. By the `--dist` argument specify the directory of the build output.
If you want underscore files to work, add the `--nojekyll` argument.

```bash
npx push-gh-pages -d dist --nojekyll
```

Make sure you don't have a local branch named with the name of the target branch. Default name is `page`.
Also, make sure you don't have anything important on this branch, in the repository. The previous state will be lost.

You can test the script on a fork of [this project][template].

### Arguments

#### -h, --help

A list of supported options.

#### -v, --version

A version of the script.

#### -b, --branch <page>

Name of the branch you are pushing to. Default value `page`.

#### -d, --dist <dist>

The directory of the bundler ouput. Default value `dist`.

#### -r, --remote <origin>

The address or name of the remote to publish to.

Examples: `https://github.com/hedge-code/nextra-docs-template.git` or `origin`.

#### -m, --message <msg>

The given <msg> is a commit message on the `page` branch.

#### --nojekyll

"Adds a .nojekyll file to the page branch.

#### --silent

To not  print warnings.



[template]: https://github.com/hedge-code/nextra-docs-template

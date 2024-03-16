# Contributing

## Before getting started

### Thank you for contributing to our project!

First of all, we would like to extend our heartfelt thanks to all members of the community who have contributed their time, expertise, and support to this project. Whether you've reported a bug, suggested a feature, or submitted code, your contributions have made a significant impact, and we are truly grateful for all your efforts.

In case you want to talk about the project, or perhaps there are some questions, ideas, or concerns, do not hesitate to reach out to us. We are here to support you and ensure that your contributions are acknowledged and appreciated.

## How to contribute

### Introduce into dev environment

#### Dependencies
 
 * We use [git][git] as our version control system.

 * In the project we have the [pnpm][pnpm] package manager due to its rapidness and effectiveness. Moreover, it works on all popular operating systems.

 * [NodeJS][node] version 18.18 works fine. In case you use a lower version and the project works, let us know.

#### Preparing a local project instance

 * Make a new [fork][fork] based on main branch.
 * [Clone][git-clone] the fork locally.
```bash
git clone https://github.com/<username>/push-gh-pages.git
```
 * Go to the local project directory. Default:
```bash
cd push-gh-pages
```

 * Install pnpm dependencies
```bash
pnpm i
```

### Commands

Command `dev` starts watching mode. The mode rebuilds the mjs output script when package modules are changed.

```bash
pnpm dev
```

The `lint` command checks the quality of the code and tells you where the code must be adapted to our standards.

```bash
pnpm lint
```

Some erros can be fixed using the `--fix` argument.

```bash
pnpm lint --fix
```

If you wish to check the script, you can use [this sample project][sample].

Just clone the project, install dependencies, and build it with the command:

```bash
pnpm build
```

As you can see, after the build, there is `out` directory in the project root.
In the directory there is `_next` catalog which contains styles and scripts.
To make directories with underscore recognized by github pages it is necessary to add the `.nojekyll` file.

To summarize, we need to force our script to use files from the `out` directory and read files from the `_next` directory.

```bash
npx <path-to-the-script-root> -d out --nojekyll
```

If you have these in the same folder:

 * the script project
 * our fork of the nextra-docs-template

and the bash has nextra catalog as working directory, then you can execute this command to prepare the site branch:

```bash
npx ../push-gh-pages -d out --nojekyll
```

The last thing is to deploy [the page][gp] in the template repository.

```bash
nextra-docs-template -> settings -> Code and automation -> Pages -> Branch
```

#### If you need further guidance, you can reach out our team on the following:

* [our discord][discord]
* [email][email]

Please note we have a [code of conduct][COC], so follow it in all your interactions with the project.

## Getting started

For further guidance about getting started, please refer to the related links:

* [Pull Request][PR]
* [Issues Guidelines][issue]

## Coding conventions

In order to sanitize coding standards, please follow our [eslint][eslint] recommendations.

[pnpm]: https://pnpm.io/
[node]: https://nodejs.org/
[git]: https://git-scm.com/
[git-clone]: https://git-scm.com/docs/git-clone
[fork]: https://github.com/hedge-code/push-gh-pages/fork
[discord]: https://discord.gg/A57b4Rycbt
[email]: contact.hedgecode@gmail.com
[COC]: CODE_OF_CONDUCT.md
[PR]: PULL_REQUEST_TEMPLATE.md
[issue]: ISSUE_TEMPLATE.md
[eslint]: eslint.config.js
[sample]: https://github.com/hedge-code/nextra-docs-template
[gp]: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

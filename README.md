# map.air-maxx.net — stable entry point for the MeshCom Map

A one-page GitHub Pages site that forwards visitors to the live
[MeshCom Map](https://github.com/DK5EN) instance.

The map is published through an anonymous Cloudflare **quick tunnel**, whose
`*.trycloudflare.com` hostname is assigned at runtime and changes on every
tunnel restart. Only this page has a stable address:

**<https://map.air-maxx.net>**

## How it works

| File         | Role                                                                   |
| ------------ | ---------------------------------------------------------------------- |
| `index.html` | Static shell. Fetches `url.json` and forwards. Never changes.          |
| `404.html`   | Byte-identical copy, so deep links like `/wxmap` keep their path.      |
| `url.json`   | The current tunnel address. **Machine-written — do not edit by hand.** |
| `CNAME`      | Custom domain for GitHub Pages.                                        |

The address deliberately lives in a separate JSON file rather than inside the
HTML: GitHub Pages serves HTML with `Cache-Control: max-age=600`, so a baked-in
address could be up to ten minutes stale in a visitor's browser after a
rotation. `index.html` never changes and may be cached freely; `url.json` is
fetched with `cache: 'no-store'` plus a cache-busting query, so a rotation takes
effect as soon as the Pages build finishes.

## Who writes `url.json`

The map's own tunnel supervisor (`scripts/tunnel-supervisor.sh` in the private
mcmap repository) detects each rotation and commits a new `url.json` through the
GitHub Contents API, using a fine-grained token scoped to this repository with
`Contents: read and write` and nothing else.

## Privacy

The current tunnel address is public by construction — this repository is
public so GitHub Pages can serve it for free. That is intended: the address is
meant to be shared and rotates regularly anyway.

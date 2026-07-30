# cPanel cutover runbook

This runbook replaces only the Nordic Solutions website in `/public_html`.
It does not change the domain, nameservers, Cloudflare, Microsoft 365, or any
mail-related DNS record.

## Fixed mail behavior

- Form recipient: `info@nordicsolutions.ae`.
- Sender: `Nordic Solutions Website <nordicso@dubai90.server.ae>`.
- Reply-To: the visitor's validated email address.
- Transport: the existing AEserver PHP mail transport.
- Public fallback contact: `info@nordicsolutions.ae` and `+971503160500`.
- Submissions are not stored in a database or local log.
- The rate limiter keeps only short-lived hashed IP counters outside the public
  web directory.

`info@nordicsolutions.ae` remains on Microsoft 365. Do not edit nameservers,
MX, SPF, DKIM, Autodiscover, or Email Routing during this cutover.

## Build and inspect locally

```bash
bun ci
bun run verify
bun run build:cpanel
unzip -l dist/nordic-solutions-cpanel.zip
```

The upload artifact is `dist/nordic-solutions-cpanel.zip`. It contains the
five prerendered pages, static assets, security and route rules in `.htaccess`,
and `api/contact.php`.

If PHP is available, run the contact validation and rate-limit check without
sending email:

```bash
bun run test:cpanel
```

## Prepare without changing production

1. In JetBackup, confirm that a recent `/public_html` backup can be restored.
2. Download an additional archive of the current `/public_html`.
3. Record the current PHP version and keep PHP 8.1 or newer selected.
4. Create a staging directory beside the live directory, not inside it.
5. Upload and extract the release archive into that staging directory.
6. Confirm `.htaccess`, `index.html`, `en.html`, `ar.html`, `_app`, and
   `api/contact.php` are present.
7. Never edit or move `/tailorsolutions.ae`; it is a separate live website.

## Cut over

Schedule a short quiet window. In cPanel File Manager:

1. Rename `/public_html` to a dated backup such as
   `/public_html_wordpress_backup_YYYYMMDD`.
2. Rename the prepared staging directory to `/public_html`.
3. Open `/`, `/en`, and `/ar` in a private browser window.
4. Check assets, language links, mobile layout, HTTPS, and the `www` redirect.
5. Submit one clearly labeled test request and confirm it arrives at
   `info@nordicsolutions.ae`. Replying to it must target the visitor test address.

Do not change DNS or Cloudflare during this window. That keeps the website
switch independent from Microsoft 365 mail.

## Roll back

If any critical check fails:

1. Rename the new `/public_html` to `/public_html_failed_YYYYMMDD`.
2. Rename the dated WordPress backup back to `/public_html`.
3. Recheck the old homepage and one old form submission.

Keep the old WordPress directory until the new site and form have been stable
for at least seven days. Then remove it only after confirming a downloadable
backup exists.

## Routine updates after cutover

Merging a green pull request into `main` triggers the cPanel deployment in
GitHub Actions. The workflow:

1. Runs the complete `bun run verify` release gate.
2. Builds and validates the cPanel release.
3. Uploads it over explicit FTPS to `/home/nordicso/.nordic_deploy_next`.
4. Replaces `/home/nordicso/public_html` only after staging validation.
5. Keeps the prior release at `/home/nordicso/public_html_previous`.
6. Restores that prior release automatically if activation cannot be verified.
7. Smoke-tests `/`, `/en`, `/ar`, and the contact endpoint.

The dedicated `deploy@nordicsolutions.ae` FTP account is used only by the
GitHub repository secret. Revoke that account in cPanel to stop automated
deployments. Do not put its password in the repository, local environment
files, or documentation.

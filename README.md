# 🐰RabiJump

[简体中文](https://github.com/KernelErr/RabiJump/blob/main/README_CN.md) | [API Doc](https://github.com/KernelErr/RabiJump/blob/main/docs/API.md)

RabiJump is an open source redirection service aimed for efficiency and simplicity.

🎆 Features:

- Built-in filesystem database.
- Built-in web admin panel.
- Seperate redirects for mobile phone and desktop.
- Enable/disable parameter support (url?foo=bar).
- Change redirection method (301, 302, 307, 308).
- Different ports for redirect and admin.
- Small binary size and RAM usage.
- Visit count and log rotation.
- API support, create your script!

## Deploy

Docker is the easiest way to deploy RabiJump. Or you can clone the repository and simply run `cargo run --release` in server directory.

```bash
docker run -d -p 8080:8080 -p 8081:8081 -v db_path:/app/database -v log_path:/app/logs memorysafety/rabijump:0.1.0
```

This command will start RabiJump in Docker container with `db_path` and `log_path` mounted to the container. You can use `docker logs` to check the generated admin token if you didn't set it in the environment variable.

### Port

- 8080: Redirect port.
- 8081: Admin port with web panel.

### Environment variables

- DATABASE_PATH: Path to the database. Default: `database`.
- LOG_PATH: Path to the logs. Default to `logs`.
- FALLBACK_TARGET: Target to redirect to if no match is found, also for index. Default is return 404.
- ALLOW_ORIGIN: CORS `Access-Control-Allow-Origin` header.
- TOKEN: Admin token, if not set, a random token will be generated and displayed in the stdout.

## Performance

RabiJump is designed to be simple and fast. A new instance of RabiJump takes about 30MB RAM. A RabiJump with 10k redirects takes about 70MB RAM and 30MB disk space. Its QPS could reach 30k+.

## License and Credits

RabiJump is licensed under the Apache-2.0 License. Thanks so much for the following open source projects:

- [Poem](https://github.com/poem-web/poem)
- [Sled](https://github.com/spacejam/sled)
- [CBL-Mariner](https://github.com/microsoft/CBL-Mariner)
- [Semi-design](https://github.com/DouyinFE/semi-design)
- ...
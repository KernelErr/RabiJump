# 🐰RabiJump

[English](https://github.com/KernelErr/RabiJump/blob/main/README.md)

RabiJump是一个简单高效的开源跳转（短链接）工具。

🎆 特性:

- 内置文件数据库。
- 内置管理面板。
- 可以对手机电脑分别设置跳转。
- 可以启用/禁用参数(url?foo=bar)。
- 可以设置跳转方式(301, 302, 307, 308)。
- 跳转和管理服务监听不同端口。
- 内存占用和二进制大小较小。
- 访问统计和日志轮换。
- 提供API接口，创建你的脚本！

## 部署

Docker是部署RabiJump最简单的方式之一。你也可以克隆仓库并在server目录下直接运行`cargo run --release`。


```bash
docker run -d -p 8080:8080 -p 8081:8081 -v db_path:/app/database -v log_path:/app/logs memorysafety/rabijump:0.1.0
```

这条命令会启动RabiJump容器，并挂载数据库文件夹`db_path`和日志文件夹`log_path`。如果没有指定管理Token，你可以通过`docker logs`命令去查看生成的Token。

### 端口

- 8080: 跳转服务端口。
- 8081: 管理界面/API端口。

### 环境变量

- DATABASE_PATH：数据库文件夹，默认是`database`。
- LOG_PATH：日志文件夹，默认是`logs`.
- FALLBACK_TARGET：没有找到对应跳转的默认跳转地址，对`/`也同样适用。默认是直接返回404。
- ALLOW_ORIGIN：CORS `Access-Control-Allow-Origin` 标头.
- TOKEN：管理Token，如果没有设置会自动生成一个。

## 性能

RabiJump在设计上注重简单和高效。一个空的RabiJump实例大约占用30MB的内存。一个有10k条跳转的RabiJump大约占用70MB的内存和30MB的磁盘空间。它的QPS可以达到30k以上。

## 开源许可证 & 致谢

RabiJump以Apache 2.0开源许可证发布。非常感谢一下的开源项目：

- [Poem](https://github.com/poem-web/poem)
- [Sled](https://github.com/spacejam/sled)
- [CBL-Mariner](https://github.com/microsoft/CBL-Mariner)
- [Semi-design](https://github.com/DouyinFE/semi-design)
- ...
FROM rust:latest as builder
WORKDIR /app
COPY . .
RUN cargo build --release

FROM mcr.microsoft.com/cbl-mariner/distroless/base:2.0
WORKDIR /app
COPY --from=builder /app/target/release/rabijump . 
COPY ./static /app/static
EXPOSE 8080
EXPOSE 8081
ENTRYPOINT [ "./rabijump" ] 
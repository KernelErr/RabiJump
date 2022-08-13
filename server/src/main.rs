mod admin;
mod config;
mod redirect;

use crate::admin::route as admin_route;
use futures::join;
use once_cell::sync::Lazy;
use poem::{
    error::NotFoundError, get, handler, http::StatusCode, listener::TcpListener, web::Path,
    EndpointExt, Response, Route, Server,
};
use spdlog::prelude::*;

static CONFIG: Lazy<config::Config> = Lazy::new(config::Config::env);

#[handler]
fn hello(Path(name): Path<String>) -> String {
    format!("hello: {}", name)
}

#[tokio::main]
async fn main() -> Result<(), std::io::Error> {
    info!("Manage token: {}", CONFIG.get_token());

    let redirect_app = Route::new()
        .at("/:path", get(crate::redirect::redirect))
        .catch_error(|_: NotFoundError| async move {
            if let Some(redirect) = CONFIG.get_fallback_target() {
                Response::builder()
                    .status(StatusCode::FOUND)
                    .header("Location", redirect)
                    .finish()
            } else {
                Response::builder()
                    .status(StatusCode::NOT_FOUND)
                    .body("Not found")
            }
        });
    let redirect_server = Server::new(TcpListener::bind("0.0.0.0:8080")).run(redirect_app);
    let admin_server = Server::new(TcpListener::bind("0.0.0.0:8081")).run(admin_route());
    let (redirect_res, admin_res) = join!(redirect_server, admin_server);

    if redirect_res.is_err() {
        error!("Redirect server error: {}", redirect_res.err().unwrap());
    }
    if admin_res.is_err() {
        error!("Admin server error: {}", admin_res.err().unwrap());
    }
    Ok(())
}

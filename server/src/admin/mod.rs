mod auth;
mod error;

use crate::{admin::error::AdminError, redirect::Redirect, CONFIG};
use poem::{
    endpoint::StaticFilesEndpoint,
    get, handler,
    http::Method,
    middleware::{Cors, CorsEndpoint},
    post,
    web::{Json, Path, Query},
    EndpointExt, Result, Route,
};
use serde::Deserialize;
use serde_json::json;

pub fn route() -> CorsEndpoint<Route> {
    let cors = if let Some(allow_origin) = CONFIG.get_allow_origin() {
        Cors::new()
            .allow_method(Method::GET)
            .allow_method(Method::POST)
            .allow_method(Method::DELETE)
            .allow_origin(allow_origin)
    } else {
        Cors::new()
            .allow_method(Method::GET)
            .allow_method(Method::POST)
            .allow_method(Method::DELETE)
    };
    Route::new()
        .at(
            "/api/redirect/:name",
            post(create_redirect)
                .get(get_redirect)
                .delete(delete_redirect)
                .with(auth::TokenMiddleware),
        )
        .at(
            "/api/redirect/:name/count",
            get(get_redirect_count).with(auth::TokenMiddleware),
        )
        .at(
            "/api/redirect;list",
            get(list_redirects).with(auth::TokenMiddleware),
        )
        .at(
            "/api/redirect;search",
            get(search_redirects).with(auth::TokenMiddleware),
        )
        .at("/api/auth", get(auth_check).with(auth::TokenMiddleware))
        .nest("/", StaticFilesEndpoint::new("./static").index_file("index.html"))
        .with(cors)
}

#[handler]
fn auth_check() -> Result<Json<serde_json::Value>, AdminError> {
    return Ok(Json(json!({
        "msg": "ok",
    })));
}

#[handler]
fn create_redirect(
    Path(name): Path<String>,
    Json(redirect): Json<Redirect>,
) -> Result<Json<serde_json::Value>, AdminError> {
    let mut redirect = redirect;
    redirect.last_modified = Some(chrono::Utc::now());
    if name != redirect.name {
        return Err(AdminError::BadRequest(format!(
            "Name in path ({}) does not match name in body ({})",
            name, redirect.name
        )));
    }
    match redirect.save() {
        Ok(_) => Ok(Json(json!(redirect))),
        Err(e) => Err(AdminError::InternalServerError(format!("{}", e))),
    }
}

#[handler]
fn delete_redirect(Path(name): Path<String>) -> Result<Json<serde_json::Value>, AdminError> {
    match Redirect::delete(&name) {
        Ok(_) => Ok(Json(json!({"status": "ok"}))),
        Err(e) => Err(AdminError::InternalServerError(format!("{}", e))),
    }
}

#[handler]
fn get_redirect(Path(name): Path<String>) -> Result<Json<serde_json::Value>, AdminError> {
    match Redirect::get_by_name(&name) {
        Ok(Some(redirect)) => Ok(Json(json!(redirect))),
        Ok(None) => Err(AdminError::NotFound),
        Err(e) => Err(AdminError::InternalServerError(format!("{}", e))),
    }
}

#[handler]
fn get_redirect_count(Path(name): Path<String>) -> Result<Json<serde_json::Value>, AdminError> {
    match Redirect::get_visit_by_name(&name) {
        Ok(count) => Ok(Json(json!({ "count": count }))),
        Err(e) => Err(AdminError::InternalServerError(format!("{}", e))),
    }
}

#[derive(Deserialize)]
struct ListQuery {
    count: Option<i32>,
    skip: Option<i32>,
}

#[handler]
fn list_redirects(
    Query(ListQuery { count, skip }): Query<ListQuery>,
) -> Result<Json<serde_json::Value>, AdminError> {
    let count = count.unwrap_or(10);
    let skip = skip.unwrap_or(0);
    match Redirect::list(count, skip) {
        Ok(redirects) => Ok(Json(json!(redirects))),
        Err(e) => Err(AdminError::InternalServerError(format!("{}", e))),
    }
}

#[derive(Deserialize)]
struct SearchQuery {
    prefix: String,
}

#[handler]
fn search_redirects(
    Query(SearchQuery { prefix }): Query<SearchQuery>,
) -> Result<Json<serde_json::Value>, AdminError> {
    match Redirect::search_by_prefix(&prefix) {
        Ok(redirects) => Ok(Json(json!(redirects))),
        Err(e) => Err(AdminError::InternalServerError(format!("{}", e))),
    }
}

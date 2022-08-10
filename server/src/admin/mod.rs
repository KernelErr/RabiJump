mod auth;
mod error;

use crate::{admin::error::AdminError, redirect::Redirect};
use poem::{
    get, handler, post,
    web::{Json, Path, Query},
    EndpointExt, Result, Route,
    endpoint::StaticFilesEndpoint
};
use serde::Deserialize;
use serde_json::json;

pub fn route() -> Route {
    Route::new()
        .at(
            "/api/redirect/:name",
            post(create_redirect)
                .get(get_redirect)
                .delete(delete_redirect)
                .with(auth::TokenMiddleware),
        )
        .at("/api/redirect/:name/count", get(get_redirect_count).with(auth::TokenMiddleware))
        .at("/api/redirect;list", get(list_redirects).with(auth::TokenMiddleware))
        .at("/api/redirect;search", get(search_redirects).with(auth::TokenMiddleware))
        .nest("/", StaticFilesEndpoint::new("./static"))
}

#[handler]
fn create_redirect(
    Path(name): Path<String>,
    Json(redirect): Json<Redirect>,
) -> Result<Json<serde_json::Value>, AdminError> {
    let mut redirect = redirect;
    redirect.last_modified = Some(chrono::Utc::now());
    redirect.name = name.to_lowercase();
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

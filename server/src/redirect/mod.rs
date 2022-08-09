mod model;
mod error;
pub use model::Redirect;

use poem::{handler, web::{Path, Json, Query}, Result, Route, post, get, Response, EndpointExt, error::NotFoundError};
use crate::redirect::error::RedirectError;

#[handler]
pub fn redirect(Path(name): Path<String>) -> Result<Response, RedirectError> {
    println!("redirect: {}", name);
    Err(RedirectError::NotFound)
}
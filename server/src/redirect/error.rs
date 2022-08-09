use poem::error::ResponseError;
use poem::http::StatusCode;

#[derive(Debug, thiserror::Error)]
pub enum RedirectError {
    #[error("Not found")]
    NotFound,
}

impl ResponseError for RedirectError {
    fn status(&self) -> StatusCode {
        match self {
            RedirectError::NotFound => StatusCode::NOT_FOUND,
        }
    }
}